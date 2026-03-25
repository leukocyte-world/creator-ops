// FixTweet API client — fetches X/Twitter post + thread data without any API key
// Uses api.fxtwitter.com which is free, no auth, returns JSON

interface FxTweet {
  id: string;
  text?: string;
  description?: string;
  note_tweet?: {
    text: string;
  };
  author: {
    name: string;
    screen_name: string;
  };
  likes: number;
  retweets: number;
  replies: number;
  quote_tweets: number;
  created_at: string;
  replying_to?: string;
  tweet_url?: string;
}

interface FxResponse {
  code: number;
  message: string;
  tweet?: FxTweet;
}

export function extractTweetId(url: string): string | null {
  // Matches: twitter.com/any/status/ID or x.com/any/status/ID
  const match = url.match(/(?:twitter\.com|x\.com)\/.+?\/status\/(\d+)/);
  return match ? match[1] : null;
}

export async function fetchTweet(tweetId: string): Promise<FxTweet | null> {
  try {
    const res = await fetch(`https://api.fxtwitter.com/status/${tweetId}`, {
      headers: { 'User-Agent': 'CreatorOps/1.0' },
      next: { revalidate: 300 }, // cache 5min
    });

    if (!res.ok) return null;
    const data: FxResponse = await res.json();
    return data.tweet ?? null;
  } catch {
    return null;
  }
}

export async function fetchThread(urls: string[]): Promise<string> {
  const tweets: FxTweet[] = [];

  for (const url of urls) {
    const id = extractTweetId(url.trim());
    if (!id) continue;
    const tweet = await fetchTweet(id);
    if (tweet) {
      console.log(`[FxTwitter] Fetched tweet ${id}: author=@${tweet.author?.screen_name}, text_len=${tweet.text?.length || 0}`);
      tweets.push(tweet);
    }
  }

  if (tweets.length === 0) return '[Could not fetch post content — please check the URLs or try again later]';

  return tweets.map((t, i) => {
    // Robust text extraction: handles standard, long-form (note_tweet), and description fallbacks
    let content = t.text || '';
    
    // Check for note_tweet (long-form content)
    if (!content && t.note_tweet?.text) {
      content = t.note_tweet.text;
    }
    
    // Check for description (fallback)
    if (!content && t.description) {
      content = t.description;
    }

    // If still empty, it might be an image/video-only tweet, use URL or placeholder
    if (!content) {
      content = '[No text content available — this post might be an image or video only]';
    }
    
    return [
      `--- Post ${i + 1} ---`,
      `Author: @${t.author?.screen_name || 'unknown'} (${t.author?.name || 'Unknown User'})`,
      `Text: ${content}`,
      `Engagement: ${t.likes || 0} likes · ${t.retweets || 0} retweets · ${t.replies || 0} replies`,
      '',
    ].join('\n');
  }).join('\n');
}
