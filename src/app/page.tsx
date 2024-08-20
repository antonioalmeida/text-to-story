'use client';
import Image from "next/image";
import dynamic from 'next/dynamic';
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const Canvas = dynamic(() => import('../components/canvas'), {
  ssr: false,
});

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/qXu9jUNskBl
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

export default function Home() {
  return (
    <div className="mt-12">
      <div className="flex flex-col items-center justify-center min-h-screen bg-background">
        <div className="max-w-6xl w-full px-4 md:px-0">
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-primary">Instagram Story Generator</h1>
              <p className="text-muted-foreground">Enter your text and we'll transform it into Instagram stories.</p>
            </div>
            <Canvas />
            <Button className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
              Download
            </Button>
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

