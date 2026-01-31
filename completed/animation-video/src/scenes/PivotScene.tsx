import { AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig, interpolate } from "remotion";

export const PivotScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Screen in void fade in
  const screenOpacity = interpolate(frame, [0, fps], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Multiple screens appearing
  const multipleScreensOpacity = interpolate(frame, [12 * fps, 15 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Screens dissolving (except center)
  const dissolveProgress = interpolate(frame, [18 * fps, 22 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Zoom towards viewer
  const zoom = interpolate(frame, [0, 24 * fps], [1, 1.3], {
    extrapolateRight: "clamp",
  });

  // Text content
  const getText = () => {
    if (frame < 2 * fps) return "Just like... you.";
    if (frame < 5 * fps) return "How do you know your memories are real?";
    if (frame < 8 * fps) return "That yesterday happened?";
    if (frame < 12 * fps) return "That your childhood wasn't installed five minutes ago?";
    if (frame < 17 * fps) return "Everyone you know could be a Boltzmann Brain.";
    if (frame < 20 * fps) return "Flickering in and out. Thinking they're real.";
    if (frame < 22 * fps) return "Or maybe... they're not even that.";
    return "Maybe you're the only one.";
  };

  // Side screens (representing other people)
  const sideScreens = [
    { x: -300, y: -150, scale: 0.4, delay: 0 },
    { x: 350, y: -120, scale: 0.35, delay: 0.5 },
    { x: -280, y: 180, scale: 0.38, delay: 1 },
    { x: 320, y: 200, scale: 0.42, delay: 1.5 },
    { x: -450, y: 30, scale: 0.3, delay: 2 },
    { x: 480, y: 50, scale: 0.32, delay: 2.5 },
  ];

  return (
    <AbsoluteFill className="bg-black">
      {/* Void background */}
      <Img
        src={staticFile("assets/images/01-void-particles.png")}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 0.4,
        }}
      />

      {/* Central screen (the viewer) */}
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          opacity: screenOpacity,
          transform: `scale(${zoom})`,
        }}
      >
        <div style={{ position: "relative" }}>
          {/* Side screens */}
          {sideScreens.map((screen, i) => {
            const screenFade = interpolate(
              frame,
              [12 * fps + screen.delay * fps, 14 * fps + screen.delay * fps],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );
            const screenDissolve = 1 - dissolveProgress;

            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: `translate(${screen.x}px, ${screen.y}px) scale(${screen.scale})`,
                  opacity: screenFade * multipleScreensOpacity * screenDissolve,
                }}
              >
                <Img
                  src={staticFile("assets/images/06-screen-in-void.png")}
                  style={{
                    width: 400,
                    height: 400,
                    objectFit: "contain",
                    filter: `blur(${dissolveProgress * 5}px)`,
                  }}
                />
              </div>
            );
          })}

          {/* Main screen */}
          <Img
            src={staticFile("assets/images/06-screen-in-void.png")}
            style={{
              width: 500,
              height: 500,
              objectFit: "contain",
            }}
          />

          {/* "YOU" indicator */}
          {frame >= 2 * fps && (
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                color: "#ff6b6b",
                fontSize: 72,
                fontWeight: "bold",
                fontFamily: "system-ui, sans-serif",
                textShadow: "0 0 30px rgba(255,107,107,0.8)",
                opacity: interpolate(frame, [2 * fps, 3 * fps], [0, 1], { extrapolateRight: "clamp" }),
              }}
            >
              YOU
            </div>
          )}
        </div>
      </AbsoluteFill>

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
            color: frame >= 22 * fps ? "#ffcc00" : "white",
            fontSize: frame >= 22 * fps ? 56 : 44,
            fontFamily: "system-ui, sans-serif",
            fontWeight: frame >= 22 * fps ? 500 : 300,
            textAlign: "center",
            textShadow: "0 0 20px rgba(0,0,0,0.9)",
            maxWidth: "85%",
          }}
        >
          {getText()}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
