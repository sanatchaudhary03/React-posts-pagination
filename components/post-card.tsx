"use client"

import { usePosts } from "./posts-context"
import type { Post } from "@/lib/types"

export function PostCard({ post }: { post: Post }) {
  const { removePost } = usePosts()

  return (
    <article className="relative rounded-md border bg-card p-4 shadow-sm">
      <button
        aria-label={`Remove post ${post.id}`}
        title="Remove"
        onClick={() => removePost(post.id)}
        className="absolute right-2 top-2 inline-flex h-7 w-7 items-center justify-center rounded-full border border-red-600 text-red-600 hover:bg-red-50"
      >
        <span aria-hidden className="text-sm font-bold">
          ×
        </span>
      </button>

      <h3 className="mb-2 line-clamp-2 text-pretty text-base font-semibold">{post.title}</h3>
      <p className="line-clamp-4 text-sm text-muted-foreground">{post.body}</p>
    </article>
  )
}
