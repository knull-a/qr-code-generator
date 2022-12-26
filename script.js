const settings = document.querySelector("#qr-code-settings")
const result = document.querySelector("#qr-code-result")

const text = document.querySelector("#data");

const mainColorPicker = document.querySelector("#color");
const colorValue = document.querySelector("#color-value");
const backgroundColorPicker = document.querySelector("#bg-color");
const backgroundColorValue = document.querySelector("#bg-color-value");

const sizeSlider = document.querySelector("#size");
const sizeValue = document.querySelector("#size-value");
const marginSlider = document.querySelector("#margin");
const marginValue = document.querySelector("#margin-value");

const qrImage = document.querySelector("#qr-image")
const imageFormat = document.querySelector('input[name="format"]:checked'); //isn't working

const qrButton = document.querySelector("#btn");
const backButton = document.querySelector("#go-back");
const downloadButton = document.querySelector("#download");

(function changeColorValue() {
  mainColorPicker.addEventListener("input", () => colorValue.textContent = color.value);
  backgroundColorPicker.addEventListener("input", () => backgroundColorValue.textContent = backgroundColorPicker.value);
})();

(function changeSizeValue() {
  sizeSlider.addEventListener("input", () => sizeValue.textContent = `${sizeSlider.value} x ${sizeSlider.value}`);
  marginSlider.addEventListener("input", () => marginValue.textContent = `${marginSlider.value} px`);
})();

(function checkForText() {
  text.addEventListener('input', () => {
    if (text.value.length>0) {
    qrButton.removeAttribute('disabled');
    qrButton.classList.remove('disabled');
    } else {
      qrButton.setAttribute("disabled", "");
      qrButton.classList.add("disabled");
    }
  })
})();

function prepareParameters(params) {
  return {
    data: params.data,
    size: `${params.size}x${params.size}`,
    color: params.color.replace('#', ''),
    bgcolor: params.bgColor.replace('#', ''),
    qzone: params.qZone,
    format: params.format,
    download: 1,
  }
}

function getQrCode(parameters) {
  const urlParams = new URLSearchParams(parameters).toString()
  const baseUrl = "https://api.qrserver.com/v1/create-qr-code/";
  const fullUrl = `${baseUrl}?${urlParams}`;
  
  fetch(fullUrl).then((response) => {
    if (response.status === 200) {
      qrImage.setAttribute('src', fullUrl);
      downloadButton.addEventListener("click", () => {
        downloadImage(fullUrl)
      });
    }
    
  })
};

function onSumbit() {
  const data = text.value;
  const color = mainColorPicker.value;
  const bgColor = backgroundColorPicker.value;
  const size = sizeSlider.value;
  const qZone = marginSlider.value;
  const format = imageFormat.value
  const download = 1
  const parameters = prepareParameters({data, color, bgColor, size, qZone, format, download});
  settings.style.display = "none";
  result.style.display = "block";
  getQrCode(parameters);
}


async function downloadImage(imageSrc) {
  const image = await fetch(imageSrc);
  const imageBlog = await image.blob();
  const imageURL = URL.createObjectURL(imageBlog);

  const link = document.createElement("a");
  link.href = imageURL;
  link.download = "qr-code by k-nulla";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
  
(function doButtonEvents() {
  qrButton.addEventListener("click", onSumbit)  
  backButton.addEventListener("click", () => {
    settings.style.display = "block";
    result.style.display = "none";
  });
})();






