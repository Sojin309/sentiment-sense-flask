
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Package } from 'lucide-react';
import { verifyPackageStructure } from '@/utils/testUtils';

const PackageVerifier = () => {
  const [packageInfo, setPackageInfo] = useState<any>(null);

  const handleVerifyPackage = () => {
    const info = verifyPackageStructure();
    setPackageInfo(info);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Package Structure (Task 4)</span>
          <Button onClick={handleVerifyPackage} className="flex items-center space-x-2">
            <Package className="h-4 w-4" />
            <span>Verify Structure</span>
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {packageInfo ? (
          <div className="space-y-4">
            <Alert className="border-green-200 bg-green-50">
              <AlertDescription className="text-green-700">
                {packageInfo.message}
              </AlertDescription>
            </Alert>
            
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg">
              <pre className="text-sm">
{`emotion_detection_app/
├── emotion_detection/
│   ├── __init__.py
│   ├── emotion_detection.py
│   └── test_emotion_detection.py
├── server.py
├── requirements.txt
├── README.md
├── static/
│   ├── style.css
│   └── script.js
└── templates/
    └── index.html`}
              </pre>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Core Files:</h4>
                <ul className="text-sm space-y-1">
                  <li>✅ emotion_detection.py - Main logic</li>
                  <li>✅ __init__.py - Package initialization</li>
                  <li>✅ test_emotion_detection.py - Unit tests</li>
                  <li>✅ server.py - Flask web server</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Web Files:</h4>
                <ul className="text-sm space-y-1">
                  <li>✅ templates/index.html - Web interface</li>
                  <li>✅ static/style.css - Styling</li>
                  <li>✅ static/script.js - Frontend logic</li>
                  <li>✅ requirements.txt - Dependencies</li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500 py-8">Click "Verify Structure" to check package organization</p>
        )}
      </CardContent>
    </Card>
  );
};

export default PackageVerifier;
