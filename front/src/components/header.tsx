import Link from "next/link";
import { Button } from "./ui/button";

export function Header() {
    return (
         <header className="w-full border-b bg-white/80 backdrop-blur sticky top-0 z-50">
          <nav className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-4">
              <Link href="/">
                <span className="font-bold text-xl text-blue-600">shorturl</span>
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <Link href="/">
                <Button variant="ghost" className="text-base">Home</Button>
              </Link>
              <Link href="/precos">
                <Button variant="ghost" className="text-base">Preços</Button>
              </Link>
              <Link href="/dashboard">
                <Button variant="ghost" className="text-base">Login</Button>
              </Link>
            </div>
          </nav>
        </header>
    )
}