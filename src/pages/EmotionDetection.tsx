
import React, { useState } from 'react';
import { Brain } from 'lucide-react';
import EmotionAnalyzer from '@/components/emotion-detection/EmotionAnalyzer';
import SampleTexts from '@/components/emotion-detection/SampleTexts';

const EmotionDetection = () => {
  const [selectedText, setSelectedText] = useState('');

  const handleTextSelection = (text: string) => {
    setSelectedText(text);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <Brain className="h-8 w-8 text-indigo-600" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Emotion Detection App
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Analyze the emotional content of your text using advanced NLP technology. 
            Enter any text below and discover the underlying emotions.
          </p>
        </div>

        {/* Main Analyzer */}
        <EmotionAnalyzer selectedText={selectedText} />

        {/* Sample Texts */}
        <SampleTexts onSelectText={handleTextSelection} />
      </div>
    </div>
  );
};

export default EmotionDetection;
