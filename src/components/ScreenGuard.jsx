import { useEffect, useState } from "react";

const ScreenGuard = ({ children }) => {
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const checkScreen = () => {
      setIsDesktop(window.innerWidth >= 1024); // desktop & laptop only
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  if (!isDesktop) {
    return (
      <div
        style={{
          height: "100dvh",
          width: "100dvw",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0f172a",
          color: "#e5e7eb",
          textAlign: "center",
          padding: "1.5rem",
        }}
      >
        <div>
          <h1 style={{ fontSize: "1.8rem", fontWeight: 600 }}>
            Desktop Experience Only 💻
          </h1>
          <p style={{ marginTop: "1rem", fontSize: "1rem", color: "#9ca3af" }}>
            This portfolio is designed specifically for desktop and laptop
            screens.
            <br />
            Please open it on a larger screen for the best experience.
          </p>
        </div>
      </div>
    );
  }

  return children;
};

export default ScreenGuard;
