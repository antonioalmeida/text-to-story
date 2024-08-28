import React from 'react';
import { Button } from "@/components/ui/button"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Input } from "@/components/ui/input"

interface Props {
    fontSize: number,
    onUpdate: (n: number) => void,
    onIncrease: () => void,
    onDecrease: () => void
}

const FontSizePicker: React.FC<Props> = (props) => {
    // Implement your component's logic here

    return (
        <>
            <Button
                variant="ghost"
                size="icon"
                className="text-primary hover:bg-primary/10"
                onClick={() => props.onDecrease()}
            >
                <MinusIcon className="w-5 h-5" />
                <span className="sr-only">Decrease Font Size</span>
            </Button>
            <Input
                id="fontSize"
                value={props.fontSize.toString()} 
                onChange = {(value) => props.onUpdate(parseInt(value.target.value))}
                type="number"
                className='w-24'
            />
            <Button
                variant="ghost"
                size="icon"
                className="text-primary hover:bg-primary/10"
                onClick={() => props.onIncrease()}
            >
                <PlusIcon className="w-5 h-5" />
                <span className="sr-only">Increase Font Size</span>
            </Button>
        </>
    );
};

function PlusIcon(props: any) {
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
            <path d="M5 12h14" />
            <path d="M12 5v14" />
        </svg>
    )
}

function MinusIcon(props: any) {
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
            <path d="M5 12h14" />
        </svg>
    )
}

export default FontSizePicker;