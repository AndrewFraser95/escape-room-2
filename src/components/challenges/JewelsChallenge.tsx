import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, FileImage, Eye, Gem } from "lucide-react";
import { toast } from "sonner";

interface JewelsChallengeProps {
  onComplete: () => void;
}

export const JewelsChallenge = ({ onComplete }: JewelsChallengeProps) => {
  const [userInput, setUserInput] = useState("");
  const [hasDownloaded, setHasDownloaded] = useState(false);
  const [showHints, setShowHints] = useState(false);

  const handleDownload = () => {
    // Create a link to download the royal-crown-jewels.png from public folder
    const link = document.createElement("a");
    link.href = "/royal-crown-jewels.png";
    link.download = "royal-crown-jewels.png";
    link.click();
    setHasDownloaded(true);
    toast.success("Crown jewels downloaded! 💎", {
      description: "Examine every detail of this royal artifact...",
    });
  };

  const handleSubmit = () => {
    if (userInput.toLowerCase().trim() === "diamond") {
      toast.success("Brilliant! You've uncovered the jewel's secret! 💎✨", {
        description: "The treasury recognizes your keen eye...",
      });
      onComplete();
    } else {
      toast.error("Not the gem we're seeking", {
        description: "Look more carefully at the downloaded image...",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="bg-gradient-mystical p-6 rounded-xl mb-6 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="text-4xl absolute top-2 left-4">💎</div>
            <div className="text-3xl absolute bottom-2 right-4">👑</div>
          </div>
          <div className="relative z-10">
            <h3 className="text-2xl font-royal text-primary-foreground mb-4">
              The Royal Treasury Awaits
            </h3>
            <p className="text-primary-foreground/90 font-elegant text-lg leading-relaxed">
              Within the palace treasury lies an ancient artifact. Download the
              royal image and examine it with the utmost care. The jewelers of
              old were masters of concealment - seek what others cannot see.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-1 gap-6 mb-6">
          <Card className="p-6 bg-card/50 border-border/50">
            <div className="flex items-center gap-3 mb-4">
              <Download className="w-6 h-6 text-primary-glow" />
              <h4 className="text-xl font-royal text-primary-glow">
                Royal Artifact
              </h4>
            </div>
            <div className="space-y-4">
              <Button
                onClick={handleDownload}
                variant="royal"
                className="w-full"
                size="lg"
              >
                <FileImage className="w-5 h-5 mr-2" />
                Download Crown Jewels Image
              </Button>
              {hasDownloaded && (
                <Badge variant="success" className="w-full justify-center py-2">
                  <Gem className="w-4 h-4 mr-2" />
                  Artifact Acquired
                </Badge>
              )}
            </div>
          </Card>
        </div>

        {hasDownloaded && !showHints && (
          <Button
            variant="ghost"
            onClick={() => setShowHints(true)}
            className="mb-4"
          >
            Still seeking? Get royal guidance 🔍
          </Button>
        )}

        {showHints && hasDownloaded && (
          <Card className="mb-6 p-4 bg-warning/10 border-warning/30">
            <div className="flex items-center gap-2 mb-2">
              <Gem className="w-5 h-5 text-warning" />
              <span className="font-royal text-warning">
                Royal Jeweler's Wisdom
              </span>
            </div>
            <p className="text-sm text-warning/90">
              The secret lies in the bottom-left corner of the image, written in
              text that nearly matches the background. The answer is a precious
              stone that royalty prizes above all others.
            </p>
          </Card>
        )}

        <div className="space-y-4">
          <div className="max-w-md mx-auto">
            <Input
              placeholder="Enter the name of the precious stone..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
              className="text-center text-lg font-royal"
              disabled={!hasDownloaded}
            />
          </div>

          <Button
            onClick={handleSubmit}
            variant="royal"
            size="lg"
            className="font-royal text-lg px-8"
            disabled={!hasDownloaded}
          >
            Claim Royal Treasure ✨
          </Button>

          {!hasDownloaded && (
            <p className="text-sm text-muted-foreground">
              Download the royal artifact first to unlock this challenge
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
