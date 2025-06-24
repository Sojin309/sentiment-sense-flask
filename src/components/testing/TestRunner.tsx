
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, XCircle, Play } from 'lucide-react';
import { runAllTests, displayTestResults, TestResult } from '@/utils/testUtils';

const TestRunner = () => {
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isRunningTests, setIsRunningTests] = useState(false);

  const handleRunTests = async () => {
    setIsRunningTests(true);
    try {
      const results = await runAllTests();
      setTestResults(results);
      displayTestResults(results);
    } catch (error) {
      console.error('Error running tests:', error);
    } finally {
      setIsRunningTests(false);
    }
  };

  const passedTests = testResults.filter(result => result.passed).length;
  const totalTests = testResults.length;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Unit Tests</span>
          <Button 
            onClick={handleRunTests} 
            disabled={isRunningTests}
            className="flex items-center space-x-2"
          >
            <Play className="h-4 w-4" />
            <span>{isRunningTests ? 'Running...' : 'Run Tests'}</span>
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {testResults.length > 0 && (
          <div className="space-y-4">
            <Alert className={passedTests === totalTests ? 'border-green-200 bg-green-50' : 'border-yellow-200 bg-yellow-50'}>
              <AlertDescription className={passedTests === totalTests ? 'text-green-700' : 'text-yellow-700'}>
                Test Results: {passedTests}/{totalTests} tests passed
                {passedTests === totalTests ? ' 🎉 All tests passed!' : ' ⚠️ Some tests failed'}
              </AlertDescription>
            </Alert>
            
            <div className="space-y-2">
              {testResults.map((result, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg bg-white">
                  <div className="flex items-center space-x-3">
                    {result.passed ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500" />
                    )}
                    <div>
                      <p className="font-medium">{result.testName}</p>
                      <p className="text-sm text-gray-600">Expected: {result.expected}</p>
                      <p className="text-sm text-gray-600">Actual: {result.actual}</p>
                    </div>
                  </div>
                  <Badge variant={result.passed ? "default" : "destructive"}>
                    {result.passed ? "PASSED" : "FAILED"}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {testResults.length === 0 && (
          <p className="text-center text-gray-500 py-8">Click "Run Tests" to execute unit tests</p>
        )}
      </CardContent>
    </Card>
  );
};

export default TestRunner;
