
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface SampleTextsProps {
  onSelectText: (text: string) => void;
  disabled?: boolean;
}

const SampleTexts = ({ onSelectText, disabled = false }: SampleTextsProps) => {
  const sampleTexts = [
    "I am so happy today! Everything is going perfectly.",
    "I'm really frustrated with this situation. It makes me angry.",
    "I'm scared about the upcoming presentation tomorrow.",
    "This food tastes absolutely disgusting.",
    "I feel so sad and lonely right now."
  ];

  return (
    <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-lg text-gray-800">Try These Sample Texts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {sampleTexts.map((sample, index) => (
            <Button
              key={index}
              variant="outline"
              onClick={() => onSelectText(sample)}
              className="text-left h-auto p-3 justify-start hover:bg-indigo-50"
              disabled={disabled}
            >
              "{sample}"
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SampleTexts;
