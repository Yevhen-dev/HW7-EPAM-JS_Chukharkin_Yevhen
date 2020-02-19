"use strict";

import {createElement} from "./createElement.js";

export function createCartWindow() {

    let pizzasInCart = JSON.parse(localStorage.getItem("_user-add-to-cart"));
    let [body] = document.getElementsByTagName("body");

    let bodyWrap = createElement(body, "div");
    bodyWrap.className = "body__wrap";

    let wrap = createElement(body, "div");
    wrap.className = "wrap-cart";

    let cross = createElement(wrap, "a");
    cross.href = "#";
    cross.className = "wrap-cart__cross";
    cross.innerText = "X";
    cross.onclick = function () {
        wrap.remove();
        bodyWrap.remove();
    };

    let list = createElement(wrap, "ul");
    list.className = "wrap-cart__list";


    if(pizzasInCart.length === 0) {
        let empty = createElement(list, "li");
        empty.className = "wrap-cart__list__empty";
        empty.innerText = "You did not choose pizza"
    } else {


        let countTotalPrice = 0;

        pizzasInCart.forEach( (item, index) => {
            let li = createElement(list, "li");
            li.className = "wrap-cart__list__item";

            let wrapImg = createElement(li, "div");
            wrapImg.className = "wrap-cart__list__item__wrap--img";

            let img = createElement(wrapImg, "img");
            img.alt = "pizza";
            img.src = item.image;

            let name = createElement(li, "span");
            name.className = "wrap-cart__list__item__name";
            name.innerText = item.name;

            let ingredients = createElement(li, "span");
            ingredients.className = "wrap-cart__list__item__ingredients";
            let result = "";
            item.ingredient.forEach( (item, index,arr) => {
                if( index === arr.length-1) {
                    result += item
                } else {
                    result += item + ", "
                }
            });
            ingredients.innerText = result;

            let price = createElement(li, "span");
            price.className = "wrap-cart__list__item__price";
            price.innerText = item.price + " $";
            countTotalPrice += item.price;

            let wrapInput = createElement(li, "label");
            let input = createElement(wrapInput, "input" );
            input.className = "wrap-cart__list__item__total";
            input.type = "number";
            input.value = "1";
            input.min = "1";
            input.onkeypress = function () {
                return false
            };

            let closeLi = createElement(li, "a");
            closeLi.className = "wrap-cart__list__item__cross";
            closeLi.href = "#";
            closeLi.innerHTML = "x";
            closeLi.onclick = function (event) {
                bodyWrap.remove();
                let [countTotalPizzas] = document.getElementsByClassName("header__basket__total");
                pizzasInCart.splice(index,1);
                localStorage.setItem( "_user-add-to-cart", JSON.stringify(pizzasInCart) );
                wrap.remove();
                createCartWindow();
                countTotalPizzas.innerText = pizzasInCart.length;
            };
        } );

        let wrapBtnTotal = createElement(wrap, "div");
        wrapBtnTotal.className = "wrap-cart__wrap";

        let totalPrice = createElement(wrapBtnTotal,"span");
        totalPrice.className = "wrap-cart__wrap__total-price";
        totalPrice.innerText = "Total price: " + countTotalPrice + " $";

        let orderBtn = createElement(wrapBtnTotal, "a");
        orderBtn.href = "#";
        orderBtn.className = "wrap-cart__wrap__btn";
        orderBtn.innerText = "Order";

        orderBtn.onclick = function () {
            let orderObj = [];
            for( let i = 0; i < list.children.length; i++ ) {
                let order = {
                    pizza: {
                        name: list.children[i].children[1].innerText,
                        ingredient: list.children[i].children[2].innerText.split(", "),
                        price: parseInt(list.children[i].children[3].innerText)
                    },
                    totalCount: list.children[i].children[4].children[0].value
                };
                orderObj.push(order)
            }
            console.log(orderObj);
            let [total] = document.getElementsByClassName("header__basket__total");
            total.innerText = 0;
            localStorage.setItem("_user-add-to-cart", "[]");
            wrap.remove();
            bodyWrap.remove();
            createCartWindow()
        }


    }
}