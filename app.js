const output = document.getElementById("output");
const container = document.getElementById("calc-wrapper");
const calculate = document.getElementById("calculate");
const clear = document.getElementById("clear");
const allBtns = document.querySelectorAll('.button');
const backBtn = document.getElementById('back');

const operators = ['/', '*', '+'];
const keyArray = [111, 106, 109, 103, 104, 105, 107, 100, 101, 102, 97, 98, 99, 96, 110];

container.addEventListener("click", buttonClick);
calculate.addEventListener("click", calc);
clear.addEventListener("click", reset);
document.addEventListener("keydown", keyPress);
backBtn.addEventListener('click', back);

function getLastChar() {
  return output.textContent[output.textContent.length - 1];
}

function checkLastChar(lastChar, text) {
  !operators.includes(lastChar) && output.textContent !== '' ? output.textContent += text : false;
}

function reset() {
  output.textContent = "";
}

function back() {
  output.textContent = output.textContent.slice(0, -1);
}

function buttonClick(e) {
  let btnText = e.target.textContent;
  if (e.target.classList.contains("is-primary")) {
    !operators.includes(btnText) ? output.textContent += btnText : false;
  } else if (e.target.classList.contains("is-info")) {
    if (!operators.includes(getLastChar()) && !operators.includes(btnText)) {
      output.textContent += btnText;
    } else {
      checkLastChar(getLastChar(), btnText);
    }
  }
}

function keyPress(e) {
  let keyText = e.key;
  if (keyArray.includes(e.keyCode)) {
    allBtns.forEach(x => keyText === x.textContent ? x.focus() : false);
    if (!operators.includes(keyText)) {
      output.textContent += keyText;
    } else {
      checkLastChar(getLastChar(), keyText);
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

function calc() {
  if (output.textContent.length > 0) {
    try {
      output.textContent = `${Number(eval(output.textContent).toFixed(8))}`;
    } catch (err) {
      alert(err);
    }
  } else {
    alert('Nothing entered');
  }
}