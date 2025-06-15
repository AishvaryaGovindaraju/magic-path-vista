import React from 'react';
import { MessageSquare, Send, Mic, Paperclip, ChevronUp, ChevronDown, ArrowLeft, Home } from 'lucide-react';
import { AgentAvatar } from './AgentAvatar';
import { ChatMessage, ChatMessageRenderer } from './ChatMessageRenderer';
import { AgentType } from './AgentAvatar';
import { useNavigate } from 'react-router-dom';

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

const AGENT_ONE_LINERS: Record<string, { catchphrases: string[]; color: string }> = {
  "DataEngineer": {
    catchphrases: [
      "Drop the data, I’ll handle the chaos.",
      "Messy file? Bet. I eat formats for breakfast.",
      "I don’t care if it’s CSV, XLSX or a smoke signal — I’ll decode it."
    ],
    color: "from-purple-500 to-purple-700"
  },
  "DataAnalyst": {
    catchphrases: [
      "Let’s make sense of this mess, real quick.",
      "Numbers talk. I just translate.",
      "Vibes check: are these stats even saying anything?"
    ],
    color: "from-blue-500 to-blue-700"
  },
  "DataScientist": {
    catchphrases: [
      "Hyperparams? Tuned. Accuracy? Boosted. Let’s go.",
      "I don’t guess. I grid search.",
      "I don’t just train models. I glow them up."
    ],
    color: "from-green-500 to-green-700"
  },
  "Insight": {
    catchphrases: [
      "Here’s what the data’s really saying.",
      "Truth bomb incoming — your dataset just spilled everything.",
      "Insights so clean, they could headline a TED talk."
    ],
    color: "from-yellow-400 to-yellow-600"
  },
  "DataIngestion": {
    catchphrases: [
      "Drop the data, I’ll handle the chaos.",
      "Messy file? Bet. I eat formats for breakfast.",
      "I don’t care if it’s CSV, XLSX or a smoke signal — I’ll decode it."
    ],
    color: "from-pink-500 to-pink-700"
  },
  "RealTimeProcessing": {
    catchphrases: [
      "While you blinked, I already ran that.",
      "Live data? Chill. I multitask better than your playlist.",
      "Streaming? I don’t pause. I play in real time."
    ],
    color: "from-cyan-500 to-cyan-700"
  },
  "AgentCommunication": {
    catchphrases: [
      "They talk. I sync. No drama.",
      "I’m the group chat that actually works.",
      "Every squad needs someone who keeps the tea moving."
    ],
    color: "from-orange-500 to-orange-700"
  }
};

export const HybridChat: React.FC<{ isOpen: boolean; onToggle: () => void; }> = ({ isOpen, onToggle }) => {
  const navigate = useNavigate();
  const [messages, setMessages] = React.useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = React.useState('');
  const [isTyping, setIsTyping] = React.useState(false);
  const [fileUrlMap, setFileUrlMap] = React.useState<{ [fileName: string]: string }>({});
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [currentOneLiner, setCurrentOneLiner] = React.useState<string | null>(null);
  const oneLinerTimeout = React.useRef<NodeJS.Timeout | null>(null);

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

    // Flash DataIngestion agent one-liner when file uploaded
    const pick = Math.floor(Math.random() * AGENT_ONE_LINERS["DataIngestion"].catchphrases.length);
    setCurrentOneLiner(AGENT_ONE_LINERS["DataIngestion"].catchphrases[pick]);
    if (oneLinerTimeout.current) clearTimeout(oneLinerTimeout.current);
    oneLinerTimeout.current = setTimeout(() => setCurrentOneLiner(null), 2500);
  };

  // --- Message Sending Logic ---
  const handleSendMessage = () => {
    const text = inputValue.trim();
    if (!text) return;
    setMessages(prev => [
      ...prev,
      {
        id: Date.now().toString() + "-user",
        sender: "User",
        content: text,
        timestamp: new Date(),
        type: "text" as const
      }
    ]);
    setInputValue('');
    const { agent, systemMsg } = determineAgentAndSystemMsg(text);

    // Flash one-liner for routed agent (unless DataIngestion)
    if (agent in AGENT_ONE_LINERS) {
      const liners = AGENT_ONE_LINERS[agent].catchphrases;
      const pick = Math.floor(Math.random() * liners.length);
      setCurrentOneLiner(liners[pick]);
      if (oneLinerTimeout.current) clearTimeout(oneLinerTimeout.current);
      oneLinerTimeout.current = setTimeout(() => setCurrentOneLiner(null), 2500);
    }

    // Log system routing
    setMessages(prev => [
      ...prev,
      {
        id: (Date.now() + 1).toString() + "-log",
        sender: "System",
        content: systemMsg,
        timestamp: new Date(),
        type: "log" as const
      }
    ]);

    setIsTyping(true);
    setTimeout(() => {
      // Simulated agent responses for demo
      let content = "";
      let nextMsg: Partial<ChatMessage> = { type: "text" as const };
      switch (agent) {
        case "DataEngineer":
          content = "✅ Cleaned dataset: Removed 17 null values, dropped 'ID' column, encoded categorical variable 'Gender'.";
          nextMsg = {
            type: "file" as const,
            fileName: "cleaned_data.csv",
            fileUrl: "/placeholder.csv",
            previewLines: ["name,age,gender,survived", "Amy,29,Female,1", "Jon,40,Male,0", "..."]
          };
          break;
        case "DataAnalyst":
          content = "✨ EDA complete: Found strong correlation between 'Age' and 'Survival'. Chart attached below.";
          nextMsg = { type: "chart" as const, content: "Feature correlation bar chart (simulated)" };
          break;
        case "DataScientist":
          content = "🤖 ML model trained. Achieved 82% accuracy (Logistic Regression). Download predictions below.";
          nextMsg = { type: "file" as const, fileName: "predictions.csv", fileUrl: "/placeholder.csv", previewLines: ["id,prediction", "1,1", "2,0"] };
          break;
        case "Insight":
          content = "📊 Business Insights: 'Age' and 'Gender' are top predictors of survival. See summary below.";
          nextMsg = { type: "file" as const, fileName: "summary.txt", fileUrl: "/placeholder.txt", previewLines: ["1. Younger age increases survival odds.", "2. Females more likely to survive."] };
          break;
        default:
          content = "I'm here to help. Please clarify your task!";
      }

      // We need to make sure all fields for ChatMessage are present, especially when pushing file/chart/log
      const agentMessage: ChatMessage = {
        id: (Date.now() + 2).toString() + "-agent",
        sender: agent,
        content,
        timestamp: new Date(),
        type: "text"
      };

      const additionalMessages: ChatMessage[] = [];
      if (nextMsg.type === "file") {
        additionalMessages.push({
          id: (Date.now() + 3).toString() + "-file",
          sender: agent,
          content: `Download: ${nextMsg.fileName}`,
          timestamp: new Date(),
          type: "file",
          fileName: nextMsg.fileName!,
          fileUrl: nextMsg.fileUrl ?? "/placeholder.dat",
          previewLines: nextMsg.previewLines
        });
      } else if (nextMsg.type === "chart") {
        additionalMessages.push({
          id: (Date.now() + 4).toString() + "-chart",
          sender: agent,
          content: "Chart here (simulate chart PNG or embed).",
          timestamp: new Date(),
          type: "chart"
        });
      }

      setMessages(prev => [
        ...prev,
        agentMessage,
        ...additionalMessages
      ]);
      setIsTyping(false);
    }, 2000);
  };

  // --- UI ---
  return (
    <div
      className={`
        flex flex-col w-full min-h-screen bg-[#1A1A1D]/95 backdrop-blur-xl border-t border-[#950740]/20 z-20 cursor-default
        transition-all duration-300
        ${isOpen ? "opacity-100" : "opacity-80"}
      `}
    >
      {/* Header */}
      <div className="h-16 flex items-center justify-between px-6 cursor-pointer hover:bg-[#4E4E50]/20 transition-colors" onClick={onToggle}>
        <div className="flex items-center space-x-3 relative" style={{ minWidth: 0 }}>
          {/* Vertical navigation icons above avatar/title */}
          <div className="absolute left-1/2 -translate-x-1/2 -top-8 flex flex-col items-center space-y-2 z-10">
            <button
              className="bg-[#232328] hover:bg-[#950740]/20 rounded-full p-1 transition"
              title="Back to Home"
              type="button"
              onClick={e => {
                e.stopPropagation();
                navigate("/");
              }}
            >
              <svg width={20} height={20} stroke="white" fill="none" strokeWidth={2} viewBox="0 0 24 24">
                <path d="M19 12H5"></path>
                <path d="M12 19l-7-7 7-7"></path>
              </svg>
            </button>
            <button
              className="bg-[#232328] hover:bg-[#950740]/20 rounded-full p-1 transition"
              title="Home"
              type="button"
              onClick={e => {
                e.stopPropagation();
                navigate("/");
              }}
            >
              <svg width={20} height={20} stroke="white" fill="none" strokeWidth={2} viewBox="0 0 24 24">
                <path d="M3 12l9-9 9 9"></path>
                <path d="M9 21V9h6v12"></path>
              </svg>
            </button>
          </div>
          {/* DataDone Chat "D" avatar */}
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
        <div className="flex flex-col flex-1 min-h-0">
          {/* One-liner agent catchphrase banner */}
          {currentOneLiner && (
            <div className="flex justify-center pb-2 animate-fade-in-up">
              <div className="bg-gradient-to-r from-[#FFC300] to-[#FF5733] text-[#232328] font-bold rounded-xl px-6 py-2 shadow-lg border border-[#FFC300]/60 text-center max-w-md text-base animate-pulse">{currentOneLiner}</div>
            </div>
          )}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 min-h-0">
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
