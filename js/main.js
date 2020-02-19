"use strict";

import {createElement} from "./createElement.js";
import {showListProducts} from "./showProductList.js";
import {sortProductPrice} from "./sortProductPrice.js";
import {sortProductName} from "./sortProductName.js";



let [main] = document.getElementsByClassName("main");
let pizzas = JSON.parse(localStorage.getItem("_user-custom-pizzas-list"));

export function createMain() {




    let mainPanel = createElement(main, "div");
    mainPanel.className = "main__panel";

    let mainContainer = createElement(mainPanel, "div");
    mainContainer.className = "main__panel--container";

    let wrapSort = createElement(mainContainer, "div");
    wrapSort.className = "main__panel--wrapper";

    let text = createElement(wrapSort, "h2");
    text.className = "main__panel__text";
    text.innerText = "Sort by: ";

    let labelPrice = createElement(wrapSort, "label");
    labelPrice.className = "main__panel__price";
    labelPrice.innerText = "Price: ";

    let selectPrice = createElement(labelPrice, "select");
    selectPrice.name = "price";
    selectPrice.id = "price";

    selectPrice.onchange = function (event) {
        let newPizzasObj = JSON.parse(JSON.stringify(pizzas));
        selectName.options.selectedIndex = 0;
        document.getElementsByClassName("main__aside__label__wrap__radio")[0].checked = true;
        if( event.target.options[event.target.options.selectedIndex].value === "down" ) {
            sortProductPrice(newPizzasObj, "down");
            showListProducts(newPizzasObj)
        } else if (event.target.options[event.target.options.selectedIndex].value === "up") {
            sortProductPrice(newPizzasObj, "up");
            showListProducts(newPizzasObj)
        } else {
            showListProducts(pizzas)
        }
    };

    let optionDefaultPrice = createElement(selectPrice, "option");
    optionDefaultPrice.value = "default";
    optionDefaultPrice.innerText = "default";

    let optionUp = createElement(selectPrice, "option");
    optionUp.value = "up";
    optionUp.innerText = "LOW TO HIGH";

    let optionDown = createElement(selectPrice, "option");
    optionDown.value = "down";
    optionDown.innerText = "HIGH TO LOW";

    let labelName = createElement(wrapSort, "label");
    labelName.className = "main__panel__name";
    labelName.innerText = "Name: ";

    let selectName = createElement(labelName, "select");
    selectName.name = "name";
    selectName.id = "name";

    selectName.onchange = function (event) {
        let newPizzasObj = JSON.parse(JSON.stringify(pizzas));
        selectPrice.options.selectedIndex = 0;
        if( event.target.options[event.target.options.selectedIndex].value === "az" ) {
            sortProductName(newPizzasObj, "down");
            showListProducts(newPizzasObj)
        } else if (event.target.options[event.target.options.selectedIndex].value === "za") {
            sortProductName(newPizzasObj, "up");
            showListProducts(newPizzasObj)
        } else {
            showListProducts(pizzas)
        }
    };

    let optionDefaultName = createElement(selectName, "option");
    optionDefaultName.value = "default";
    optionDefaultName.innerText = "default";

    let optionAZ = createElement(selectName, "option");
    optionAZ.value = "az";
    optionAZ.innerText = "A to Z";

    let optionZA = createElement(selectName, "option");
    optionZA.value = "za";
    optionZA.innerText = "Z to A";

    let labelView = createElement(mainContainer, "label");
    labelView.className = "main__panel__view";
    labelView.innerText = "View: ";

    let selectView = createElement(labelView, "select");
    selectView.name = "view";
    selectView.id = "view";

    let optionTable = createElement(selectView, "option");
    optionTable.value = "table";
    optionTable.innerText = "TABLE";

    let optionList = createElement(selectView, "option");
    optionList.value = "list";
    optionList.innerText = "LIST";

    selectView.onchange = function (event) {
        showListProducts(pizzas);
        if(event.target.value === "table") {
            containerPizza.classList.remove("column");
            mainPanel.classList.add("table");
        } else {
            containerPizza.classList.add("column");
            mainPanel.classList.remove("table");
            all.firstElementChild.checked = "true";
        }
    };

    let wrapAsideAndSection = createElement(main, "div");
    wrapAsideAndSection.className = "main__wrap--section-aside";

    let containerPizza = createElement(wrapAsideAndSection, "section");
    containerPizza.className = "main__container-pizza";

    let titleContainerPizza = createElement(containerPizza, "h2");
    titleContainerPizza.innerText = "Pizza";

    let wrapProducts = createElement(containerPizza, "div");
    wrapProducts.className = "main__container-pizza__wrap-products";


    let mainAside = createElement(wrapAsideAndSection, "aside");
    mainAside.className = "main__aside";

    let labelIngredients = createElement(mainAside, "label");
    labelIngredients.className = "main__aside__label";
    labelIngredients.innerText = "Sort by ingredients:";

    ["all", "chicken", "onion", "spicy", "vegetarian", "meat", "mushrooms", "cheese", "seafood"].forEach( (item) => {
        let containerRadioButton = createElement(labelIngredients, "div");
        containerRadioButton.className = "main__aside__label__wrap";
        let ingredient = createElement(containerRadioButton, "input");
        ingredient.className = "main__aside__label__wrap__radio";
        ingredient.type = "radio";
        ingredient.name = "ingredient";
        ingredient.value = item;
        let ingredientsName = createElement(containerRadioButton, "span");
        ingredientsName.innerText = item;
    } );

    let [all] = document.getElementsByClassName("main__aside__label__wrap");
    all.firstElementChild.checked = true;


    labelIngredients.onchange = function (event) {
        selectPrice.options.selectedIndex = 0;
        selectName.options.selectedIndex = 0;
        let newPizzasObj = JSON.parse(JSON.stringify(pizzas));
        let sortByIngredient = [];
        for ( let pizza of newPizzasObj ) {
            if(pizza.categories.includes(event.target.value)) {
                sortByIngredient.push(pizza)
            }
        }
        showListProducts(sortByIngredient)
    };

}