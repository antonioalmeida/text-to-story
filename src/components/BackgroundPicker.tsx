import { Button } from "@/components/ui/button"

import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Card } from './ui/card';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16
};

const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: 'border-box' as 'border-box'
};

const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
};

const img = {
    display: 'block',
    width: 'auto',
    height: '100%'
};

interface Props {
    onSelected: (src: string) => void
}

const images = [
    {
        src: "/bg-1.jpeg",
        alt: "Image 1",
    },
    {
        src: "/bg-2.webp",
        alt: "Image 2",
    },
    {
        src: "/bg-3.webp",
        alt: "Image 3",
    },
    {
        src: "/bg-4.webp",
        alt: "Image 4",
    },
    {
        src: "/bg-5.webp",
        alt: "Image 5",
    },
    {
        src: "/bg-6.webp",
        alt: "Image 6",
    },
]

export default function BackgroundPicker(props: Props) {
    const [files, setFiles] = useState<{ preview: string, name: string }[]>([]);
    const [selectedImage, setSelectedImage] = useState<number | null>(null);

    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'image/*': []
        },
        onDrop: acceptedFiles => {
            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));
        }
    });

    const allFiles = () => {
        return [...images, ...files.map(file => ({ src: file.preview, alt: 'uploaded' }))]
    }

    return (
        <div>
            <Popover>
                <PopoverTrigger>
                    <Button
                        variant="outline"
                        role="combobox"
                        className="w-[150px]"
                    >
                        <BucketIcon className="w-5 h-5 mr-2"></BucketIcon> Background
                    </Button>
                </PopoverTrigger>

                <PopoverContent className="w-400 h-400">
                    <h4 className="text-xl font-bold">Background</h4>
                    <p className="text-gray-500 dark:text-gray-400">Choose an image from the gallery or upload your own.</p>
                    <div className="grid gap-6 max-w-4xl mx-auto p-4 md:p-6">
                        <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
                            {allFiles().map((image, index) => (
                                <button
                                    key={index}
                                    className="border border-gray-200 rounded-lg overflow-hidden group transition-colors hover:border-gray-900 dark:border-gray-800 dark:hover:border-gray-50"
                                    onClick={() => {
                                        setSelectedImage(index)
                                        props.onSelected(image.src)
                                    }}
                                >
                                    <img
                                        src={image.src}
                                        width="120"
                                        height="120"
                                        alt={image.alt}
                                        className="aspect-square object-cover w-full group-hover:opacity-50 transition-opacity"
                                    />
                                    <span className="sr-only">Select {image.alt}</span>
                                </button>
                            ))}
                            <div {...getRootProps({ className: 'dropzone' })}>
                                <input {...getInputProps()} />
                                <button
                                    className="border border-gray-200 rounded-lg overflow-hidden group transition-colors hover:border-gray-900 dark:border-gray-800 dark:hover:border-gray-50"
                                >
                                    <img
                                        src="/placeholder.svg"
                                        width="120"
                                        height="120"
                                        alt="Preview"
                                        className="aspect-square object-cover w-full group-hover:opacity-50 transition-opacity"
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    )
}

const BucketIcon = (props) => <svg {...props} fill="#000000" viewBox="0 -32 576 576" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M512 320s-64 92.65-64 128c0 35.35 28.66 64 64 64s64-28.65 64-64-64-128-64-128zm-9.37-102.94L294.94 9.37C288.69 3.12 280.5 0 272.31 0s-16.38 3.12-22.62 9.37l-81.58 81.58L81.93 4.76c-6.25-6.25-16.38-6.25-22.62 0L36.69 27.38c-6.24 6.25-6.24 16.38 0 22.62l86.19 86.18-94.76 94.76c-37.49 37.48-37.49 98.26 0 135.75l117.19 117.19c18.74 18.74 43.31 28.12 67.87 28.12 24.57 0 49.13-9.37 67.87-28.12l221.57-221.57c12.5-12.5 12.5-32.75.01-45.25zm-116.22 70.97H65.93c1.36-3.84 3.57-7.98 7.43-11.83l13.15-13.15 81.61-81.61 58.6 58.6c12.49 12.49 32.75 12.49 45.24 0s12.49-32.75 0-45.24l-58.6-58.6 58.95-58.95 162.44 162.44-48.34 48.34z"></path></g></svg>