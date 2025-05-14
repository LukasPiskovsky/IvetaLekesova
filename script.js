//selectors////////////////////////////////////////////////////////////

const heading = document.querySelector(".heading")
const arrow = document.querySelectorAll(".arrow")
const arrows = document.querySelector(".arrows")
const headerArrows = document.querySelector(".header-arrows")
const certificateArrows = document.querySelector(".certificate-container-arrows")
const servicesArrows = document.querySelector(".services-arrows")
const sections = document.querySelectorAll("section")
const header = document.querySelector("header")
const main = document.querySelector("main")
const logo = document.querySelector(".logo")
const insurencyType = document.querySelectorAll(".insurency-type")
const insurencyTypeBtn = document.querySelectorAll(".insurency-type-button")
const insurencyTypeHeading = document.querySelectorAll(".insurency-type-h3")
const insurencyTypeImg = document.querySelectorAll(".insurency-type-image")
const insurencyTypeP = document.querySelectorAll(".insurency-type-p")
const achievements = document.querySelector(".achievements")
const services = document.querySelector(".services")
const contact = document.querySelector(".contact")

const csob = document.querySelector(".csob")
const csobImg = document.getElementById("csob-img")
const csobDiv = document.getElementById("csob-div")
const insurance = document.querySelector(".insurance")
const insuranceImg = document.getElementById("insurance-img")
const insuranceDiv = document.getElementById("insurance-div")
const certificateContainer = document.querySelector(".cerificate-container")
const formHeading = document.getElementById("form-heading")
const formBtn = document.getElementById("form-button")


//behvaior////////////////////////////////////////////////////////////

if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
let hasResetHorizontal = false;
let hasResetVertical = false;
window.addEventListener("resize", () =>{
    if(window.innerWidth < 1015 && !hasResetHorizontal){
        reset()
        hasResetHorizontal = true;
        hasResetVertical = false;
    }
    else if(window.innerWidth > 1015 && !hasResetVertical){
        reset()
        hasResetHorizontal = false
        hasResetVertical = true
    }
})

window.addEventListener("DOMContentLoaded", ()=>{
    reset()
});

function reset(){
    sections[0].scrollIntoView({behavior: "smooth"})
    window.scrollTo(0, 0);
    setTimeout(() => {
        header.scrollIntoView({behavior: "auto"});
    }, 10);

    resetServiceDivs()
    ScrollReveal({ reset: true })
}

function preventDefault(e) {
  e.preventDefault();
}

setInterval(()=>{
if(window.innerWidth > 1016){
    window.addEventListener('wheel', preventDefault, { passive: false });
} else{
    window.removeEventListener('wheel', preventDefault)
}
},20)

//scrolling/////////////////////////////////////////

let isScrolling = false;
let webSpeed = 600;
let hasFormAnimated = false;
// let easing = "inOutCubic"

window.addEventListener("wheel", (e) => {
    if (isScrolling) return;
    const headerHeight = parseInt(window.getComputedStyle(header).height)
    const achievementsHeight = parseInt(window.getComputedStyle(achievements).height)
    const servicesHeight = parseInt(window.getComputedStyle(services).height)
    const contactHeight = parseInt(window.getComputedStyle(contact).height)

    const innerWindowHeight = window.innerHeight
    console.log(e.deltaY)
    //from header to achievements
    if ((e.target.tagName.toLowerCase() === "header" || e.target.closest("header")) && e.deltaY > 10 && headerHeight <= innerWindowHeight) {
        isScrolling = true;
        achievements.scrollIntoView({ behavior: "smooth" });
    } 


    //from achievements to header
    else if ((e.target.classList.contains("achievements") || e.target.closest(".achievements")) && e.deltaY < -10 && achievementsHeight <= innerWindowHeight) {

        isScrolling = true;
        header.scrollIntoView({ behavior: "smooth" });

    } 


    //from achievements to services
    else if ((e.target.classList.contains("achievements") || e.target.closest(".achievements")) && e.deltaY > 10 && achievementsHeight <= innerWindowHeight){
        isScrolling = true;

        if(window.innerWidth > 1016){

            services.scrollIntoView({ behavior: "smooth" });

            AnimateServiceDivs()
        }
    }


    //from services to achievements
    else if ((e.target.classList.contains("services") || e.target.closest(".services")) && e.deltaY < -10 && servicesHeight <= innerWindowHeight){
        isScrolling = true

        if(window.innerWidth > 1016){
            achievements.scrollIntoView({behavior: "smooth"})
        }           
        }

    //from services to contact
    else if ((e.target.classList.contains("services") || e.target.closest(".services")) && e.deltaY > 10 && servicesHeight <= innerWindowHeight){
        isScrolling = true

        if(window.innerWidth > 1016){
            contact.scrollIntoView({behavior: "smooth"})
            if(!hasFormAnimated){
                animateForm()
                hasFormAnimated = true;
            }

        }   

    }
    //from contact to services
    else if (e.target.classList.contains("contact") || e.target.closest(".contact") && e.deltaY < -10 && contactHeight <= innerWindowHeight){
        isScrolling = true

        if(window.innerWidth > 1016){
            services.scrollIntoView({behavior: "smooth"})
        }  
    }


    setTimeout(() => {
        isScrolling = false;
    }, webSpeed);
});

window.addEventListener("resize", () => {
    if (window.innerWidth > 1016) {
        const rect = services.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
        if (isVisible) {
            services.scrollIntoView({ behavior: "smooth" });
        }
    }
});

//click events
headerArrows.addEventListener("click", () => {
        sections[0].scrollIntoView({behavior:"smooth"})
})

certificateArrows.addEventListener("click", () => {
        sections[1].scrollIntoView({behavior:"smooth"})
        if(window.innerWidth > 1015){
        AnimateServiceDivs()
        }
})
servicesArrows.addEventListener("click", () => {
        sections[2].scrollIntoView({behavior:"smooth"})
})

logo.addEventListener("click", () => {
    reset()
    header.scrollIntoView({behavior: "smooth"})

    // const rect = heading.getBoundingClientRect();
    // const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
    // if(!isVisible){
    //     hasFormAnimated = false
    //     setTimeout(() => {
    //         ScrollReveal().clean(".form-show");
    //         ScrollReveal().clean(".insurance");
    //         ScrollReveal().clean(".csob");
    //         ScrollReveal().clean(".certificate-container-arrows");
    //         ScrollReveal().reveal(".form-show", {delay: webSpeed * 2, reset: false})
    //         ScrollReveal().reveal(".insurance", {delay: webSpeed, reset: false})
    //         ScrollReveal().reveal(".csob", {delay: webSpeed * 1.5, reset: false})
    //         ScrollReveal().reveal(".certificate-container-arrows", {delay: webSpeed * 2, reset: false})
    //     }, 300)
    // }

})

insurencyTypeBtn.forEach((elem, index) =>{
    let rotate= [180, 180, 180, 180]
    let pContentText =["Pojištění nemovitosti chrání váš dům nebo byt před škodami způsobenými živly, požárem, povodní, vandalismem nebo krádeží. Můžete si také pojistit vybavení domácnosti od nábytku po elektroniku.", 

    "Nástroj pro zajištění finanční stability vaší rodiny v nepředvídatelných životních situacích. Chrání vás i vaše nejbližší v případě úrazu, vážného onemocnění nebo úmrtí. Kromě základního krytí může životní pojištění sloužit také jako forma spoření či investice pro budoucnost.",

    "Ať už vyrážíte na dovolenou, pracovní cestu nebo krátký výlet, cestovní pojištění vás chrání před nečekanými výdaji v zahraničí. Pokrývá zdravotní péči, ztrátu zavazadel nebo storno cesty.",

    "Úrazové a nemocenské pojištění zajišťuje finanční podporu při úrazu, dlouhodobé nemoci nebo pracovní neschopnosti. Pomáhá vám pokrýt výpadek příjmu i zvýšené výdaje během léčby."]

    let pContentLi = ["<ul><li>Škody na stavbě (např. střecha, okna, zdi)</li><li>Poškození nebo zničení domácího vybavení</li><li>Odpovědnost za škodu způsobenou sousedům (např. vytopení)</li></ul>",
    
    "<ul><li>Finanční zajištění rodiny při nečekaných životních událostech</li><li>Možnost připojištění (např. invalidity, hospitalizace,apod.)</li><li>Daňové výhody možnost odečtu z daní</li><li>Možnost spoření nebo investování na stáří či pro děti</li></ul>",

    "<ul><li>Léčebné výlohy v zahraničí</li><li>Asistenční služby 24/7</li><li>Pojištění zavazadel a odpovědnosti</li><li>Pojištění storna zájezdu nebo zpoždění letu</li></ul>",

    "<ul><li>Trvalé následky úrazu</li><li>Denní odškodné za dobu léčení</li><li>Invaliditu nebo smrt následkem úrazu</li><li>Pracovní neschopnost z důvodu nemoci</li></ul>",
    ]

    elem.addEventListener("click", () =>{

        anime({
            targets: [insurencyType[index], insurencyTypeHeading[index], insurencyTypeImg[index], insurencyTypeP[index], insurencyTypeBtn[index]],
            rotateY: `${rotate[index]}deg`,
            duration: webSpeed * 3
        });
        rotate[index] +=180

        if (elem.textContent === "Více") {
            elem.textContent = "Zpět";
            insurencyTypeP[index].innerHTML = pContentLi[index]
        } else {
            elem.textContent = "Více";
            insurencyTypeP[index].innerHTML = pContentText[index]
}
    })
})


insuranceImg.addEventListener("click", () =>{
    insuranceImg.classList.toggle("insurance-click")
    csobImg.classList.remove("csob-click")
    setTimeout(() => {
        insuranceImg.classList.contains("insurance-click") ? certificateContainer.classList.add("certificate-blurred") : certificateContainer.classList.remove("certificate-blurred")
        
    },100)
})
csobImg.addEventListener("click", () =>{
    csobImg.classList.toggle("csob-click")
    insuranceImg.classList.remove("insurance-click")
    setTimeout(() => {
        csobImg.classList.contains("csob-click") ? certificateContainer.classList.add("certificate-blurred") : certificateContainer.classList.remove("certificate-blurred")
    },300)
})

window.addEventListener("click", (e) =>{
      if (!csobImg.contains(e.target) && !insuranceImg.contains(e.target)) {
    
        insuranceImg.classList.remove("insurance-click")
        csobImg.classList.remove("csob-click")
        certificateContainer.classList.remove("certificate-blurred")
      }
})








//animation//////////////////////////////////////////////////////////

arrow.forEach((elem, index) =>{
    setTimeout(() => {
        elem.classList.add("animate-arrow")
    }, index *300)
})

function AnimateServiceDivs(){
    const tl2 = anime.timeline({
            easing:"easeInOutQuad",
            duration:webSpeed
        })
    insurencyType.forEach((elem,index)=>{

        tl2.add({
            targets: elem,
            translateX: "-2000px",
        });
    })
}

function resetServiceDivs(){
    insurencyType.forEach((elem)=>{
        anime({
            targets:elem,
            translateX: "0px",
        }
        )
    })
}

function animateForm(){
    anime({
        targets:formHeading,
        translateY: [119, 0],
        easing: 'easeOutExpo',
        delay:1000,
        duration: 2600
    })
    anime({
        targets:formBtn,
        translateY: [-119, 0],
        easing: 'easeOutExpo',
        delay:1000,
        duration: 2600
    })

}


//scroll reveal////////////////////////////////////////////////////

// ScrollReveal({ reset: true });
ScrollReveal().reveal(".load-hidden", {delay: (webSpeed / 2) + 100, reset: false})
ScrollReveal().reveal(".header-arrows", {delay: webSpeed, reset: false})
ScrollReveal().reveal(".insurance", {delay: webSpeed, reset: false})
ScrollReveal().reveal(".csob", {delay: webSpeed * 1.5, reset: false})
ScrollReveal().reveal(".certificate-container-arrows", {delay: webSpeed * 2, reset: false})
ScrollReveal().reveal(".form-show", {delay: webSpeed * 2, reset: false})

