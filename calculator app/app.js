let outputText = document.getElementById("output-text")
let outputSum = document.getElementById("output-sum")

//! First row 
const buttonAC = document.getElementById("buttonAC")
const buttonDE = document.getElementById("buttonDE")
const buttonPoint = document.getElementById("buttonPoint")
const buttonDivisor = document.getElementById("buttonDivisor")

//! Second row 
const button7 = document.getElementById("button7")
const button8 = document.getElementById("button8")
const button9 = document.getElementById("button9")
const buttonMultiplier = document.getElementById("buttonMultiplier")

//! Third row 
const button4 = document.getElementById("button4")
const button5 = document.getElementById("button5")
const button6 = document.getElementById("button6")
const buttonDecreaser = document.getElementById("buttonDecreaser")


//! Fourth row 
const button1 = document.getElementById("button1")
const button2 = document.getElementById("button2")
const button3 = document.getElementById("button3")
const buttonAdder = document.getElementById("buttonAdder")

//! Fiifth row 
const button0 = document.getElementById("button0")
const buttonEqualizer = document.getElementById("buttonEqualizer")


button0.addEventListener("click", () => {
    outputText.innerText += "0"
})

button1.addEventListener("click", () => {
    outputText.innerText += "1"
})

button2.addEventListener("click", () => {
    outputText.innerText += "2"
})

button3.addEventListener("click", () => {
    outputText.innerText += "3"
})

button4.addEventListener("click", () => {
    outputText.innerText += "4"
})

button5.addEventListener("click", () => {
    outputText.innerText += "5"
})

button6.addEventListener("click", () => {
    outputText.innerText += "6"
})

button7.addEventListener("click", () => {
    outputText.innerText += "7"
})

button8.addEventListener("click", () => {
    outputText.innerText += "8"
})

button9.addEventListener("click", () => {
    outputText.innerText += "9"
})

buttonPoint.addEventListener("click", () => {
    outputText.innerText += "." 
})


//! Delete btn
buttonAC.addEventListener("click", () => {
    outputText.innerText = ""
    outputSum.innerText = ""
})

buttonDE.addEventListener("click", () => {
    outputText.innerText = outputText.innerText.toString().slice(0, -1)
    outputSum.innerText = ""
})


//! Operators 
buttonDivisor.addEventListener("click", () => {
    outputText.innerText += "/"
})

buttonAdder.addEventListener("click", () => {
    outputText.innerText += "+"
})

buttonDecreaser.addEventListener("click", () => {
    outputText.innerText += "-"
})

buttonMultiplier.addEventListener("click", () => {
    outputText.innerText += "*"
})

buttonEqualizer.addEventListener("click", () => {
   let result =  eval(outputText.innerText)
   outputSum.innerText = result
})


//TODO #1 Implement a feature that doesn't allow the user to try to calculate trash
//* For example -55--/55