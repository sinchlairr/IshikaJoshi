import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(MotionPathPlugin);

const flightpath={
    curviness: 1.25,
    autoRotate: true,
    values: [{x:100, y: -20}]
};

const tween= new TimelineLite();
tween.add(
    TweenLite.to(".paper-plane", {
        duration: 1,
        ease: "power1.inOut",
        motionPath: {
          path: [{x: 100, y: -20}], // you probably want more points here...or just use an SVG <path>!
          curviness: 2,
          autoRotate: true
        }
      }));