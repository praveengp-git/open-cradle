import { AbsoluteFill, staticFile, useVideoConfig } from "remotion";
import { Audio } from "@remotion/media";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";

import { VoidScene } from "./scenes/VoidScene";
import { ObjectsScene } from "./scenes/ObjectsScene";
import { BrainScene } from "./scenes/BrainScene";
import { MemoriesScene } from "./scenes/MemoriesScene";
import { AIScene } from "./scenes/AIScene";
import { PivotScene } from "./scenes/PivotScene";
import { AwakeningScene } from "./scenes/AwakeningScene";
import { EndingScene } from "./scenes/EndingScene";

export const BoltzmannBrain: React.FC = () => {
  const { fps } = useVideoConfig();

  // Scene durations in seconds (based on VTT timing)
  const sceneDurations = {
    void: 36,      // 0:00 - 0:36
    objects: 24,   // 0:36 - 1:00
    brain: 31,     // 1:00 - 1:31
    memories: 23,  // 1:31 - 1:54
    ai: 35,        // 1:54 - 2:29
    pivot: 24,     // 2:29 - 2:53
    awakening: 24, // 2:53 - 3:17
    ending: 12,    // 3:17 - 3:29
  };

  // Convert to frames
  const frames = {
    void: sceneDurations.void * fps,
    objects: sceneDurations.objects * fps,
    brain: sceneDurations.brain * fps,
    memories: sceneDurations.memories * fps,
    ai: sceneDurations.ai * fps,
    pivot: sceneDurations.pivot * fps,
    awakening: sceneDurations.awakening * fps,
    ending: sceneDurations.ending * fps,
  };

  // Transition duration
  const transitionDuration = Math.round(fps * 0.8); // 0.8 second transitions

  return (
    <AbsoluteFill className="bg-black">
      {/* Background audio narration */}
      <Audio src={staticFile("assets/audio/narration.mp3")} />

      {/* Scene transitions */}
      <TransitionSeries>
        {/* Scene 1: Void */}
        <TransitionSeries.Sequence durationInFrames={frames.void}>
          <VoidScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: transitionDuration })}
        />

        {/* Scene 2: Objects */}
        <TransitionSeries.Sequence durationInFrames={frames.objects}>
          <ObjectsScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: transitionDuration })}
        />

        {/* Scene 3: Boltzmann Brain */}
        <TransitionSeries.Sequence durationInFrames={frames.brain}>
          <BrainScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: transitionDuration })}
        />

        {/* Scene 4: Memories */}
        <TransitionSeries.Sequence durationInFrames={frames.memories}>
          <MemoriesScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: transitionDuration })}
        />

        {/* Scene 5: AI Parallel */}
        <TransitionSeries.Sequence durationInFrames={frames.ai}>
          <AIScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: transitionDuration })}
        />

        {/* Scene 6: The Pivot */}
        <TransitionSeries.Sequence durationInFrames={frames.pivot}>
          <PivotScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: transitionDuration })}
        />

        {/* Scene 7: Awakening */}
        <TransitionSeries.Sequence durationInFrames={frames.awakening}>
          <AwakeningScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: transitionDuration })}
        />

        {/* Scene 8: Ending */}
        <TransitionSeries.Sequence durationInFrames={frames.ending}>
          <EndingScene />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
