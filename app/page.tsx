import { PostsProvider } from "@/components/posts-context"
import { PostsApp } from "@/components/posts-app"
import type { Post } from "@/lib/types"

async function getPosts(): Promise<Post[]> {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    next: { revalidate: 3600 },
  })
  if (!res.ok) {
    return []
  }
  const data = (await res.json()) as Post[]
  return data
}

export default async function Page() {
  const posts = await getPosts()

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <header className="mb-6">
        <h1 className="text-pretty text-2xl font-semibold">Posts</h1>
        <p className="text-sm text-muted-foreground">6 per page. Remove a card to fill from the next items.</p>
      </header>

      <PostsProvider initialPosts={posts}>
        <PostsApp />
      </PostsProvider>
    </main>
  )
}
