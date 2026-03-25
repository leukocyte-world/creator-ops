import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { authenticateUser, supabase } from '@/lib/supabase';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Email and Password',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await authenticateUser(credentials.email, credentials.password);
        if (user) {
          return { id: user.id, email: user.email, name: user.email.split('@')[0] };
        }
        return null;
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: 'jwt' },
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.sub;
        
        const adminEmail = process.env.ADMIN_EMAIL || process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'leukocyteng@gmail.com';
        
        try {
          const { data, error } = await supabase
            .from('users')
            .select('role, is_pro')
            .eq('email', session.user.email)
            .single();
          
          if (data && !error) {
            (session.user as any).role = data.role || 'user';
            (session.user as any).is_pro = data.is_pro;
          } else {
            // Fallback for first-time setup or missing column
            (session.user as any).role = session.user.email === adminEmail ? 'admin' : 'user';
          }
        } catch (e) {
          (session.user as any).role = session.user.email === adminEmail ? 'admin' : 'user';
        }
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
};
