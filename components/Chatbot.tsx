"use client";

import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, Send, X, Loader2, Bot, User, Phone, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    id: '1',
    type: 'bot',
    content: 'Bonjour ! Je suis là pour vous aider. Comment puis-je vous être utile aujourd\'hui ?',
    timestamp: new Date()
  }
];

const suggestions = [
  "Comment commander ?",
  "Délais livraison ?",
  "Équipements spécifiques",
  "Besoin d'un devis"
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      setHasScrolledToBottom(true);
    }
  };

  useEffect(() => {
    if (!hasScrolledToBottom) {
      scrollToBottom();
    }
  }, [messages, hasScrolledToBottom]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const notifyAdmin = async (message: string) => {
    try {
      await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });
    } catch (error) {
      console.error('Failed to notify admin:', error);
    }
  };

  const handleSubmit = async (content: string) => {
    if (!content.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: content.trim(),
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Notify admin about new message
    await notifyAdmin(content.trim());

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: getBotResponse(content.trim()),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const getBotResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('commander') || lowerInput.includes('acheter')) {
      return "Pour commander, utilisez le bouton 'Devis' sur la page produit. Notre équipe vous contactera rapidement.";
    }
    
    if (lowerInput.includes('livraison')) {
      return "Délais standards : 2-5 jours. Express : 24-48h.";
    }
    
    if (lowerInput.includes('devis')) {
      return "Je peux vous aider à obtenir un devis. Quels équipements vous intéressent ?";
    }
    
    if (lowerInput.includes('contact') || lowerInput.includes('commercial')) {
      return "Contactez-nous au 01 23 45 67 89 ou email contact@fullness-safety.fr";
    }

    return "Pour une réponse précise, contactez-nous au 01 23 45 67 89 ou email contact@fullness-safety.fr";
  };

  const handleWhatsAppClick = () => {
    const message = "Bonjour, question sur vos produits.";
    window.open(`https://wa.me/33123456789?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleEmailClick = () => {
    window.location.href = 'mailto:contact@fullness-safety.fr';
  };

  return (
    <>
      {/* Chat Button */}
      <Button
        className={`fixed bottom-4 right-4 h-12 w-12 rounded-full shadow-md hover:shadow-lg transition-all duration-300 ${
          isOpen ? 'bg-destructive hover:bg-destructive/90' : 'bg-primary hover:bg-primary/90'
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <X className="h-5 w-5" />
        ) : (
          <MessageCircle className="h-5 w-5" />
        )}
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-16 right-4 w-[320px] h-[500px] shadow-lg flex flex-col animate-in slide-in-from-bottom-5 bg-background/95 backdrop-blur-sm border-primary/10">
          {/* Header */}
          <div className="p-3 border-b bg-primary/5 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Bot className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Assistant Fullness</h3>
                <p className="text-xs text-muted-foreground">Prêt à vous aider</p>
              </div>
            </div>
            
            {/* Contact buttons */}
            <div className="flex gap-2 mt-3">
              <Button
                variant="outline"
                size="xs"
                className="flex-1 bg-green-500/10 hover:bg-green-500/20 text-green-600 h-8"
                onClick={handleWhatsAppClick}
              >
                <MessageCircle className="w-3 h-3 mr-1" />
                WhatsApp
              </Button>
              <Button
                variant="outline"
                size="xs"
                className="flex-1 h-8"
                onClick={handleEmailClick}
              >
                <Mail className="w-3 h-3 mr-1" />
                Email
              </Button>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-3">
            <div className="space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`flex items-start gap-1.5 max-w-[85%] ${
                      message.type === 'user' ? 'flex-row-reverse' : ''
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                        message.type === 'user' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-muted'
                      }`}
                    >
                      {message.type === 'user' ? (
                        <User className="h-4 w-4" />
                      ) : (
                        <Bot className="h-4 w-4" />
                      )}
                    </div>
                    <div
                      className={`rounded-xl px-3 py-1.5 ${
                        message.type === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}
                    >
                      <p className="text-xs">{message.content}</p>
                      <p className="text-[9px] opacity-70 mt-0.5">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start gap-1.5 max-w-[85%]">
                    <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center">
                      <Bot className="h-4 w-4" />
                    </div>
                    <div className="rounded-xl px-3 py-1.5 bg-muted">
                      <div className="flex gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Suggestions */}
          {messages.length <= 2 && (
            <div className="p-3 border-t bg-muted/50">
              <p className="text-xs text-muted-foreground mb-1.5">Suggestions :</p>
              <div className="flex flex-wrap gap-1.5">
                {suggestions.map((suggestion) => (
                  <Button
                    key={suggestion}
                    variant="outline"
                    size="xs"
                    className="text-xs bg-background hover:bg-primary/5 h-7 px-2"
                    onClick={() => handleSubmit(suggestion)}
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-3 border-t bg-background">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(input);
              }}
              className="flex gap-1.5"
            >
              <Input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Écrivez votre message..."
                className="flex-1 h-8 text-xs"
              />
              <Button 
                type="submit" 
                size="icon"
                className="bg-primary hover:bg-primary/90 h-8 w-8"
                disabled={!input.trim()}
              >
                <Send className="h-3.5 w-3.5" />
              </Button>
            </form>
          </div>
        </Card>
      )}
    </>
  );
} 