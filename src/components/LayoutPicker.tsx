import React from 'react';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface Props {
    onSelect: (dimensions: { width: number, height: number }) => void
}

const LayoutPicker: React.FC<Props> = (props) => {
    const formats = {
        "Instagram": [
            {
                name: "Instagram Story",
                value: "instagram-story",
                platform: "Instagram",
                icon: <InstagramIcon className="h-5 w-5" />
            },
            {
                name: "Instagram Square",
                value: "instagram-square-post",
                platform: "Instagram",
                icon: <InstagramIcon className="h-5 w-5" />
            },
            {
                name: "Instagram Portrait",
                value: "instagram-portrait-post",
                platform: "Instagram",
                icon: <InstagramIcon className="h-5 w-5" />
            }],
        "TikTok": [
            {
                name: "TikTok Story",
                value: "tiktok-story",
                platform: "TikTok",
                icon: <TikTokIcon className="h-5 w-5" />
            }
        ],
        "LinkedIn": [
            { name: "LinkedIn Vertical", value: "linkedin-vertical", platform: "LinkedIn", icon: <LinkedInIcon className="h-5 w-5" /> },
            { name: "LinkedIn Square", value: "linkedin-square", platform: "LinkedIn", icon: <LinkedInIcon className="h-5 w-5" /> }
        ]
    }

    const dimensions = {
        'instagram-story': { width: 1080, height: 1920 },
        'instagram-square-post': { width: 1080, height: 1080 },
        'instagram-portrait-post': { width: 1080, height: 1350 },
        'tiktok-story': { width: 1080, height: 1920 },
        'linkedin-vertical': { width: 628, height: 1200 },
        'linkedin-square': { width: 1200, height: 1200 }
    }

    return (
        <div>
            <div>
                <Select onValueChange={(value) => props.onSelect({ width: dimensions[value].width, height: dimensions[value].height })}>
                    <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Select a format" />
                    </SelectTrigger>
                    <SelectContent>
                        {
                            Object.keys(formats).map(k => (
                                <SelectGroup key={k}>
                                    <SelectLabel><span className="inline-flex">{formats[k][0].icon}</span> {k}</SelectLabel>
                                    {formats[k].map((f) => (
                                        <SelectItem value={f.value} key={f.value}>{f.name}</SelectItem>
                                    ))}
                                </SelectGroup>))
                        }
                    </SelectContent>
                </Select>
            </div>
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

function TikTokIcon(props: any) {
    return (
        <svg {...props} fill="#000000" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z"></path></g></svg>
    )
}
function LinkedInIcon(props: any) {
    return (
        <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6.5 8C7.32843 8 8 7.32843 8 6.5C8 5.67157 7.32843 5 6.5 5C5.67157 5 5 5.67157 5 6.5C5 7.32843 5.67157 8 6.5 8Z" fill="#0F0F0F"></path> <path d="M5 10C5 9.44772 5.44772 9 6 9H7C7.55228 9 8 9.44771 8 10V18C8 18.5523 7.55228 19 7 19H6C5.44772 19 5 18.5523 5 18V10Z" fill="#0F0F0F"></path> <path d="M11 19H12C12.5523 19 13 18.5523 13 18V13.5C13 12 16 11 16 13V18.0004C16 18.5527 16.4477 19 17 19H18C18.5523 19 19 18.5523 19 18V12C19 10 17.5 9 15.5 9C13.5 9 13 10.5 13 10.5V10C13 9.44771 12.5523 9 12 9H11C10.4477 9 10 9.44772 10 10V18C10 18.5523 10.4477 19 11 19Z" fill="#0F0F0F"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M20 1C21.6569 1 23 2.34315 23 4V20C23 21.6569 21.6569 23 20 23H4C2.34315 23 1 21.6569 1 20V4C1 2.34315 2.34315 1 4 1H20ZM20 3C20.5523 3 21 3.44772 21 4V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3H20Z" fill="#0F0F0F"></path> </g></svg>
    )
}