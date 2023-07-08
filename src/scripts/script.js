const productsCarousel = document.querySelector('.products__carousel');
const bannerImages = document.querySelectorAll('.banners__image');
const bannerButtons = document.querySelectorAll('.banners__button-image');
const carouselPhotosWrappersElements = document.querySelectorAll('.products__carousel-photo-wrapper');
const timeValues = document.querySelectorAll('.bar-info__content-value');

const phoneInputField = document.getElementById('form__input-phone');
const emailInputField = document.getElementById('form__input-email');
const submitButton = document.querySelector('.form__submit-button');

const navbarDesktop = document.querySelector('.navbar-desktop');
const navbarMobile = document.querySelector('.navbar-mobile');

const carouselHearts = document.querySelectorAll('.products__carousel-icon-heart-image');

const handleFormSubmit = (event) => {
  event.preventDefault();
  const emailVerificationRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneVerificationRegex = /^(?:(?:\+|00)48|0)?(?:\d{2}[ -]?\d{3}[ -]?\d{2}[ -]?\d{2}|\d{3}[ -]?\d{3}[ -]?\d{3})$/;

  const email = emailInputField.value;
  const phone = phoneInputField.value;

  let isEmailCorrect = false;
  let isPhoneCorrect = false;
  
  
  if ((emailVerificationRegex).test(email)) {
    isEmailCorrect = true;
  } 

  if(!isEmailCorrect) {
    emailInputField.classList.add('form__input--invalid');
    console.log('Wrong email address format')
  } else {
    emailInputField.classList.remove('form__input--invalid');
  }
   
  if((phoneVerificationRegex).test(phone)) {
    isPhoneCorrect = true;
  }

  if (!isPhoneCorrect) {
    phoneInputField.classList.add('form__input--invalid');
    console.log('Wrong phone number format');
  } else {
    phoneInputField.classList.remove('form__input--invalid');
  }

  if (isEmailCorrect && isPhoneCorrect) {
    console.log('submitted');
    emailInputField.value = '';
    phoneInputField.value = '';
  } 

}

const handleTimeChange = () => {
  const [days, hours, minutes, seconds] = timeValues;
  const timeChange  = setInterval(() => {
    if (seconds.textContent === '0') {
      if (minutes.textContent === '0') {
        if (hours.textContent === '0') {
          if (days.textContent === '0') {
            clearInterval(timeChange);

            console.log('time is out');
          } else {
            const currentDaysValue = +days.textContent;
            days.textContent = `${currentDaysValue - 1}`;
            hours.textContent = '23';
          }
        } else {
          const currentHoursValue = +hours.textContent;
          hours.textContent = `${currentHoursValue - 1}`
          minutes.textContent = `59`;
        }
      } else {
        const currentMinutesValue = +minutes.textContent;
        minutes.textContent = `${currentMinutesValue - 1}`
        seconds.textContent = `59`;
      }
    } else {
      const currentSecondsValue = +seconds.textContent;
      seconds.textContent = `${currentSecondsValue - 1}`;
    }
  }, 1000);
}

const handleNavbarLoad = (screenWidth) => {
  if (screenWidth >= 1024) {
    navbarDesktop.style.display = 'flex';
    navbarMobile.style.display = 'none';
  } else {
    navbarDesktop.style.display = 'none';
    navbarMobile.style.display = 'flex';
  } 
}

const handleImagesLoad = (screenWidth) => {
  const [
    buttonNewReleases,
    buttonSummer,
    buttonMenCollection
  ] = bannerButtons;

  const [
    bannerNewReleases,
    bannerSummer,
    bannerMenCollection
  ] = bannerImages;

  
  if (screenWidth >= 1920) {
    bannerMenCollection.src = './images/banners/banner-men-collection-large.png';
    buttonMenCollection.src = './images/buttons/button-men-collection-desktop.png';
  } else if (screenWidth >= 768) {
    bannerMenCollection.src = './images/banners/banner-men-collection-desktop.png';
  } else {
    bannerMenCollection.src = './images/banners/banner-men-collection-mobile.png';
  }

  if (screenWidth >= 1024) {
    bannerNewReleases.src = './images/banners/banner-new-releases-desktop.png';
    bannerSummer.src = './images/banners/banner-summer-desktop.png';
    buttonNewReleases.src = './images/buttons/button-new-releases-desktop.png';
    buttonSummer.src = './images/buttons/button-summer-desktop.png';
  } else {
    bannerNewReleases.src = './images/banners/banner-new-releases-mobile.png';
    bannerSummer.src = './images/banners/banner-summer-mobile.png';
    buttonNewReleases.src = './images/buttons/button-new-releases-mobile.png';
    buttonSummer.src = './images/buttons/button-summer-mobile.png';
  }
}

const handleHeartToggle = (currentSrc, currentHeart) => {
  currentHeart.src = currentSrc.includes('--gray') 
    ? './images/icons/icon-heart--filled.svg'
    : './images/icons/icon-heart--gray.svg';
}

const handlePhotoChange = (oldSrc, currentPhoto) => {
  let newSrc;

  if (!oldSrc.includes('--hover')) {
    newSrc = oldSrc.split('.png');
    newSrc.push('--hover');
    newSrc.push('.png');
  } else {
    newSrc = oldSrc.split('--hover.png');
    newSrc.push('.png');
  }

  currentPhoto.src = newSrc.join('');
}

window.addEventListener('resize', () => {
  const currentWidth = event.target.innerWidth;
  handleImagesLoad(currentWidth);
  handleNavbarLoad(currentWidth);
})

const carouselPhotosWrappers = [...carouselPhotosWrappersElements];

carouselPhotosWrappers.forEach(carouselPhotoWrapper => {
  carouselPhotoWrapper.addEventListener('mouseover', () => {
    const photo = carouselPhotoWrapper.querySelector('.products__carousel-photo');
    const oldSrc = photo.getAttribute('src');
    setTimeout(()=> {
      handlePhotoChange(oldSrc, photo);
    }, 300)
  });

  carouselPhotoWrapper.addEventListener('mouseout', () => {
    const photo = carouselPhotoWrapper.querySelector('.products__carousel-photo');
    const oldSrc = photo.getAttribute('src');
    setTimeout(()=> {
      handlePhotoChange(oldSrc, photo);
    }, 300)
  });
});

carouselHearts.forEach(carouselHeart => {
  carouselHeart.addEventListener('click', () => {
    const currentHeartSrc = carouselHeart.getAttribute('src');
    handleHeartToggle(currentHeartSrc, carouselHeart);
    
  })
})

submitButton.addEventListener(('click'), handleFormSubmit);


document.addEventListener('DOMContentLoaded', function () {
  const splide1 = new Splide('#splide-1', {
    perPage: 6,
    type: 'loop',
    rewind: true,
    pagination: false,
    autoplay: true,
    speed: 300,
    interval: 1500,
    perMove: 1,

    breakpoints: {
    1024: {
      perPage: 1,
    },

    1980: {
      perPage: 3,
    }

  }

  }).mount();


  const splide2 = new Splide('#splide-2', {
    fixedWidth: 241,
    gap: 20,
    rewind: false,
    pagination: false,
    arrows: false,
  }).mount();
});
  

handleImagesLoad(window.innerWidth);
handleNavbarLoad(window.innerWidth);
handleTimeChange();



