
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageSquare, Bot, User } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const AIChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your AI health assistant. I can help you with questions about your health management, medications, symptoms, and general wellness tips. How can I assist you today?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('blood pressure') || lowerMessage.includes('hypertension')) {
      return "For blood pressure management, focus on reducing sodium intake, regular exercise, stress management, and taking medications as prescribed. Monitor your readings regularly and maintain a healthy weight.";
    } else if (lowerMessage.includes('diabetes') || lowerMessage.includes('blood sugar')) {
      return "Managing diabetes involves monitoring blood glucose levels, following a balanced diet with controlled carbohydrates, regular physical activity, and medication compliance. Consider keeping a food diary to track patterns.";
    } else if (lowerMessage.includes('heart') || lowerMessage.includes('cardiac')) {
      return "Heart health is supported by regular cardiovascular exercise, a heart-healthy diet rich in omega-3s, stress reduction, avoiding smoking, and following your cardiologist's recommendations.";
    } else if (lowerMessage.includes('weight') || lowerMessage.includes('obesity')) {
      return "Healthy weight management involves creating a sustainable caloric deficit through balanced nutrition and regular physical activity. Focus on whole foods, portion control, and building healthy habits gradually.";
    } else if (lowerMessage.includes('medication') || lowerMessage.includes('medicine')) {
      return "Always take medications as prescribed by your healthcare provider. Set reminders, don't skip doses, and discuss any side effects with your doctor. Never stop medications without medical guidance.";
    } else if (lowerMessage.includes('exercise') || lowerMessage.includes('workout')) {
      return "Start with activities you enjoy and gradually increase intensity. Aim for at least 150 minutes of moderate exercise weekly. Consult your doctor before starting new exercise programs, especially with chronic conditions.";
    } else {
      return "I understand you're looking for health guidance. For specific medical concerns, always consult with your healthcare provider. I can provide general wellness tips and help you understand health management basics. What specific area would you like to discuss?";
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    // Simulate AI processing time
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateAIResponse(input),
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setLoading(false);
    }, 1000);
  };

  return (
    <Card className="h-96 flex flex-col">
      <div className="p-4 border-b">
        <h3 className="text-lg font-semibold flex items-center">
          <Bot className="h-5 w-5 mr-2 text-primary-600" />
          AI Health Assistant
        </h3>
      </div>
      
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map(message => (
            <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.sender === 'user'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
              }`}>
                <div className="flex items-start space-x-2">
                  {message.sender === 'ai' ? (
                    <Bot className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  ) : (
                    <User className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  )}
                  <p className="text-sm">{message.text}</p>
                </div>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Bot className="h-4 w-4" />
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="p-4 border-t">
        <div className="flex space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about your health..."
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <Button onClick={handleSendMessage} disabled={loading}>
            <MessageSquare className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default AIChat;
