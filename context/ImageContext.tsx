import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface SketchSettings {
    complexity: number;
    lineWeight: number;
    shadowThreshold: number;
}

interface ImageContextType {
    originalImageURL: string | null;
    sketchImageURL: string | null;
    sketchSettings: SketchSettings;
    setOriginalImage: (url: string | null) => void;
    setSketchImage: (url: string | null) => void;
    updateSettings: (settings: Partial<SketchSettings>) => void;
    resetAll: () => void;
}

const defaultSettings: SketchSettings = {
    complexity: 50,
    lineWeight: 50,
    shadowThreshold: 50,
};

const ImageContext = createContext<ImageContextType | undefined>(undefined);

export const ImageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [originalImageURL, setOriginalImageURL] = useState<string | null>(null);
    const [sketchImageURL, setSketchImageURL] = useState<string | null>(null);
    const [sketchSettings, setSketchSettings] = useState<SketchSettings>(defaultSettings);

    const setOriginalImage = (url: string | null) => {
        setOriginalImageURL(url);
        setSketchImageURL(null); // Reset sketch when new image is uploaded
    };

    const setSketchImage = (url: string | null) => {
        setSketchImageURL(url);
    };

    const updateSettings = (settings: Partial<SketchSettings>) => {
        setSketchSettings(prev => ({ ...prev, ...settings }));
    };

    const resetAll = () => {
        setOriginalImageURL(null);
        setSketchImageURL(null);
        setSketchSettings(defaultSettings);
    };

    return (
        <ImageContext.Provider
            value={{
                originalImageURL,
                sketchImageURL,
                sketchSettings,
                setOriginalImage,
                setSketchImage,
                updateSettings,
                resetAll,
            }}
        >
            {children}
        </ImageContext.Provider>
    );
};

export const useImageContext = (): ImageContextType => {
    const context = useContext(ImageContext);
    if (context === undefined) {
        throw new Error('useImageContext must be used within an ImageProvider');
    }
    return context;
};
