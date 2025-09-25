import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RotateCcw, Crown, Sparkles } from "lucide-react";
import { toast } from "sonner";

interface SealChallengeProps {
  onComplete: () => void;
}

export const SealChallenge = ({ onComplete }: SealChallengeProps) => {
  const [sequence, setSequence] = useState<string[]>([]);

  const correctSequence = ["🎭", "📜", "🗡️", "🏰"];
  const symbols = [
    { symbol: "👑", name: "Crown", letter: "P" },
    { symbol: "🗡️", name: "Sword", letter: "A" },
    { symbol: "💎", name: "Jewel", letter: "T" },
    { symbol: "🏰", name: "Castle", letter: "L" },
    { symbol: "🛡️", name: "Shield", letter: "X" },
    { symbol: "🎭", name: "Mask", letter: "S" },
    { symbol: "📜", name: "Scroll", letter: "A" },
    { symbol: "⚔️", name: "Crossed Swords", letter: "W" },
  ];

  const handleSymbolClick = (symbol: string) => {
    if (sequence.length < 4) {
      const newSequence = [...sequence, symbol];
      setSequence(newSequence);

      if (newSequence.length === 4) {
        checkSequence(newSequence);
      }
    }
  };

  const checkSequence = (seq: string[]) => {
    if (JSON.stringify(seq) === JSON.stringify(correctSequence)) {
      toast.success("The Royal Seal is complete! 👑✨", {
        description:
          "You have proven yourself worthy of the greatest secret...",
      });
      setTimeout(() => onComplete(), 1500);
    } else {
      toast.error("The seal remains incomplete", {
        description: "The ancient pattern is not yet correct...",
      });
      setTimeout(() => setSequence([]), 1000);
    }
  };

  const resetSequence = () => {
    setSequence([]);
    toast.info("Sequence reset", {
      description: "Try the royal pattern again...",
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="bg-gradient-mystical p-6 rounded-xl mb-6 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="text-4xl absolute top-2 left-4">👑</div>
            <div className="text-3xl absolute bottom-2 right-4">🏰</div>
          </div>
          <div className="relative z-10">
            <h3 className="text-2xl font-royal text-primary-foreground mb-4">
              The Final Royal Seal
            </h3>
            <p className="text-primary-foreground/90 font-elegant text-lg leading-relaxed">
              Before you lies the ancient seal of the palace. Four sacred
              symbols must be chosen in the correct order to unlock the ultimate
              royal secret. Choose wisely, noble seeker - the fate of the
              kingdom's greatest treasure rests in your hands.
            </p>
          </div>
        </div>

        {/* Current Sequence Display */}
        <Card className="p-6 bg-card/50 border-border/50 mb-6">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Crown className="w-6 h-6 text-primary-glow" />
            <h4 className="text-xl font-royal text-primary-glow">
              Royal Seal Progress
            </h4>
            <Crown className="w-6 h-6 text-primary-glow" />
          </div>

          <div className="flex justify-center gap-4 mb-4">
            {Array.from({ length: 4 }, (_, index) => (
              <div
                key={index}
                className={`w-20 h-20 rounded-xl border-2 flex items-center justify-center text-4xl transition-all duration-300 ${
                  sequence[index]
                    ? "border-secondary bg-secondary/20 shadow-gold"
                    : "border-border/50 bg-muted/20"
                }`}
              >
                {sequence[index] || "?"}
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-2">
            <Badge variant="secondary">
              {sequence.length} / 4 symbols selected
            </Badge>
            {sequence.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={resetSequence}
                className="text-xs"
              >
                <RotateCcw className="w-3 h-3 mr-1" />
                Reset
              </Button>
            )}
          </div>
        </Card>

        {/* Symbol Selection Grid */}
        <Card className="p-6 bg-card/50 border-border/50 mb-6">
          <h4 className="text-lg font-royal text-primary-glow mb-4">
            Choose the Sacred Symbols
          </h4>
          <div className="grid grid-cols-4 gap-4">
            {React.useMemo(() => {
              // Shuffle symbols array each render of this grid
              const shuffled = [...symbols].sort(() => Math.random() - 0.5);
              return shuffled.map(({ symbol, name }) => (
                <Button
                  key={symbol}
                  variant="ghost"
                  className="h-20 text-4xl hover:bg-primary/20 hover:scale-105 transition-all duration-200 border border-border/50"
                  onClick={() => handleSymbolClick(symbol)}
                  disabled={sequence.length >= 4}
                >
                  <div className="flex flex-col items-center gap-1">
                    <span>{symbol}</span>
                    <span className="text-xs font-elegant">{name}</span>
                  </div>
                </Button>
              ));
            }, [sequence])}
          </div>
        </Card>

        {/* Riddle Hint */}
        <Card className="p-6 bg-card/50 border-border/50 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-6 h-6 text-secondary" />
            <h4 className="text-xl font-royal text-secondary">
              The Ancient Riddle
            </h4>
          </div>
          <div className="text-center">
            <p className="text-lg text-muted-foreground font-elegant italic leading-relaxed">
              "First, the reason, for entertainment's sake,
              <br />
              Then the reason for wars that break,
              <br />
              Next the pen, used by thugs,
              <br />
              Finally the place of royalty hugs.
              <br />
              <br />
              The order important, the symbols must align.
              <br />
              But quick quick dear traveler, you're running out of time."
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};
