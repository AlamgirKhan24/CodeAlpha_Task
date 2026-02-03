// 1. SELECT YOUR BUTTONS (Keeping your exact IDs)
const btnAll = document.getElementById('allPicture ');
const btnNature = document.getElementById('architecturePicture ');
const btnAesthetic = document.getElementById('aestheticPicture ');
const btnCar = document.getElementById('carPicture ');
const allImages = Array.from(document.querySelectorAll('#images img'));

let currentIndex = 0;


const lightbox = document.createElement('div');
lightbox.id = 'lb-bg';

lightbox.setAttribute('style', `
    display:none; position:fixed; top:0; left:0; width:100%; height:100%; 
    background:rgba(0,0,0,0.9); justify-content:center; align-items:center; z-index:9999;
`);

lightbox.innerHTML = `
    <button id="prevBtn" style="position:absolute; left:20px; color:white; font-size:50px; background:none; border:none; cursor:pointer;">&#10094;</button>
    <img id="lb-img" style="max-width:90%; max-height:80%; object-fit:contain; border:3px solid white;">
    <button id="nextBtn" style="position:absolute; right:20px; color:white; font-size:50px; background:none; border:none; cursor:pointer;">&#10095;</button>
    <span id="closeLb" style="position:absolute; top:20px; right:40px; color:white; font-size:40px; cursor:pointer;">&times;</span>
`;
document.body.appendChild(lightbox);

const lbImg = document.getElementById('lb-img');

function updateLightbox(index) {
    currentIndex = index;
    lbImg.src = allImages[currentIndex].src;
}


document.getElementById('nextBtn').onclick = (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex + 1) % allImages.length;
    updateLightbox(currentIndex);
};

document.getElementById('prevBtn').onclick = (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex - 1 + allImages.length) % allImages.length;
    updateLightbox(currentIndex);
};


allImages.forEach((img, index) => {
    img.onmouseenter = () => img.style.filter = "brightness(50%)";
    img.onmouseleave = () => img.style.filter = "brightness(100%)";

    img.onclick = () => {
        updateLightbox(index);
        lightbox.style.display = "flex";
    };
});


document.getElementById('closeLb').onclick = () => lightbox.style.display = "none";
lightbox.onclick = (e) => { if (e.target === lightbox) lightbox.style.display = "none"; };


btnAll.onclick = () => allImages.forEach(img => img.style.display = "inline-block");
btnNature.onclick = () => filterImages("nature");
btnCar.onclick = () => filterImages("Car");
btnAesthetic.onclick = () => filterImages("Sunshine");

function filterImages(name) {
    allImages.forEach(img => {
        img.style.display = img.alt.includes(name) ? "inline-block" : "none";
    });
}