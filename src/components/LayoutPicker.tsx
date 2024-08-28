import React, { useState } from 'react';
import {
    Card,
} from "@/components/ui/card"

interface Props {
    // Define your component's props here
    onSelect: (dimensions: { width: number, height: number}) => void
}

const LayoutPicker: React.FC<Props> = (props) => {
    // Implement your component's logic here
    const [selectedSize, setSelectedSize] = useState('instagram-story')
    const sizes = [
        {
            name: "Instagram Story",
            value: "instagram-story",
            icon: <InstagramIcon className="h-5 w-5" />,
            width: 1080,
            height: 1920,
        },
        {
            name: "Instagram Square Post",
            value: "instagram-square-post",
            icon: <InstagramIcon className="h-5 w-5" />,
            width: 1080,
            height: 1080,
        },
        {
            name: "Instagram Portrait Post",
            value: "instagram-portrait-post",
            icon: <InstagramIcon className="h-5 w-5" />,
            width: 1080,
            height: 1350,
        },
        { name: "TikTok Story / Carousel", value: "tiktok-story", icon: <InstagramIcon className="h-5 w-5" />, width: 1080, height: 1920 },
        { name: "LinkedIn Vertical", value: "linkedin-vertical", icon: <InstagramIcon className="h-5 w-5" />, width: 628, height: 1200 },
        { name: "LinkedIn Square", value: "linkedin-square", icon: <InstagramIcon className="h-5 w-5" />, width: 1200, height: 1200 },
    ]

    return (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {sizes.map((size) => (
                <Card
                    key={size.value}
                    className={`bg-secondary cursor-pointer flex items-center justify-center w-[${size.width}px] h-[${size.height
                        }px] p-3 ${selectedSize === size.value ? "border-2 border-primary" : ""}`}
                    onClick={() => { 
                        setSelectedSize(size.value) 
                        props.onSelect({ width: size.width, height: size.height })
                    }}
                >
                    <div className="flex flex-col items-center justify-center">
                        {size.icon}
                        <span className="mt-2">{size.name}</span>
                        <span className="mt-2">{size.width} x {size.height}</span>
                    </div>
                </Card>
            ))}
        </div>
    )
}

export default LayoutPicker;

function InstagramIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
    )
}