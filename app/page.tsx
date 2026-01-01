'use client';

import { useState, useRef } from 'react';
import TopMenu from '@/components/TopMenu';
import CoverCanvas from '@/components/CoverCanvas';
import PropertiesPanel from '@/components/PropertiesPanel';
import { BookSize, OrilloTemplate, DesignElement, CoverDesign } from '@/types';
import html2canvas from 'html2canvas';

const AVAILABLE_SIZES: BookSize[] = [
  { name: 'A4', width: 210, height: 297 },
  { name: 'A5', width: 148, height: 210 },
  { name: 'Carta', width: 216, height: 279 },
  { name: 'Cuadrado pequeño', width: 200, height: 200 },
  { name: 'Cuadrado grande', width: 300, height: 300 },
];

export default function Home() {
  const [bookSize, setBookSize] = useState<BookSize>(AVAILABLE_SIZES[0]);
  const [design, setDesign] = useState<CoverDesign>({
    front: [],
    back: [],
    backgroundColor: '#ffffff',
  });
  const [selectedSide, setSelectedSide] = useState<'front' | 'back'>('front');
  const [selectedElement, setSelectedElement] = useState<DesignElement | null>(null);
  
  const frontCanvasRef = useRef<HTMLDivElement>(null);
  const backCanvasRef = useRef<HTMLDivElement>(null);

  const handleSizeChange = (size: BookSize) => {
    setBookSize(size);
  };

  const handleImport = (template: OrilloTemplate) => {
    setBookSize(template.bookSize);
    setDesign(template.design);
    setSelectedElement(null);
  };

  const handleExportJSON = () => {
    const template: OrilloTemplate = {
      version: '1.0',
      bookSize,
      design,
    };
    const json = JSON.stringify(template, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'template.orillo';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportPNG = async () => {
    const elements = [frontCanvasRef.current, backCanvasRef.current];
    
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      if (element) {
        const canvas = await html2canvas(element, {
          backgroundColor: design.backgroundColor,
          scale: 2,
        });
        
        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `book-cover-${i === 0 ? 'front' : 'back'}.png`;
            a.click();
            URL.revokeObjectURL(url);
          }
        });
        
        // Small delay between downloads
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }
  };

  const addElement = (side: 'front' | 'back', element: DesignElement) => {
    setDesign((prev) => ({
      ...prev,
      [side]: [...prev[side], element],
    }));
    setSelectedElement(element);
    setSelectedSide(side);
  };

  const updateElement = (side: 'front' | 'back', element: DesignElement) => {
    setDesign((prev) => ({
      ...prev,
      [side]: prev[side].map((e) => (e.id === element.id ? element : e)),
    }));
    setSelectedElement(element);
  };

  const deleteElement = (side: 'front' | 'back', elementId: string) => {
    setDesign((prev) => ({
      ...prev,
      [side]: prev[side].filter((e) => e.id !== elementId),
    }));
    setSelectedElement(null);
  };

  const handleAddText = (side: 'front' | 'back') => {
    const newText: DesignElement = {
      id: `text-${Date.now()}`,
      type: 'text',
      content: 'Texto nuevo',
      x: 50,
      y: 50,
      fontSize: 24,
      fontFamily: 'Arial',
      color: '#000000',
      fontWeight: 'normal',
    };
    addElement(side, newText);
  };

  const handleAddRectangle = (side: 'front' | 'back') => {
    const newRect: DesignElement = {
      id: `rect-${Date.now()}`,
      type: 'rectangle',
      x: 50,
      y: 50,
      width: 100,
      height: 100,
      fillColor: '#cccccc',
      strokeColor: '#000000',
      strokeWidth: 2,
    };
    addElement(side, newRect);
  };

  const handleElementSelect = (side: 'front' | 'back', element: DesignElement | null) => {
    setSelectedElement(element);
    setSelectedSide(side);
  };

  const handleElementUpdate = (element: DesignElement) => {
    updateElement(selectedSide, element);
  };

  const handleElementDelete = () => {
    if (selectedElement) {
      deleteElement(selectedSide, selectedElement.id);
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <TopMenu
        bookSize={bookSize}
        availableSizes={AVAILABLE_SIZES}
        onSizeChange={handleSizeChange}
        onImport={handleImport}
        onExportJSON={handleExportJSON}
        onExportPNG={handleExportPNG}
      />

      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 grid grid-cols-2 gap-4 p-4 overflow-hidden">
          <div ref={frontCanvasRef}>
            <CoverCanvas
              title="Portada"
              elements={design.front}
              backgroundColor={design.backgroundColor}
              width={bookSize.width}
              height={bookSize.height}
              onElementSelect={(el) => handleElementSelect('front', el)}
              onElementUpdate={handleElementUpdate}
              onAddText={() => handleAddText('front')}
              onAddRectangle={() => handleAddRectangle('front')}
              selectedElement={selectedSide === 'front' ? selectedElement : null}
            />
          </div>

          <div ref={backCanvasRef}>
            <CoverCanvas
              title="Contraportada"
              elements={design.back}
              backgroundColor={design.backgroundColor}
              width={bookSize.width}
              height={bookSize.height}
              onElementSelect={(el) => handleElementSelect('back', el)}
              onElementUpdate={handleElementUpdate}
              onAddText={() => handleAddText('back')}
              onAddRectangle={() => handleAddRectangle('back')}
              selectedElement={selectedSide === 'back' ? selectedElement : null}
            />
          </div>
        </div>

        <div className="w-80 overflow-y-auto">
          <PropertiesPanel
            element={selectedElement}
            onUpdate={handleElementUpdate}
            onDelete={handleElementDelete}
          />
        </div>
      </div>
    </div>
  );
}
