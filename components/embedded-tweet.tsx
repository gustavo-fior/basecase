"use client";

import { Heart, MessageCircle, Repeat2, Share, BadgeCheck } from "lucide-react";
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
  mediaType?: "image" | "gif";
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
  mediaAspectRatio,
}: TweetProps) {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(Number(likes));
  const [retweeted, setRetweeted] = useState(false);
  const [retweetsCount, setRetweetsCount] = useState(Number(retweets));

  const handleLike = () => {
    if (liked) {
      setLikesCount((prev) => prev - 1);
    } else {
      setLikesCount((prev) => prev + 1);
    }
    setLiked(!liked);
  };

  const handleRetweet = () => {
    if (retweeted) {
      setRetweetsCount((prev) => prev - 1);
    } else {
      setRetweetsCount((prev) => prev + 1);
    }
    setRetweeted(!retweeted);
  };

  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-black">
      <div className="flex gap-3">
        <Link
          href={`https://twitter.com/${handle}`}
          className="flex-shrink-0"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src={avatar}
            alt={name}
            className="rounded-full not-prose"
            width={36}
            height={36}
          />
        </Link>
        <div className="flex-1 min-w-0">
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <Link
                href={`https://twitter.com/${handle}`}
                className="text-gray-900 dark:text-white font-bold hover:underline [&]:text-black [&]:dark:text-white [&]:no-underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {name}
              </Link>
              <BadgeCheck className="h-5 w-5 text-white dark:text-black fill-[#1d9bf0]" />
            </div>
            <div className="flex gap-1 text-xs text-muted-foreground">
              <span>@{handle}</span>
              <span>·</span>
              <span>{date}</span>
            </div>
          </div>
          <div className="text-primary pr-6">
            <p className="whitespace-pre-wrap [&>*]:!my-0 leading-[1.2] space-y-0 not-prose pt-[1.2em]">
              {content}
            </p>
            {mediaUrl && (
              <div className="rounded-xl overflow-hidden">
                <Image
                  src={mediaUrl}
                  alt="Tweet media"
                  width={500}
                  height={mediaAspectRatio ? 500 * Number(mediaAspectRatio) : 500}
                  className="w-full object-cover"
                  onError={(e) => console.error("Image loading error:", e)}
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
              onClick={handleRetweet}
            >
              <Repeat2 className="h-4 w-4" />
              <span className="text-xs">{retweetsCount}</span>
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
