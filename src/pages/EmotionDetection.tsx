
import React, { useState } from 'react';
import { Brain, MessageSquare } from 'lucide-react';
import EmotionAnalyzer from '@/components/emotion-detection/EmotionAnalyzer';
import SampleTexts from '@/components/emotion-detection/SampleTexts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
        <EmotionAnalyzer />

        {/* Sample Texts */}
        <SampleTexts onSelectText={handleTextSelection} />

        {/* Features List */}
        <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg text-gray-800">Application Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-indigo-600">✅ Implemented Features:</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Emotion detection algorithm</li>
                  <li>• Formatted output display</li>
                  <li>• Error handling for invalid inputs</li>
                  <li>• Responsive web interface</li>
                  <li>• Real-time emotion scoring</li>
                  <li>• JSON output format</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-purple-600">🔧 Technical Stack:</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• React with TypeScript</li>
                  <li>• Tailwind CSS styling</li>
                  <li>• Component-based architecture</li>
                  <li>• Mock NLP processing</li>
                  <li>• Responsive design</li>
                  <li>• Modern UI components</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmotionDetection;
