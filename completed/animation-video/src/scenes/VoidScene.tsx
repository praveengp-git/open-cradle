import { AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig, interpolate } from "remotion";

export const VoidScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Slow zoom into the void
  const scale = interpolate(frame, [0, 36 * fps], [1, 1.15], {
    extrapolateRight: "clamp",
  });

  // Particle flicker effect - multiple particles appearing and disappearing
  const particles = Array.from({ length: 20 }, (_, i) => {
    const particleFrame = (frame + i * 17) % 60;
    const opacity = interpolate(
      particleFrame,
      [0, 10, 20, 30],
      [0, 0.8, 0.8, 0],
      { extrapolateRight: "clamp" }
    );
    const x = ((i * 137) % 100);
    const y = ((i * 89) % 100);
    return { opacity, x, y, i };
  });

  // Text fade in for "Nothing"
  const textOpacity = interpolate(frame, [0, fps], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Text transitions
  const showNothing1 = frame < 1.6 * fps;
  const showNotEmptySpace = frame >= 1.6 * fps && frame < 3.8 * fps;
  const showNotDarkness = frame >= 3.8 * fps && frame < 5.7 * fps;
  const showNothing2 = frame >= 5.7 * fps && frame < 7.3 * fps;
  const showNoAtoms = frame >= 7.3 * fps && frame < 9.2 * fps;
  const showNoLight = frame >= 9.2 * fps && frame < 11 * fps;
  const showNoTime = frame >= 11 * fps && frame < 12.7 * fps;
  const showProbability = frame >= 12.7 * fps && frame < 16.7 * fps;
  const showQuantum = frame >= 16.7 * fps && frame < 36 * fps;

  const getCurrentText = () => {
    if (showNothing1) return "Nothing.";
    if (showNotEmptySpace) return "Not empty space.";
    if (showNotDarkness) return "Not darkness.";
    if (showNothing2) return "Nothing.";
    if (showNoAtoms) return "No atoms.";
    if (showNoLight) return "No light.";
    if (showNoTime) return "No time.";
    if (showProbability) return "Just... probability. Waiting.";
    if (showQuantum) return "";
    return "";
  };

  return (
    <AbsoluteFill className="bg-black">
      {/* Background starfield/void */}
      <AbsoluteFill style={{ transform: `scale(${scale})` }}>
        <Img
          src={staticFile("assets/images/01-void-particles.png")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </AbsoluteFill>

      {/* Flickering particles overlay */}
      {particles.map(({ opacity, x, y, i }) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: `${x}%`,
            top: `${y}%`,
            width: 4,
            height: 4,
            borderRadius: "50%",
            backgroundColor: "#88ccff",
            opacity,
            boxShadow: "0 0 10px 2px rgba(136, 204, 255, 0.5)",
          }}
        />
      ))}

      {/* Central text */}
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            opacity: textOpacity,
            color: "white",
            fontSize: 72,
            fontFamily: "system-ui, sans-serif",
            fontWeight: 300,
            letterSpacing: "0.05em",
            textAlign: "center",
            textShadow: "0 0 40px rgba(255,255,255,0.3)",
          }}
        >
          {getCurrentText()}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
