(function() {
    let arrPrev = document.querySelector('.carousel-control-prev');
    let arrNext = document.querySelector('.carousel-control-next');
    let indicators = document.querySelector('.carousel-indicators');
    let aItems = document.querySelectorAll('.carousel-item');
    let aIndicators = indicators.querySelectorAll('li');
    let lastChange = new Date();

    arrNext.addEventListener('click', function(e) {
        changeSlide(true);
    });

    arrPrev.addEventListener('click', function(e) {
        changeSlide(false);
    });


    indicators.addEventListener('click', function(e) {
        let oTarget = e.target;
        if (oTarget.localName === 'li') {
            changeSlide(+oTarget.dataset.slideTo);
        }
    });

    let changeSlide = function(next) {
        for (let i = 0; i < aItems.length; i++) {
            if (aItems[i].classList.contains('active')) {
                let bArrow;

                if (typeof next !== 'number') {
                    bArrow = next;
                    next = next ? (i + 1) % aItems.length : (i + aItems.length - 1) % aItems.length;
                }

                aItems[i].classList.remove('active');
                aItems[next].classList.add('active');
                aIndicators[i].classList.remove('active');
                aIndicators[next].classList.add('active');

                if (bArrow || (bArrow === undefined && next > i)) {
                    aItems[i].style.animationName = 'fromMidToLeft';
                    aItems[next].style.animationName = 'fromRightToMid';
                } else {
                    aItems[i].style.animationName = 'fromMidToRight';
                    aItems[next].style.animationName = 'fromLeftToMid';
                }

                lastChange = new Date();

                setTimeout(autoSlideChange, 10000);

                break;
            }
        }
    }

    let autoSlideChange = function() {
        if (new Date() - lastChange > 9500) {
            lastChange = new Date();
            changeSlide(true);
        }
    }

    setTimeout(autoSlideChange, 10000);
})()