import { useState, useEffect } from "react";
import cirnoIdle from "@/assets/cirno-idle.jpg";
import cirnoThinking from "@/assets/cirno-thinking.jpg";
import cirnoHappy from "@/assets/cirno-happy.jpg";
import cirnoSpeaking from "@/assets/cirno-speaking.jpg";
import cirnoConfused from "@/assets/cirno-confused.jpg";

export type AvatarState = 'idle' | 'thinking' | 'speaking' | 'happy' | 'confused';

interface AnimatedAvatarProps {
  state: AvatarState;
  isLoading?: boolean;
}

const avatarImages = {
  idle: cirnoIdle,
  thinking: cirnoThinking,
  speaking: cirnoSpeaking,
  happy: cirnoHappy,
  confused: cirnoConfused,
};

const speechBubbles = {
  idle: "",
  thinking: "Hmm... myślę nad tym! 🤔",
  speaking: "Aha! Wiem jak to rozwiązać! ✨",
  happy: "Świetne pytanie! 😊",
  confused: "To jest trudne... 🤯"
};

export const AnimatedAvatar = ({ state, isLoading }: AnimatedAvatarProps) => {
  const [currentImage, setCurrentImage] = useState(avatarImages[state]);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (avatarImages[state] !== currentImage) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentImage(avatarImages[state]);
        setIsTransitioning(false);
      }, 150);
    }
  }, [state, currentImage]);

  const getAnimationClass = () => {
    switch (state) {
      case 'thinking':
        return 'animate-wiggle';
      case 'speaking':
        return 'animate-bounce-gentle';
      case 'happy':
        return 'animate-pulse-glow';
      case 'confused':
        return 'animate-float';
      default:
        return 'animate-float';
    }
  };

  const getFloatingElements = () => {
    switch (state) {
      case 'thinking':
        return (
          <>
            <div className="absolute -top-4 -right-2 text-2xl animate-bounce">🤔</div>
            <div className="absolute top-1/4 -left-4 w-3 h-3 bg-ice-light rounded-full animate-sparkle"></div>
          </>
        );
      case 'speaking':
        return (
          <>
            <div className="absolute -top-2 -right-4 text-xl animate-sparkle">✨</div>
            <div className="absolute bottom-1/4 -right-6 text-lg animate-bounce">💡</div>
          </>
        );
      case 'happy':
        return (
          <>
            <div className="absolute -top-3 -right-3 text-xl animate-sparkle">😊</div>
            <div className="absolute -top-2 -left-3 text-lg animate-bounce">⭐</div>
            <div className="absolute bottom-1/3 -right-5 text-sm animate-sparkle">✨</div>
          </>
        );
      case 'confused':
        return (
          <>
            <div className="absolute -top-4 -right-1 text-xl animate-float">❓</div>
            <div className="absolute top-1/4 -left-5 text-lg animate-wiggle">🤯</div>
          </>
        );
      default:
        return (
          <>
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-ice-glow rounded-full animate-sparkle"></div>
            <div className="absolute top-1/4 -left-3 w-3 h-3 bg-ice-light rounded-full animate-bounce-gentle"></div>
            <div className="absolute bottom-1/4 -right-4 w-2 h-2 bg-primary-glow rounded-full animate-wiggle"></div>
          </>
        );
    }
  };

  return (
    <div className="relative">
      {/* Główny awatar */}
      <div className="relative w-48 h-48 lg:w-64 lg:h-64">
        <div className="absolute inset-0 bg-gradient-primary rounded-full animate-pulse-glow opacity-30"></div>
        <img 
          src={currentImage}
          alt={`Cirno ${state} expression`}
          className={`relative z-10 w-full h-full object-cover rounded-full border-4 border-ice-light shadow-glow transition-all duration-300 ${getAnimationClass()} ${
            isTransitioning ? 'opacity-50 scale-95' : 'opacity-100 scale-100'
          }`}
        />
        
        {/* Floating elements */}
        {getFloatingElements()}
      </div>
      
      {/* Speech bubble */}
      {(speechBubbles[state] || isLoading) && (
        <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 bg-ice-frost border-2 border-ice-light rounded-2xl px-4 py-2 animate-bounce-gentle max-w-xs">
          <div className="text-sm text-ice-blue font-medium text-center">
            {isLoading ? "Myślę nad odpowiedzią..." : speechBubbles[state]}
          </div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
            <div className="border-l-8 border-r-8 border-t-8 border-transparent border-t-ice-light"></div>
          </div>
        </div>
      )}
    </div>
  );
};