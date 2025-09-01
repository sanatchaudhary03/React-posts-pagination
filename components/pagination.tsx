"use client"

import { useMemo } from "react"
import { usePosts } from "./posts-context"

export function Pagination() {
  const { currentPage, totalPages, goToPage, nextPage, prevPage } = usePosts()

  const pages = useMemo(() => Array.from({ length: totalPages }, (_, i) => i + 1), [totalPages])

  return (
    <nav className="flex items-center justify-center gap-2" aria-label="Pagination">
      <button
        onClick={prevPage}
        disabled={currentPage === 1}
        className="rounded-md border px-3 py-1.5 text-sm disabled:opacity-50"
        aria-label="Previous page"
      >
        Prev
      </button>

      <ul className="flex items-center gap-1">
        {pages.map((p) => {
          const active = p === currentPage
          return (
            <li key={p}>
              <button
                onClick={() => goToPage(p)}
                aria-current={active ? "page" : undefined}
                className={[
                  "rounded-md border px-3 py-1.5 text-sm",
                  active ? "bg-blue-600 text-white border-blue-600" : "hover:bg-accent",
                ].join(" ")}
              >
                {p}
              </button>
            </li>
          )
        })}
      </ul>

      <button
        onClick={nextPage}
        disabled={currentPage === totalPages}
        className="rounded-md border px-3 py-1.5 text-sm disabled:opacity-50"
        aria-label="Next page"
      >
        Next
      </button>
    </nav>
  )
}
