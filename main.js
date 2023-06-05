const clipBoard = getClipBoard();
const inList = `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
const outList = `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus"><line x1="12" x2="12" y1="5" y2="19"></line><line x1="5" x2="19" y1="12" y2="12"></line></svg>`;
/*
 * Button functionality
 */
document.querySelectorAll(".card-grid-item").forEach((e) => {
  const title = e
    .querySelector(".card-grid-item-invisible-label")
    .innerHTML.trim();
  const button = document.createElement("button");
  button.classList.add("check-button");

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

/*
 * Menu functionality
 */
const reference = document.querySelector(".search-info");
const clipBoardBar = document.createElement("div");
clipBoardBar.classList.add("clipboard-bar");

const copyButton = document.createElement("button");
copyButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-paperclip"><path class="no-fill" d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg><b>Copy</b>`;
copyButton.classList.add("button-n");

const clearButton = document.createElement("button");
clearButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eraser"><path class="no-fill" d="m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21"></path><path d="M22 21H7"></path><path d="m5 11 9 9"></path></svg><b>Clear</b>`;
clearButton.classList.add("button-n");

clipBoardBar.appendChild(copyButton);
clipBoardBar.appendChild(clearButton);

insertAfter(clipBoardBar, reference);

function insertAfter(newNode, existingNode) {
  existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
}

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
