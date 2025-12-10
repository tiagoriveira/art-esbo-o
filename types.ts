export type Screen = 'upload' | 'generate' | 'learning';

export interface ImageExample {
  id: string;
  url: string;
  alt: string;
  category?: string;
}

export interface SketchSettings {
  complexity: number;
  lineWeight: number;
  shadowThreshold: number;
}
