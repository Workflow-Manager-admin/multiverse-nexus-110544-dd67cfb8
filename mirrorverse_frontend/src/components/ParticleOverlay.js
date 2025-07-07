/**
 * Neon/gradient particles with glowing motion (foreground decor).
 * Renders above the background but below main UI panels.
 */
import React, { useRef, useEffect } from "react";

const colorStops = [
  "rgba(13,255,230,0.6)",
  "rgba(255,40,180,0.5)",
  "rgba(0,240,255,0.38)",
  "rgba(255,255,255,0.12)",
];

// PUBLIC_INTERFACE
function ParticleOverlay() {
  const ref = useRef();
  useEffect(() => {
    const amount = 18;
    const el = ref.current;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let particles = [];
    for (let i = 0; i < amount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 28 + 16,
        dx: Math.random() * 0.36 + 0.18,
        dy: Math.random() * 0.13 - 0.066,
        color: colorStops[Math.floor(Math.random() * colorStops.length)]
      });
    }
    let requestId;
    function animate() {
      el.width = width;
      el.height = height;
      const ctx = el.getContext("2d");
      ctx.clearRect(0,0,width,height);
      for (const p of particles) {
        const grad = ctx.createRadialGradient(p.x, p.y, p.r*0.18, p.x, p.y, p.r);
        grad.addColorStop(0, p.color);
        grad.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 2*Math.PI);
        ctx.fillStyle = grad;
        ctx.fill();
        // Move
        p.x += p.dx;
        p.y += p.dy;
        // bounce
        if (p.x < -p.r) p.x = width + p.r;
        if (p.x > width + p.r) p.x = -p.r;
        if (p.y < -p.r) p.y = height + p.r;
        if (p.y > height + p.r) p.y = -p.r;
      }
      requestId = requestAnimationFrame(animate);
    }
    animate();
    return () => cancelAnimationFrame(requestId);
  }, []);

  return (
    <canvas
      ref={ref}
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 1,
        pointerEvents: "none"
      }}
    />
  );
}
export default ParticleOverlay;
