           const menuList= document.querySelector("menu_list"),
           closeMenu =document.querySelector("#close_icon"),
           openMenu = document.querySelector("toggle_menu");
openMenu.addEventListener("click ", ()  =>{
    menuList.classList.add("show");
});
closeMenu.addEventListener("click ", ()  =>{
    menuList.classList.remove("show");
})

window.addEventListener('scroll', reveal);

function reveal(){
    let reveals = document.querySelectorAll('.reveal')
    for(let i = 0; i<reveals.length; i++) {
        let windowHeight = window.innerHeightl;
        let revealTop = reveals[i].getBoundingClientRect().top;
        let revealPoint = 150;

        if(revealTop < windowHeight-revealPoint){
            reveals[i].classList.add('active')

        }else{
            reveals[i].classList.remove('active');
        }
    }
}

const toTop = documnet.querySelector('to_top');
window.addEventListener('scroll', () => {
    if(window.pageYOffset>400){
        toTop.classList.add('top_active');
    }else{
        toTop.classList.remove('top_active');
    }
})
