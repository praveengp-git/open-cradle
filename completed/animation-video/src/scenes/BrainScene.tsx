import { AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig, interpolate } from "remotion";

export const BrainScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Brain entrance with glitch effect
  const brainOpacity = interpolate(frame, [0, fps], [0, 1], {
    extrapolateRight: "clamp",
  });

  const brainScale = interpolate(frame, [0, 2 * fps], [0.5, 1], {
    extrapolateRight: "clamp",
  });

  // Glitch effect - random position jitter
  const glitchIntensity = interpolate(frame, [0, 15 * fps, 25 * fps, 31 * fps], [0.5, 0.3, 0.5, 1], {
    extrapolateRight: "clamp",
  });

  const glitchX = Math.sin(frame * 0.5) * 10 * glitchIntensity;
  const glitchY = Math.cos(frame * 0.7) * 8 * glitchIntensity;

  // RGB split effect for glitch
  const rgbSplit = glitchIntensity * 3;

  // Text content
  const getText = () => {
    if (frame < 3 * fps) return "And eventually... a brain.";
    if (frame < 7 * fps) return "Not grown. Not born.";
    if (frame < 11 * fps) return "Just... assembled. By accident.";
    if (frame < 19 * fps) return "Ludwig Boltzmann realized this in 1896.";
    if (frame < 28 * fps) return "A Boltzmann Brain.";
    return "But here's where it gets strange.";
  };

  return (
    <AbsoluteFill className="bg-black">
      {/* Cosmic background */}
      <Img
        src={staticFile("assets/images/03-boltzmann-brain-glitch.png")}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 0.3,
          filter: "blur(10px)",
        }}
      />

      {/* Main brain with glitch effect */}
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          opacity: brainOpacity,
          transform: `scale(${brainScale}) translate(${glitchX}px, ${glitchY}px)`,
        }}
      >
        {/* RGB split layers */}
        <div style={{ position: "relative" }}>
          <Img
            src={staticFile("assets/images/03-boltzmann-brain-glitch.png")}
            style={{
              width: 600,
              height: 600,
              objectFit: "contain",
              position: "absolute",
              left: -rgbSplit,
              opacity: 0.7,
              filter: "hue-rotate(-30deg)",
              mixBlendMode: "screen",
            }}
          />
          <Img
            src={staticFile("assets/images/03-boltzmann-brain-glitch.png")}
            style={{
              width: 600,
              height: 600,
              objectFit: "contain",
              position: "absolute",
              left: rgbSplit,
              opacity: 0.7,
              filter: "hue-rotate(30deg)",
              mixBlendMode: "screen",
            }}
          />
          <Img
            src={staticFile("assets/images/03-boltzmann-brain-glitch.png")}
            style={{
              width: 600,
              height: 600,
              objectFit: "contain",
            }}
          />
        </div>
      </AbsoluteFill>

      {/* Scan lines effect */}
      <AbsoluteFill
        style={{
          background: `repeating-linear-gradient(
            0deg,
            rgba(0, 0, 0, 0.1) 0px,
            rgba(0, 0, 0, 0.1) 1px,
            transparent 1px,
            transparent 3px
          )`,
          opacity: glitchIntensity * 0.5,
          pointerEvents: "none",
        }}
      />

      {/* Text */}
      <AbsoluteFill
        style={{
          justifyContent: "flex-end",
          alignItems: "center",
          paddingBottom: 80,
        }}
      >
        <div
          style={{
            color: "white",
            fontSize: 48,
            fontFamily: "system-ui, sans-serif",
            fontWeight: 300,
            textAlign: "center",
            textShadow: "0 0 20px rgba(0,0,0,0.8)",
            maxWidth: "80%",
          }}
        >
          {getText()}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
