const output = document.getElementById("output"),
  container = document.getElementById("calc-wrapper"),
  calculate = document.getElementById("calculate"),
  clear = document.getElementById("clear"),
  allBtns = Array.from(document.querySelectorAll('.button')),
  backBtn = document.getElementById('back'),
  operators = ['/', '*', '+'],
  keyArray = [111, 106, 109, 103, 104, 105, 107, 100, 101, 102, 97, 98, 99, 96, 110],
  reset = () => output.textContent = "",
  back = () => output.textContent = output.textContent.slice(0, -1),
  checkLastChar = x => !operators.includes(output.textContent.substr(-1)) && output.textContent !== '' ? writeToOutput(x) : false,
  writeToOutput = x => output.textContent += x;

container.addEventListener("click", buttonClick);
calculate.addEventListener("click", calc);
clear.addEventListener("click", reset);
document.addEventListener("keydown", keyPress);
backBtn.addEventListener('click', back);

function buttonClick(e) {
  let btnText = e.target.textContent;
  if (e.target.classList.contains("is-primary")) {
    writeToOutput(btnText);
  } else if (e.target.classList.contains("is-info")) {
    !operators.includes(btnText) ? writeToOutput(btnText) : checkLastChar(btnText);
  }
}

function keyPress(e) {
  let keyText = e.key;
  if (keyArray.includes(e.keyCode)) {
    allBtns.forEach(x => keyText === x.textContent ? x.focus() : false);
    !operators.includes(keyText) ? writeToOutput(keyText) : checkLastChar(keyText);
  } else if (e.keyCode === 13) {
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
  let toCalc = String(output.textContent).replace('--', '- -');
  if (toCalc.length > 0) {
    try {
      output.textContent = `${Number(eval(toCalc).toFixed(8))}`;
      calculate.focus();
    } catch (err) {
      alert(err);
    }
  } else {
    alert('Nothing entered');
  }
}