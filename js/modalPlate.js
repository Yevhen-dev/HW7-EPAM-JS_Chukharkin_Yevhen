"use strict";

import {createElement} from "./createElement.js";
import {recountCaloriesAndPrice} from "./recountCaloriesAndPrice.js";
import {showListProducts} from "./showProductList.js";

let [body] = document.getElementsByTagName("body");

export function createModalPlate() {

        let pizzasInCart = JSON.parse(localStorage.getItem("_user-add-to-cart"));

        let pizzas = JSON.parse(localStorage.getItem("_user-custom-pizzas-list"));

        let modalTable = createElement(body, "div");
        modalTable.className = "wrap--table";

        let modalCenter = createElement(modalTable, "div");
        modalCenter.className = "wrap--table__center";

        let crossModal = createElement(modalCenter, "a");
        crossModal.href = "#";
        crossModal.className = "wrap--table__center--cross";
        crossModal.innerText = "X";
        crossModal.onclick = function () {
            modalTable.remove()
        };

        let gear = createElement(modalCenter, "a");
        gear.href = "#";
        gear.className = "wrap--table__center__settings";
        gear.onclick = function () {
            crossModal.classList.add("disabled");
            let arrIngredient = () => {
                for ( let item of pizzas ) {
                    if(item.name === name.innerText) {
                        return item.ingredient
                    }
                }
            };
            let wrapIngredient = createElement(modalCenter, "div");
            wrapIngredient.className = "wrap--table__center__settings--table";
            let cross = createElement(wrapIngredient, "a");
            cross.href = "#";
            cross.className = "wrap--table__center__settings--cross";
            cross.innerText = "X";
            cross.onclick = function () {
                wrapIngredient.remove();
                showListProducts(pizzas);
                crossModal.classList.remove("disabled");
            };

            let title = createElement(wrapIngredient, "h2");
            title.innerText = "Customize your pizza";

            let list = createElement(wrapIngredient, "ul");
            list.className = "wrap--table__center__settings__list";

            function showIngredient () {
                for(let item of arrIngredient()) {
                    let ingredient = createElement(list, "li");
                    ingredient.className = "wrap--table__center__settings__list__item";

                    let nameIngredient = createElement(ingredient, "span");
                    nameIngredient.classList = "wrap--table__center__settings__list__item__name";
                    nameIngredient.innerText = item;

                    let ingredientBtn = createElement(ingredient, "a");
                    ingredientBtn.href = "#";
                    ingredientBtn.className = "wrap--table__center__settings__list__item__btn";
                    let count;
                    ingredientBtn.onclick = function (e) {
                        e.target.classList.toggle("active");
                        ingredient.classList.toggle("delete");
                        for (let prop of ingredient.classList) {
                            if(prop === "delete") {
                                for ( let pizza of pizzas ) {
                                    if(pizza.name === name.innerText) {
                                        pizza.ingredient.forEach( (item, index, arr) => {
                                            if(item === nameIngredient.innerText) {
                                                arr.splice(index, 1);
                                                count = index;
                                            }
                                            pizza.ingredient = arr;
                                            ingredients.innerText = arr;
                                        } );
                                        recountCaloriesAndPrice(pizza, calories, price);
                                    }
                                }
                            } else if (e.target.classList.length === 1) {
                                for ( let pizza of pizzas ) {
                                    if(pizza.name === name.innerText) {
                                        pizza.ingredient.splice(count, 0, nameIngredient.innerText);
                                        ingredients.innerText = pizza.ingredient;
                                        recountCaloriesAndPrice(pizza, calories, price);
                                    }
                                }
                            }
                        }
                    }
                }
                let lastChild = createElement(list, "li");
                lastChild.className = "wrap--table__center__settings__list__item wrap--table__center__settings__list__item--last";

                let wrap = createElement(lastChild, "label");
                wrap.for = "addIngredient";

                let select = createElement(lastChild, "select");
                select.id = "addIngredient";

                let option = createElement(select, "option");
                option.value = "default";
                option.innerText = "choose ingredient";

                [ "chicken", "dorBlue", "mozzarella",
                    "cheeseMix", "mandarine", "tomato",
                    "onion", "bacon", "jalapeno", "pork",
                    "oregano", "peperoni", "ham", "mustard",
                    "pickles", "champignon", "olives", "beef",
                    "reganito", "pineapple", "garlic", "capsicum",
                    "seafood" ].forEach( item => {
                    let option = createElement(select, "option");
                    option.value = item;
                    option.innerText = item;
                } );

                let add = document.getElementById("addIngredient");

                add.onchange = function () {
                    if(this.value !== "default") {
                        for(let pizza of pizzas) {
                            if( pizza.name === name.innerText ) {
                                pizza.ingredient.push(this.value);
                                list.innerText = "";
                                showIngredient();
                                recountCaloriesAndPrice(pizza, calories, price);
                                ingredients.innerText = pizza.ingredient;
                            }
                        }
                    }
                }
            }
            showIngredient();
        };

        let wrapImg = createElement(modalCenter, "div");
        wrapImg.className = "wrap--table__center__wrap-img";

        let img = createElement(wrapImg, "img");
        img.alt = "pizza";
        img.src = this.children[0].children[0].src;

        let description = createElement(modalCenter, "div");
        description.className = "wrap--table__center__description";

        let name = createElement(description, "h2");
        name.className = "wrap--table__center__description__name";
        name.innerText = this.children[1].children[0].innerText;

        let ingredients = createElement(description, "p");
        ingredients.className = "wrap--table__center__description__ingredients";
        ingredients.innerText = this.children[1].children[1].innerText;

        let  calories = createElement(description, "p");
        calories.className = "wrap--table__center__description__calories";
        calories.innerText = this.children[1].children[2].innerText;

        let container = createElement(description, "div");
        container.className = "wrap--table__center__description__container";

        let price = createElement(container, "span");
        price.innerText = this.children[1].children[3].children[0].innerText;

        let btnBuy = createElement(container, "a");
        btnBuy.href = "#";
        btnBuy.innerText = "Add to cart";
        btnBuy.onclick = function () {
            let pizza = {
                image:  img.src,
                name: name.innerText,
                ingredient: [],
                price: parseInt(price.innerText)
            };
            ingredients.innerText.split(", ").forEach( item => {
                pizza.ingredient.push( item );
            } );
            pizzasInCart.push(pizza);
            document.getElementsByClassName("header__basket__total")[0].innerText = pizzasInCart.length;
            localStorage.setItem( "_user-add-to-cart", JSON.stringify(pizzasInCart) )
        }
}