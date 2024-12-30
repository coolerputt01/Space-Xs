//Space Xs AOS.
AOS.init({
    duration: 750,  // Animation duration in ms
    easing: 'ease-in-out',  // Easing function
    once: false,  // Trigger the animation only once
    mirror: false,  // Reverse the animation when scrolling back up
});
//Space Xs Particle JS.
// Initialize particles.js
particlesJS('particles-js', {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 800
      }
    },
    color: {
      value: "#ffffff"
    },
    shape: {
      type: "circle",
      stroke: {
        width: 0,
        color: "#000000"
      },
      polygon: {
        nb_sides: 5
      }
    },
    opacity: {
      value: 0.5,
      random: true,
      anim: {
        enable: true,
        speed: 1,
        opacity_min: 0,
        sync: false
      }
    },
    size: {
      value: 10,
      random: true,
      anim: {
        enable: true,
        speed: 40,
        size_min: 0,
        sync: false
      }
    },
    line_linked: {
      enable: false,
      distance: 150,
      color: "#ffffff",
      opacity: 0.4,
      width: 1
    },
    move: {
      enable: true,
      speed: 4,
      direction: "none",
      random: false,
      straight: false,
      out_mode: "out",
      bounce: false
    }
  },
  retina_detect: true
});
//Handle redirect.
const spaceButton = document.querySelector('.space-x-button');
spaceButton.addEventListener('click',()=>{
  document.location.href = "index.html";
});