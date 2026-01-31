import { AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig, interpolate } from "remotion";

export const MemoriesScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Brain with memories fade in
  const mainOpacity = interpolate(frame, [0, fps], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Crack effect starts at "The math is brutal" (~17 seconds in)
  const crackProgress = interpolate(frame, [17 * fps, 23 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Memory fragments floating animation
  const floatOffset = Math.sin(frame * 0.05) * 10;

  // Text content
  const getText = () => {
    if (frame < 4 * fps) return "What's easier to assemble by chance?";
    if (frame < 11 * fps) return "An entire universe... billions of galaxies, trillions of stars...";
    if (frame < 13 * fps) return "Or just a brain?";
    if (frame < 17 * fps) return "With false memories already installed?";
    return "The math is brutal.";
  };

  const getSubtext = () => {
    if (frame >= 17 * fps) return "A brain with fake memories is infinitely more likely.";
    return "";
  };

  return (
    <AbsoluteFill className="bg-black">
      {/* Cosmic background */}
      <Img
        src={staticFile("assets/images/08-cosmic-brain-finale.png")}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 0.4,
          filter: "blur(5px) saturate(0.8)",
        }}
      />

      {/* Brain with memories */}
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          opacity: mainOpacity,
          transform: `translateY(${floatOffset}px)`,
        }}
      >
        <div style={{ position: "relative" }}>
          <Img
            src={staticFile("assets/images/04-brain-with-memories.png")}
            style={{
              width: 700,
              height: 700,
              objectFit: "contain",
            }}
          />

          {/* Crack overlay effect */}
          {crackProgress > 0 && (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: `radial-gradient(circle at 50% 50%,
                  transparent ${70 - crackProgress * 30}%,
                  rgba(255,100,100,${crackProgress * 0.3}) ${80 - crackProgress * 20}%,
                  transparent ${90 - crackProgress * 10}%)`,
                pointerEvents: "none",
              }}
            />
          )}

          {/* Glitch lines on crack */}
          {crackProgress > 0.3 && (
            <>
              <div
                style={{
                  position: "absolute",
                  top: "40%",
                  left: "20%",
                  width: "60%",
                  height: 2,
                  background: "rgba(255, 50, 50, 0.8)",
                  transform: `rotate(${15 + Math.sin(frame) * 5}deg)`,
                  opacity: crackProgress,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: "55%",
                  left: "30%",
                  width: "40%",
                  height: 2,
                  background: "rgba(255, 50, 50, 0.6)",
                  transform: `rotate(${-20 + Math.cos(frame) * 5}deg)`,
                  opacity: crackProgress,
                }}
              />
            </>
          )}
        </div>
      </AbsoluteFill>

      {/* Text */}
      <AbsoluteFill
        style={{
          justifyContent: "flex-end",
          alignItems: "center",
          paddingBottom: 100,
        }}
      >
        <div
          style={{
            color: "white",
            fontSize: 44,
            fontFamily: "system-ui, sans-serif",
            fontWeight: 300,
            textAlign: "center",
            textShadow: "0 0 20px rgba(0,0,0,0.8)",
            maxWidth: "80%",
          }}
        >
          {getText()}
        </div>
        {getSubtext() && (
          <div
            style={{
              color: "#ff6b6b",
              fontSize: 36,
              fontFamily: "system-ui, sans-serif",
              fontWeight: 400,
              textAlign: "center",
              marginTop: 20,
              opacity: interpolate(frame, [17 * fps, 18 * fps], [0, 1], { extrapolateRight: "clamp" }),
            }}
          >
            {getSubtext()}
          </div>
        )}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
