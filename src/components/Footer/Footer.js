import footerTemplate from './Footer.html?raw'
import './Footer.css'

export function Footer() {
  const wrapper = document.createElement('div')
  wrapper.innerHTML = footerTemplate
  return wrapper.firstElementChild;
}


export function FooterLinkBgChange(){
  const current = window.location.pathname;
  const footerLinks = document.querySelectorAll(".footer-a");

  footerLinks.forEach(link => {
    link.classList.remove("active");

    if (link.getAttribute("href") === current) {
      link.classList.add("active");
    }
  });
}