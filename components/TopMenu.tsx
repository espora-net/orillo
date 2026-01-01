'use client';

import { BookSize, OrilloTemplate } from '@/types';

interface TopMenuProps {
  bookSize: BookSize;
  availableSizes: BookSize[];
  onSizeChange: (size: BookSize) => void;
  onImport: (template: OrilloTemplate) => void;
  onExportJSON: () => void;
  onExportPNG: () => void;
}

export default function TopMenu({
  bookSize,
  availableSizes,
  onSizeChange,
  onImport,
  onExportJSON,
  onExportPNG,
}: TopMenuProps) {
  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.orillo';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const template = JSON.parse(event.target?.result as string) as OrilloTemplate;
            onImport(template);
          } catch (error) {
            alert('Error al importar el archivo: ' + error);
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  return (
    <div className="flex items-center justify-between px-6 py-3 bg-gray-800 text-white shadow-md">
      <h1 className="text-xl font-bold">Orillo - Diseñador de Portadas</h1>
      
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <label htmlFor="book-size" className="text-sm font-medium">
            Tamaño:
          </label>
          <select
            id="book-size"
            value={bookSize.name}
            onChange={(e) => {
              const size = availableSizes.find(s => s.name === e.target.value);
              if (size) onSizeChange(size);
            }}
            className="px-3 py-1 bg-gray-700 rounded border border-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {availableSizes.map((size) => (
              <option key={size.name} value={size.name}>
                {size.name}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleImport}
          className="px-4 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm font-medium transition-colors"
        >
          Importar .orillo
        </button>

        <button
          onClick={onExportJSON}
          className="px-4 py-1 bg-green-600 hover:bg-green-700 rounded text-sm font-medium transition-colors"
        >
          Exportar JSON
        </button>

        <button
          onClick={onExportPNG}
          className="px-4 py-1 bg-purple-600 hover:bg-purple-700 rounded text-sm font-medium transition-colors"
        >
          Exportar PNG
        </button>
      </div>
    </div>
  );
}
