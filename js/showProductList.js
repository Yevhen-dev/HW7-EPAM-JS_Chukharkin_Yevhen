"use strict";

import {createElement} from "./createElement.js";
import {wrapProducts,selectView} from "./start.js";
import {createModalPlate} from "./modalPlate.js";
import {createOwnPizza} from "./createOwnPizza.js";

export function showListProducts(obj) {


    obj === null ? obj = JSON.parse(localStorage.getItem("_user-custom-pizzas-list")) : null;

    wrapProducts.innerHTML = "";
    let productsList = createElement(wrapProducts, "ul");
    productsList.className = "main__container-pizza__wrap-products__list";

    obj.forEach( item => {
        let element = createElement(productsList, "li");
        element.className = "main__container-pizza__wrap-products__list__item";

        let link = createElement(element, "a");
        link.href = "#";
        link.className = "main__container-pizza__wrap-products__list__item__link";
        link.addEventListener( "click", createModalPlate );

        let wrapImage = createElement(link, "div");
        wrapImage.className = "main__container-pizza__wrap-products__list__item__link__wrap--image";

        let img = createElement(wrapImage, "img");
        img.src = item.image;
        img.alt = "pizza";

        let description = createElement(link, "div");
        description.className = "main__container-pizza__wrap-products__list__item__link__description";

        let descriptionName = createElement(description, "h2");
        descriptionName.className = "main__container-pizza__wrap-products__list__item__link__description__name";
        descriptionName.innerText = item.name;

        let descriptionCompositionItem = createElement(description, "p");
        descriptionCompositionItem.className = "main__container-pizza__wrap-products__list__item__link__description__composition";
        let result = "";
        item.ingredient.forEach( (elem, index, arr) => {
            if(index+1 === arr.length) {
                result += elem;
            } else {
                result += elem + ", "
            }
        });
        descriptionCompositionItem.innerText = result;

        let descriptionCalories = createElement(description, "p");
        descriptionCalories.className = "main__container-pizza__wrap-products__list__item__link__description__calories";
        descriptionCalories.innerText = "Calorie content: " +  item.calories + " kCal";

        let descriptionWrapBuy = createElement(description, "div");
        descriptionWrapBuy.className = "main__container-pizza__wrap-products__list__item__link__description__wrap";

        let descriptionPrice = createElement(descriptionWrapBuy, "p");
        descriptionPrice.className = "main__container-pizza__wrap-products__list__item__link__description__wrap__price";
        descriptionPrice.innerText = item.price + " $";

        let descriptionBuy = createElement(descriptionWrapBuy, "span");
        descriptionBuy.className = "main__container-pizza__wrap-products__list__item__link__description__wrap__buy";
        descriptionBuy.innerText = "Add to cart";
        descriptionBuy.onclick = function (event) {
            event.stopPropagation();
            let pizzasInCart = JSON.parse(localStorage.getItem("_user-add-to-cart"));
            let pizza = {
                image: img.src,
                name: item.name,
                ingredient: item.ingredient,
                price: item.price
            };
            pizzasInCart.push(pizza);
            document.getElementsByClassName("header__basket__total")[0].innerText = pizzasInCart.length;
            localStorage.setItem("_user-add-to-cart", JSON.stringify(pizzasInCart));
        }
    } );

    let newPizza = createElement(productsList, "li");
    newPizza.className = "main__container-pizza__wrap-products__list__item";

    let link = createElement(newPizza, "a");
    link.href = "#";
    link.className = "main__container-pizza__wrap-products__list__item__link main__container-pizza__wrap-products__list__item__link--create";

    let [createButton] = document.getElementsByClassName("main__container-pizza__wrap-products__list__item__link--create");
    createButton.addEventListener("click", createOwnPizza);

    let img = createElement(link, "img");
    img.src = "images/plus.svg";
    img.alt = "plus";

    let title = createElement(link, "h2");
    title.className = "main__container-pizza__wrap-products__list__item__link--create__title";
    title.innerText = "Create your own pizza";

    if(selectView.selectedIndex === 1) {
        productsList.classList.add("column");

        let element = document.getElementsByClassName("main__container-pizza__wrap-products__list__item");
        for (let item of element) {
            item.classList.add("column");
        }

        let link = document.getElementsByClassName("main__container-pizza__wrap-products__list__item__link");
        for ( let item of link ) item.classList.add("column");

        let wrapImage = document.getElementsByClassName("main__container-pizza__wrap-products__list__item__link__wrap--image");
        for (let item of wrapImage) item.classList.add("column");

        let description = document.getElementsByClassName("main__container-pizza__wrap-products__list__item__link__description");
        for (let item of description) item.classList.add("column");

        let descriptionName = document.getElementsByClassName("main__container-pizza__wrap-products__list__item__link__description__name");
        for (let item of descriptionName) item.classList.add("column");

        let descriptionWrapBuy = document.getElementsByClassName("main__container-pizza__wrap-products__list__item__link__description__wrap");
        for (let item of descriptionWrapBuy) item.classList.add("column");

        let descriptionPrice = document.getElementsByClassName("main__container-pizza__wrap-products__list__item__link__description__wrap__price");
        for (let item of descriptionPrice) item.classList.add("column");

        let descriptionBuy = document.getElementsByClassName("main__container-pizza__wrap-products__list__item__link__description__wrap__buy");
        for (let item of descriptionBuy) item.classList.add("column");

        let descriptionCompositionItem = document.getElementsByClassName("main__container-pizza__wrap-products__list__item__link__description__composition");
        for (let item of descriptionCompositionItem) item.classList.add("column");

        let descriptionCalories = document.getElementsByClassName("main__container-pizza__wrap-products__list__item__link__description__calories");
        for(let item of descriptionCalories) item.classList.add("column");
    }
}