export interface BookSize {
  name: string;
  width: number;
  height: number;
}

export interface TextElement {
  id: string;
  type: 'text';
  content: string;
  x: number;
  y: number;
  fontSize: number;
  fontFamily: string;
  color: string;
  fontWeight: string;
}

export interface ImageElement {
  id: string;
  type: 'image';
  src: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface RectangleElement {
  id: string;
  type: 'rectangle';
  x: number;
  y: number;
  width: number;
  height: number;
  fillColor: string;
  strokeColor: string;
  strokeWidth: number;
}

export type DesignElement = TextElement | ImageElement | RectangleElement;

export interface CoverDesign {
  front: DesignElement[];
  back: DesignElement[];
  backgroundColor: string;
}

export interface OrilloTemplate {
  version: string;
  bookSize: BookSize;
  design: CoverDesign;
}
