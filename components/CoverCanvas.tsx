'use client';

import { DesignElement } from '@/types';
import { useState } from 'react';

interface CoverCanvasProps {
  title: string;
  elements: DesignElement[];
  backgroundColor: string;
  width: number;
  height: number;
  onElementSelect: (element: DesignElement | null) => void;
  onElementUpdate: (element: DesignElement) => void;
  onAddText: () => void;
  onAddRectangle: () => void;
  selectedElement: DesignElement | null;
}

export default function CoverCanvas({
  title,
  elements,
  backgroundColor,
  width,
  height,
  onElementSelect,
  onElementUpdate,
  onAddText,
  onAddRectangle,
  selectedElement,
}: CoverCanvasProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent, element: DesignElement) => {
    e.stopPropagation();
    onElementSelect(element);
    setIsDragging(true);
    const rect = e.currentTarget.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left - element.x,
      y: e.clientY - rect.top - element.y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && selectedElement) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left - dragOffset.x;
      const y = e.clientY - rect.top - dragOffset.y;
      onElementUpdate({ ...selectedElement, x, y });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const renderElement = (element: DesignElement) => {
    const isSelected = selectedElement?.id === element.id;
    const selectedStyle = isSelected ? 'ring-2 ring-blue-500' : '';

    switch (element.type) {
      case 'text':
        return (
          <div
            key={element.id}
            style={{
              position: 'absolute',
              left: `${element.x}px`,
              top: `${element.y}px`,
              fontSize: `${element.fontSize}px`,
              fontFamily: element.fontFamily,
              color: element.color,
              fontWeight: element.fontWeight,
              cursor: 'move',
            }}
            className={`${selectedStyle} px-1`}
            onMouseDown={(e) => handleMouseDown(e, element)}
          >
            {element.content}
          </div>
        );
      case 'rectangle':
        return (
          <div
            key={element.id}
            style={{
              position: 'absolute',
              left: `${element.x}px`,
              top: `${element.y}px`,
              width: `${element.width}px`,
              height: `${element.height}px`,
              backgroundColor: element.fillColor,
              border: `${element.strokeWidth}px solid ${element.strokeColor}`,
              cursor: 'move',
            }}
            className={selectedStyle}
            onMouseDown={(e) => handleMouseDown(e, element)}
          />
        );
      case 'image':
        return (
          <img
            key={element.id}
            src={element.src}
            alt="Design element"
            style={{
              position: 'absolute',
              left: `${element.x}px`,
              top: `${element.y}px`,
              width: `${element.width}px`,
              height: `${element.height}px`,
              cursor: 'move',
            }}
            className={selectedStyle}
            onMouseDown={(e) => handleMouseDown(e, element)}
          />
        );
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-100 border-b border-gray-300">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        <div className="flex gap-2">
          <button
            onClick={onAddText}
            className="px-3 py-1 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors"
          >
            + Texto
          </button>
          <button
            onClick={onAddRectangle}
            className="px-3 py-1 text-sm bg-green-500 hover:bg-green-600 text-white rounded transition-colors"
          >
            + Rectángulo
          </button>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-4 overflow-hidden">
        <div
          style={{
            position: 'relative',
            width: `${width}px`,
            height: `${height}px`,
            backgroundColor: backgroundColor,
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          }}
          className="border border-gray-300"
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onClick={() => onElementSelect(null)}
        >
          {elements.map(renderElement)}
        </div>
      </div>
    </div>
  );
}
