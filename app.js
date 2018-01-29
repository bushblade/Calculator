const output = document.getElementById("output");
const container = document.getElementById("calc-wrapper");
const calculate = document.getElementById("calculate");
const clear = document.getElementById("clear");
const operators = ["/", "*", "-", "+", "."];

container.addEventListener("click", buttonClick);
calculate.addEventListener("click", calc);
clear.addEventListener("click", reset);

function buttonClick(e) {
  let btnText = e.target.textContent;
  let lastChar = output.textContent[output.textContent.length - 1];
  if (e.target.classList.contains("is-primary")) {
    output.textContent += btnText;
  } else if (e.target.classList.contains("is-info")) {
    !operators.includes(lastChar) ? (output.textContent += btnText) : false;
  }
}

function reset() {
  output.innerText = "";
}

function calc() {
  output.textContent = eval(output.textContent);
}
