"use client"

import { usePosts } from "./posts-context"
import { PostCard } from "./post-card"
import { Pagination } from "./pagination"

export function PostsApp() {
  const { isLoading, pagePosts } = usePosts()

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-lg font-medium">Loading...</p>
      </div>
    )
  }

  return (
    <section className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {pagePosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      <Pagination />
    </section>
  )
}
