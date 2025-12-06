// import React, { useRef } from "react";
// import gsap from "gsap";
// import { useGSAP } from "@gsap/react";

// const FONT_WEIGHTS = {
//   title: { min: 100, max: 900, default: 400 },
//   subtitle: { min: 100, max: 900, default: 400 },
// };

// const renderText = (text, className, baseWeight = 400) => {
//   return [...text].map((char, i) => (
//     <span
//       key={i}
//       className={className}
//       style={{ fontVariationSettings: `'wght' ${baseWeight}` }}>
//       {char === " " ? "\u00A0" : char}
//     </span>
//   ));
// };

// const setupTextHover = (container, type) => {
//   if (!container) return;

//   const letters = container.querySelectorAll("span");
//   const { min, max, default: base } = FONT_WEIGHTS[type];
//   const animateLetter = (letter, weight, duration = 0.25) => {
//     return gsap.to(letter, {
//       duration,
//       ease: "power2.out",
//       fontVariationSettings: `'wght' ${weight}`,
//     });
//   };
//   const handleMouseMove = (e) => {
//     const { left } = container.getBoundingClientRect();
//     const mouseX = e.clientX - left;

//     letters.forEach((letter) => {
//       const { left: l, width: w } = letter.getBoundingClientRect();
//       const distance = Math.abs(mouseX - (l - left + w / 2));
//       const intensity = Math.exp(-(distance ** 2) / 2000);

//       animateLetter(letter, min + (max - min) * intensity);
//     });
//   };
//   const handleMouseLeave = () =>
//     letters.forEach((letter) => animateLetter(letter, base, 0.3));

//   container.addEventListener("mousemove", handleMouseMove);
//   container.addEventListener("mouseleave", handleMouseLeave);

//   return () => {
//     container.removeEventListener("mousemove", handleMouseMove);
//     container.removeEventListener("mouseleave", handleMouseLeave);
//   };
// };

// const Welcome = () => {
//   const titleRef = useRef(null);
//   const subtitleRef = useRef(null);
//   useGSAP(() => {
//     const titleCleanup = setupTextHover(titleRef.current, "title");
//     const subtitleCleanup = setupTextHover(subtitleRef.current, "subtitle");
//     return () => {
//       subtitleCleanup();
//       titleCleanup();
//     };
//   }, []);
//   return (
//     <section id='welcome'>
//       <p ref={subtitleRef}>
//         {renderText(
//           "hey,I'm Akash! Welcome to my",
//           "text-3xl font-georama",
//           100
//         )} {" "}
//       </p>
//       <h1 ref={titleRef} className='mt-7'>
//         {renderText("Portfolio", "text-9xl italic font-georama")}
//       </h1>
//       <div className='small-screen'>
//         <p>This portfolio is designed for desktop/tablet screen only. </p>
//       </div>
//     </section>
//   );
// };

// export default Welcome;

// src/components/Welcome.jsx
import React, { useRef, useEffect } from "react";
import gsap from "gsap";

/**
 * Welcome (debug / guaranteed-visible) component
 * - Logs letter counts to console
 * - Uses RAF + GSAP for smooth, consistent per-letter scale animation
 * - Uses obvious scale values so it's easy to see
 * - Inline styles ensure no external CSS is required for core behavior
 */

const renderText = (text) =>
  [...text].map((ch, i) => (
    <span
      key={i}
      className='animated-letter'
      style={{
        display: "inline-block",
        willChange: "transform, opacity",
        transformOrigin: "center center",
        userSelect: "none",
      }}>
      {ch === " " ? "\u00A0" : ch}
    </span>
  ));

const useRAFAnimation = (containerRef, config) => {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      console.warn("[Welcome] container not found");
      return;
    }

    const letters = Array.from(container.querySelectorAll(".animated-letter"));
    console.log(
      `[Welcome] letters found for "${container.id || container.className}":`,
      letters.length
    );

    // baseline
    letters.forEach((l) => gsap.set(l, { scale: 1, force3D: true }));

    let mouseX = -9999;
    let running = true;
    let rafId = null;

    const onMove = (e) => {
      mouseX = e.clientX - container.getBoundingClientRect().left;
    };
    const onLeave = () => {
      mouseX = -9999;
    };

    container.addEventListener("mousemove", onMove);
    container.addEventListener("mouseleave", onLeave);

    const loop = () => {
      if (!running) return;
      const rect = container.getBoundingClientRect();

      letters.forEach((letter) => {
        const { left: l, width: w } = letter.getBoundingClientRect();
        const center = l - rect.left + w / 2;
        const dist = Math.abs(mouseX - center);

        const intensity =
          mouseX === -9999 ? 0 : Math.exp(-(dist * dist) / config.spread);
        const scale = 1 + (config.maxScale - 1) * intensity;

        if (Math.abs(scale - (letter._lastScale || 1)) > 0.004) {
          gsap.to(letter, {
            scale,
            duration: config.duration,
            ease: "power2.out",
            overwrite: true,
            force3D: true,
          });
          letter._lastScale = scale;
        }
      });

      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);

    return () => {
      running = false;
      if (rafId) cancelAnimationFrame(rafId);
      container.removeEventListener("mousemove", onMove);
      container.removeEventListener("mouseleave", onLeave);
      letters.forEach((l) =>
        gsap.to(l, { scale: 1, duration: 0.2, overwrite: true })
      );
    };
  }, [containerRef, config.spread, config.maxScale, config.duration]);
};

const Welcome = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  // Tweak these values for stronger/weaker or broader/narrower effects
  const titleConfig = { maxScale: 1.25, spread: 1800, duration: 0.14 };
  const subtitleConfig = { maxScale: 1.22, spread: 9000, duration: 0.14 };

  useRAFAnimation(titleRef, titleConfig);
  useRAFAnimation(subtitleRef, subtitleConfig);

  useEffect(() => {
    console.log(
      "[Welcome] mounted - move mouse over subtitle and title to test"
    );
  }, []);

  return (
    <section
      id='welcome-wrapper'
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        color: "#E5E7EB", // text-gray-200
      }}>
      <p
        id='welcome-subtitle'
        ref={subtitleRef}
        className='welcome-subtitle'
        style={{
          fontSize: "1.75rem", // ~text-3xl
          margin: 0,
          lineHeight: 1.2,
          fontFamily: "Georama, system-ui, sans-serif",
        }}>
        {renderText("hey, I'm Akash! Welcome to my")}
      </p>

      <h1
        id='welcome-title'
        ref={titleRef}
        className='welcome-title'
        style={{
          marginTop: "1.75rem",
          fontSize: "5.5rem", // adjust to fit your design, ~text-9xl
          fontStyle: "italic",
          lineHeight: 0.95,
          fontFamily: "Georama, system-ui, sans-serif",
          display: "block",
        }}>
        {renderText("Portfolio")}
      </h1>

      <div
        className='small-screen-note'
        style={{
          display: "none", // keep hidden unless you want to show on small screens
          position: "absolute",
          top: 10,
          background: "rgba(239, 68, 68, 0.12)", // red-300/20
          backdropFilter: "blur(6px)",
          padding: "0.5rem 0.75rem",
          borderRadius: 8,
        }}>
        <p style={{ margin: 0, fontSize: "0.95rem", color: "#9CA3AF" }}>
          This portfolio is designed for desktop/tablet screen only.
        </p>
      </div>
    </section>
  );
};

export default Welcome;
