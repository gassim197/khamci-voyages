import { useState, useRef, useEffect } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { MessageCircle, X, Send, Bot, User, Loader2, Phone, ExternalLink } from "lucide-react";

const QUICK_SUGGESTIONS = [
  "💰 Combien coûte un vol pour Paris ?",
  "🛂 Documents pour le visa Schengen ?",
  "✈️ Quelles destinations proposez-vous ?",
  "📞 Comment vous contacter ?",
  "🏨 Réservation d'hôtel, comment ça marche ?",
  "⏱️ Quel est le délai de réponse ?",
];

const WELCOME_MESSAGE = `Bonjour ! 👋 Je suis **Khamci Bot**, votre assistant de voyage.

Je peux vous aider avec :
• 🌍 Nos destinations et tarifs
• 🛂 Les formalités visa
• ✈️ Vols, hôtels, location de voitures
• 📋 Nos services team building

Comment puis-je vous aider aujourd'hui ?`;

function formatMessage(text: string) {
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/\n/g, "<br/>");
}

// Extract text content from UIMessage parts
function getMessageText(message: { parts?: Array<{ type: string; text?: string }> }): string {
  if (!message.parts) return "";
  return message.parts
    .filter((p) => p.type === "text")
    .map((p) => p.text ?? "")
    .join("");
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat/khamci",
      credentials: "include",
    }),
    onFinish: () => {
      if (!isOpen) setHasNewMessage(true);
    },
  });

  const isLoading = status === "submitted" || status === "streaming";

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setHasNewMessage(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Show notification bubble after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) setHasNewMessage(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;
    setShowWelcome(false);
    setInputValue("");
    await sendMessage({ text });
  };

  const handleSuggestion = (suggestion: string) => {
    handleSend(suggestion);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSend(inputValue);
  };

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <div
          className="fixed bottom-24 right-4 z-50 w-[350px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200"
          style={{ height: "500px", maxHeight: "calc(100vh - 120px)" }}
        >
          {/* Header */}
          <div className="bg-[#0D1B3E] px-4 py-3 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#FF6B35] flex items-center justify-center">
                <Bot size={18} className="text-white" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">Khamci Bot</p>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <p className="text-green-300 text-xs">En ligne</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/70 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {/* Welcome message */}
            <div className="flex gap-2 items-start">
              <div className="w-7 h-7 rounded-full bg-[#FF6B35] flex items-center justify-center shrink-0 mt-0.5">
                <Bot size={14} className="text-white" />
              </div>
              <div className="bg-white rounded-2xl rounded-tl-sm px-3 py-2 shadow-sm max-w-[85%]">
                <p
                  className="text-sm text-gray-800 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: formatMessage(WELCOME_MESSAGE) }}
                />
              </div>
            </div>

            {/* Quick suggestions */}
            {showWelcome && messages.length === 0 && (
              <div className="space-y-1.5 pl-9">
                {QUICK_SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => handleSuggestion(s)}
                    className="block w-full text-left text-xs text-[#0D1B3E] bg-white border border-[#0D1B3E]/20 hover:border-[#FF6B35] hover:bg-orange-50 rounded-xl px-3 py-2 transition-all"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Chat messages */}
            {messages.map((m) => {
              const text = getMessageText(m as Parameters<typeof getMessageText>[0]);
              if (!text) return null;
              return (
                <div
                  key={m.id}
                  className={`flex gap-2 items-start ${m.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                      m.role === "user" ? "bg-[#0D1B3E]" : "bg-[#FF6B35]"
                    }`}
                  >
                    {m.role === "user" ? (
                      <User size={14} className="text-white" />
                    ) : (
                      <Bot size={14} className="text-white" />
                    )}
                  </div>
                  <div
                    className={`rounded-2xl px-3 py-2 shadow-sm max-w-[85%] ${
                      m.role === "user"
                        ? "bg-[#0D1B3E] text-white rounded-tr-sm"
                        : "bg-white text-gray-800 rounded-tl-sm"
                    }`}
                  >
                    <p
                      className="text-sm leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: formatMessage(text) }}
                    />
                  </div>
                </div>
              );
            })}

            {/* Loading indicator */}
            {isLoading && (
              <div className="flex gap-2 items-start">
                <div className="w-7 h-7 rounded-full bg-[#FF6B35] flex items-center justify-center shrink-0">
                  <Bot size={14} className="text-white" />
                </div>
                <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
                  <div className="flex gap-1 items-center">
                    <div
                      className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    />
                    <div
                      className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    />
                    <div
                      className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick actions bar */}
          <div className="px-3 py-2 bg-white border-t border-gray-100 flex gap-2 shrink-0">
            <a
              href="tel:+224611145892"
              className="flex-1 flex items-center justify-center gap-1.5 text-xs text-[#0D1B3E] border border-[#0D1B3E]/30 rounded-lg py-1.5 hover:bg-[#0D1B3E] hover:text-white transition-all"
            >
              <Phone size={12} />
              Appeler
            </a>
            <a
              href="https://wa.me/224611145892"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 text-xs text-green-700 border border-green-300 rounded-lg py-1.5 hover:bg-green-600 hover:text-white transition-all"
            >
              <ExternalLink size={12} />
              WhatsApp
            </a>
            <a
              href="/#contact"
              onClick={() => setIsOpen(false)}
              className="flex-1 flex items-center justify-center gap-1.5 text-xs text-[#FF6B35] border border-[#FF6B35]/40 rounded-lg py-1.5 hover:bg-[#FF6B35] hover:text-white transition-all"
            >
              <ExternalLink size={12} />
              Devis
            </a>
          </div>

          {/* Input */}
          <form
            onSubmit={handleFormSubmit}
            className="px-3 py-3 bg-white border-t border-gray-200 flex gap-2 items-center shrink-0"
          >
            <input
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Posez votre question..."
              className="flex-1 text-sm border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:border-[#0D1B3E] bg-gray-50"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              className="w-9 h-9 rounded-xl bg-[#FF6B35] text-white flex items-center justify-center hover:bg-[#e85a2a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
            >
              {isLoading ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Send size={16} />
              )}
            </button>
          </form>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-4 z-50 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 active:scale-95"
        style={{ background: isOpen ? "#0D1B3E" : "#FF6B35" }}
        aria-label="Ouvrir le chat"
      >
        {isOpen ? (
          <X size={24} className="text-white" />
        ) : (
          <MessageCircle size={24} className="text-white" />
        )}

        {/* Notification badge */}
        {hasNewMessage && !isOpen && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-white text-[10px] font-bold">1</span>
          </span>
        )}
      </button>
    </>
  );
}
