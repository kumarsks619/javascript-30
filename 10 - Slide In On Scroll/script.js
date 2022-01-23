function debounce(func, wait = 20, immediate = true) {
    var timeout
    return function () {
        var context = this,
            args = arguments
        var later = function () {
            timeout = null
            if (!immediate) func.apply(context, args)
        }
        var callNow = immediate && !timeout
        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
        if (callNow) func.apply(context, args)
    }
}

const slideImages = document.querySelectorAll('.slide-in')

function handleImageSlide(e) {
    slideImages.forEach((image) => {
        // position at which image starts peeking (25%) out from the bottom
        const slideInAt = window.scrollY + window.innerHeight - image.height / 4
        // bottom position of the image
        const imageBottom = image.offsetTop + image.height

        const isPeekingOut = slideInAt > image.offsetTop
        const isScrolledPast = window.scrollY > imageBottom

        if (isPeekingOut && !isScrolledPast) {
            image.classList.add('active')
        } else {
            image.classList.remove('active')
        }
    })
}

window.addEventListener('scroll', debounce(handleImageSlide))
