import { Button } from "@/components/ui/button";
import cirnoHero from "@/assets/cirno-hero.jpg";

export const HeroSection = () => {
  const scrollToChat = () => {
    document.getElementById('chat-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-frost overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-4 h-4 bg-ice-glow rounded-full animate-sparkle"></div>
        <div className="absolute top-40 right-20 w-3 h-3 bg-ice-light rounded-full animate-float"></div>
        <div className="absolute bottom-32 left-1/4 w-2 h-2 bg-primary-glow rounded-full animate-sparkle"></div>
        <div className="absolute bottom-20 right-1/3 w-5 h-5 bg-ice-blue/30 rounded-full animate-float"></div>
      </div>
      
      <div className="container mx-auto px-4 z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left space-y-6">
            <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent animate-float">
              Asystentka AI Cirno
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Ucz się informatyki i matematyki z pomocą Cirno! Zadawaj pytania, rozwiązuj problemy 
              i odkrywaj świat nauki w przyjaznej atmosferze.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                variant="ice" 
                size="lg"
                onClick={scrollToChat}
                className="text-lg px-8 py-3"
              >
                Rozpocznij naukę
              </Button>
              <Button 
                variant="frost" 
                size="lg"
                className="text-lg px-8 py-3"
              >
                Dowiedz się więcej
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-glow animate-float">
              <img 
                src={cirnoHero} 
                alt="Cirno AI Assistant - asystentka do nauki informatyki i matematyki" 
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-primary/10"></div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-ice-glow rounded-full animate-sparkle"></div>
            <div className="absolute -bottom-6 -left-6 w-6 h-6 bg-ice-blue/40 rounded-full animate-float"></div>
          </div>
        </div>
      </div>
    </section>
  );
};