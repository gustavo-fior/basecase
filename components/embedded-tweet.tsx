"use client";

import { Heart, MessageCircle, Repeat2, Share } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type TweetProps = {
  name: string;
  handle: string;
  content: string;
  avatar: string;
  date: string;
  likes: number;
  retweets: number;
  replies: number;
  verified?: boolean;
  url: string;
  views?: number;
  mediaUrl?: string;
  mediaType?: 'image' | 'gif';
  mediaAspectRatio?: string;
};

export default function EmbeddedTweet({
  name,
  handle,
  content,
  date,
  likes,
  retweets,
  replies,
  avatar,
  url,
  mediaUrl,
  mediaType,
  mediaAspectRatio,
}: TweetProps) {
  console.log('Tweet render props:', { mediaUrl, mediaType, mediaAspectRatio })

  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(Number(likes));
  const [retweeted, setRetweeted] = useState(false);

  const handleLike = () => {
    if (liked) {
      setLikesCount((prev) => prev - 1);
    } else {
      setLikesCount((prev) => prev + 1);
    }
    setLiked(!liked);
  };

  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-black">
      <div className="flex gap-4">
        <Link
          href={`https://twitter.com/${handle}`}
          className="flex-shrink-0 self-start"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src={avatar}
            alt={name}
            className="rounded-full"
            width={48}
            height={48}
          />
        </Link>
        <div className="flex-1 min-w-0">
          <div className="text-sm">
            <Link
              href={`https://twitter.com/${handle}`}
              className="text-[#F4212E] hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              @{handle}
            </Link>
            <span className="text-muted-foreground px-1">·</span>
            <span className="text-muted-foreground">{date}</span>
          </div>
          <div className="text-primary pr-6">
            <p className="whitespace-pre-wrap">{content}</p>
            {mediaUrl && (
              <div className="rounded-xl overflow-hidden">
                <Image
                  src={mediaUrl}
                  alt="Tweet media"
                  width={500}
                  height={mediaAspectRatio ? 500 * Number(mediaAspectRatio) : 500}
                  className="w-full object-cover"
                  onError={(e) => console.error('Image loading error:', e)}
                />
              </div>
            )}
          </div>
          <div className="flex items-center gap-6 pt-4 text-muted-foreground">
            <Link
              href={url}
              className="flex items-center gap-2 hover:text-foreground no-underline text-muted-foreground [&]:text-muted-foreground [&]:no-underline [&]:hover:text-foreground"
              aria-label="Reply"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="h-4 w-4" />
              <span className="text-xs">{replies}</span>
            </Link>
            <button
              className={`flex items-center gap-2 ${
                retweeted ? "text-emerald-500 hover:text-emerald-600" : "hover:text-foreground"
              }`}
              aria-label="Retweet"
              onClick={() => setRetweeted(!retweeted)}
            >
              <Repeat2 className="h-4 w-4" />
              <span className="text-xs">{retweets}</span>
            </button>
            <button
              className={`flex items-center gap-2 ${
                liked ? "text-red-500 hover:text-red-600" : "hover:text-foreground"
              }`}
              onClick={handleLike}
              aria-label="Like"
            >
              <Heart className={`h-4 w-4 ${liked ? "fill-current" : ""}`} />
              <span className="text-xs">{likesCount}</span>
            </button>
            <Link
              href={url}
              className="hidden sm:flex items-center gap-2 hover:text-foreground ml-auto no-underline text-muted-foreground [&]:text-muted-foreground [&]:no-underline [&]:hover:text-foreground"
              aria-label="Share"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Share className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
