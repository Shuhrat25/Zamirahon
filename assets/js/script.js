const popupBox = document.querySelector('.popups'),
      popups = document.querySelectorAll('.popup'),
      exit = document.querySelector('.exit'),
      btns = document.querySelectorAll('.btn');

btns.forEach(btn => {
    btn.addEventListener('click', ()=>{
        let btnData = btn.dataset.name;
        popupBox.classList.add('active');

        popups.forEach(popup => {
            let popupData = popup.dataset.name;
            if (btnData === popupData) {
                popup.classList.add('active');
            } else {
                popup.classList.remove('active');
            }
        })
    })
})

exit.addEventListener('click', ()=>{
    popupBox.classList.remove('active')
})