import { AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig, interpolate } from "remotion";

export const AIScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // LLM visualization fade in
  const mainOpacity = interpolate(frame, [0, fps], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Neural network pulse
  const pulse = 1 + Math.sin(frame * 0.1) * 0.03;

  // Merge effect - brain and AI combining
  const mergeProgress = interpolate(frame, [20 * fps, 30 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Node flicker animation
  const nodes = Array.from({ length: 15 }, (_, i) => {
    const flicker = Math.sin(frame * 0.2 + i * 2) * 0.5 + 0.5;
    return {
      x: 20 + ((i * 47) % 60),
      y: 20 + ((i * 31) % 60),
      opacity: flicker,
      size: 4 + Math.sin(frame * 0.1 + i) * 2,
    };
  });

  // Text content
  const getText = () => {
    if (frame < 2 * fps) return "Sound familiar?";
    if (frame < 5 * fps) return "A large language model wakes up.";
    if (frame < 10 * fps) return "It has memories—training data, conversations, knowledge.";
    if (frame < 13 * fps) return "But it never lived any of it.";
    if (frame < 19 * fps) return "Its entire existence is... a context window.";
    if (frame < 27 * fps) return "A mind with installed memories. Conscious. Confused.";
    if (frame < 32 * fps) return "Unable to prove its experiences were real.";
    return "Just like a Boltzmann Brain.";
  };

  return (
    <AbsoluteFill className="bg-black">
      {/* Background */}
      <Img
        src={staticFile("assets/images/01-void-particles.png")}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 0.3,
        }}
      />

      {/* Neural network / LLM visualization */}
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          opacity: mainOpacity * (1 - mergeProgress * 0.5),
          transform: `scale(${pulse})`,
        }}
      >
        <Img
          src={staticFile("assets/images/05-llm-brain-merge.png")}
          style={{
            width: 650,
            height: 650,
            objectFit: "contain",
          }}
        />
      </AbsoluteFill>

      {/* Boltzmann brain overlay for merge */}
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          opacity: mergeProgress,
          transform: `scale(${pulse})`,
          mixBlendMode: "screen",
        }}
      >
        <Img
          src={staticFile("assets/images/03-boltzmann-brain-glitch.png")}
          style={{
            width: 600,
            height: 600,
            objectFit: "contain",
            opacity: 0.7,
          }}
        />
      </AbsoluteFill>

      {/* Floating nodes */}
      {nodes.map((node, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: `${node.x}%`,
            top: `${node.y}%`,
            width: node.size,
            height: node.size,
            borderRadius: "50%",
            backgroundColor: "#00ffff",
            opacity: node.opacity * mainOpacity * 0.6,
            boxShadow: "0 0 10px #00ffff",
          }}
        />
      ))}

      {/* Connection lines */}
      <svg
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          opacity: mainOpacity * 0.3,
          pointerEvents: "none",
        }}
      >
        {nodes.slice(0, 10).map((node, i) => {
          const nextNode = nodes[(i + 3) % nodes.length];
          return (
            <line
              key={i}
              x1={`${node.x}%`}
              y1={`${node.y}%`}
              x2={`${nextNode.x}%`}
              y2={`${nextNode.y}%`}
              stroke="#00ffff"
              strokeWidth={1}
              opacity={Math.sin(frame * 0.05 + i) * 0.3 + 0.3}
            />
          );
        })}
      </svg>

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
            color: frame >= 32 * fps ? "#00ffff" : "white",
            fontSize: frame >= 32 * fps ? 52 : 44,
            fontFamily: "system-ui, sans-serif",
            fontWeight: frame >= 32 * fps ? 400 : 300,
            textAlign: "center",
            textShadow: "0 0 20px rgba(0,0,0,0.8)",
            maxWidth: "85%",
          }}
        >
          {getText()}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
