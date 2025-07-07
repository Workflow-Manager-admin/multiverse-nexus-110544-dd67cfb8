/**
 * Animated starfield canvas - full viewport.
 * Cinematic, immersive multiverse background.
 */
import React, { useRef, useEffect } from "react";

// PUBLIC_INTERFACE
function StarfieldBackground() {
  const canvasRef = useRef();

  useEffect(() => {
    const amount = Math.floor(window.innerWidth * 0.22);
    const ctx = canvasRef.current.getContext("2d");
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvasRef.current.width = width;
    canvasRef.current.height = height;

    let stars = [];
    for (let i = 0; i < amount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.6 + 0.5,
        speed: Math.random() * 1 + 0.15,
        alpha: Math.random() * 0.65 + 0.2
      });
    }

    let running = true;
    function animate() {
      if (!running) return;
      ctx.clearRect(0, 0, width, height);
      for (const star of stars) {
        ctx.save();
        ctx.globalAlpha = star.alpha;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, 2 * Math.PI);
        ctx.fillStyle = "#0FFFE9";
        ctx.shadowBlur = 9;
        ctx.shadowColor = "#0FFFE9";
        ctx.fill();
        ctx.restore();
        // "move" star (slow scroll upward)
        star.y -= star.speed;
        if (star.y < 0) {
          star.y = height;
          star.x = Math.random() * width;
        }
      }
      requestAnimationFrame(animate);
    }
    animate();

    return () => { running = false; };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="starfield-bg"
      style={{
        position: "fixed", inset: 0, width: "100vw", height: "100vh",
        zIndex: 0, pointerEvents: "none", background: "linear-gradient(180deg, #2B133E 0%, #091C3A 80%)"
      }}
    />
  );
}

export default StarfieldBackground;
