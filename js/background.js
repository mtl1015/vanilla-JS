const images = ["0.jpg", "1.jpg", "2.jpg","3.jpg","4.jpg","5.jpg"];

function imagechangeHandler()
{
    const chosenImage = images[Math.floor(Math.random() * images.length)];
    const bgImage = document.createElement("img");
    bgImage.classList.add("active");

    bgImage.src = `img/${chosenImage}`;

    document.body.appendChild(bgImage);
    
}

imagechangeHandler();
setInterval(imagechangeHandler,10000);  