'use client';

import { DesignElement, TextElement, RectangleElement } from '@/types';

interface PropertiesPanelProps {
  element: DesignElement | null;
  onUpdate: (element: DesignElement) => void;
  onDelete: () => void;
}

export default function PropertiesPanel({
  element,
  onUpdate,
  onDelete,
}: PropertiesPanelProps) {
  if (!element) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        Selecciona un elemento para editar
      </div>
    );
  }

  const renderTextProperties = (textElement: TextElement) => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Contenido</label>
        <textarea
          value={textElement.content}
          onChange={(e) =>
            onUpdate({ ...textElement, content: e.target.value })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={3}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Tamaño de fuente</label>
        <input
          type="number"
          value={textElement.fontSize}
          onChange={(e) =>
            onUpdate({ ...textElement, fontSize: Number(e.target.value) })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Fuente</label>
        <select
          value={textElement.fontFamily}
          onChange={(e) =>
            onUpdate({ ...textElement, fontFamily: e.target.value })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="Arial">Arial</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Georgia">Georgia</option>
          <option value="Verdana">Verdana</option>
          <option value="Courier New">Courier New</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Peso de fuente</label>
        <select
          value={textElement.fontWeight}
          onChange={(e) =>
            onUpdate({ ...textElement, fontWeight: e.target.value })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="normal">Normal</option>
          <option value="bold">Bold</option>
          <option value="lighter">Lighter</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Color</label>
        <input
          type="color"
          value={textElement.color}
          onChange={(e) =>
            onUpdate({ ...textElement, color: e.target.value })
          }
          className="w-full h-10 border border-gray-300 rounded cursor-pointer"
        />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-sm font-medium mb-1">X</label>
          <input
            type="number"
            value={Math.round(textElement.x)}
            onChange={(e) =>
              onUpdate({ ...textElement, x: Number(e.target.value) })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Y</label>
          <input
            type="number"
            value={Math.round(textElement.y)}
            onChange={(e) =>
              onUpdate({ ...textElement, y: Number(e.target.value) })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );

  const renderRectangleProperties = (rectElement: RectangleElement) => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-sm font-medium mb-1">Ancho</label>
          <input
            type="number"
            value={rectElement.width}
            onChange={(e) =>
              onUpdate({ ...rectElement, width: Number(e.target.value) })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Alto</label>
          <input
            type="number"
            value={rectElement.height}
            onChange={(e) =>
              onUpdate({ ...rectElement, height: Number(e.target.value) })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Color de relleno</label>
        <input
          type="color"
          value={rectElement.fillColor}
          onChange={(e) =>
            onUpdate({ ...rectElement, fillColor: e.target.value })
          }
          className="w-full h-10 border border-gray-300 rounded cursor-pointer"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Color de borde</label>
        <input
          type="color"
          value={rectElement.strokeColor}
          onChange={(e) =>
            onUpdate({ ...rectElement, strokeColor: e.target.value })
          }
          className="w-full h-10 border border-gray-300 rounded cursor-pointer"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Ancho de borde</label>
        <input
          type="number"
          value={rectElement.strokeWidth}
          onChange={(e) =>
            onUpdate({ ...rectElement, strokeWidth: Number(e.target.value) })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-sm font-medium mb-1">X</label>
          <input
            type="number"
            value={Math.round(rectElement.x)}
            onChange={(e) =>
              onUpdate({ ...rectElement, x: Number(e.target.value) })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Y</label>
          <input
            type="number"
            value={Math.round(rectElement.y)}
            onChange={(e) =>
              onUpdate({ ...rectElement, y: Number(e.target.value) })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-gray-50 border-l border-gray-300">
      <div className="px-4 py-3 bg-gray-100 border-b border-gray-300">
        <h3 className="text-lg font-semibold text-gray-800">Propiedades</h3>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {element.type === 'text' && renderTextProperties(element)}
        {element.type === 'rectangle' && renderRectangleProperties(element)}
      </div>

      <div className="p-4 border-t border-gray-300">
        <button
          onClick={onDelete}
          className="w-full px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded font-medium transition-colors"
        >
          Eliminar elemento
        </button>
      </div>
    </div>
  );
}
