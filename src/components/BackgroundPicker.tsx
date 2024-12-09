import { Button } from "@/components/ui/button"

import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Card } from './ui/card';

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
            <div className="space-y-2 mt-5">
                <h2 className="text-2xl font-bold">Background</h2>
                <p className="text-gray-500 dark:text-gray-400">Choose an image from the gallery or upload your own.</p>
            </div>
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
        </div>
    )
}