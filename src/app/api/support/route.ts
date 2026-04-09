import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const { name, email, message, type = 'Support Request' } = await req.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // 1. Send Email Notification
    const { error: emailError } = await resend.emails.send({
      from: 'CreatorOps Support <onboarding@resend.dev>',
      to: ['leukocyteng@gmail.com'],
      subject: `[${type}] New Message from ${name || 'User'}`,
      replyTo: email || undefined,
      html: `
        <div style="font-family: sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
          <h2 style="color: #6366f1; border-bottom: 2px solid #6366f1; padding-bottom: 10px;">New Support Inquery</h2>
          <p><strong>Type:</strong> ${type}</p>
          <p><strong>Name:</strong> ${name || 'N/A'}</p>
          <p><strong>Email:</strong> ${email || 'N/A'}</p>
          <p><strong>Message:</strong></p>
          <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; border-left: 4px solid #6366f1;">
            ${message}
          </div>
          <p style="font-size: 12px; color: #999; margin-top: 30px; text-align: center;">Sent via CreatorOps Support Widget</p>
        </div>
      `,
    });

    // 2. Optional Discord Webhook Notification
    const discordWebhookUrl = process.env.DISCORD_SUPPORT_WEBHOOK;
    if (discordWebhookUrl) {
      try {
        await fetch(discordWebhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: 'CreatorOps Bot',
            embeds: [{
              title: `New Support Message: ${type}`,
              color: 0x6366f1,
              fields: [
                { name: 'Name', value: name || 'N/A', inline: true },
                { name: 'Email', value: email || 'N/A', inline: true },
                { name: 'Message', value: message }
              ],
              timestamp: new Date().toISOString()
            }]
          }),
        });
      } catch (err) {
        console.error('[Discord Webhook Error]:', err);
      }
    }

    if (emailError) {
      console.error('[Support API Email Error]:', emailError);
      return NextResponse.json({ error: 'Failed to send email notification' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('[Support API Exception]:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
