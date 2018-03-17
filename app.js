const output = document.getElementById("output"),
  container = document.getElementById("calc-wrapper"),
  calculate = document.getElementById("calculate"),
  clear = document.getElementById("clear"),
  allBtns = [...document.querySelectorAll('.button')],
  backBtn = document.getElementById('back'),
  operators = ['/', '*', '+', '.'],
  reset = () => output.textContent = "",
  back = () => output.textContent = output.textContent.slice(0, -1),
  checkLastChar = x => !operators.includes(output.textContent.substr(-1)) && output.textContent !== '' ? writeToOutput(x) : false,
  writeToOutput = x => output.textContent += x

calculate.addEventListener("click", calc)
clear.addEventListener("click", reset)
backBtn.addEventListener('click', back)

container.addEventListener("click", e => {
  let btnText = e.target.textContent
  if (e.target.classList.contains("is-primary")) {
    writeToOutput(btnText)
  } else if (e.target.classList.contains("is-info")) {
    !operators.includes(btnText) ? writeToOutput(btnText) : checkLastChar(btnText)
  }
})

document.addEventListener("keydown", e => {
  if (allBtns.map(x => x.textContent).filter(y => y !== '=').includes(e.key)) {
    allBtns.forEach(x => e.key === x.textContent ? x.focus() : false)
    !operators.includes(e.key) ? writeToOutput(e.key) : checkLastChar(e.key)
  } else if (e.keyCode === 13) {
    calc()
  } else if (e.keyCode === 8) {
    backBtn.focus()
    back()
  } else if (e.keyCode === 27) {
    clear.focus()
    reset()
  }
})

function calc() {
  let toCalc = String(output.textContent).replace('--', '- -')
  if (toCalc.length > 0) {
    try {
      output.textContent = `${Number(eval(toCalc).toFixed(8))}`
      calculate.focus()
    } catch (err) {
      alert(err.message)
    }
  } else {
    alert('Nothing entered')
  }
}