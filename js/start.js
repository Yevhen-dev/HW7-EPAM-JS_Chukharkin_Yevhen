"use strict";

import {countCaloriesAndPrice} from "./countCaloriesAndPrice.js";
import {showListProducts} from "./showProductList.js";
import {createHeader} from "./header.js";
import {createMain} from "./main.js";
import {createFooter} from "./footer.js";
import {createElement} from "./createElement.js";


createHeader();
createMain();
createFooter();

let [mainPanel] = document.getElementsByClassName("main__panel");
let [containerPizza] = document.getElementsByClassName("main__container-pizza");
export let selectView = document.getElementById("view");
export let [wrapProducts] = document.getElementsByClassName("main__container-pizza__wrap-products");

window.onload = function() {

    let request = new XMLHttpRequest ();
    request.open (
        "GET",
        "js/pizzas.json"
    );
    request.onreadystatechange = function ( ) {
        if ( this.readyState === 4 &&
            this.status === 200 )
            localStorage.getItem("_user-custom-pizzas-list") === null ? countCaloriesAndPrice(this.responseText) : countCaloriesAndPrice(localStorage.getItem("_user-custom-pizzas-list")) ;
    };
    request.send();


    let [body] = document.getElementsByTagName("body");
    let modalWin = createElement(body, "div");
    modalWin.className = "modal";

    let square = createElement(modalWin, "div");
    square.className = "modal__center";

    let squareTitle = createElement(square, "h2");
    squareTitle.innerText = "Welcome.";

    let squareQuestion = createElement(square, "span");
    squareQuestion.innerText = "How to show your favorite PIZZA ???";

    let wrapButton = createElement(square, "div");
    wrapButton.className = "modal__center__wrap";

    let labelBtnList = createElement(wrapButton,"label");
    let btnList = createElement(labelBtnList, "input");
    btnList.type = "button";
    btnList.value = "LIST";

    let labelBtnTable = createElement(wrapButton,"label");
    let btnTable = createElement(labelBtnTable, "input");
    btnTable.type = "button";
    btnTable.value = "TABLE";

    wrapButton.onclick = function (event) {
        if(event.target.value === "TABLE") {
            modalWin.style.display = "none";
            mainPanel.classList.add("table");
            showListProducts(JSON.parse(localStorage.getItem("_user-custom-pizzas-list")));
        } else if (event.target.value === "LIST") {
            modalWin.style.display = "none";
            containerPizza.classList.add("column");
            selectView.selectedIndex = 1;
            showListProducts(JSON.parse(localStorage.getItem("_user-custom-pizzas-list")));
        } else {
            return null
        }
    }
};










