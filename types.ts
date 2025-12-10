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

export interface Step {
  id: string;
  title: string;
  description: string;
  detailedInstructions: string;
  tips: string[];
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface UserNote {
  stepId: string;
  content: string;
  timestamp: Date;
}
