'use strict'

// Menu-burger
let iconMenu = document.querySelector('.menu__icon')
let menuBody = document.querySelector('.menu__body')
if (iconMenu) {
	iconMenu.addEventListener("click", () => {
		iconMenu.parentElement.classList.toggle('_active')
		iconMenu.classList.toggle('_active')
		document.body.classList.toggle('_lock')
	})
}

// Slider
const swiper = new Swiper('.swiper', {
	loop: true,
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',

	},
	scrollbar: {
		el: '.swiper-scrollbar',
	},
	pagination: {
		el: '.swiper-pagination',
	},

});

// Accordion
const accordionTriggers = document.querySelectorAll('.info__title')
accordionTriggers.forEach((accordionTrigger) => {
	accordionTrigger.addEventListener('click', () => {
		if (accordionTrigger.parentElement.classList.contains('_active')) {
			accordionTrigger.parentElement.classList.remove('_active')
		} else {
			accordionTriggers.forEach((accordionTrigger) => {
				accordionTrigger.parentElement.classList.remove('_active')
			})
			accordionTrigger.parentElement.classList.add('_active')
		}
	})
})

// Popup
const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock-padding')
console.log(lockPadding);
const lockPaddingMinus = document.querySelectorAll('.lock-padding_minus')

let unlock = true;

const timeout = 800;
console.log(popupLinks);

if (popupLinks.length > 0) {
	popupLinks.forEach(popupLink => {
		popupLink.addEventListener("click", (e) => {
			const popupName = popupLink.getAttribute('href').replace('#', '');
			const currentPopup = document.getElementById(popupName);
			popupOpen(currentPopup);
			e.preventDefault();
		})
	})
}

const popupCloseIcons = document.querySelectorAll('.close-popup')
console.log(popupCloseIcons)

if (popupCloseIcons.length > 0) {
	popupCloseIcons.forEach((popupCloseIcon) => {
		popupCloseIcon.addEventListener("click", (e) => {
			const currentPopup = popupCloseIcon.closest('.popup');
			popupClose(currentPopup);
			e.preventDefault();
		})
	})
}

function popupOpen(currentPopup) {
	if (currentPopup && unlock) {
		const popupActive = document.querySelector('.popup.open')
		if (popupActive) {
			popupClose(popupActive, false)
		} else {
			bodyLock();
		}
		console.log(currentPopup);
		currentPopup.classList.add('open');
		currentPopup.addEventListener("click", (e) => {
			if (!e.target.closest('.popup__content')) {
				popupClose(e.target.closest('.popup'));
			}
			e.preventDefault();
		})
	}
}

function bodyLock() {
	const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
	const lockPaddingValueHalf = (Number(window.innerWidth) - Number(document.querySelector('.wrapper').offsetWidth)) / 2 + 'px';
	const lockPaddingValueHalfMinus = '-' + lockPaddingValueHalf;

	if (lockPadding.length > 0) {
		lockPadding.forEach((lockPaddingElement) => {
			lockPaddingElement.style.marginRight = lockPaddingValueHalf;
		})
	}

	if (lockPaddingMinus.length > 0) {
		lockPaddingMinus.forEach((lockPaddingMinusElement) => {
			lockPaddingMinusElement.style.marginLeft = lockPaddingValueHalfMinus;
		})
	}


	body.style.paddingRight = lockPaddingValue;
	body.classList.add('lock');

	unlock = false;
	setTimeout(() => {
		unlock = true;
	}, timeout)
}

function popupClose(popupActive, doUnlock = true) {
	if (unlock) {
		popupActive.classList.remove('open');
		if (doUnlock) {
			bodyUnlock();
		}
	}
}

function bodyUnlock() {
	if (lockPadding.length > 0) {
		setTimeout(() => {
			lockPadding.forEach((lockPaddingElement) => {
				lockPaddingElement.style.marginRight = '0px';
			})
			body.style.paddingRight = '0px';
			body.classList.remove('lock');
		}, timeout)
	}
	if (lockPaddingMinus.length > 0) {
		setTimeout(() => {
			lockPaddingMinus.forEach((lockPaddingElement) => {
				lockPaddingElement.style.marginLeft = '0px';
			})
		}, timeout)
	}
}

document.addEventListener("keydown", (e) => {
	if (e.key === 'Escape') {
		const popupActive = document.querySelector('.popup.open');
		popupClose(popupActive);
	}
})

