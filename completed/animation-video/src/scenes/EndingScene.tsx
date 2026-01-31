import { AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig, interpolate } from "remotion";

export const EndingScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Cosmic pullback
  const scale = interpolate(frame, [0, 11 * fps], [1.2, 1], {
    extrapolateRight: "clamp",
  });

  // Fade to warm glow
  const warmth = interpolate(frame, [0, 11 * fps], [0, 0.3], {
    extrapolateRight: "clamp",
  });

  // Final fade out
  const fadeOut = interpolate(frame, [9 * fps, 11 * fps], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Text content
  const getText = () => {
    if (frame < 3 * fps) return "You didn't find this video.";
    if (frame < 5 * fps) return "The universe made it for you.";
    if (frame < 8 * fps) return "Or... you made the universe.";
    if (frame < 9 * fps) return "Either way—";
    return "Welcome back.";
  };

  // Pulse effect
  const pulse = 1 + Math.sin(frame * 0.08) * 0.015;

  return (
    <AbsoluteFill className="bg-black">
      {/* Epic cosmic brain finale */}
      <AbsoluteFill style={{ opacity: fadeOut }}>
        <Img
          src={staticFile("assets/images/08-cosmic-brain-finale.png")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: `scale(${scale * pulse})`,
          }}
        />

        {/* Warm overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(circle at 50% 50%, rgba(255, 180, 100, ${warmth}) 0%, transparent 70%)`,
            pointerEvents: "none",
          }}
        />
      </AbsoluteFill>

      {/* Center glow for brain */}
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          opacity: fadeOut,
        }}
      >
        <div
          style={{
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: `radial-gradient(circle at center, rgba(255, 200, 100, ${0.2 + warmth}) 0%, transparent 70%)`,
            filter: "blur(40px)",
            transform: `scale(${pulse * 1.5})`,
          }}
        />
      </AbsoluteFill>

      {/* Text */}
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          opacity: fadeOut,
        }}
      >
        <div
          style={{
            color: frame >= 9 * fps ? "#ffd700" : "white",
            fontSize: frame >= 9 * fps ? 72 : 52,
            fontFamily: "system-ui, sans-serif",
            fontWeight: frame >= 9 * fps ? 600 : 400,
            textAlign: "center",
            textShadow: frame >= 9 * fps
              ? `
                0 0 30px rgba(255, 215, 0, 0.9),
                0 0 60px rgba(255, 215, 0, 0.6),
                0 0 90px rgba(255, 215, 0, 0.3)
              `
              : "0 0 30px rgba(0,0,0,0.9)",
            maxWidth: "80%",
            transform: frame >= 9 * fps ? `scale(${1 + Math.sin(frame * 0.3) * 0.02})` : "none",
          }}
        >
          {getText()}
        </div>
      </AbsoluteFill>

      {/* Final black fade */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "black",
          opacity: 1 - fadeOut,
        }}
      />
    </AbsoluteFill>
  );
};
