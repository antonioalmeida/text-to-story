'use client';
import dynamic from 'next/dynamic';
import Link from "next/link"

const Canvas = dynamic(() => import('../components/canvas'), {
  ssr: false,
});

export default function Home() {
  return (
    <div className="mt-12">
      <div className="flex flex-col items-center justify-center min-h-screen bg-background">
        <div className="max-w-7xl w-full px-4 md:px-0">
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-primary">🖼️ Text to Story Generator</h1>
              <p className="text-muted-foreground">Your text. Any story format.</p>
            </div>
            <Canvas />
          </div>
        </div>
        <footer className="w-full bg-muted py-4 mt-8">
          <div className="container mx-auto flex justify-between items-center px-4">
            <div></div>
            <nav>
              <ul className="flex space-x-4">
                <li>
                Made with ❤️, and <Link href="https://github.com/antonioalmeida/text-to-story">open source</Link> code.
                </li>
              </ul>
            </nav>
          </div>
        </footer>
      </div>
    </div>
  )
}

