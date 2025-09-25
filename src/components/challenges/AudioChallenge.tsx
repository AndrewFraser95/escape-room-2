import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, Volume2, Music, Headphones } from "lucide-react";
import { toast } from "sonner";

interface AudioChallengeProps {
  onComplete: () => void;
}

export const AudioChallenge = ({ onComplete }: AudioChallengeProps) => {
  const [userInput, setUserInput] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Create audio with morse code-like beeps that spell "ROYAL"
  const generateRoyalAudio = () => {
    const audioContext = new (window.AudioContext ||
      (window as any).webkitAudioContext)();
    const sampleRate = audioContext.sampleRate;
    const duration = 8; // seconds
    const buffer = audioContext.createBuffer(
      1,
      sampleRate * duration,
      sampleRate
    );
    const channelData = buffer.getChannelData(0);

    // Morse code for "ROYAL": .-. --- -.-- .- .-..
    const morsePattern = [
      // R: .-.
      { type: "short", time: 0.5 },
      { type: "pause", time: 0.7 },
      { type: "long", time: 1.1 },
      { type: "pause", time: 1.5 },
      { type: "short", time: 1.7 },
      { type: "pause", time: 2.2 },

      // O: ---
      { type: "long", time: 2.5 },
      { type: "pause", time: 2.9 },
      { type: "long", time: 3.1 },
      { type: "pause", time: 3.5 },
      { type: "long", time: 3.7 },
      { type: "pause", time: 4.2 },

      // Y: -.--
      { type: "long", time: 4.5 },
      { type: "pause", time: 4.9 },
      { type: "short", time: 5.1 },
      { type: "pause", time: 5.3 },
      { type: "long", time: 5.5 },
      { type: "pause", time: 5.9 },
      { type: "long", time: 6.1 },
      { type: "pause", time: 6.6 },

      // A: .-
      { type: "short", time: 6.9 },
      { type: "pause", time: 7.1 },
      { type: "long", time: 7.3 },
      { type: "pause", time: 7.8 },

      // L: .-..
      { type: "short", time: 8.0 },
    ];

    // Generate tone
    morsePattern.forEach(({ type, time }) => {
      if (type === "short" || type === "long") {
        const startSample = Math.floor(time * sampleRate);
        const toneLength = type === "short" ? 0.15 : 0.3;
        const endSample = Math.floor((time + toneLength) * sampleRate);

        for (
          let i = startSample;
          i < endSample && i < channelData.length;
          i++
        ) {
          const t = (i - startSample) / (endSample - startSample);
          const envelope = Math.sin(t * Math.PI); // Smooth envelope
          channelData[i] =
            Math.sin((2 * Math.PI * 800 * i) / sampleRate) * 0.3 * envelope;
        }
      }
    });

    return buffer;
  };

  const createAudioBlob = () => {
    // Create a simple audio file URL (in a real app, you'd have an actual file)
    // For demo purposes, we'll create a data URL
    const audioContext = new (window.AudioContext ||
      (window as any).webkitAudioContext)();
    const buffer = generateRoyalAudio();

    // Convert buffer to WAV blob (simplified)
    const wav = audioBufferToWav(buffer);
    return URL.createObjectURL(wav);
  };

  // Simplified WAV conversion
  const audioBufferToWav = (buffer: AudioBuffer) => {
    const length = buffer.length;
    const result = new Float32Array(length);
    buffer.copyFromChannel(result, 0);

    // Create simple WAV structure
    const arrayBuffer = new ArrayBuffer(44 + length * 2);
    const view = new DataView(arrayBuffer);

    // WAV header
    const writeString = (offset: number, string: string) => {
      for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
      }
    };

    writeString(0, "RIFF");
    view.setUint32(4, 36 + length * 2, true);
    writeString(8, "WAVE");
    writeString(12, "fmt ");
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, 1, true);
    view.setUint32(24, buffer.sampleRate, true);
    view.setUint32(28, buffer.sampleRate * 2, true);
    view.setUint16(32, 2, true);
    view.setUint16(34, 16, true);
    writeString(36, "data");
    view.setUint32(40, length * 2, true);

    // Convert float samples to PCM
    let offset = 44;
    for (let i = 0; i < length; i++) {
      const sample = Math.max(-1, Math.min(1, result[i]));
      view.setInt16(
        offset,
        sample < 0 ? sample * 0x8000 : sample * 0x7fff,
        true
      );
      offset += 2;
    }

    return new Blob([arrayBuffer], { type: "audio/wav" });
  };

  useEffect(() => {
    if (audioRef.current) {
      const audio = audioRef.current;
      audio.src = createAudioBlob();

      const updateTime = () => setCurrentTime(audio.currentTime);
      const updateDuration = () => setDuration(audio.duration);

      audio.addEventListener("timeupdate", updateTime);
      audio.addEventListener("loadedmetadata", updateDuration);
      audio.addEventListener("ended", () => setIsPlaying(false));

      return () => {
        audio.removeEventListener("timeupdate", updateTime);
        audio.removeEventListener("loadedmetadata", updateDuration);
        audio.removeEventListener("ended", () => setIsPlaying(false));
      };
    }
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const drawWaveform = () => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    // Draw waveform background
    ctx.fillStyle = "#1f2937";
    ctx.fillRect(0, 0, width, height);

    // Draw waveform
    ctx.strokeStyle = "#fbbf24";
    ctx.lineWidth = 2;
    ctx.beginPath();

    for (let x = 0; x < width; x++) {
      const t = x / width;
      // Create a visual representation of morse code pattern
      let y = height / 2;

      // Simulate morse pattern visually
      const morsePoints = [
        0.1, 0.15, 0.25, 0.35, 0.4, 0.55, 0.65, 0.7, 0.8, 0.9,
      ];
      morsePoints.forEach((point) => {
        if (Math.abs(t - point) < 0.02) {
          y += Math.sin((t - point) * 100) * 20;
        }
      });

      if (x === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();

    // Draw progress indicator
    if (duration > 0) {
      const progress = (currentTime / duration) * width;
      ctx.strokeStyle = "#ef4444";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(progress, 0);
      ctx.lineTo(progress, height);
      ctx.stroke();
    }
  };

  useEffect(() => {
    drawWaveform();
  }, [currentTime, duration]);

  const handleSubmit = () => {
    if (userInput.toLowerCase().trim() === "royal") {
      toast.success("Magnificent! You've decoded the royal melody! 🎵👑", {
        description: "The court musicians smile upon your musical wisdom...",
      });
      onComplete();
    } else {
      toast.error("The melody holds different secrets", {
        description: "Listen more carefully to the rhythm and pattern...",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="bg-gradient-mystical p-6 rounded-xl mb-6 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="text-4xl absolute top-2 left-4">🎵</div>
            <div className="text-3xl absolute bottom-2 right-4">🎼</div>
          </div>
          <div className="relative z-10">
            <h3 className="text-2xl font-royal text-primary-foreground mb-4">
              The Court Musician's Secret
            </h3>
            <p className="text-primary-foreground/90 font-elegant text-lg leading-relaxed">
              The royal court's ancient melody carries a hidden message. Listen
              to the rhythm, the pattern, the very soul of the music. What the
              ears hear, the mind must decode.
            </p>
          </div>
        </div>

        {/* Audio Player */}
        <Card className="p-6 bg-card/50 border-border/50 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Music className="w-6 h-6 text-primary-glow" />
            <h4 className="text-xl font-royal text-primary-glow">
              Royal Court Recording
            </h4>
          </div>

          <div className="space-y-4">
            {/* Waveform Visualization */}
            <canvas
              ref={canvasRef}
              width={600}
              height={100}
              className="w-full h-24 bg-muted/20 rounded border border-border/30"
            />

            {/* Audio Controls */}
            <div className="flex items-center justify-center gap-4">
              <Button variant="royal" size="icon" onClick={togglePlay}>
                {isPlaying ? (
                  <Pause className="w-5 h-5" />
                ) : (
                  <Play className="w-5 h-5" />
                )}
              </Button>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Volume2 className="w-4 h-4" />
                <span>
                  {Math.floor(currentTime)}s / {Math.floor(duration)}s
                </span>
              </div>
            </div>
          </div>

          <audio ref={audioRef} preload="auto" />
        </Card>

        <div className="space-y-4">
          <div className="max-w-md mx-auto">
            <Input
              placeholder="Enter the decoded word..."
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
            Submit Musical Secret ✨
          </Button>
        </div>
      </div>
    </div>
  );
};
