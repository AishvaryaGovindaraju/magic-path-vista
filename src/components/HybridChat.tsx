import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, Mic, Paperclip, ChevronUp, ChevronDown } from 'lucide-react';
import { AgentAvatar } from './AgentAvatar';
import { ChatMessage, ChatMessageRenderer } from './ChatMessageRenderer';
import { AgentType } from './AgentAvatar';

interface Message {
  id: string;
  sender: 'user' | 'agent' | 'system';
  agentName?: string;
  content: string;
  timestamp: Date;
  type: 'text' | 'chart' | 'code' | 'file';
  fileName?: string;
  fileType?: string;
  previewLines?: string[];
  attachments?: string[];
}

interface HybridChatProps {
  isOpen: boolean;
  onToggle: () => void;
}

const AGENT_ROUTING: Array<{ keyword: string | RegExp, agent: "DataEngineer" | "DataAnalyst" | "DataScientist" | "Insight", systemMsg: string }> = [
  { keyword: /clean|remove|null|duplicate|column|encode/i, agent: "DataEngineer", systemMsg: "Routing to DataEngineer agent for preprocessing..." },
  { keyword: /analy(z|s)e|trend|distribution|correlation|eda/i, agent: "DataAnalyst", systemMsg: "Routing to DataAnalyst agent for EDA..." },
  { keyword: /model|predict|train|accuracy|auc|f1|roc|feature.*importance/i, agent: "DataScientist", systemMsg: "Routing to DataScientist agent for ML modeling..." },
  { keyword: /insight|business|summary|key factor|explain/i, agent: "Insight", systemMsg: "Routing to Insight agent for summary insights..." }
];

export const HybridChat: React.FC<{ isOpen: boolean; onToggle: () => void; }> = ({ isOpen, onToggle }) => {
  const [messages, setMessages] = React.useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = React.useState('');
  const [isTyping, setIsTyping] = React.useState(false);
  const [fileUrlMap, setFileUrlMap] = React.useState<{ [fileName: string]: string }>({});
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Agent Determination
  function determineAgentAndSystemMsg(text: string): { agent: AgentType, systemMsg: string } {
    for (const route of AGENT_ROUTING) {
      if ((typeof route.keyword === "string" && text.toLowerCase().includes(route.keyword.toLowerCase())) ||
        (route.keyword instanceof RegExp && route.keyword.test(text))) {
        return { agent: route.agent, systemMsg: route.systemMsg };
      }
    }
    return { agent: "DataAnalyst", systemMsg: "Routing to DataAnalyst by default." };
  }

  // --- File Upload Logic ---
  const handleFileUploadClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleFileInput = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    let previewLines: string[] = [];
    if (file.type === 'application/json' || file.name.endsWith('.json')) {
      const text = await file.text();
      previewLines = text.split('\n').slice(0, 5);
    } else if (
      file.type === 'text/csv' ||
      file.name.endsWith('.csv')
    ) {
      const text = await file.text();
      previewLines = text.split('\n').slice(0, 5);
    }
    // Simulate file upload URL
    const fakeUrl = URL.createObjectURL(file);
    setFileUrlMap(prev => ({ ...prev, [file.name]: fakeUrl }));

    // Add to chat
    setMessages(prev => [...prev, {
      id: Date.now().toString() + "-file",
      sender: "User",
      content: `Uploaded file: ${file.name}`,
      timestamp: new Date(),
      type: 'file',
      fileName: file.name,
      fileUrl: fakeUrl,
      previewLines
    },
    {
      id: (Date.now() + 2).toString(),
      sender: "System",
      content: "Dataset uploaded. Now enter your instruction (e.g., 'clean the dataset', 'analyze key factors').",
      timestamp: new Date(),
      type: "log"
    }
    ]);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // --- Message Sending Logic ---
  const handleSendMessage = () => {
    const text = inputValue.trim();
    if (!text) return;
    setMessages(prev => [...prev,
      {
        id: Date.now().toString() + "-user",
        sender: "User",
        content: text,
        timestamp: new Date(),
        type: "text"
      }
    ]);
    setInputValue('');
    const { agent, systemMsg } = determineAgentAndSystemMsg(text);

    // Log system routing
    setMessages(prev => [
      ...prev,
      {
        id: (Date.now() + 1).toString() + "-log",
        sender: "System",
        content: systemMsg,
        timestamp: new Date(),
        type: "log"
      }
    ]);

    setIsTyping(true);
    setTimeout(() => {
      // Simulated agent responses for demo
      let content = "";
      let nextMsg: Partial<ChatMessage> = { type: "text" };
      switch (agent) {
        case "DataEngineer":
          content = "✅ Cleaned dataset: Removed 17 null values, dropped 'ID' column, encoded categorical variable 'Gender'.";
          nextMsg = {
            type: "file",
            fileName: "cleaned_data.csv",
            fileUrl: "/placeholder.csv",
            previewLines: ["name,age,gender,survived", "Amy,29,Female,1", "Jon,40,Male,0", "..."]
          };
          break;
        case "DataAnalyst":
          content = "✨ EDA complete: Found strong correlation between 'Age' and 'Survival'. Chart attached below.";
          nextMsg = { type: "chart", content: "Feature correlation bar chart (simulated)" };
          break;
        case "DataScientist":
          content = "🤖 ML model trained. Achieved 82% accuracy (Logistic Regression). Download predictions below.";
          nextMsg = { type: "file", fileName: "predictions.csv", fileUrl: "/placeholder.csv", previewLines: ["id,prediction", "1,1", "2,0"] };
          break;
        case "Insight":
          content = "📊 Business Insights: 'Age' and 'Gender' are top predictors of survival. See summary below.";
          nextMsg = { type: "file", fileName: "summary.txt", fileUrl: "/placeholder.txt", previewLines: ["1. Younger age increases survival odds.", "2. Females more likely to survive."] };
          break;
        default:
          content = "I'm here to help. Please clarify your task!";
      }
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 2).toString() + "-agent",
          sender: agent,
          content,
          timestamp: new Date(),
          type: "text"
        },
        ...(nextMsg.fileName
          ? [{
            id: (Date.now() + 3).toString() + "-file",
            sender: agent,
            content: `Download: ${nextMsg.fileName}`,
            timestamp: new Date(),
            type: "file",
            fileName: nextMsg.fileName,
            fileUrl: nextMsg.fileUrl || "/placeholder.dat",
            previewLines: nextMsg.previewLines
          }]
          : nextMsg.type === "chart"
            ? [{
              id: (Date.now() + 4).toString() + "-chart",
              sender: agent,
              content: "Chart here (simulate chart PNG or embed).",
              timestamp: new Date(),
              type: "chart"
            }]
            : []
        )
      ]);
      setIsTyping(false);
    }, 2000);
  };

  // --- UI ---
  return (
    <div className={`fixed bottom-0 left-0 right-0 bg-[#1A1A1D]/95 backdrop-blur-xl border-t border-[#950740]/20 transition-all duration-300 ${isOpen ? "h-96" : "h-16"} z-20`}>
      {/* Header */}
      <div className="h-16 flex items-center justify-between px-6 cursor-pointer hover:bg-[#4E4E50]/20 transition-colors" onClick={onToggle}>
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-[#C3073F] to-[#950740] rounded-full flex items-center justify-center">
            <span className="font-bold text-white">D</span>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">DataDone Chat</h3>
            <p className="text-xs text-[#CCCCCC]">{isTyping ? "Agent is typing..." : "Upload dataset & chat with your data squad"}</p>
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
        </div>
      </div>
      {/* Chat Thread */}
      {isOpen && (
        <div className="flex flex-col h-80">
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {messages.length === 0 && (
              <div className="text-center text-gray-400 text-sm mt-10">
                <p>Drop your dataset, say what you want, and let the Squad do the rest.<br />
                  No coding. No waiting. No guesswork.<br />
                  Just raw numbers turning into real answers — fast, clean, and smart.</p>
              </div>
            )}
            {messages.map((msg) => (
              <ChatMessageRenderer key={msg.id} message={msg} />
            ))}
            <div ref={messagesEndRef} />
          </div>
          {/* Input Area */}
          <div className="border-t border-[#950740]/20 p-4">
            <div className="flex items-center space-x-3">
              <button className="p-2 hover:bg-[#4E4E50]/30 rounded-lg transition-colors flex items-center"
                onClick={handleFileUploadClick}
                title="Upload dataset (CSV, XLSX, JSON)"
                type="button"
              >
                <span className="sr-only">Upload</span>
                <svg width="20" height="20" fill="none" stroke="#CCCCCC" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 16V4m0 0L8 8m4-4l4 4m-6 12h8a2 2 0 0 0 2-2v-5m-10 7H6a2 2 0 0 1-2-2v-5"></path></svg>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv,.json"
                  className="hidden"
                  onChange={handleFileInput}
                />
              </button>
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your data instruction..."
                  className="w-full bg-[#4E4E50]/30 border border-[#950740]/20 rounded-xl px-4 py-2 text-white placeholder-[#CCCCCC] focus:border-[#C3073F] focus:outline-none"
                  disabled={isTyping}
                />
              </div>
              <button
                onClick={handleSendMessage}
                className="p-2 bg-gradient-to-r from-[#C3073F] to-[#950740] hover:from-[#9F2232] hover:to-[#C3073F] rounded-lg transition-all duration-200"
                disabled={isTyping}
                title="Send"
              >
                <svg width="20" height="20" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 2L11 13"></path><path d="M22 2l-7.09 20a.55.55 0 0 1-1.07-.03l-2.02-7.07-7.07-2.02a.55.55 0 0 1-.03-1.07L22 2z"></path></svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
