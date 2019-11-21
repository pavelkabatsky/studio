document.addEventListener('DOMContentLoaded', function() {
    // Слайдер
    const nextBtn = $('.next-page');
    const slider = $('.slides');

    // Функция задержки анимации для элементов
    const setDelay = function(array) {
        let animDelay = 0;
        for(let i=0; i < array.length; i++) {
            array[i].style.animationDelay  = animDelay +'s';
            animDelay+=0.2;
        }
    }
    // Срабатывание анимации при ините слайдера
    slider.on('init', function(event, slick){
        const slide = $('.slick-current');
        const animElements = slide.find('.fs-block-text').children().toArray();
        setDelay(animElements);
        slide.addClass('animate')
    });
   
    slider.slick({
        adaptiveHeight: true,
        nextArrow: nextBtn,
        fade:true
    });

    slider.on('beforeChange', function(){
        const slide = $('.slick-current');
        slide.removeClass('animate'); 
    });

    // Выбор анимации в зависимости от слайда
    slider.on('afterChange', function(){
        const slide = $('.slick-current');
        
        if(!slide.hasClass('fs-block--secondary')) {
            const animElements = slide.find('.fs-block-text').children().toArray();
            setDelay(animElements);
        } else {
            const titles = slide.find('.fs-block-inner').children().toArray();
            const items = slide.find('.list-item').toArray();
            const animElements = [...titles, ...items];
            setDelay(animElements);
        }
        
        slide.addClass('animate'); 
    });
    // Навигация по меню
    const menuInner = document.querySelector('.header__menu ul');

    menuInner.addEventListener('click', function(event) {
        event.preventDefault();
        target = event.target;

        if(target && target.getAttribute('href') === '#main') {
            console.log('to main');
            slider.slick('slickGoTo', 0);
        } 
        else if (target && target.getAttribute('href') === '#advantages') {
            console.log('to adv');
            slider.slick('slickGoTo', 3);
        }
        else if (target && target.getAttribute('href') === '#contacts') {
            console.log('to contacts');
            slider.slick('slickGoTo', 6);
        }
    })

    // Разные цвета для оверлея

    const colors = ['#ff0000','#ffaa00','#d2006b','#620cac','#0a67a3','#00af64','#9fee00','#ffff00'];
    const overlays = document.querySelectorAll('.fs-block-img__overlay');
    overlays.forEach( overlay => {
        overlay.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]
    });

    
    // Модальное окно
    const popup = document.querySelector('.popup');
    const popupClose = popup.querySelector('.popup__close');
    const popupBtns = document.querySelectorAll('.act-modal');

    popupBtns.forEach(btnElement => {
        btnElement.addEventListener('click', () => {
            showPopup(popup);
        })
    });
    popupClose.addEventListener('click', ()=> {
        hidePopup(popup);
    });
    
    const showPopup = function(elem){
        elem.classList.add('_active');
    }
    const hidePopup = function(elem){
        elem.classList.remove('_active');
    }

    // Анимация меню
    const burger = document.querySelector('.header__burger');
    const menu = document.querySelector('.header__menu');
   
    burger.addEventListener('click', function() {
        menu.classList.toggle('_active');
        burger.classList.toggle('_active');
    })

    // Отправка формы

    const forms = document.querySelectorAll('form');
    const resultBlock = document.querySelector('.form-result');

    forms.forEach(form => {
        form.addEventListener('submit',()=>{
            event.preventDefault();
            resultBlock.style.display = 'block';

            if(popup.classList.contains('_active')){
                popup.classList.remove('_active');
            }
            const hideResult = ()=> {
                resultBlock.style.display = '';
            }

            setTimeout(hideResult,4000)
        });
    })
});