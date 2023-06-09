document.addEventListener('DOMContentLoaded', function() {
  const genreButtons = document.querySelectorAll('.genre-button');
  const imageContainers = document.querySelectorAll('.image-item');
  const loadingOverlay = document.querySelector('#loading-overlay');
  const refreshButton = document.querySelector('#refresh-button');

  let activeGenre = 'waifu';

  genreButtons.forEach(function(button) {
    button.addEventListener('click', function() {
      const genre = this.dataset.genre;
      if (genre !== activeGenre) {
        activeGenre = genre;
        genreButtons.forEach(function(btn) {
          btn.classList.remove('active');
        });
        this.classList.add('active');
        loadImages();
      }
    });
  });

  refreshButton.addEventListener('click', function() {
    loadImages();
  });

  async function loadImages() {
    loadingOverlay.classList.add('active');
    try {
      for (let i = 0; i < imageContainers.length; i++) {
        const container = imageContainers[i];
        const img = container.querySelector('.waifu-image');
        img.src = '';
        const url = await fetchImage(activeGenre);
        img.src = url;
      }
      loadingOverlay.classList.remove('active');
    } catch (error) {
      console.error(error);
      loadingOverlay.classList.remove('active');
    }
  }

  async function fetchImage(genre) {
    const url = `https://api.waifu.pics/sfw/${genre}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.url;
  }

  loadImages();
});

function zoomImage(element) {
  element.classList.toggle('zoomed');
  var zoomedImageContainer = document.querySelector('.zoomed-image-container');
  var zoomedImage = document.querySelector('.zoomed-image');
  zoomedImage.src = element.src;
  
  if (element.classList.contains('zoomed')) {
    document.querySelector('.overlay').classList.add('zoomed-image-visible');
    document.body.style.overflow = 'hidden'; 
  } else {
    document.querySelector('.overlay').classList.remove('zoomed-image-visible');
    document.body.style.overflow = ''; 
  }
}

function closeZoom() {
  var zoomedImages = document.querySelectorAll('.waifu-image.zoomed');
  zoomedImages.forEach(function(image) {
    image.classList.remove('zoomed');
  });
  document.querySelector('.overlay').classList.remove('zoomed-image-visible');
  document.body.style.overflow = ''; 
}
