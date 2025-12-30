import { useLayoutEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import useWindowStore from "#store/window.js";
import Draggable from "gsap/Draggable.js";

import gsap from "gsap";

const WindowWrapper = (Component, windowKey) => {
  const Wrapped = (props) => {
    const { focusWindow, windows } = useWindowStore();
    const { isOpen, zIndex } = windows[windowKey];
    const ref = useRef(null);

 

    useGSAP(() => {
      const el = ref.current;
      if (!el || !isOpen) return;
      el.style.display = "block";

      gsap.fromTo(
        el,
        { scale: 0.8, opacity: 0, y: 40 },
        { scale: 1, opacity: 1, y: 0, duration: 0.3, ease: "power3.out" }
      );
    }, [isOpen]);

    //dragging window logic
    useGSAP(() => {
      const el = ref.current;
      if (!el) return;
      const [instance] = Draggable.create(el, {
        onPress: () => focusWindow(windowKey),
      });
      return () => instance.kill();
    },[]);

    useLayoutEffect(() => {
      const el = ref.current;
      if (!el) return;
      el.style.display = isOpen ? "block" : "none";
    }, [isOpen]);

    return (
      <section id={windowKey} ref={ref} style={{ zIndex }} className='absolute'>
        <Component {...props} />
      </section>
    );
  };

  Wrapped.displayName = `WindowWrapper(${
    Component.displayName || Component.name || "Component"
  })`;
  return Wrapped;
};
export default WindowWrapper;

//closing window logic when you close

// import { useLayoutEffect, useRef } from "react";
// import { useGSAP } from "@gsap/react";
// import useWindowStore from "#store/window.js";
// import gsap from "gsap";

// const WindowWrapper = (Component, windowKey) => {
//   const Wrapped = (props) => {
//     const { focusWindow, windows } = useWindowStore();
//     const { isOpen, zIndex } = windows[windowKey];
//     const ref = useRef(null);

//     // -----------------------------
//     // 🟢 OPEN ANIMATION (unchanged)
//     // -----------------------------
//     useGSAP(() => {
//       const el = ref.current;
//       if (!el || !isOpen) return;

//       el.style.display = "block";

//       gsap.fromTo(
//         el,
//         { scale: 0.8, opacity: 0, y: 40 },
//         { scale: 1, opacity: 1, y: 0, duration: 0.25, ease: "power3.out" }
//       );
//     }, [isOpen]);

//     // ----------------------------------------
//     // 🔥 CLOSE/MINIMIZE TO DOCK ANIMATION
//     // ----------------------------------------
//     useLayoutEffect(() => {
//       const el = ref.current;
//       if (!el) return;

//       if (!isOpen) {
//         // Location of dock icon for this window
//         const dockBtn = document.querySelector(
//           `.dock-icon[data-app="${windowKey}"]`
//         );

//         if (!dockBtn) {
//           // fallback: instantly hide
//           el.style.display = "none";
//           return;
//         }

//         const dockRect = dockBtn.getBoundingClientRect();
//         const winRect = el.getBoundingClientRect();

//         // Calculate animation target (X,Y)
//         const targetX = dockRect.left - winRect.left + dockRect.width / 2 - winRect.width / 2;
//         const targetY = dockRect.top - winRect.top;

//         gsap.to(el, {
//           scale: 0.1,
//           opacity: 0,
//           x: targetX,
//           y: targetY,
//           duration: 0.35,
//           ease: "power2.inOut",
//           onComplete: () => {
//             // reset transforms
//             gsap.set(el, { clearProps: "all" });
//             el.style.display = "none";
//           },
//         });

//         return;
//       }

//       el.style.display = "block";
//     }, [isOpen]);

//     return (
//       <section
//         id={windowKey}
//         ref={ref}
//         style={{ zIndex }}
//         className="absolute window-wrapper"
//       >
//         <Component {...props} />
//       </section>
//     );
//   };

//   Wrapped.displayName = `WindowWrapper(${
//     Component.displayName || Component.name || "Component"
//   })`;

//   return Wrapped;
// };

// export default WindowWrapper;
