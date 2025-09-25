import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Crown, Lock, CheckCircle, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { CipherChallenge } from "./challenges/CipherChallenge";
import { JewelsChallenge } from "./challenges/JewelsChallenge";
import { AudioChallenge } from "./challenges/AudioChallenge";
import { SealChallenge } from "./challenges/SealChallenge";
import { VictoryModal } from "./VictoryModal";

export const EscapeRoom = () => {
  const [completedChallenges, setCompletedChallenges] = useState<number[]>([]);
  const [currentChallenge, setCurrentChallenge] = useState<number>(1);
  const [showVictory, setShowVictory] = useState(false);

  const challenges = [
    {
      id: 1,
      title: "The Royal Cipher",
      description: "Uncover the hidden message within these royal halls",
      icon: "🔍",
      component: CipherChallenge,
    },
    {
      id: 2,
      title: "Crown Jewels Mystery",
      description: "Download and examine the royal artifacts for secrets",
      icon: "💎",
      component: JewelsChallenge,
    },
    {
      id: 3,
      title: "Court Musician's Secret",
      description: "Listen carefully to the royal court's ancient melodies",
      icon: "🎵",
      component: AudioChallenge,
    },
    {
      id: 4,
      title: "The Royal Seal",
      description:
        "Complete the ceremonial sequence to unlock the final secret",
      icon: "👑",
      component: SealChallenge,
    },
  ];

  const handleChallengeComplete = (challengeId: number) => {
    if (!completedChallenges.includes(challengeId)) {
      setCompletedChallenges((prev) => [...prev, challengeId]);
      toast.success(`Challenge ${challengeId} completed! 🎉`, {
        description: "You've proven yourself worthy of royal secrets",
      });

      // Auto-advance to next challenge if available
      if (challengeId < 4) {
        setCurrentChallenge(challengeId + 1);
      }
    }
  };

  useEffect(() => {
    if (completedChallenges.length === 4) {
      setTimeout(() => setShowVictory(true), 1000);
    }
  }, [completedChallenges]);

  const getCurrentComponent = () => {
    const challenge = challenges.find((c) => c.id === currentChallenge);
    if (!challenge) return null;

    const Component = challenge.component;
    return (
      <Component onComplete={() => handleChallengeComplete(currentChallenge)} />
    );
  };

  return (
    <div className="min-h-screen bg-gradient-palace relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div
        className="absolute inset-0 opacity-10"
        data-vault="aW4gcGxhaW4gc2lnaHQ="
      >
        <div className="absolute top-10 left-10 text-8xl animate-crown-spin">
          👑
        </div>
        <div className="absolute top-20 right-20 text-6xl">✨</div>
        <div className="absolute bottom-20 left-20 text-7xl">🏰</div>
        <div className="absolute bottom-10 right-10 text-5xl animate-royal-pulse">
          💎
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div
            className="flex justify-center items-center gap-4 mb-6"
            data-regal="aW5zaWdodA=="
          >
            <Crown className="w-12 h-12 text-secondary animate-royal-pulse" />
            <h1 className="text-5xl md:text-7xl font-royal bg-gradient-gold bg-clip-text text-transparent">
              Royal Escape Room
            </h1>
            <Crown className="w-12 h-12 text-secondary animate-royal-pulse" />
          </div>
          <p className="text-xl text-muted-foreground font-elegant max-w-2xl mx-auto">
            Welcome to the palace, noble adventurer. Four ancient challenges
            await your wit and cunning. Only those who prove themselves worthy
            shall discover the ultimate royal secret.
          </p>
        </div>

        {/* Progress Tracker */}
        <div className="flex justify-center mb-12">
          <div
            className="flex gap-4 p-6 bg-card/50 backdrop-blur-sm rounded-xl border border-border/50"
            aria-label="royal-progress"
            data-wisdom="dGhlIHRydXRo"
          >
            {challenges.map((challenge) => (
              <div
                key={challenge.id}
                className="flex flex-col items-center gap-2"
              >
                <Button
                  variant={
                    currentChallenge === challenge.id
                      ? "royal"
                      : completedChallenges.includes(challenge.id)
                      ? "success"
                      : "ghost"
                  }
                  size="icon"
                  className="w-16 h-16 text-2xl relative"
                  onClick={() =>
                    completedChallenges.includes(challenge.id - 1) ||
                    challenge.id === 1
                      ? setCurrentChallenge(challenge.id)
                      : null
                  }
                  disabled={
                    !completedChallenges.includes(challenge.id - 1) &&
                    challenge.id !== 1
                  }
                >
                  {completedChallenges.includes(challenge.id) ? (
                    <CheckCircle className="w-8 h-8" />
                  ) : challenge.id <= currentChallenge ||
                    completedChallenges.includes(challenge.id - 1) ||
                    challenge.id === 1 ? (
                    <span className="text-2xl">{challenge.icon}</span>
                  ) : (
                    <Lock className="w-6 h-6" />
                  )}
                </Button>
                <Badge
                  variant={
                    completedChallenges.includes(challenge.id)
                      ? "success"
                      : challenge.id === currentChallenge
                      ? "royal"
                      : "secondary"
                  }
                >
                  {challenge.title}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Current Challenge */}
        <div className="max-w-4xl mx-auto" data-ancient="aXMgaGlkZGVu">
          <Card className="bg-card/80 backdrop-blur-sm border border-border/50 shadow-mystical">
            <div className="p-8">
              <div className="text-center mb-8">
                <div className="text-6xl mb-4">
                  {challenges[currentChallenge - 1]?.icon}
                </div>
                <h2 className="text-3xl font-royal text-primary-glow mb-2">
                  {challenges[currentChallenge - 1]?.title}
                </h2>
                <p className="text-muted-foreground font-elegant text-lg">
                  {challenges[currentChallenge - 1]?.description}
                </p>
              </div>

              {getCurrentComponent()}
            </div>
          </Card>
        </div>

        {/* Completed Challenges Summary */}
        {completedChallenges.length > 0 && (
          <div className="mt-12 text-center">
            <div className="flex justify-center items-center gap-2 mb-4">
              <Sparkles className="w-6 h-6 text-secondary" />
              <h3 className="text-2xl font-royal text-secondary">
                Challenges Mastered
              </h3>
              <Sparkles className="w-6 h-6 text-secondary" />
            </div>
            <div className="flex justify-center gap-4">
              {completedChallenges.map((id) => (
                <Badge key={id} variant="success" className="text-lg px-4 py-2">
                  {challenges[id - 1]?.icon} {challenges[id - 1]?.title}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Hidden Royal Messages - Scattered Across the Palace */}
      {typeof window !== "undefined" && (
        <>
          <div data-royal-fragment="Q3Jvd25pbmc=" style={{ display: "none" }} />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                <!-- The first clue lies within the very fabric of this palace. Inspect these royal halls closely, for what the eye cannot see, the mind must discover. Multiple fragments await the worthy seeker... -->
              `,
            }}
          />
          <meta name="palace-secret" content="R2xvcnk=" />
          <link rel="prefetch" href="#crown-jewels" data-cipher="fragment-2" />
        </>
      )}

      <VictoryModal
        isOpen={showVictory}
        onClose={() => setShowVictory(false)}
      />
    </div>
  );
};
