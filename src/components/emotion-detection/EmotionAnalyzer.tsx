
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
  // Core emotions
  calm: number;
  happy: number;
  sad: number;
  angry: number;
  anxious: number;
  excited: number;
  surprised: number;
  disgusted: number;
  neutral: number;
  
  // Extended psychological emotions
  confident: number;
  frustrated: number;
  hopeful: number;
  disappointed: number;
  grateful: number;
  envious: number;
  proud: number;
  ashamed: number;
  curious: number;
  bored: number;
  content: number;
  irritated: number;
  enthusiastic: number;
  melancholic: number;
  optimistic: number;
  pessimistic: number;
  relieved: number;
  stressed: number;
  compassionate: number;
  hostile: number;
  lonely: number;
  overwhelmed: number;
  peaceful: number;
  passionate: number;
  determined: number;
  uncertain: number;
  
  // Physical & Basic Human Emotions
  hungry: number;
  thirsty: number;
  tired: number;
  sleepy: number;
  energetic: number;
  sick: number;
  pain: number;
  comfortable: number;
  restless: number;
  satisfied: number;
  craving: number;
  
  // Social & Relationship Emotions  
  loved: number;
  rejected: number;
  betrayed: number;
  trusting: number;
  suspicious: number;
  included: number;
  excluded: number;
  supported: number;
  
  // Achievement & Motivation Emotions
  motivated: number;
  lazy: number;
  productive: number;
  procrastinating: number;
  accomplished: number;
  defeated: number;
  focused: number;
  distracted: number;
  
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
      
      // Core expanded emotions
      calm: 'bg-teal-100 text-teal-800 border-teal-200',
      happy: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      sad: 'bg-blue-100 text-blue-800 border-blue-200',
      angry: 'bg-red-100 text-red-800 border-red-200',
      anxious: 'bg-orange-100 text-orange-800 border-orange-200',
      excited: 'bg-pink-100 text-pink-800 border-pink-200',
      surprised: 'bg-cyan-100 text-cyan-800 border-cyan-200',
      disgusted: 'bg-green-100 text-green-800 border-green-200',
      neutral: 'bg-gray-100 text-gray-800 border-gray-200',
      
      // Extended psychological emotions
      confident: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      frustrated: 'bg-red-100 text-red-800 border-red-200',
      hopeful: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      disappointed: 'bg-slate-100 text-slate-800 border-slate-200',
      grateful: 'bg-amber-100 text-amber-800 border-amber-200',
      envious: 'bg-lime-100 text-lime-800 border-lime-200',
      proud: 'bg-violet-100 text-violet-800 border-violet-200',
      ashamed: 'bg-rose-100 text-rose-800 border-rose-200',
      curious: 'bg-sky-100 text-sky-800 border-sky-200',
      bored: 'bg-neutral-100 text-neutral-800 border-neutral-200',
      content: 'bg-green-100 text-green-800 border-green-200',
      irritated: 'bg-red-100 text-red-800 border-red-200',
      enthusiastic: 'bg-fuchsia-100 text-fuchsia-800 border-fuchsia-200',
      melancholic: 'bg-blue-100 text-blue-800 border-blue-200',
      optimistic: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      pessimistic: 'bg-gray-100 text-gray-800 border-gray-200',
      relieved: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      stressed: 'bg-orange-100 text-orange-800 border-orange-200',
      compassionate: 'bg-pink-100 text-pink-800 border-pink-200',
      hostile: 'bg-red-100 text-red-800 border-red-200',
      lonely: 'bg-blue-100 text-blue-800 border-blue-200',
      overwhelmed: 'bg-purple-100 text-purple-800 border-purple-200',
      peaceful: 'bg-teal-100 text-teal-800 border-teal-200',
      passionate: 'bg-rose-100 text-rose-800 border-rose-200',
      determined: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      uncertain: 'bg-gray-100 text-gray-800 border-gray-200',
      
      // Physical & Basic Human Emotions
      hungry: 'bg-orange-100 text-orange-800 border-orange-200',
      thirsty: 'bg-blue-100 text-blue-800 border-blue-200',
      tired: 'bg-purple-100 text-purple-800 border-purple-200',
      sleepy: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      energetic: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      sick: 'bg-gray-100 text-gray-800 border-gray-200',
      pain: 'bg-red-100 text-red-800 border-red-200',
      comfortable: 'bg-green-100 text-green-800 border-green-200',
      restless: 'bg-orange-100 text-orange-800 border-orange-200',
      satisfied: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      craving: 'bg-pink-100 text-pink-800 border-pink-200',
      
      // Social & Relationship Emotions
      loved: 'bg-pink-100 text-pink-800 border-pink-200',
      rejected: 'bg-red-100 text-red-800 border-red-200',
      betrayed: 'bg-red-100 text-red-800 border-red-200',
      trusting: 'bg-green-100 text-green-800 border-green-200',
      suspicious: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      included: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      excluded: 'bg-gray-100 text-gray-800 border-gray-200',
      supported: 'bg-teal-100 text-teal-800 border-teal-200',
      
      // Achievement & Motivation Emotions
      motivated: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      lazy: 'bg-gray-100 text-gray-800 border-gray-200',
      productive: 'bg-green-100 text-green-800 border-green-200',
      procrastinating: 'bg-orange-100 text-orange-800 border-orange-200',
      accomplished: 'bg-violet-100 text-violet-800 border-violet-200',
      defeated: 'bg-slate-100 text-slate-800 border-slate-200',
      focused: 'bg-blue-100 text-blue-800 border-blue-200',
      distracted: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    };
    return colors[emotion as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
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
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Detailed Emotion Analysis ({Object.keys(emotions.expanded_emotions).length - 2} emotions detected)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-3">
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
                              // Negative emotions
                              emotion === 'angry' || emotion === 'anger' || emotion === 'frustrated' || emotion === 'irritated' || emotion === 'hostile' || emotion === 'rejected' || emotion === 'betrayed' ? 'bg-red-500' :
                              emotion === 'disgusted' || emotion === 'disgust' || emotion === 'sick' ? 'bg-green-500' :
                              emotion === 'anxious' || emotion === 'fear' || emotion === 'stressed' || emotion === 'overwhelmed' || emotion === 'restless' ? 'bg-purple-500' :
                              emotion === 'sad' || emotion === 'sadness' || emotion === 'melancholic' || emotion === 'lonely' || emotion === 'disappointed' || emotion === 'defeated' ? 'bg-blue-500' :
                              emotion === 'pain' || emotion === 'ashamed' || emotion === 'envious' ? 'bg-rose-500' :
                              
                              // Positive emotions  
                              emotion === 'happy' || emotion === 'joy' || emotion === 'excited' || emotion === 'enthusiastic' || emotion === 'optimistic' || emotion === 'energetic' ? 'bg-yellow-500' :
                              emotion === 'surprised' || emotion === 'curious' ? 'bg-cyan-500' :
                              emotion === 'calm' || emotion === 'peaceful' || emotion === 'content' || emotion === 'comfortable' ? 'bg-teal-500' :
                              emotion === 'confident' || emotion === 'proud' || emotion === 'determined' || emotion === 'focused' || emotion === 'motivated' ? 'bg-indigo-500' :
                              emotion === 'hopeful' || emotion === 'grateful' || emotion === 'relieved' || emotion === 'satisfied' || emotion === 'loved' || emotion === 'included' || emotion === 'supported' || emotion === 'trusting' ? 'bg-emerald-500' :
                              emotion === 'passionate' || emotion === 'compassionate' || emotion === 'craving' ? 'bg-pink-500' :
                              emotion === 'accomplished' || emotion === 'productive' ? 'bg-violet-500' :
                              
                              // Physical/Basic needs
                              emotion === 'hungry' || emotion === 'thirsty' ? 'bg-orange-500' :
                              emotion === 'tired' || emotion === 'sleepy' ? 'bg-purple-400' :
                              
                              // Neutral/unclear emotions
                              emotion === 'bored' || emotion === 'neutral' || emotion === 'uncertain' || emotion === 'pessimistic' || emotion === 'lazy' || emotion === 'procrastinating' || emotion === 'distracted' || emotion === 'suspicious' || emotion === 'excluded' ? 'bg-gray-500' :
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
