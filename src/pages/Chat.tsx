
import React, { useState } from "react";
import { HybridChat } from "../components/HybridChat";
import { Button } from "../components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Chat = () => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen bg-[#0A0A0A] text-white flex flex-col">
      {/* Back to Home Button */}
      <div className="pt-6 pl-6 flex">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => navigate("/")}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> Home
        </Button>
      </div>
      {/* Chat UI fills page */}
      <HybridChat isOpen={isOpen} onToggle={() => setIsOpen((o) => !o)} />
    </div>
  );
};

export default Chat;

