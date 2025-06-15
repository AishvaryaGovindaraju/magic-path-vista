
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, Mic, Paperclip, ChevronUp, ChevronDown } from 'lucide-react';

interface Message {
  id: string;
  sender: 'user' | 'agent';
  agentName?: string;
  content: string;
  timestamp: Date;
  type: 'text' | 'chart' | 'code';
  attachments?: string[];
}

interface HybridChatProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const HybridChat: React.FC<HybridChatProps> = ({ isOpen, onToggle }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'agent',
      agentName: 'Data Cleaning',
      content: 'Data cleaning process completed successfully. Found and resolved 847 anomalies in the dataset.',
      timestamp: new Date(Date.now() - 300000),
      type: 'text'
    },
    {
      id: '2',
      sender: 'user',
      content: 'Can you show me the outlier detection results?',
      timestamp: new Date(Date.now() - 240000),
      type: 'text'
    },
    {
      id: '3',
      sender: 'agent',
      agentName: 'Communication Hub',
      content: 'Here are the outlier detection results. The model identified 23 significant outliers across 5 features.',
      timestamp: new Date(Date.now() - 180000),
      type: 'chart'
    }
  ]);

  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      content: inputValue,
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate agent response
    setTimeout(() => {
      const agentResponse: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'agent',
        agentName: 'Communication Hub',
        content: `I understand you're asking about "${inputValue}". Let me analyze the current pipeline status and provide you with relevant insights.`,
        timestamp: new Date(),
        type: 'text'
      };
      setMessages(prev => [...prev, agentResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getAgentAvatar = (agentName: string) => {
    const colors = {
      'Data Cleaning': 'from-purple-500 to-purple-600',
      'Communication Hub': 'from-[#C3073F] to-[#950740]',
      'Model Training': 'from-blue-500 to-blue-600',
      'Data Ingestion': 'from-green-500 to-green-600'
    };
    return colors[agentName as keyof typeof colors] || 'from-gray-500 to-gray-600';
  };

  return (
    <div className={`fixed bottom-0 left-0 right-0 bg-[#1A1A1D]/95 backdrop-blur-xl border-t border-[#950740]/20 transition-all duration-300 ${
      isOpen ? 'h-96' : 'h-16'
    } z-20`}>
      
      {/* Header */}
      <div 
        className="h-16 flex items-center justify-between px-6 cursor-pointer hover:bg-[#4E4E50]/20 transition-colors"
        onClick={onToggle}
      >
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-[#C3073F] to-[#950740] rounded-full flex items-center justify-center">
            <MessageSquare className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">Hybrid Chat Interface</h3>
            <p className="text-xs text-[#CCCCCC]">
              {isTyping ? 'Agent is typing...' : 'Chat with your agents'}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {isTyping && (
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-[#C3073F] rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-[#C3073F] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
              <div className="w-2 h-2 bg-[#C3073F] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
            </div>
          )}
          {isOpen ? (
            <ChevronDown className="w-5 h-5 text-[#CCCCCC]" />
          ) : (
            <ChevronUp className="w-5 h-5 text-[#CCCCCC]" />
          )}
        </div>
      </div>

      {/* Chat Messages */}
      {isOpen && (
        <div className="flex flex-col h-80">
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {messages.map(message => (
              <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs lg:max-w-md ${
                  message.sender === 'user' ? 'order-2' : 'order-1'
                }`}>
                  {message.sender === 'agent' && (
                    <div className="flex items-center space-x-2 mb-1">
                      <div className={`w-6 h-6 bg-gradient-to-br ${getAgentAvatar(message.agentName || '')} rounded-full`} />
                      <span className="text-xs text-[#CCCCCC]">{message.agentName}</span>
                      <span className="text-xs text-[#4E4E50]">{formatTime(message.timestamp)}</span>
                    </div>
                  )}
                  
                  <div className={`rounded-2xl px-4 py-2 ${
                    message.sender === 'user' 
                      ? 'bg-gradient-to-r from-[#C3073F] to-[#950740] text-white' 
                      : 'bg-[#4E4E50]/30 text-white border border-[#950740]/20'
                  }`}>
                    {message.type === 'chart' ? (
                      <div>
                        <p className="text-sm mb-2">{message.content}</p>
                        <div className="bg-[#1A1A1D]/50 rounded-lg p-3">
                          <div className="text-xs text-[#CCCCCC] mb-2">📊 Outlier Detection Results</div>
                          <div className="h-20 bg-gradient-to-r from-[#950740]/20 to-[#C3073F]/20 rounded flex items-end justify-around p-2">
                            {[65, 45, 80, 30, 55].map((height, i) => (
                              <div key={i} className="bg-[#C3073F] rounded-t" style={{ height: `${height}%`, width: '12px' }} />
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm">{message.content}</p>
                    )}
                  </div>
                  
                  {message.sender === 'user' && (
                    <div className="flex justify-end mt-1">
                      <span className="text-xs text-[#4E4E50]">{formatTime(message.timestamp)}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-[#950740]/20 p-4">
            <div className="flex items-center space-x-3">
              <button className="p-2 hover:bg-[#4E4E50]/30 rounded-lg transition-colors">
                <Paperclip className="w-5 h-5 text-[#CCCCCC]" />
              </button>
              
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask your agents anything..."
                  className="w-full bg-[#4E4E50]/30 border border-[#950740]/20 rounded-xl px-4 py-2 text-white placeholder-[#CCCCCC] focus:border-[#C3073F] focus:outline-none"
                />
              </div>
              
              <button className="p-2 hover:bg-[#4E4E50]/30 rounded-lg transition-colors">
                <Mic className="w-5 h-5 text-[#CCCCCC]" />
              </button>
              
              <button 
                onClick={handleSendMessage}
                className="p-2 bg-gradient-to-r from-[#C3073F] to-[#950740] hover:from-[#9F2232] hover:to-[#C3073F] rounded-lg transition-all duration-200"
              >
                <Send className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
