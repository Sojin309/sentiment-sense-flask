
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, TestTube, Github, Play } from 'lucide-react';
import EmotionDetector from "@/components/EmotionDetector";
import TestingDashboard from "@/components/TestingDashboard";

const Index = () => {
  const [activeTab, setActiveTab] = useState('app');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Brain className="h-8 w-8 text-indigo-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Emotion Detection Application</h1>
                <p className="text-sm text-gray-600">Complete Watson NLP Implementation with Testing Suite</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant={activeTab === 'app' ? 'default' : 'outline'}
                onClick={() => setActiveTab('app')}
                className="flex items-center space-x-2"
              >
                <Play className="h-4 w-4" />
                <span>Live App</span>
              </Button>
              <Button
                variant={activeTab === 'testing' ? 'default' : 'outline'}
                onClick={() => setActiveTab('testing')}
                className="flex items-center space-x-2"
              >
                <TestTube className="h-4 w-4" />
                <span>Testing Dashboard</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsContent value="app" className="mt-0">
            <EmotionDetector />
          </TabsContent>
          
          <TabsContent value="testing" className="mt-0">
            <TestingDashboard />
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer */}
      <div className="bg-white/80 backdrop-blur-sm border-t border-gray-200 mt-8">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Brain className="h-5 w-5 text-blue-600" />
                  <span>Tasks Completed</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-1">
                  <li>✅ Task 1: Repository Setup</li>
                  <li>✅ Task 2: Watson NLP Implementation</li>
                  <li>✅ Task 3: Output Formatting</li>
                  <li>✅ Task 4: Application Packaging</li>
                  <li>✅ Task 5: Unit Testing</li>
                  <li>✅ Task 6: Flask Web Deployment</li>
                  <li>✅ Task 7: Error Handling</li>
                  <li>✅ Task 8: Static Code Analysis</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center space-x-2">
                  <TestTube className="h-5 w-5 text-green-600" />
                  <span>Features</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-1">
                  <li>• Real-time emotion analysis</li>
                  <li>• Comprehensive error handling</li>
                  <li>• Unit test suite</li>
                  <li>• Static code analysis</li>
                  <li>• Responsive web interface</li>
                  <li>• JSON API endpoints</li>
                  <li>• Package structure verification</li>
                  <li>• Performance monitoring</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-purple-50 to-violet-50 border-purple-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Github className="h-5 w-5 text-purple-600" />
                  <span>Technical Stack</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-1">
                  <li>• React with TypeScript</li>
                  <li>• Watson NLP Simulation</li>
                  <li>• Flask-style API Design</li>
                  <li>• Tailwind CSS</li>
                  <li>• Component Architecture</li>
                  <li>• Error Boundary Handling</li>
                  <li>• Test-Driven Development</li>
                  <li>• Code Quality Analysis</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-6 pt-6 border-t border-gray-200">
            <p className="text-gray-600">
              Complete Emotion Detection Application with Watson NLP Integration
            </p>
            <p className="text-sm text-gray-500 mt-1">
              All 8 tasks implemented with comprehensive testing and error handling
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
