import React, { useState } from 'react';
import { Stage, Layer, Rect, Text } from 'react-konva';
import Konva from 'konva';

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
const FONT_SIZE = 25

const DEFAULT_STATE = "First   story. \n Second story."

const Canvas = () => {
  const [postContent, setPostContent] = useState(DEFAULT_STATE);

  const texts = () => {
    return postContent.split('\n');
  }

  return (
    <>
      <label>
        <textarea className="border-solid border-2 border-sky-500" name="postContent" rows={12} cols={100}
          value={postContent}
          onChange={e => setPostContent(e.target.value)} // 
        />
      </label>
      <p>{texts().length}</p>
      <div className='container'>
        <div className="flex flex-wrap">
          {texts().map((post, i) => (
            <div className='mx-1 my-1 border-solid border-2 border-sky-500' key={i}>
              <Stage width={270} height={480}>
                <Layer>
                  <Rect
                  width={270}
                  height={480}
                  fill={'#ff0000'}
                  ></Rect>
                  <Text offsetX={-20} offsetY={-20} text={post} verticalAlign='middle' width={230} fontSize={FONT_SIZE}/>
                </Layer>
              </Stage>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Canvas
