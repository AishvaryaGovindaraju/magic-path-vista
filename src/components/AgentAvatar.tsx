
import React from "react";

export type AgentType = "DataEngineer" | "DataAnalyst" | "DataScientist" | "Insight" | "User" | "System";

const agentStyles: Record<AgentType, { color: string; label: string }> = {
  DataEngineer: { color: "from-purple-500 to-purple-700", label: "Data Engineer" },
  DataAnalyst: { color: "from-blue-500 to-blue-700", label: "Data Analyst" },
  DataScientist: { color: "from-green-500 to-green-700", label: "Data Scientist" },
  Insight: { color: "from-yellow-400 to-yellow-600", label: "Insight Agent" },
  User: { color: "from-[#950740] to-[#C3073F]", label: "You" },
  System: { color: "from-gray-500 to-gray-700", label: "System" }
};

export function AgentAvatar({ agent }: { agent: AgentType }) {
  const style = agentStyles[agent];
  return (
    <div className={`w-7 h-7 bg-gradient-to-br ${style.color} rounded-full flex items-center justify-center`}>
      <span className="sr-only">{style.label}</span>
      <span className="text-xs font-semibold text-white">{style.label[0]}</span>
    </div>
  );
}
