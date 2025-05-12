document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.fade-in');

    const options = {
        rootMargin: '0px', // Trigger as soon as it enters the viewport
        threshold: 0.01 // A lower threshold to trigger the animation earlier
    };

    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Unobserve after adding the class
            }
        });
    }, options);

    sections.forEach(section => {
        observer.observe(section);
    });
});


document.addEventListener('DOMContentLoaded', function () {
  const container = document.querySelector('.card-container');
  const cards = document.querySelectorAll('.card');
  const totalCards = cards.length;
  let currentIndex = 0;

  function updatePosition() {
    const cardWidth = cards[0].offsetWidth;
    const style = window.getComputedStyle(cards[0]);
    const margin = parseFloat(style.marginLeft) + parseFloat(style.marginRight);
    const containerWidth = container.offsetWidth;
    const offset = -currentIndex * (cardWidth + margin) + (containerWidth / 2) - (cardWidth / 2);

    container.style.transform = `translateX(${offset}px)`;

    cards.forEach((card, index) => {
      card.classList.toggle('active', index === currentIndex);
    });
  }

  document.querySelector('.prev').addEventListener('click', function () {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : totalCards - 1;
    updatePosition();
  });

  document.querySelector('.next').addEventListener('click', function () {
    currentIndex = (currentIndex < totalCards - 1) ? currentIndex + 1 : 0;
    updatePosition();
  });

  // Initialize position
  updatePosition();

  // Update position on window resize
  window.addEventListener('resize', updatePosition);
});

document.addEventListener('DOMContentLoaded', function () {
  const container = document.querySelector('.scrolling-container');
  const imagesWrapper = document.querySelector('.images-wrapper');

  // Clone the images to ensure a seamless loop
  const images = Array.from(imagesWrapper.children);
  const imageCount = images.length;

  // Clone images and append to the end of the wrapper
  images.forEach(img => {
    const clone = img.cloneNode(true);
    imagesWrapper.appendChild(clone);
  });

  // Adjust the container's width to accommodate all images
  const imageWidth = images[0].offsetWidth;
  const totalWidth = imageWidth * imagesWrapper.children.length;
  container.style.width = `${totalWidth}px`;
});


document.addEventListener('DOMContentLoaded', function () {
  const musicItems = document.querySelectorAll('.music-item');
  const prevButton = document.getElementById('prev');
  const playPauseButton = document.getElementById('play-pause');
  const restartButton = document.getElementById('restart');
  const nextButton = document.getElementById('next');
  const progressBar = document.getElementById('progress-bar');
  const currentTimeDisplay = document.getElementById('current-time');
  const totalDurationDisplay = document.getElementById('total-duration');
  let currentIndex = 0;
  let isPlaying = false;
  let audioElement = null;

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' + secs : secs}`;
  }

  function showMusicItem(index) {
    musicItems.forEach(item => item.classList.remove('active'));
    musicItems[index].classList.add('active');
    audioElement = musicItems[index].querySelector('audio');
    
    // Update duration when metadata is loaded
    audioElement.onloadedmetadata = () => {
      totalDurationDisplay.textContent = formatTime(audioElement.duration);
      progressBar.style.width = '0%'; // Reset progress bar
      currentTimeDisplay.textContent = formatTime(0); // Reset current time
    };
    
    // Ensure duration is set even if metadata is not loaded
    if (audioElement.readyState >= 1) {
      totalDurationDisplay.textContent = formatTime(audioElement.duration);
    }
    
    // Update progress bar and current time during playback
    audioElement.ontimeupdate = () => {
      if (audioElement.duration) {
        const progress = (audioElement.currentTime / audioElement.duration) * 100;
        progressBar.style.width = `${progress}%`;
        currentTimeDisplay.textContent = formatTime(audioElement.currentTime);
      }
    };
  }

  function playAudio() {
    audioElement.play();
    isPlaying = true;
    playPauseButton.innerHTML = '<i class="fas fa-pause"></i>';
  }

  function pauseAudio() {
    audioElement.pause();
    isPlaying = false;
    playPauseButton.innerHTML = '<i class="fa fa-play"></i>';
  }

  function restartAudio() {
    audioElement.currentTime = 0;
    playAudio();
  }

  prevButton.addEventListener('click', function () {
    pauseAudio();
    currentIndex = (currentIndex - 1 + musicItems.length) % musicItems.length;
    showMusicItem(currentIndex);
    if (isPlaying) playAudio();
  });

  playPauseButton.addEventListener('click', function () {
    if (isPlaying) {
      pauseAudio();
    } else {
      playAudio();
    }
  });

  restartButton.addEventListener('click', restartAudio);

  nextButton.addEventListener('click', function () {
    pauseAudio();
    currentIndex = (currentIndex + 1) % musicItems.length;
    showMusicItem(currentIndex);
    if (isPlaying) playAudio();
  });

  // Initialize the first music item
  showMusicItem(currentIndex);
});

