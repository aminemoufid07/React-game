import React, { useEffect } from "react";

const Gimmick = () => {
  useEffect(() => {
    const gimmick = (el) => {
      const exists = document.getElementById("gimmick");
      if (exists) {
        exists.parentNode.removeChild(exists);
        return false;
      }

      const element = document.querySelector(el);
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      let focused = false;

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      canvas.id = "gimmick";

      const coin = new Image();
      coin.src = "http://i.imgur.com/5ZW2MT3.png";

      coin.onload = function () {
        element.appendChild(canvas);
        focused = true;
        drawloop();
      };

      const coins = [];

      function drawloop() {
        if (focused) {
          requestAnimationFrame(drawloop);
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (Math.random() < 0.3) {
          coins.push({
            x: (Math.random() * canvas.width) | 0,
            y: -50,
            dy: 3,
            s: 0.5 + Math.random(),
            state: (Math.random() * 10) | 0,
          });
        }

        let i = coins.length;
        while (i--) {
          const x = coins[i].x;
          const y = coins[i].y;
          const s = coins[i].s;
          const state = coins[i].state;
          coins[i].state = state > 9 ? 0 : state + 0.1;
          coins[i].dy += 0.3;
          coins[i].y += coins[i].dy;

          ctx.drawImage(
            coin,
            44 * Math.floor(state),
            0,
            44,
            40,
            x,
            y,
            44 * s,
            40 * s
          );

          if (y > canvas.height) {
            coins.splice(i, 1);
          }
        }
      }

      const button = document.querySelector("button");
      button.onclick = function () {
        gimmick("body");
      };
    };

    gimmick("body");

    // Cleanup function (equivalent to componentWillUnmount in class components)
    return () => {
      const canvas = document.getElementById("gimmick");
      if (canvas) {
        canvas.parentNode.removeChild(canvas);
      }
    };
  }, []);

  return <div />; // You can return any JSX here based on your needs
};

export default Gimmick;
