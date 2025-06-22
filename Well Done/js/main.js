document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.navbar-nav');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function () {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const audioPlayer = document.querySelector(".audio-player");
    if (audioPlayer) {
        const audio = audioPlayer.querySelector(".audio-element");
        const playPauseBtn = audioPlayer.querySelector(".play-pause-btn");
        const playPauseIcon = playPauseBtn.querySelector("i");
        const seekBar = audioPlayer.querySelector(".seek-bar");
        const volumeBar = audioPlayer.querySelector(".volume-bar");
        const volumeBtn = audioPlayer.querySelector(".volume-btn i");
        const currentTimeEl = audioPlayer.querySelector(".time-current");
        const durationEl = audioPlayer.querySelector(".time-duration");

        const formatTime = (time) => {
            const minutes = Math.floor(time / 60);
            const seconds = Math.floor(time % 60);
            return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        };

        const togglePlay = () => {
            if (audio.paused) {
                audio.play();
                playPauseIcon.classList.replace("fa-play", "fa-pause");
            } else {
                audio.pause();
                playPauseIcon.classList.replace("fa-pause", "fa-play");
            }
        };

        const updateSeekBar = () => {
            seekBar.value = (audio.currentTime / audio.duration) * 100;
            currentTimeEl.textContent = formatTime(audio.currentTime);
        };

        const updateVolumeIcon = () => {
            if (audio.volume === 0 || audio.muted) {
                volumeBtn.classList.replace("fa-volume-up", "fa-volume-mute");
                volumeBtn.classList.remove("fa-volume-down");
            } else if (audio.volume <= 0.5) {
                volumeBtn.classList.replace("fa-volume-up", "fa-volume-down");
                 volumeBtn.classList.remove("fa-volume-mute");
            } else {
                volumeBtn.classList.replace("fa-volume-down", "fa-volume-up");
                volumeBtn.classList.replace("fa-volume-mute", "fa-volume-up");
            }
        };
        
        playPauseBtn.addEventListener("click", togglePlay);

        audio.addEventListener("timeupdate", updateSeekBar);

        audio.addEventListener("loadedmetadata", () => {
            durationEl.textContent = formatTime(audio.duration);
            seekBar.max = 100; // Represent progress as a percentage
        });

        seekBar.addEventListener("input", () => {
            audio.currentTime = (seekBar.value / 100) * audio.duration;
        });

        volumeBar.addEventListener("input", (e) => {
            audio.volume = e.target.value;
            audio.muted = e.target.value === 0;
            updateVolumeIcon();
        });

        volumeBtn.addEventListener("click", () => {
            audio.muted = !audio.muted;
            if (audio.muted) {
                volumeBar.value = 0;
            } else {
                volumeBar.value = audio.volume > 0 ? audio.volume : 1;
                 audio.volume = volumeBar.value;
            }
            updateVolumeIcon();
        });

    }

    // Image Carousel
    const carousels = document.querySelectorAll('.image-carousel-container');
    carousels.forEach(carousel => {
        const slides = carousel.querySelectorAll('.carousel-slide');
        const prevBtn = carousel.querySelector('.prev-btn');
        const nextBtn = carousel.querySelector('.next-btn');
        let currentSlide = 0;

        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.remove('active');
                if (i === index) {
                    slide.classList.add('active');
                }
            });
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }

        function prevSlide() {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        }

        if (slides.length > 0) {
            // Check if an active slide is set in HTML, otherwise default to first
            const initialActive = carousel.querySelector('.carousel-slide.active');
            if (initialActive) {
                currentSlide = Array.from(slides).indexOf(initialActive);
            } else {
                slides[0].classList.add('active');
            }

            if (prevBtn && nextBtn) {
                prevBtn.addEventListener('click', prevSlide);
                nextBtn.addEventListener('click', nextSlide);
            }
        }
    });
});
