import React, { useRef, useState } from 'react';
import { Stage, Layer, Rect, Text, Image } from 'react-konva';
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { FontPicker } from './FontPicker';
import FontSizePicker from './FontSizePicker';
import LayoutPicker from './LayoutPicker';
import useImage from 'use-image';
import BackgroundPicker from './BackgroundPicker';

const DEAFULT_FONT_SIZE = 24
const DEFAULT_STATE = "First story.\n\nA story can have multiple paragraphs.\n\n--\n\nThe second story starts here.\n\nYou can start a new story by adding the '-' character twice.\n\nAny block of text can be moved.\n\n--\n\nTry to drag me!\n\n--\n\nWhen you're done, click Download to download all the previews as images."

const LionImage = (props: { url: string, width: number, height: number }) => {
  const [image] = useImage(props.url);
  return <Image image={image} width={props.width} height={props.height} />;
};

const Canvas = () => {
  const [postContent, setPostContent] = useState(DEFAULT_STATE);
  const [font, setFont] = useState('Arial');
  const [fontSize, setFontSize] = useState(DEAFULT_FONT_SIZE);
  const [dimensions, setDimensions] = useState({ width: 1080, height: 1920 });
  const [backgroundUrl, setBackgroundUrl] = useState('');
  const stageRefs = useRef(new Map());

  const texts = () => {
    return postContent.split('--').map((t) => t.trim())
  }

  return (
    <div className="flex flex-row space-x-4">
      <div className="w-1/3 h-svh">
        <Textarea
          placeholder="Enter your text here..."
          className="flex-1 rounded-md border border-input bg-background text-foreground h-full focus:ring-1 focus:ring-primary focus:border-primary"
          name="postContent"
          value={postContent}
          onChange={e => setPostContent(e.target.value)}
        />
      </div>
      <div className="w-2/3 flex flex-col space-y-2">
        <div className="flex items-center space-x-2">
          <FontPicker
            value={font}
            onSelect={(v) => setFont(v)}
          />
          <FontSizePicker
            fontSize={fontSize}
            onUpdate={(n: number) => setFontSize(n)}
            onIncrease={() => setFontSize(fontSize + 1)}
            onDecrease={() => setFontSize(fontSize - 1)}
          />
          <LayoutPicker
            onSelect={(dimensions) => setDimensions(dimensions)}
          />
          <BackgroundPicker onSelected={(url: string) => setBackgroundUrl(url)} />
        </div>
        <div>
          <div className="flex gap-4 mt-4 overflow-x-auto snap-x">
            {texts().map((post, i) => (
              <div key={i} className="aspect-[9/16] rounded-2xl overflow-hidden flex items-center justify-center shrink-0 snap-center">
                <Stage width={dimensions.width / 4} height={dimensions.height / 4}
                  ref={element => { stageRefs.current.set(i, element) }}
                >
                  <Layer>
                    <Rect
                      width={dimensions.width / 4}
                      height={dimensions.height / 4}
                      fill={'#77cbb9'}
                    ></Rect>
                    <LionImage
                      url={backgroundUrl}
                      width={dimensions.width / 4}
                      height={dimensions.height / 4}
                    />
                    <Text offsetX={-20} offsetY={-20} text={post}
                      verticalAlign='middle'
                      width={(dimensions.width / 4) - 40}
                      fontSize={fontSize} fontFamily={font}
                      draggable={true} />
                  </Layer>
                </Stage>
              </div>
            ))}
          </div>
          <Button className="mt-5 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            onClick={() => {
              [...stageRefs.current.values()].map((a, i) => downloadImage(a.toDataURL({ pixelRatio: 4 }), `text-${i}.png`))
            }}>
            Download
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Canvas

const downloadImage = (uri: string, name: string) => {
  const link = document.createElement('a');
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
