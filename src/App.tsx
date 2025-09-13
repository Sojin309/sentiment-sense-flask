
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Brain } from 'lucide-react';
import EmotionDetection from '@/pages/EmotionDetection';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <nav className="p-4 bg-white/80 backdrop-blur-sm border-b border-gray-200">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Brain className="h-6 w-6 text-indigo-600" />
              <h1 className="text-xl font-bold text-gray-800">Emotion Detection Project</h1>
            </div>
            <div className="flex space-x-4">
              <Link to="/">
                <Button variant="ghost" className="flex items-center space-x-2">
                  <Brain className="h-4 w-4" />
                  <span>Emotion Detection</span>
                </Button>
              </Link>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<EmotionDetection />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
