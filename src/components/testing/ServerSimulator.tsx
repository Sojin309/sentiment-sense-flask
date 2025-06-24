
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Server } from 'lucide-react';
import { simulateFlaskServer } from '@/utils/testUtils';

const ServerSimulator = () => {
  const [serverStatus, setServerStatus] = useState<any>(null);

  const handleSimulateServer = () => {
    const status = simulateFlaskServer();
    setServerStatus(status);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Flask Server Deployment</span>
          <Button onClick={handleSimulateServer} className="flex items-center space-x-2">
            <Server className="h-4 w-4" />
            <span>Simulate Server</span>
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {serverStatus ? (
          <div className="space-y-4">
            <Alert className="border-green-200 bg-green-50">
              <AlertDescription className="text-green-700">
                ✅ Flask server is running on port {serverStatus.port}
              </AlertDescription>
            </Alert>
            
            <div>
              <h4 className="font-semibold mb-2">Available Endpoints:</h4>
              <div className="space-y-2">
                {serverStatus.endpoints.map((endpoint: any, index: number) => (
                  <div key={index} className="border rounded-lg p-3 bg-white">
                    <div className="flex items-center space-x-2 mb-1">
                      <Badge variant="outline">{endpoint.method}</Badge>
                      <code className="text-sm bg-gray-100 px-2 py-1 rounded">{endpoint.path}</code>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{endpoint.description}</p>
                    <details className="text-xs">
                      <summary className="cursor-pointer text-blue-600">View example</summary>
                      <pre className="mt-2 bg-gray-50 p-2 rounded">
                        {JSON.stringify(endpoint.example, null, 2)}
                      </pre>
                    </details>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Error Handling:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {Object.entries(serverStatus.errorHandling).map(([code, description]) => (
                  <div key={code} className="flex items-center space-x-2 text-sm">
                    <Badge variant="destructive">{code}</Badge>
                    <span>{description as string}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500 py-8">Click "Simulate Server" to view deployment details</p>
        )}
      </CardContent>
    </Card>
  );
};

export default ServerSimulator;
