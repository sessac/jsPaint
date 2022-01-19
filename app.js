const canvas = document.querySelector("#jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.querySelectorAll(".jsColors");
const range = document.querySelector("#jsRange");
const newButton = document.querySelector("#jsNew");
const modeButton = document.querySelector("#jsMode");
const saveButton = document.querySelector("#jsSave");

const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

ctx.strokeStyle = "#2c2c2c";
ctx.fillStyle = "#2c2c2c";
ctx.lineWidth = 3;

let painting = false;
let filling = false;

function stopPainting() {
  painting = false;
}

function startPaintion() {
  painting = true;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}

function handleCM(event) {
  event.preventDefault();
}

function handleModeButton() {
  if (filling === true) {
    filling = false;
    modeButton.innerHTML = "Fill";
    modeButton.style.backgroundColor = "white";
    modeButton.style.color = "black";
  } else {
    filling = true;
    modeButton.innerHTML = "Paint";
    modeButton.style.backgroundColor = "rgba(0, 0, 0, 0.4)";
    modeButton.style.color = "white";
  }
}

function changeRange(event) {
  const currentRange = event.target.value;
  ctx.lineWidth = currentRange;
}

function handleNewButton() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
}

function handleSaveButton() {
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = "paint";
  link.click();
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPaintion);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseout", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM);
}

Array.from(colors).forEach((color) =>
  color.addEventListener("click", handleColorClick)
);

if (range) {
  range.addEventListener("input", changeRange);
}

if (newButton) {
  newButton.addEventListener("click", handleNewButton);
}

if (modeButton) {
  modeButton.addEventListener("click", handleModeButton);
}

if (saveButton) {
  saveButton.addEventListener("click", handleSaveButton);
}
