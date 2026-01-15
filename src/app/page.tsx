'use client';

import { useState } from 'react';
import { DrawingCanvas } from '@/components/ui/drawing-canvas';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ChevronUp, ChevronDown } from 'lucide-react';

export default function Home() {
  const [shape, setShape] = useState('Square');
  const [shapeColor, setShapeColor] = useState('Mixed');
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');
  const [numX, setNumX] = useState(6);
  const [numY, setNumY] = useState(4);
  const [gap, setGap] = useState(10);
  const [showControls, setShowControls] = useState(true);

  return (
    <div className="flex flex-col h-screen">
      <div className="absolute top-2 right-2 z-10">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setShowControls(!showControls)}
        >
          {showControls ? <ChevronUp /> : <ChevronDown />}
        </Button>
      </div>
      {showControls && (
        <div className="flex items-center justify-center p-4 border-b">
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col gap-2">
              <Label>Shape</Label>
              <Select value={shape} onValueChange={setShape}>
                <SelectTrigger>
                  <SelectValue placeholder="Shape" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Circle">Circle</SelectItem>
                  <SelectItem value="Diamond">Diamond</SelectItem>
                  <SelectItem value="Heart">Heart</SelectItem>
                  <SelectItem value="Triangle">Triangle</SelectItem>
                  <SelectItem value="Square">Square</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <Label>Shape Color</Label>
              <div className="flex gap-2">
                <Select
                  value={shapeColor === 'Mixed' ? 'Mixed' : 'Custom'}
                  onValueChange={(value) => {
                    if (value === 'Mixed') {
                      setShapeColor('Mixed');
                    } else {
                      setShapeColor('#000000');
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Shape Color" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Mixed">Mixed</SelectItem>
                    <SelectItem value="Custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
                {shapeColor !== 'Mixed' && (
                  <Input
                    type="color"
                    value={shapeColor}
                    onChange={(e) => setShapeColor(e.target.value)}
                  />
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="backgroundColor">Background Color</Label>
              <Input
                id="backgroundColor"
                type="color"
                value={backgroundColor}
                onChange={(e) => setBackgroundColor(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="numX">Shapes in X</Label>
              <Input
                id="numX"
                type="number"
                value={numX}
                onChange={(e) => setNumX(Number(e.target.value))}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="numY">Shapes in Y</Label>
              <Input
                id="numY"
                type="number"
                value={numY}
                onChange={(e) => setNumY(Number(e.target.value))}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="gap">Gap (px)</Label>
              <Input
                id="gap"
                type="number"
                value={gap}
                onChange={(e) => setGap(Number(e.target.value))}
              />
            </div>
          </div>
        </div>
      )}
      <div className="flex-grow">
        <DrawingCanvas
          shape={shape}
          shapeColor={shapeColor}
          backgroundColor={backgroundColor}
          numX={numX}
          numY={numY}
          gap={gap}
        />
      </div>
    </div>
  );
}
