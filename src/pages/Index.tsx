import { HeroSection } from "@/components/HeroSection";
import { Features } from "@/components/Features";
import { ChatInterface } from "@/components/ChatInterface";

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <Features />
      <ChatInterface />
    </div>
  );
};

export default Index;
