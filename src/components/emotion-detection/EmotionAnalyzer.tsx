
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Loader2, Brain } from 'lucide-react';
import { emotionPredictor } from '@/utils/emotionDetection';

interface EmotionScores {
  anger: number;
  disgust: number;
  fear: number;
  joy: number;
  sadness: number;
  dominant_emotion: string;
}

interface ExpandedEmotionScores {
  calm: number;
  happy: number;
  sad: number;
  angry: number;
  anxious: number;
  excited: number;
  surprised: number;
  disgusted: number;
  neutral: number;
  dominant_emotion: string;
  explanation: string;
}

interface EmotionAnalysisResult {
  original_emotions: EmotionScores;
  expanded_emotions: ExpandedEmotionScores;
}

interface EmotionAnalyzerProps {
  selectedText?: string;
}

const EmotionAnalyzer = ({ selectedText }: EmotionAnalyzerProps) => {
  const [text, setText] = useState('');
  const [emotions, setEmotions] = useState<EmotionAnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (selectedText) {
      setText(selectedText);
    }
  }, [selectedText]);

  const handleAnalyze = async () => {
    if (!text.trim()) {
      setError('Please enter some text to analyze');
      return;
    }

    setLoading(true);
    setError('');
    setEmotions(null);

    try {
      const result = await emotionPredictor(text);
      const parsedResult = JSON.parse(result);
      
      if (parsedResult.error) {
        setError(parsedResult.error);
      } else {
        setEmotions(parsedResult);
      }
    } catch (err) {
      setError('An error occurred during analysis');
    } finally {
      setLoading(false);
    }
  };

  const getEmotionColor = (emotion: string) => {
    const colors = {
      // Original emotions
      anger: 'bg-red-100 text-red-800 border-red-200',
      disgust: 'bg-green-100 text-green-800 border-green-200',
      fear: 'bg-purple-100 text-purple-800 border-purple-200',
      joy: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      sadness: 'bg-blue-100 text-blue-800 border-blue-200',
      // Expanded emotions
      calm: 'bg-teal-100 text-teal-800 border-teal-200',
      happy: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      sad: 'bg-blue-100 text-blue-800 border-blue-200',
      angry: 'bg-red-100 text-red-800 border-red-200',
      anxious: 'bg-orange-100 text-orange-800 border-orange-200',
      excited: 'bg-pink-100 text-pink-800 border-pink-200',
      surprised: 'bg-cyan-100 text-cyan-800 border-cyan-200',
      disgusted: 'bg-green-100 text-green-800 border-green-200',
      neutral: 'bg-gray-100 text-gray-800 border-gray-200',
    };
    return colors[emotion as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const formatScore = (score: number) => (score * 100).toFixed(1);

  return (
    <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Brain className="h-5 w-5 text-indigo-600" />
          <span>Emotion Analysis</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="Enter your text here to analyze emotions..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="min-h-[120px] resize-none"
        />
        
        <div className="flex space-x-3">
          <Button 
            onClick={handleAnalyze}
            disabled={loading || !text.trim()}
            className="bg-gradient-to-r from-indigo-600 to-purple-600"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              'Analyze Emotions'
            )}
          </Button>
          
          <Button 
            variant="outline" 
            onClick={() => {
              setText('');
              setEmotions(null);
              setError('');
            }}
            disabled={loading}
          >
            Clear
          </Button>
        </div>

        {error && (
          <Alert className="border-red-200 bg-red-50">
            <AlertDescription className="text-red-700">
              {error}
            </AlertDescription>
          </Alert>
        )}

        {emotions && (
          <div className="space-y-6">
            {/* Expanded Emotions - Main Display */}
            <div className="space-y-4">
              <div className="text-center p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Primary Emotion Detected</h3>
                <Badge className="text-lg px-4 py-2">
                  {emotions.expanded_emotions.dominant_emotion.charAt(0).toUpperCase() + 
                   emotions.expanded_emotions.dominant_emotion.slice(1)}
                </Badge>
              </div>

              {/* Explanation */}
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-2">Analysis Explanation:</h4>
                <p className="text-blue-700">{emotions.expanded_emotions.explanation}</p>
              </div>

              {/* Expanded Emotion Scores */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Detailed Emotion Analysis</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.entries(emotions.expanded_emotions).map(([emotion, score]) => {
                    if (emotion === 'dominant_emotion' || emotion === 'explanation') return null;
                    return (
                      <div key={emotion} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-gray-700 capitalize">
                            {emotion}
                          </span>
                          <Badge variant="outline" className={getEmotionColor(emotion)}>
                            {formatScore(score as number)}%
                          </Badge>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-500 ${
                              emotion === 'angry' || emotion === 'anger' ? 'bg-red-500' :
                              emotion === 'disgusted' || emotion === 'disgust' ? 'bg-green-500' :
                              emotion === 'anxious' || emotion === 'fear' ? 'bg-purple-500' :
                              emotion === 'happy' || emotion === 'joy' ? 'bg-yellow-500' :
                              emotion === 'sad' || emotion === 'sadness' ? 'bg-blue-500' :
                              emotion === 'excited' ? 'bg-pink-500' :
                              emotion === 'surprised' ? 'bg-cyan-500' :
                              emotion === 'calm' ? 'bg-teal-500' :
                              'bg-gray-500'
                            }`}
                            style={{ width: `${(score as number) * 100}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* JSON Output */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Raw Analysis Data (JSON)</h3>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
                {JSON.stringify(emotions, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EmotionAnalyzer;
