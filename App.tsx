import React, { useState } from 'react';
import { UploadScreen } from './screens/UploadScreen';
import { GenerateScreen } from './screens/GenerateScreen';
import { LearningScreen } from './screens/LearningScreen';
import { Screen } from './types';
import { ImageProvider } from './context/ImageContext';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('upload');

  const renderScreen = () => {
    switch (currentScreen) {
      case 'upload':
        return <UploadScreen onNavigate={() => setCurrentScreen('generate')} />;
      case 'generate':
        return (
          <GenerateScreen
            onNavigateNext={() => setCurrentScreen('learning')}
            onNavigateBack={() => setCurrentScreen('upload')}
          />
        );
      case 'learning':
        return <LearningScreen onNavigateBack={() => setCurrentScreen('generate')} />;
      default:
        return <UploadScreen onNavigate={() => setCurrentScreen('generate')} />;
    }
  };

  return (
    <ImageProvider>
      {renderScreen()}
    </ImageProvider>
  );
};

export default App;

