const output = document.getElementById("output");
const container = document.getElementById("calc-wrapper");
const calculate = document.getElementById("calculate");
const clear = document.getElementById("clear");
const allBtns = document.querySelectorAll('.button');
const backBtn = document.getElementById('back');

const operators = Array.from(document.querySelectorAll('.is-info')).map(x => x.textContent);
const keyArray = [111, 106, 109, 103, 104, 105, 107, 100, 101, 102, 97, 98, 99, 96, 110];

container.addEventListener("click", buttonClick);
calculate.addEventListener("click", calc);
clear.addEventListener("click", reset);
document.addEventListener("keydown", keyPress);
backBtn.addEventListener('click', back);

function buttonClick(e) {
  let btnText = e.target.textContent;
  let lastChar = output.textContent[output.textContent.length - 1];
  if (e.target.classList.contains("is-primary")) {
    output.textContent += btnText;
  } else if (e.target.classList.contains("is-info")) {
    !operators.includes(lastChar) && output.textContent !== '' ? output.textContent += btnText : false;
  }
}

function keyPress(e) {
  let keyText = e.key;
  let lastChar = output.textContent[output.textContent.length - 1];
  if (keyArray.includes(e.keyCode)) {
    allBtns.forEach(x => keyText === x.textContent ? x.focus() : false)
    if (!operators.includes(keyText)) {
      output.textContent += keyText;
    } else if (!operators.includes(lastChar) && output.textContent !== '') {
      output.textContent += keyText;
    }
  } else if (e.keyCode === 13) {
    calculate.focus();
    calc();
  } else if (e.keyCode === 8) {
    backBtn.focus();
    back();
  } else if (e.keyCode === 27) {
    clear.focus();
    reset();
  }
}

function reset() {
  output.innerText = "";
}

function calc() {
  let result = eval(output.textContent);
  String(result).length > 8 ? output.textContent = result.toFixed(8) : output.textContent = result;
}

function back() {
  output.textContent = output.textContent.slice(0, -1);
}