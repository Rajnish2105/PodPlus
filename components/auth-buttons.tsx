"use client"

import { signIn, signOut } from "next-auth/react"

export function LoginButton() {
  return (
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => signIn()}>
      Sign in
    </button>
  )
}

export function LogoutButton() {
  return (
    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => signOut()}>
      Sign out
    </button>
  )
}

