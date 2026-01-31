import "./index.css";
import { Composition } from "remotion";
import { BoltzmannBrain } from "./BoltzmannBrain";

// Total duration calculation:
// Scenes: 36+24+31+23+35+24+24+12 = 209 seconds
// Transitions: 7 x 0.8s = 5.6s overlap
// Total: ~203 seconds = ~6100 frames at 30fps
// Adding buffer: 6300 frames

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="BoltzmannBrain"
        component={BoltzmannBrain}
        durationInFrames={6300}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
