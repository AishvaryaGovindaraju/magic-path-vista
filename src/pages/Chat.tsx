
import React, { useState } from "react";
import { HybridChat } from "../components/HybridChat";
// Removed the Button and ArrowLeft import
import { useNavigate } from "react-router-dom";

const Chat = () => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen bg-[#0A0A0A] text-white flex flex-col">
      {/* Removed Back to Home Button */}
      {/* Chat UI fills page */}
      <HybridChat isOpen={isOpen} onToggle={() => setIsOpen((o) => !o)} />
    </div>
  );
};

export default Chat;

