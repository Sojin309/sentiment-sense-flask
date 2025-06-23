
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TestTube, Package, Server, Code } from 'lucide-react';
import TestRunner from '@/components/testing/TestRunner';
import PackageVerifier from '@/components/testing/PackageVerifier';
import ServerSimulator from '@/components/testing/ServerSimulator';
import CodeAnalyzer from '@/components/testing/CodeAnalyzer';

const Testing = () => {
  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-800">Testing Dashboard</h1>
        <p className="text-gray-600">Comprehensive testing and analysis tools for the emotion detection application</p>
      </div>

      <Tabs defaultValue="tests" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="tests" className="flex items-center space-x-2">
            <TestTube className="h-4 w-4" />
            <span>Unit Tests</span>
          </TabsTrigger>
          <TabsTrigger value="package" className="flex items-center space-x-2">
            <Package className="h-4 w-4" />
            <span>Package</span>
          </TabsTrigger>
          <TabsTrigger value="server" className="flex items-center space-x-2">
            <Server className="h-4 w-4" />
            <span>Server</span>
          </TabsTrigger>
          <TabsTrigger value="analysis" className="flex items-center space-x-2">
            <Code className="h-4 w-4" />
            <span>Code Analysis</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tests">
          <TestRunner />
        </TabsContent>

        <TabsContent value="package">
          <PackageVerifier />
        </TabsContent>

        <TabsContent value="server">
          <ServerSimulator />
        </TabsContent>

        <TabsContent value="analysis">
          <CodeAnalyzer />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Testing;
