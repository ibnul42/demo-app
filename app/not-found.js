'use client'
import Link from 'next/link'
import React from 'react'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-5">
      <h1 className="text-6xl font-bold">Oops!</h1>
      <p className="text-xl mt-2">The page you&apos;re looking for doesn&apos;t exist.</p>
      <Link href="/">
        <button className="mt-4 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-400 transition">
          Go Home
        </button>
      </Link>
    </div>
  )
}