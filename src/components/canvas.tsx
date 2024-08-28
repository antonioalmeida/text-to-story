import React, { useRef, useState } from 'react';
import { Stage, Layer, Rect, Text } from 'react-konva';
import Konva from 'konva';
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
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

const DEAFULT_FONT_SIZE = 24

const DEFAULT_STATE = "First story.\n\nA story can have multiple paragraphs.\n\n--\n\nThe second story starts here.\n\nYou can start a new story by adding the '-' character twice.\n\nAny block of text can be moved.\n\n--\n\nTry to drag me!\n\n--\n\nWhen you're done, click Download to download all the previews as images."

const Canvas = () => {
  const [postContent, setPostContent] = useState(DEFAULT_STATE);
  const [font, setFont] = useState('Arial');
  const [fontSize, setFontSize] = useState(DEAFULT_FONT_SIZE);
  // const [dimensions, setDimensions] = useState({ width: 270, height: 480 });
  const [dimensions, setDimensions] = useState({ width: 1080, height: 1920 });
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
          <LayoutPicker 
          onSelect={(dimensions) => setDimensions(dimensions)}
          />
        </div>
      </div>
      <div className='container'>
        <div className="flex gap-4 overflow-x-auto snap-x">
          {texts().map((post, i) => (
            <div key={i} className="aspect-[9/16] rounded-2xl overflow-hidden flex items-center justify-center shrink-0 snap-center">
              <Stage width={dimensions.width / 4} height={dimensions.height / 4}
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
            [...stageRefs.current.values()].map((a, i) => downloadURI(a.toDataURL({ pixelRatio: 4 }), `text-${i}.png`))
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
