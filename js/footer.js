"use strict";

import {createElement} from "./createElement.js";

let [footer] = document.getElementsByClassName("footer");

export function createFooter() {
    let footerList = createElement(footer, "ul");
    footerList.className = "footer__list";

    ["career", "about us", "delivery", "discount"].forEach( item => {
        let footerItem = createElement(footerList, "li");
        footerItem.className = "footer__list__item";

        let footerLink = createElement(footerItem, "a");
        footerLink.href = "#";
        footerLink.innerText = item;
    } );
}