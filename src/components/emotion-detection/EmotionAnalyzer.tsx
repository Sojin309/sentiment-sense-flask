
import React, { useState } from 'react';
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

const EmotionAnalyzer = () => {
  const [text, setText] = useState('');
  const [emotions, setEmotions] = useState<EmotionScores | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
          <div className="space-y-4">
            <div className="text-center p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Dominant Emotion</h3>
              <Badge className="text-lg px-4 py-2">
                {emotions.dominant_emotion.charAt(0).toUpperCase() + emotions.dominant_emotion.slice(1)}
              </Badge>
            </div>

            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
              {JSON.stringify(emotions, null, 2)}
            </pre>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EmotionAnalyzer;
