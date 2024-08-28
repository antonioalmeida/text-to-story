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
        <div className="max-w-6xl w-full px-4 md:px-0">
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-primary">Instagram Story Generator</h1>
              <p className="text-muted-foreground">Enter your text and we will transform it into Instagram stories.</p>
            </div>
            <Canvas />
          </div>
        </div>
        <footer className="w-full bg-muted text-muted-foreground py-4 mt-8">
          <div className="container mx-auto flex justify-between items-center px-4">
            <p>&copy; 2023 Instagram Story Generator. All rights reserved.</p>
            <nav>
              <ul className="flex space-x-4">
                <li>
                  <Link href="#" prefetch={false}>
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" prefetch={false}>
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" prefetch={false}>
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </footer>
      </div>
    </div>
  )
}

