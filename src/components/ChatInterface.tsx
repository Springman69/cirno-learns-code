import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Send, Bot, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { AnimatedAvatar, AvatarState } from "@/components/AnimatedAvatar";

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Cześć! Jestem Cirno, twoja asystentka AI do nauki informatyki i matematyki! Jak mogę ci dzisiaj pomóc? 🧊',
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [avatarState, setAvatarState] = useState<AvatarState>('idle');
  const { toast } = useToast();

  // Reset avatar to idle after some time
  useEffect(() => {
    if (avatarState !== 'idle' && !isLoading) {
      const timer = setTimeout(() => {
        setAvatarState('idle');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [avatarState, isLoading]);

  const detectQuestionType = (question: string): AvatarState => {
    const lowerQuestion = question.toLowerCase();
    const hardKeywords = ['algorytm', 'złożoność', 'rekurencja', 'całka', 'pochodna', 'macierz', 'prawdopodobieństwo'];
    const isHardQuestion = hardKeywords.some(keyword => lowerQuestion.includes(keyword));
    
    if (isHardQuestion) return 'confused';
    return 'happy';
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date()
    };

    // Determine initial avatar reaction
    const initialReaction = detectQuestionType(input);
    setAvatarState(initialReaction);

    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    // After a moment, switch to thinking
    setTimeout(() => {
      setAvatarState('thinking');
    }, 1000);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: getAIResponse(currentInput),
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
      
      // Switch to speaking when AI responds
      setAvatarState('speaking');
      
      // Then to happy after a moment
      setTimeout(() => {
        setAvatarState('happy');
      }, 1500);
    }, 2000);
  };

  const getAIResponse = (question: string): string => {
    const responses = [
      "To świetne pytanie! Spróbujmy to rozłożyć na czynniki pierwsze... 🧊",
      "W informatyce to zagadnienie można rozwiązać używając algorytmu... ❄️",
      "Matematycznie rzecz biorąc, musimy najpierw zrozumieć podstawy... 🔍",
      "Pamiętaj, że praktyka czyni mistrza! Spróbuj rozwiązać to krok po kroku... 💪",
      "Doskonałe pytanie! To przypomina mi podobny problem, który można rozwiązać przez... ✨"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  return (
    <section id="chat-section" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
              Porozmawiaj z Cirno
            </h2>
            <p className="text-lg text-muted-foreground">
              Zadaj pytanie z informatyki lub matematyki i otrzymaj pomoc
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Animowany Awatar Cirno */}
            <div className="lg:col-span-3 flex justify-center lg:justify-end">
              <AnimatedAvatar 
                state={avatarState} 
                isLoading={isLoading} 
              />
            </div>

            {/* Chat Interface */}
            <div className="lg:col-span-9">
              <Card className="bg-card/50 backdrop-blur border-ice-light shadow-ice">
                <div className="h-96 overflow-y-auto p-6 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex gap-3 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                          message.sender === 'user' 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-gradient-primary text-primary-foreground'
                        }`}>
                          {message.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                        </div>
                        <div className={`rounded-2xl px-4 py-3 ${
                          message.sender === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-ice-frost text-foreground border border-ice-light'
                        }`}>
                          <p className="text-sm">{message.content}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex gap-3 justify-start">
                      <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
                        <Bot className="w-4 h-4 text-primary-foreground" />
                      </div>
                      <div className="bg-ice-frost border border-ice-light rounded-2xl px-4 py-3">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-ice-blue rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-ice-blue rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-ice-blue rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="p-6 border-t border-ice-light/30">
                  <div className="flex gap-2">
                    <Input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Zadaj pytanie z informatyki lub matematyki..."
                      onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                      className="border-ice-light focus:ring-ice-blue"
                      disabled={isLoading}
                    />
                    <Button 
                      onClick={handleSend} 
                      disabled={isLoading || !input.trim()}
                      variant="ice"
                      size="icon"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};