$(function() {
	//bg color selector
  $(".color").click(function(){
		var color = $(this).attr("data-value");
    $("body").css("background-color", color);
	});
  
  //add color picker if supported
  if (Modernizr.inputtypes.color) {
    $(".picker").css("display", 'inline-block');
    var c = document.getElementById('colorpicker');
    c.addEventListener('change', function(e) {
      //d.innerHTML = c.value;
      var color = c.value;
      $("body").css("background-color", color);
		}, false);
  }
});
function pickColor() {
  $("#colorpicker").click();
}

let currentImageUrl = '';
const defaultColor = 'rgb(140, 96, 65)';
let selectedColor = defaultColor;

function showImage(imageUrl) {
    currentImageUrl = imageUrl;
    const imageElement = document.getElementById('displayedImage');
    const extension = imageUrl.split('.').pop().toLowerCase();

    if (extension === 'svg') {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', currentImageUrl, true);
        xhr.onload = function() {
            if (xhr.status === 200) {
                const svgData = xhr.responseText;
                const coloredSvgData = svgData.replace(/fill="[^"]*"/g, `fill="${selectedColor}"`);
                const svgBlob = new Blob([coloredSvgData], { type: 'image/svg+xml' });
                const url = URL.createObjectURL(svgBlob);
                imageElement.src = url;
                imageElement.style.display = 'block';
            }
        };
        xhr.send();
    } else if (extension === 'png') {
        imageElement.src = currentImageUrl;
        imageElement.style.display = 'block';
    }
}

function changeColor() {
    const colorPicker = document.getElementById('color');
    selectedColor = colorPicker.value;
    const imageElement = document.getElementById('displayedImage');
    const extension = currentImageUrl.split('.').pop().toLowerCase();

    if (extension === 'svg') {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', currentImageUrl, true);
        xhr.onload = function() {
            if (xhr.status === 200) {
                const svgData = xhr.responseText;
                const coloredSvgData = svgData.replace(/fill="[^"]*"/g, `fill="${selectedColor}"`);
                const svgBlob = new Blob([coloredSvgData], { type: 'image/svg+xml' });
                const url = URL.createObjectURL(svgBlob);
                imageElement.src = url;
            }
        };
        xhr.send();
    }
}

function downloadPNG() {
    const imageElement = document.getElementById('displayedImage');
    const imageUrl = imageElement.src;
    const bodyStyles = getComputedStyle(document.body);
    const backgroundColor = bodyStyles.backgroundColor;
    const extension = currentImageUrl.split('.').pop().toLowerCase();

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = function() {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        const pngUrl = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.href = pngUrl;
        downloadLink.download = 'image.png';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };

    if (extension === 'svg') {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', imageUrl, true);
        xhr.onload = function() {
            if (xhr.status === 200) {
                const svgBlob = new Blob([xhr.responseText], { type: 'image/svg+xml' });
                const url = URL.createObjectURL(svgBlob);
                img.src = url;
            }
        };
        xhr.send();
    } else if (extension === 'png') {
        img.src = imageUrl;
    }
}

// Function to hide body and show alert
function handleAuthorLabelRemoval(mutations) {
    mutations.forEach(mutation => {
        if (mutation.type === 'childList' && !document.getElementById('author-label')) {
            alert('Código protegido por derechos de autor');
            document.body.style.display = 'none';
        }
    });
}

// Observe the DOM for changes
const observer = new MutationObserver(handleAuthorLabelRemoval);
observer.observe(document.body, { childList: true, subtree: true });