const output = document.getElementById("output");
const container = document.getElementById("calc-wrapper");
const calculate = document.getElementById("calculate");
const clear = document.getElementById("clear");
const operators = Array.from(document.querySelectorAll('.is-info')).map(x => x.textContent);
const keyArray = [111, 106, 109, 103, 104, 105, 107, 100, 101, 102, 97, 98, 99, 96, 110];

container.addEventListener("click", buttonClick);
calculate.addEventListener("click", calc);
clear.addEventListener("click", reset);
document.addEventListener("keydown", keyPress);

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
    if (!operators.includes(keyText)) {
      output.textContent += keyText;
    } else if (!operators.includes(lastChar) && output.textContent !== '') {
      output.textContent += keyText;
    }
  } else if (e.keyCode === 13) {
    calc();
  }
}

function reset() {
  output.innerText = "";
}

function calc() {
  output.textContent = eval(output.textContent);
}