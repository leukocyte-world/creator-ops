// FixTweet API client — fetches X/Twitter post + thread data without any API key
// Uses api.fxtwitter.com which is free, no auth, returns JSON

interface FxTweet {
  id: string;
  text: string;
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
  // Matches: twitter.com/user/status/ID or x.com/user/status/ID
  const match = url.match(/(?:twitter\.com|x\.com)\/\w+\/status\/(\d+)/);
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
    if (tweet) tweets.push(tweet);
  }

  if (tweets.length === 0) return '[Could not fetch post content — please check the URLs]';

  return tweets.map((t, i) => [
    `--- Post ${i + 1} ---`,
    `Author: @${t.author.screen_name} (${t.author.name})`,
    `Text: ${t.text}`,
    `Engagement: ${t.likes} likes · ${t.retweets} retweets · ${t.replies} replies`,
    '',
  ].join('\n')).join('\n');
}
