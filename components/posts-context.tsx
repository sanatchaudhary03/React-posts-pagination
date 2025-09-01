"use client"

import type React from "react"
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"
import type { Post } from "@/lib/types"

type PostsContextValue = {
  posts: Post[]
  isLoading: boolean
  currentPage: number
  perPage: number
  totalPages: number
  pagePosts: Post[]
  removePost: (id: number) => void
  goToPage: (page: number) => void
  nextPage: () => void
  prevPage: () => void
}

const PostsContext = createContext<PostsContextValue | null>(null)

export function PostsProvider({ initialPosts, children }: { initialPosts: Post[]; children: React.ReactNode }) {
  const [posts, setPosts] = useState<Post[]>(initialPosts || [])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const perPage = 6
  const [isLoading, setIsLoading] = useState<boolean>(true)

  // 5-second startup loading gate
  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 5000)
    return () => clearTimeout(t)
  }, [])

  const totalPages = useMemo(() => Math.max(1, Math.ceil(posts.length / perPage)), [posts.length])

  // Keep currentPage in bounds when posts or totalPages change
  useEffect(() => {
    setCurrentPage((p) => Math.min(Math.max(p, 1), totalPages))
  }, [totalPages])

  // Remove post globally; current page slice naturally fills from subsequent items
  const removePost = useCallback((id: number) => {
    setPosts((prev) => prev.filter((p) => p.id !== id))
  }, [])

  const goToPage = useCallback(
    (page: number) => {
      setCurrentPage(() => Math.min(Math.max(page, 1), totalPages))
    },
    [totalPages],
  )

  const nextPage = useCallback(() => {
    setCurrentPage((p) => Math.min(p + 1, totalPages))
  }, [totalPages])

  const prevPage = useCallback(() => {
    setCurrentPage((p) => Math.max(p - 1, 1))
  }, [])

  const pagePosts = useMemo(() => {
    const start = (currentPage - 1) * perPage
    return posts.slice(start, start + perPage)
  }, [posts, currentPage])

  const value: PostsContextValue = {
    posts,
    isLoading,
    currentPage,
    perPage,
    totalPages,
    pagePosts,
    removePost,
    goToPage,
    nextPage,
    prevPage,
  }

  return <PostsContext.Provider value={value}>{children}</PostsContext.Provider>
}

export function usePosts() {
  const ctx = useContext(PostsContext)
  if (!ctx) throw new Error("usePosts must be used within PostsProvider")
  return ctx
}
