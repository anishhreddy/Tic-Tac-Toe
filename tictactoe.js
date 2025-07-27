document.addEventListener("click", () => {
  const box = document.querySelectorAll(".innerelement");
  const buttonO = document.getElementById("o");
  const buttonX = document.getElementById("x");

  if (buttonX && buttonO) {
    buttonX.addEventListener("click", () => {
      localStorage.setItem("player", "X");
      location.href = "tictactoe2.html";
    });

    buttonO.addEventListener("click", () => {
      localStorage.setItem("player", "O");
      location.href = "tictactoe2.html";
    });
  }

  let player = localStorage.getItem("player");
  let isX = player === "X";

  box.forEach((singlebox) => {
    singlebox.addEventListener("click", () => {
      if (singlebox.innerHTML === "") {
        let img = document.createElement("img");
        if (isX) {
          img.src = "X.jpg";
        } else {
          img.src = "O.jpg";
        }

        img.style.height = "100%";
        img.style.width = "100%";

        singlebox.appendChild(img);

        setTimeout(() => {
          const XOwinner = winner();
          if (XOwinner) {
            alert(`${XOwinner} has WON!!!`);
            reset();
          } else {
            let allfilled = [...box].every((b) => b.querySelector("img"));
            if (allfilled) {
              alert("It's a DRAWWW!!!");
              reset();
            }
          }
        }, 60);

        isX = !isX;
      }
    });
  });

  const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  function winner() {
    for (let combo of winCombos) {
      let [a, b, c] = combo;
      let winA = box[a].querySelector("img");
      let winB = box[b].querySelector("img");
      let winC = box[c].querySelector("img");

      if (winA && winB && winC) {
        if (winA.src == winB.src && winB.src == winC.src) {
          return winA.src.includes("X.jpg") ? "X" : "O";
        }
      }
    }
    return null;
  }

  function reset() {
    box.forEach((box) => {
      box.innerHTML = "";
      isX = true;
    });
  }
});
