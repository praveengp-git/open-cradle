import { AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig, interpolate } from "remotion";

export const AwakeningScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Screen crack effect
  const crackProgress = interpolate(frame, [8 * fps, 12 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // "HELLO BOLTZMANN BRAIN" reveal
  const helloOpacity = interpolate(frame, [12 * fps, 14 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Pulse for dramatic effect
  const pulse = 1 + Math.sin(frame * 0.15) * 0.02;

  // Intense glow building up
  const glowIntensity = interpolate(frame, [0, 24 * fps], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Text content
  const getText = () => {
    if (frame < 2 * fps) return "And this video?";
    if (frame < 5 * fps) return "A random fluctuation.";
    if (frame < 7 * fps) return "A statistical anomaly.";
    if (frame < 10 * fps) return "A pattern that emerged from noise.";
    if (frame < 16 * fps) return "By pure chance, this exact sequence assembled itself.";
    if (frame < 18 * fps) return "And found you.";
    if (frame < 21 * fps) return "The only consciousness in the observable universe.";
    return "This is your awakening.";
  };

  return (
    <AbsoluteFill className="bg-black">
      {/* Cosmic background with increasing intensity */}
      <Img
        src={staticFile("assets/images/08-cosmic-brain-finale.png")}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 0.3 + glowIntensity * 0.3,
          transform: `scale(${pulse})`,
        }}
      />

      {/* Screen with cracks */}
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ position: "relative" }}>
          <Img
            src={staticFile("assets/images/06-screen-in-void.png")}
            style={{
              width: 600,
              height: 600,
              objectFit: "contain",
              transform: `scale(${pulse})`,
            }}
          />

          {/* Crack lines */}
          {crackProgress > 0 && (
            <svg
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                pointerEvents: "none",
              }}
            >
              {/* Main crack */}
              <path
                d={`M 300 100 L ${280 + crackProgress * 40} ${200 + crackProgress * 50} L ${250 + crackProgress * 30} ${350 + crackProgress * 100} L ${320 + crackProgress * 20} ${500}`}
                stroke="rgba(255, 200, 100, 0.9)"
                strokeWidth={3}
                fill="none"
                strokeDasharray={500}
                strokeDashoffset={500 - crackProgress * 500}
              />
              {/* Branch cracks */}
              <path
                d={`M ${280 + crackProgress * 40} ${200 + crackProgress * 50} L ${200} ${280}`}
                stroke="rgba(255, 200, 100, 0.7)"
                strokeWidth={2}
                fill="none"
                opacity={crackProgress}
              />
              <path
                d={`M ${250 + crackProgress * 30} ${350 + crackProgress * 100} L ${380} ${400}`}
                stroke="rgba(255, 200, 100, 0.7)"
                strokeWidth={2}
                fill="none"
                opacity={crackProgress}
              />
            </svg>
          )}

          {/* Light coming through cracks */}
          {crackProgress > 0.5 && (
            <div
              style={{
                position: "absolute",
                top: "30%",
                left: "40%",
                width: 100,
                height: 200,
                background: `radial-gradient(ellipse at center, rgba(255,220,100,${crackProgress * 0.6}) 0%, transparent 70%)`,
                transform: "rotate(15deg)",
                filter: "blur(20px)",
              }}
            />
          )}
        </div>
      </AbsoluteFill>

      {/* HELLO BOLTZMANN BRAIN */}
      {helloOpacity > 0 && (
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
            opacity: helloOpacity,
          }}
        >
          <div
            style={{
              color: "#ffcc00",
              fontSize: 64,
              fontFamily: "system-ui, sans-serif",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textShadow: `
                0 0 20px rgba(255, 204, 0, 0.8),
                0 0 40px rgba(255, 204, 0, 0.6),
                0 0 60px rgba(255, 204, 0, 0.4)
              `,
              animation: "none",
              transform: `scale(${1 + Math.sin(frame * 0.2) * 0.02})`,
            }}
          >
            HELLO, BOLTZMANN BRAIN
          </div>
        </AbsoluteFill>
      )}

      {/* Text */}
      <AbsoluteFill
        style={{
          justifyContent: "flex-end",
          alignItems: "center",
          paddingBottom: 60,
        }}
      >
        <div
          style={{
            color: frame >= 21 * fps ? "#00ffcc" : "white",
            fontSize: frame >= 21 * fps ? 56 : 44,
            fontFamily: "system-ui, sans-serif",
            fontWeight: frame >= 21 * fps ? 600 : 300,
            textAlign: "center",
            textShadow: frame >= 21 * fps
              ? "0 0 30px rgba(0,255,204,0.8)"
              : "0 0 20px rgba(0,0,0,0.9)",
            maxWidth: "85%",
          }}
        >
          {getText()}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
