import { AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig, interpolate } from "remotion";

export const ObjectsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Apple fade in and scale (0-12 seconds in this scene)
  const appleOpacity = interpolate(frame, [0, fps, 12 * fps, 14 * fps], [0, 1, 1, 0], {
    extrapolateRight: "clamp",
  });

  const appleScale = interpolate(frame, [0, 2 * fps], [0.8, 1], {
    extrapolateRight: "clamp",
  });

  // Objects scene (after apple) - starts around 14 seconds
  const objectsOpacity = interpolate(frame, [14 * fps, 16 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Slow pulse effect
  const pulse = interpolate(
    frame % (2 * fps),
    [0, fps, 2 * fps],
    [1, 1.05, 1],
    { extrapolateRight: "clamp" }
  );

  // Text content based on timing
  const showAppleText = frame >= 5 * fps && frame < 12 * fps;
  const showObjectsText = frame >= 14 * fps && frame < 24 * fps;

  const getText = () => {
    if (frame < 5 * fps) return "Given enough time...";
    if (showAppleText) return "An apple. Complete. Perfect.";
    if (showObjectsText) return "A rock. A watch. A book no one wrote.";
    return "";
  };

  return (
    <AbsoluteFill className="bg-black">
      {/* Background void */}
      <Img
        src={staticFile("assets/images/01-void-particles.png")}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 0.5,
        }}
      />

      {/* Apple */}
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          opacity: appleOpacity,
          transform: `scale(${appleScale * pulse})`,
        }}
      >
        <Img
          src={staticFile("assets/images/02-apple-void.png")}
          style={{
            width: "60%",
            height: "60%",
            objectFit: "contain",
          }}
        />
      </AbsoluteFill>

      {/* Random objects */}
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          opacity: objectsOpacity,
        }}
      >
        <Img
          src={staticFile("assets/images/09-random-objects.png")}
          style={{
            width: "70%",
            height: "70%",
            objectFit: "contain",
          }}
        />
      </AbsoluteFill>

      {/* Text overlay */}
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
            opacity: interpolate(frame, [0, fps], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          {getText()}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
