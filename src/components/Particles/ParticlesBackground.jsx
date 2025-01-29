import React from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { useEffect, useMemo, useState } from "react";
import { loadSlim } from "@tsparticles/slim";

const ParticlesBackground = ({ id = "tsparticles" }) => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine); 
    }).then(() => setInit(true));
  }, []);

  const options = useMemo(
    () => ({
      fullScreen: { enable: false },
      background: { color: { value: "#6938F3" } },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: { enable: true, mode: "repulse" },
          onHover: { enable: true, mode: "grab" },
        },
        modes: {
          grab: { distance: 150 },
          repulse: { distance: 200, duration: 1 },
        },
      },
      particles: {
        color: { value: "#FFFFFF" },
        links: {
          color: "#FFFFFF",
          distance: 150,
          enable: true,
          opacity: 0.3,
          width: 1,
        },
        move: {
          enable: true,
          speed: 1,
          outModes: { default: "bounce" },
        },
        number: { value: 150, density: { enable: true, area: 800 } },
        opacity: { value: 0.8 },
        shape: { type: "circle" },
        size: { value: { min: 1, max: 3 } },
      },
      detectRetina: true,
    }),
    []
  );

  return (
    <Particles
      id={id}
      options={options}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%", // Let the particle background fill the entire parent
      }}
    />
  );
};

export default ParticlesBackground;
