"use strict";

import {createElement} from "./createElement.js";
import {createCartWindow} from "./createCartWindow.js";

let [header] = document.getElementsByClassName("header");

export function createHeader () {
    let headerLogoWrap = createElement(header, "div");
    headerLogoWrap.className = "header__wrap";

    let headerLogo = createElement(headerLogoWrap, "a");
    headerLogo.href = "#";
    headerLogo.className = "header__wrap__logo";

    let imgLogo = createElement(headerLogo, "img");
    imgLogo.className = "logo";
    imgLogo.src = "images/logo2.jfif";
    imgLogo.alt = "logo";

    let container = createElement(header, "div");
    container.className = "header--container";

    let headerNav = createElement(container, "nav");
    headerNav.className = "header__nav";

    let headerNavList = createElement(headerNav, "ul");
    headerNavList.className = "header__nav__list";

    ["drinks", "pizza", "contacts" ].forEach( (item) => {
        let li = createElement(headerNavList, "li");
        li.className = "header__nav__list__item";
        let link = createElement(li, "a");
        link.href = "#";
        link.innerText = item.toUpperCase();
    } );

    let tel = createElement(container, "a");
    tel.className = "header__tel";
    tel.href = "tel:+380123456789";
    tel.innerText = "+3 (8012) 345-67-89";

    let basket = createElement(container, "a");
    basket.className = "header__basket";
    basket.href = "#";

    let total = createElement(basket, "p");
    total.className = "header__basket__total";
    localStorage.getItem("_user-add-to-cart") ?  null : localStorage.setItem("_user-add-to-cart", JSON.stringify([]));
    total.innerText = JSON.parse(localStorage.getItem("_user-add-to-cart")).length;



    basket.onclick = createCartWindow;


}

