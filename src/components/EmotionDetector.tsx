
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Loader2, Brain, MessageSquare } from 'lucide-react';

interface EmotionScores {
  anger: number;
  disgust: number;
  fear: number;
  joy: number;
  sadness: number;
  dominant_emotion: string;
}

const EmotionDetector = () => {
  const [text, setText] = useState('');
  const [emotions, setEmotions] = useState<EmotionScores | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Mock emotion detection function (simulating Watson NLP)
  const detectEmotions = async (inputText: string): Promise<EmotionScores> => {
    if (!inputText.trim()) {
      throw new Error('Invalid text! Please try again!');
    }

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Mock emotion analysis with realistic values
    const emotions = {
      anger: Math.random() * 0.3,
      disgust: Math.random() * 0.2,
      fear: Math.random() * 0.4,
      joy: Math.random() * 0.8,
      sadness: Math.random() * 0.3,
    };

    // Find dominant emotion
    const dominantEmotion = Object.entries(emotions).reduce((max, [emotion, score]) => 
      score > max.score ? { emotion, score } : max, 
      { emotion: 'joy', score: 0 }
    ).emotion;

    return {
      ...emotions,
      dominant_emotion: dominantEmotion
    };
  };

  const handleAnalyze = async () => {
    if (!text.trim()) {
      setError('Please enter some text to analyze');
      return;
    }

    setLoading(true);
    setError('');
    setEmotions(null);

    try {
      const result = await detectEmotions(text);
      setEmotions(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during analysis');
    } finally {
      setLoading(false);
    }
  };

  const getEmotionColor = (emotion: string) => {
    const colors = {
      anger: 'bg-red-100 text-red-800 border-red-200',
      disgust: 'bg-green-100 text-green-800 border-green-200',
      fear: 'bg-purple-100 text-purple-800 border-purple-200',
      joy: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      sadness: 'bg-blue-100 text-blue-800 border-blue-200',
    };
    return colors[emotion as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const formatScore = (score: number) => (score * 100).toFixed(1);

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

        {/* Input Section */}
        <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MessageSquare className="h-5 w-5 text-indigo-600" />
              <span>Text Analysis</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Enter your text here to analyze emotions... (e.g., 'I am so happy today!' or 'This situation makes me really angry.')"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="min-h-[120px] resize-none border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            
            <div className="flex space-x-3">
              <Button 
                onClick={handleAnalyze}
                disabled={loading || !text.trim()}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6"
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
                className="border-gray-300 hover:bg-gray-50"
              >
                Clear
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Error Display */}
        {error && (
          <Alert className="border-red-200 bg-red-50">
            <AlertDescription className="text-red-700">
              {error}
            </AlertDescription>
          </Alert>
        )}

        {/* Results Section */}
        {emotions && (
          <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl text-gray-800">Emotion Analysis Results</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Dominant Emotion */}
              <div className="text-center p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border border-indigo-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Dominant Emotion</h3>
                <Badge 
                  className={`text-lg px-4 py-2 ${getEmotionColor(emotions.dominant_emotion)} border`}
                >
                  {emotions.dominant_emotion.charAt(0).toUpperCase() + emotions.dominant_emotion.slice(1)}
                </Badge>
              </div>

              {/* All Emotions */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Detailed Emotion Scores</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.entries(emotions).map(([emotion, score]) => {
                    if (emotion === 'dominant_emotion') return null;
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
                              emotion === 'anger' ? 'bg-red-500' :
                              emotion === 'disgust' ? 'bg-green-500' :
                              emotion === 'fear' ? 'bg-purple-500' :
                              emotion === 'joy' ? 'bg-yellow-500' :
                              'bg-blue-500'
                            }`}
                            style={{ width: `${(score as number) * 100}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* JSON Output */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Raw Output (JSON Format)</h3>
                <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
                  {JSON.stringify(emotions, null, 2)}
                </pre>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Sample Texts */}
        <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg text-gray-800">Try These Sample Texts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                "I am so happy today! Everything is going perfectly.",
                "I'm really frustrated with this situation. It makes me angry.",
                "I'm scared about the upcoming presentation tomorrow.",
                "This food tastes absolutely disgusting.",
                "I feel so sad and lonely right now."
              ].map((sample, index) => (
                <Button
                  key={index}
                  variant="outline"
                  onClick={() => setText(sample)}
                  className="text-left h-auto p-3 justify-start hover:bg-indigo-50 border-gray-200"
                  disabled={loading}
                >
                  "{sample}"
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

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

export default EmotionDetector;
