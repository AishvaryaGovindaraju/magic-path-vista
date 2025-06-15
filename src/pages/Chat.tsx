
import React, { useState } from "react";
import { HybridChat } from "../components/HybridChat";

const Chat = () => {
  // The chat open/close state, start with open (true)
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="w-full min-h-screen bg-[#0A0A0A] text-white flex flex-col">
      {/* Chat UI now fills page */}
      <HybridChat isOpen={isOpen} onToggle={() => setIsOpen((o) => !o)} />
    </div>
  );
};

export default Chat;
