
import React, { useState } from "react";
import { HybridChat } from "../components/HybridChat";

const Chat = () => {
  // The chat open/close state, start with open (true)
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white relative">
      {/* Add any future chat-page-specific header here */}
      <HybridChat isOpen={isOpen} onToggle={() => setIsOpen((o) => !o)} />
    </div>
  );
};

export default Chat;
