
import React from "react";
import { AgentAvatar, AgentType } from "./AgentAvatar";
import { Paperclip } from 'lucide-react';

export interface ChatMessage {
  id: string;
  sender: AgentType;
  content: string;
  timestamp: Date;
  type: "text" | "file" | "chart" | "log";
  fileName?: string;
  fileUrl?: string;
  previewLines?: string[];
}

export function ChatMessageRenderer({ message }: { message: ChatMessage }) {
  return (
    <div className={`flex ${message.sender === "User" ? "justify-end" : "justify-start"}`}>
      <div className={message.sender !== "User" ? "flex items-start space-x-2" : "flex items-end flex-row-reverse space-x-2 space-x-reverse"}>
        <AgentAvatar agent={message.sender} />
        <div className="max-w-md">
          <div className="flex items-center space-x-1 mb-0.5">
            <span className="text-xs text-gray-400 font-semibold">{message.sender}</span>
            <span className="text-[10px] text-gray-500">{message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
          {message.type === "file" ? (
            <div className="rounded-2xl px-4 py-2 bg-[#232328]/80 border border-[#950740]/40 text-white">
              <div className="mb-1 flex items-center space-x-2">
                <Paperclip className="w-4 h-4 inline mr-1 text-[#CCCCCC]" />
                <span className="font-medium">{message.fileName}</span>
                {message.fileUrl && (
                  <a className="text-xs text-[#C3073F] underline ml-2" href={message.fileUrl} download>
                    Download
                  </a>
                )}
              </div>
              {message.previewLines && message.previewLines.length > 0 && (
                <pre className="bg-[#1A1A1D]/80 mt-2 rounded p-2 text-xs text-white/80 overflow-x-auto">{message.previewLines.join('\n')}</pre>
              )}
            </div>
          ) : message.type === "log" ? (
            <div className="rounded-lg px-3 py-1 bg-[#323236]/80 text-xs text-[#FFC300] italic border border-[#FFC300]/30">
              {message.content}
            </div>
          ) : (
            <div className={`rounded-2xl px-4 py-2 ${message.sender === "User"
              ? "bg-gradient-to-r from-[#C3073F] to-[#950740] text-white"
              : "bg-[#34343a]/80 text-white border border-[#950740]/30"}`}>
              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
