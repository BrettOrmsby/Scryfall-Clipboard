const clipBoard = getClipBoard();
const inList = `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
const outList = `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus"><line x1="12" x2="12" y1="5" y2="19"></line><line x1="5" x2="19" y1="12" y2="12"></line></svg>`;

document.querySelectorAll(".card-grid-item").forEach((e) => {
  const title = e
    .querySelector(".card-grid-item-invisible-label")
    .innerHTML.trim();
  const button = document.createElement("button");
  button.style = `
    z-index: 200; 
    padding: 2%;
    background-color: rgba(53,59,65,.8);
    color: white;
    position:absolute; 
    height: 10%;
    aspect-ratio: 1 / 1;
    border-radius: 10%;
    top: 30%; 
    left: 5%;
    `;
  e.appendChild(button);
  if (clipBoard.includes(title)) {
    button.setAttribute("data-is-in-deck", "true");
    button.innerHTML = inList;
  } else {
    button.setAttribute("data-is-in-deck", "false");
    button.innerHTML = outList;
  }
  button.addEventListener("click", (e) => {
    if (button.getAttribute("data-is-in-deck") === "false") {
      localStorage.setItem(
        "clipBoard",
        JSON.stringify([...getClipBoard(), title])
      );
      button.innerHTML = inList;
      button.setAttribute("data-is-in-deck", "true");
    } else {
      localStorage.setItem(
        "clipBoard",
        JSON.stringify(getClipBoard().filter((e) => e != title))
      );
      button.innerHTML = outList;
      button.setAttribute("data-is-in-deck", "false");
    }
  });
});

function getClipBoard() {
  let clipBoard;
  const local = localStorage.getItem("clipBoard");
  if (local) {
    clipBoard = JSON.parse(local);
  } else {
    clipBoard = [];
  }
  return clipBoard;
}
