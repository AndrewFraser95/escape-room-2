import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Eye, Code } from "lucide-react";
import { toast } from "sonner";
import { C } from "node_modules/@tanstack/query-core/build/modern/hydration-B0J2Tmyo";

interface CipherChallengeProps {
  onComplete: () => void;
}

export const CipherChallenge = ({ onComplete }: CipherChallengeProps) => {
  const [userInput, setUserInput] = useState("");

  const handleSubmit = () => {
    if (userInput.toLowerCase().trim() === "crowning glory") {
      toast.success("Magnificent! You've cracked the royal cipher! 👑", {
        description: "The ancient wisdom flows through you...",
      });
      onComplete();
    } else {
      toast.error("Not quite right, noble seeker", {
        description: "The royal secrets remain hidden. Look closer...",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="bg-gradient-mystical p-6 rounded-xl mb-6 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="text-4xl absolute top-2 left-4">🔍</div>
            <div className="text-3xl absolute bottom-2 right-4">📜</div>
          </div>
          <div className="relative z-10">
            <h3 className="text-2xl font-royal text-primary-foreground mb-4">
              The Royal Archives Beckon
            </h3>
            <p className="text-primary-foreground/90 font-elegant text-lg leading-relaxed">
              Within these digital halls lies a message scattered like royal
              jewels across the palace. The ancient art of{" "}
              <strong>inspection</strong> shall reveal what is hidden in
              fragments. Seek the encoded wisdom in data attributes, hidden
              elements, and mystical fragments. The royal scribes have scattered
              their secrets in Base64 - decode what you find and piece together
              the truth.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6 bg-card/50 border-border/50" />
          <Card className="p-6 bg-card/50 border-border/50">
            <div className="flex items-center gap-3 mb-4">
              <Eye className="w-6 h-6 text-secondary" />
              <h4 className="text-xl font-royal text-secondary">
                Royal Riddle
              </h4>
            </div>
            <div className="text-left">
              <p className="text-sm text-muted-foreground font-elegant italic">
                "The truth lies scattered, piece by piece,
                <br />
                In attributes where secrets cease.
                <br />
                Base64 holds the royal key,
                <br />
                Decode fragments, and truth you'll see.
                <br />
                Four hidden parts make one whole phrase,
                <br />
                The crown's own glory through the maze."
              </p>
            </div>
          </Card>
          <Card className="p-6 bg-card/50 border-border/50" />
        </div>

        <div className="mt-8 space-y-4">
          <div className="max-w-md mx-auto">
            <Input
              placeholder="Enter the royal cipher word..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
              className="text-center text-lg font-royal"
            />
          </div>

          <Button
            onClick={handleSubmit}
            variant="royal"
            size="lg"
            className="font-royal text-lg px-8"
          >
            Unlock Royal Secrets ✨
          </Button>
        </div>
      </div>
    </div>
  );
};
