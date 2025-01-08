// Array of image URLs
const images = [
    "assets/img/posters/Our services 1st poster (31-8-24).jpg",
    "assets/img/posters/Why with us poster (4-9-24).jpg",
    "assets/img/posters/Vehicle rentals (with driver) poster.jpg",
    "assets/img/posters/poster4.png",
    "assets/img/posters/poster5.png",
    "assets/img/posters/poster6.png"
  ];

   // Selectors for indicators and inner carousel
   const indicators = document.getElementById('carouselIndicators');
   const inner = document.getElementById('carouselInner');

   // Loop through images array and generate slides dynamically
   images.forEach((imageSrc, index) => {
     // Create carousel indicator button
     const button = document.createElement('button');
     button.type = 'button';
     button.dataset.bsTarget = '#customCarousel';
     button.dataset.bsSlideTo = index;
     button.ariaLabel = `Slide ${index + 1}`;
     if (index === 0) {
       button.classList.add('active');
       button.setAttribute('aria-current', 'true');
     }
     indicators.appendChild(button);

     // Create carousel item
     const carouselItem = document.createElement('div');
     carouselItem.className = `carousel-item${index === 0 ? ' active' : ''}`;
     const img = document.createElement('img');
     img.src = imageSrc;

     img.alt = `Slide ${index + 1}`;
     carouselItem.appendChild(img);
     inner.appendChild(carouselItem);
   });

   // Custom settings
   const carousel = new bootstrap.Carousel(document.querySelector('#customCarousel'), {
     interval: 4000, // autoplay speed in milliseconds
     wrap: true,    // infinite scrolling
     ride: 'carousel' // autoplay
   });

   // Center mode (adjust padding)
   document.querySelectorAll('.carousel-item').forEach(item => {
     item.style.margin = '0% 10%'; // Adjust padding for center mode
   });

   // Auto-scroll for center mode
   setInterval(() => {
     carousel.next();
   }, 4000);