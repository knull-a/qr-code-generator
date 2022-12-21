let color = document.querySelector('#color')
let colorValue = document.querySelector("#color-value")
let bgColor = document.querySelector("#bg-color");
let bgColorValue = document.querySelector("#bg-color-value");

color.addEventListener("input", () => {
  console.log(this.value);
})

console.log(color.value);