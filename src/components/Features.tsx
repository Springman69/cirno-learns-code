import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, Calculator, BookOpen, Lightbulb } from "lucide-react";

export const Features = () => {
  const features = [
    {
      icon: <Code className="w-8 h-8" />,
      title: "Informatyka",
      description: "Algorytmy, struktury danych, programowanie - wszystko wyjaśnione w prosty sposób"
    },
    {
      icon: <Calculator className="w-8 h-8" />,
      title: "Matematyka",
      description: "Algebra, geometria, analiza matematyczna - rozwiązuj problemy krok po kroku"
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Nauka interaktywna",
      description: "Zadawaj pytania, otrzymuj wyjaśnienia i praktyczne przykłady"
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Rozwiązywanie problemów",
      description: "Metodyczne podejście do każdego zagadnienia z pomocnymi wskazówkami"
    }
  ];

  return (
    <section className="py-20 bg-ice-frost/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
            Jak Cirno może ci pomóc?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Odkryj wszystkie możliwości nauki z twoją lodową asystentką AI
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="bg-card/70 backdrop-blur border-ice-light hover:shadow-ice transition-all duration-300 hover:scale-105 group"
            >
              <CardHeader className="text-center pb-3">
                <div className="inline-flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-gradient-primary rounded-2xl text-primary-foreground group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <CardTitle className="text-xl font-semibold text-foreground">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};