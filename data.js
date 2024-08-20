// Shuffle function using Fisher-Yates algorithm
function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

const emojis = [
  "🥦",
  "🥦",
  "🌶️",
  "🌶️",
  "🍒",
  "🍒",
  "🍌",
  "🍌",
  "🍉",
  "🍉",
  "🍎",
  "🍎",
  "🍍",
  "🍍",
  "🍓",
  "🍓",
];

// Shuffle emojis
const shuf_emojis = shuffle([...emojis]);

const container = document.querySelector(".game"); // Container where boxes will be appended
let openBoxes = []; // Track opened boxes

// Create game boxes
shuf_emojis.forEach((emoji, index) => {
  let box = document.createElement("div");
  box.className = "item";
  box.innerHTML = emoji;
  box.dataset.index = index; // Store index to uniquely identify boxes

  box.onclick = function () {
    if (openBoxes.length < 2 && !this.classList.contains("boxOpen")) {
      this.classList.add("boxOpen");
      openBoxes.push(this);

      if (openBoxes.length === 2) {
        setTimeout(() => {
          if (openBoxes[0].innerHTML === openBoxes[1].innerHTML) {
            openBoxes.forEach((box) => {
              box.classList.add("boxMatch");
              box.classList.remove("boxOpen");
            });

            // Check win condition
            if (
              document.querySelectorAll(".boxMatch").length === emojis.length
            ) {
              alert("Mantap Gan Kamu Menang🥳");
            }
          } else {
            openBoxes.forEach((box) => {
              box.classList.remove("boxOpen");
            });
          }
          openBoxes = []; // Reset openBoxes after comparison
        }, 500);
      }
    }
  };

  container.appendChild(box);
});
