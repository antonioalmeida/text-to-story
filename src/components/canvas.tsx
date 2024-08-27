import React, { useRef, useState } from 'react';
import { Stage, Layer, Rect, Text } from 'react-konva';
import Konva from 'konva';
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { FontPicker } from './FontPicker';
import FontSizePicker from './FontSizePicker';
import LayoutPicker from './LayoutPicker';

const ColoredRect = () => {
  const [color, setColor] = useState('green');

  const handleClick = () => {
    setColor(Konva.Util.getRandomColor());
  };

  return (
    <Rect
      x={20}
      y={20}
      width={50}
      height={50}
      fill={color}
      shadowBlur={5}
      onClick={handleClick}
    />
  );
};

const CHARACTERS_PER_STORY = 140
const DEAFULT_FONT_SIZE = 24

const DEFAULT_STATE = "First story.\n\nA story can have multiple paragraphs.\n\n--\n\nThe second story starts here.\n\nYou can start a new story by adding the '-' character twice.\n\nAny block of text can be moved.\n\n--\n\nTry to drag me!\n\n--\n\nWhen you're done, click Download to download all the previews as images."

const Canvas = () => {
  const [postContent, setPostContent] = useState(DEFAULT_STATE);
  const [font, setFont] = useState('Arial');
  const [fontSize, setFontSize] = useState(DEAFULT_FONT_SIZE);
  const stageRefs = useRef(new Map());

  const texts = () => {
    return postContent.split('--').map((t) => t.trim())
  }

  return (
    <>
      <div className="flex flex-col space-y-2">
        <Textarea
          placeholder="Enter your text here..."
          className="flex-1 p-4 rounded-md border border-input bg-background text-foreground focus:ring-1 focus:ring-primary focus:border-primary"
          rows={12}
          name="postContent"
          value={postContent}
          onChange={e => setPostContent(e.target.value)} // 
        />
        <div className="flex items-center space-x-2">
          <FontPicker
            value={font}
            onSelect={(v) => setFont(v)}
          ></FontPicker>
          <FontSizePicker
            fontSize={fontSize}
            onUpdate={(n: number) => setFontSize(n)}
            onIncrease={() => setFontSize(fontSize + 1)}
            onDecrease={() => setFontSize(fontSize - 1)}
          />
        </div>
        <div>
          <LayoutPicker />
        </div>
      </div>
      <div className='container'>
        <div className="flex gap-4 overflow-x-auto snap-x">
          {texts().map((post, i) => (
            <div key={i} className="aspect-[9/16] rounded-2xl overflow-hidden bg-gradient-to-br from-primary to-secondary flex items-center justify-center shrink-0 snap-center">
              <Stage width={270} height={480}
                ref={element => { stageRefs.current.set(i, element) }}
              >
                <Layer>
                  <Rect
                    width={270}
                    height={480}
                    fill={'#ff0000'}
                  ></Rect>
                  <Text offsetX={-20} offsetY={-20} text={post} verticalAlign='middle' width={230}
                    fontSize={fontSize} fontFamily={font}
                    draggable={true} />
                </Layer>
              </Stage>
            </div>
          ))}
        </div>
        <Button className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          onClick={() => {
            [...stageRefs.current.values()].map((a, i) => downloadURI(a.toDataURL({ pixelRatio: 2 }), `text-${i}.png`))
          }}>
          Download
        </Button>
      </div>
    </>
  );
};

export default Canvas

const downloadURI = (uri: string, name: string) => {
  var link = document.createElement('a');
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

const BoldIcon = (props: any) => {
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
      <path d="M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8" />
    </svg>
  )
}


const CodeIcon = (props: any) => {
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
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  )
}


const HeadingIcon = (props: any) => {
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
      <path d="M6 12h12" />
      <path d="M6 20V4" />
      <path d="M18 20V4" />
    </svg>
  )
}


const ItalicIcon = (props: any) => {
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
      <line x1="19" x2="10" y1="4" y2="4" />
      <line x1="14" x2="5" y1="20" y2="20" />
      <line x1="15" x2="9" y1="4" y2="20" />
    </svg>
  )
}


const ListIcon = (props: any) => {
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
      <line x1="8" x2="21" y1="6" y2="6" />
      <line x1="8" x2="21" y1="12" y2="12" />
      <line x1="8" x2="21" y1="18" y2="18" />
      <line x1="3" x2="3.01" y1="6" y2="6" />
      <line x1="3" x2="3.01" y1="12" y2="12" />
      <line x1="3" x2="3.01" y1="18" y2="18" />
    </svg>
  )
}


function NotepadTextIcon(props) {
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
      <path d="M8 2v4" />
      <path d="M12 2v4" />
      <path d="M16 2v4" />
      <rect width="16" height="18" x="4" y="4" rx="2" />
      <path d="M8 10h6" />
      <path d="M8 14h8" />
      <path d="M8 18h5" />
    </svg>
  )
}


function StrikethroughIcon(props) {
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
      <path d="M16 4H9a3 3 0 0 0-2.83 4" />
      <path d="M14 12a4 4 0 0 1 0 8H6" />
      <line x1="4" x2="20" y1="12" y2="12" />
    </svg>
  )
}


function UnderlineIcon(props) {
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
      <path d="M6 4v6a6 6 0 0 0 12 0V4" />
      <line x1="4" x2="20" y1="20" y2="20" />
    </svg>
  )
}

