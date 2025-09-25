import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Crown, Sparkles, Trophy } from "lucide-react";

interface VictoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VictoryModal = ({ isOpen, onClose }: VictoryModalProps) => {
  const secretCode = "youAreRoyalty1940";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(secretCode);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-gradient-mystical border-2 border-secondary/50">
        <DialogHeader className="text-center space-y-4">
          <div className="flex justify-center items-center gap-4">
            <Crown className="w-12 h-12 text-secondary animate-royal-pulse" />
            <DialogTitle className="text-4xl font-royal bg-gradient-gold bg-clip-text text-transparent">
              Victory Achieved!
            </DialogTitle>
            <Crown className="w-12 h-12 text-secondary animate-royal-pulse" />
          </div>
        </DialogHeader>

        <div className="space-y-6 text-center">
          {/* Victory Animation */}
          <div className="relative py-8">
            <div className="absolute inset-0 flex items-center justify-center opacity-20">
              <div className="text-8xl animate-crown-spin">👑</div>
            </div>
            <div className="relative z-10">
              <Trophy className="w-16 h-16 text-secondary mx-auto mb-4 animate-royal-pulse" />
              <h2 className="text-2xl font-royal text-primary-foreground mb-2">
                Congratulations, Noble Champion!
              </h2>
              <p className="text-primary-foreground/90 font-elegant text-lg max-w-md mx-auto">
                You have proven yourself worthy of the palace's greatest secret.
                Through wit, wisdom, and determination, you have unlocked the
                mysteries that have guarded this treasure for centuries.
              </p>
            </div>
          </div>

          {/* Secret Code Reveal */}
          <Card className="bg-card/80 backdrop-blur-sm border border-secondary/30 p-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Sparkles className="w-6 h-6 text-secondary" />
              <h3 className="text-2xl font-royal text-secondary">
                The Royal Secret Code
              </h3>
              <Sparkles className="w-6 h-6 text-secondary" />
            </div>

            <div className="bg-muted/20 rounded-lg p-6 mb-4 border border-secondary/20">
              <div className="text-3xl font-mono text-secondary font-bold tracking-widest break-all">
                {secretCode}
              </div>
            </div>

            <Button
              variant="royal"
              onClick={copyToClipboard}
              className="font-royal text-lg"
            >
              Copy Sacred Code ✨
            </Button>
          </Card>

          {/* Achievement Summary */}
          <Card className="bg-card/60 backdrop-blur-sm border border-border/50 p-6">
            <h4 className="text-xl font-royal text-primary-glow mb-4">
              Challenges Mastered
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🔍</span>
                <span className="font-elegant">Royal Cipher</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">💎</span>
                <span className="font-elegant">Crown Jewels</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">🎵</span>
                <span className="font-elegant">Musical Secret</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">👑</span>
                <span className="font-elegant">Royal Seal</span>
              </div>
            </div>
          </Card>

          {/* Royal Proclamation */}
          <div className="bg-gradient-gold/20 rounded-lg p-6 border border-secondary/30">
            <p className="text-primary-foreground font-elegant text-lg italic">
              "By royal decree, you are hereby recognized as a{" "}
              <strong className="text-secondary">Master of Mysteries</strong>,
              worthy of the highest honors in the realm. Your name shall be
              remembered in the halls of the palace as one who possessed the
              intellect and courage to unlock the ancient secrets."
            </p>
          </div>

          <Button
            variant="secondary"
            size="lg"
            onClick={onClose}
            className="font-royal text-lg px-8"
          >
            Return to the Palace 🏰
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
