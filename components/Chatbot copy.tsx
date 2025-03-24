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
  "Comment puis-je commander ?",
  "Quels sont les délais de livraison ?",
  "Je cherche des équipements spécifiques",
  "J'ai besoin d'un devis"
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
      return "Pour commander, vous pouvez utiliser le bouton 'Demander un devis' sur la page du produit qui vous intéresse. Notre équipe commerciale vous contactera rapidement.";
    }
    
    if (lowerInput.includes('livraison')) {
      return "Nos délais de livraison standards sont de 2 à 5 jours ouvrés. Pour les commandes urgentes, nous proposons une livraison express sous 24/48h.";
    }
    
    if (lowerInput.includes('devis')) {
      return "Je peux vous aider à obtenir un devis. Pourriez-vous me préciser quels types d'équipements vous intéressent ?";
    }
    
    if (lowerInput.includes('contact') || lowerInput.includes('commercial')) {
      return "Vous pouvez nous contacter par téléphone au 01 23 45 67 89 ou par email à contact@fullness-safety.fr. Un commercial vous répondra dans les plus brefs délais.";
    }

    return "Je comprends votre demande. Pour vous apporter la réponse la plus précise possible, je vous invite à contacter notre service client au 01 23 45 67 89 ou par email à contact@fullness-safety.fr";
  };

  const handleWhatsAppClick = () => {
    const message = "Bonjour, j'ai une question concernant vos produits.";
    window.open(`https://wa.me/33123456789?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleEmailClick = () => {
    window.location.href = 'mailto:contact@fullness-safety.fr';
  };

  return (
    <>
      {/* Chat Button */}
      <Button
        className={`fixed bottom-4 right-4 h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ${
          isOpen ? 'bg-destructive hover:bg-destructive/90' : 'bg-primary hover:bg-primary/90'
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-20 right-4 w-[380px] h-[600px] shadow-xl flex flex-col animate-in slide-in-from-bottom-5 bg-background/95 backdrop-blur-sm border-primary/10">
          {/* Header */}
          <div className="p-4 border-b bg-primary/5 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Bot className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Assistant Fullness</h3>
                <p className="text-sm text-muted-foreground">Toujours là pour vous aider</p>
              </div>
            </div>
            
            {/* Contact buttons */}
            <div className="flex gap-2 mt-4">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 bg-green-500/10 hover:bg-green-500/20 text-green-600"
                onClick={handleWhatsAppClick}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                WhatsApp
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={handleEmailClick}
              >
                <Mail className="w-4 h-4 mr-2" />
                Email
              </Button>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`flex items-start gap-2 max-w-[80%] ${
                      message.type === 'user' ? 'flex-row-reverse' : ''
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                        message.type === 'user' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-muted'
                      }`}
                    >
                      {message.type === 'user' ? (
                        <User className="h-5 w-5" />
                      ) : (
                        <Bot className="h-5 w-5" />
                      )}
                    </div>
                    <div
                      className={`rounded-2xl px-4 py-2 ${
                        message.type === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className="text-[10px] opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start gap-2 max-w-[80%]">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                      <Bot className="h-5 w-5" />
                    </div>
                    <div className="rounded-2xl px-4 py-2 bg-muted">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-2 h-2 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-2 h-2 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: '300ms' }} />
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
            <div className="p-4 border-t bg-muted/50">
              <p className="text-sm text-muted-foreground mb-2">Suggestions :</p>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((suggestion) => (
                  <Button
                    key={suggestion}
                    variant="outline"
                    size="sm"
                    className="text-xs bg-background hover:bg-primary/5"
                    onClick={() => handleSubmit(suggestion)}
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t bg-background">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(input);
              }}
              className="flex gap-2"
            >
              <Input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Écrivez votre message..."
                className="flex-1"
              />
              <Button 
                type="submit" 
                size="icon"
                className="bg-primary hover:bg-primary/90"
                disabled={!input.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </Card>
      )}
    </>
  );
}