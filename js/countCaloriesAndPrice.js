"use strict";


export function countCaloriesAndPrice(arr){
    let pizzas = JSON.parse(arr);

    let calories = {
        chicken: 34,
        dorBlue: 71,
        mozzarella: 50,
        cheeseMix: 65,
        mandarine: 6,
        tomato: 4,
        onion: 8,
        bacon: 108,
        jalapeno: 5,
        pork: 46,
        oregano: 61,
        peperoni: 96,
        ham: 28,
        mustard: 13,
        pickles: 4,
        champignon: 6,
        olives: 13,
        beef: 50,
        reganito: 73,
        pineapple: 10,
        garlic: 28,
        capsicum: 5,
        seafood: 25,
    };

    let price = {
        chicken: 2,
        dorBlue: 3,
        mozzarella: 2,
        cheeseMix: 3,
        mandarine: 1,
        tomato: 1,
        onion: 1,
        bacon: 5,
        jalapeno: 2,
        pork: 6,
        oregano: 2,
        peperoni: 3,
        ham: 4,
        mustard: 1,
        pickles: 1,
        champignon: 2,
        olives: 1,
        beef: 5,
        reganito: 4,
        pineapple: 2,
        garlic: 1,
        capsicum: 2,
        seafood: 6,
    };

    for(let pizza of pizzas) {
        pizza.calories = 25;
        pizza.price = 3;
        let resultCal = pizza.calories;
        let resultPrice = pizza.price;
        for(let key in pizza) {
            if(key === "ingredient") {
                pizza[key].forEach( item => {
                    for(let product in calories) {
                        if(item === product) {
                            resultCal += calories[product];
                        }
                    }
                } )
            }
            if(key === "price") {
                pizza.ingredient.forEach( item => {
                    for (let product in price) {
                        if( item === product ) {
                            resultPrice += price[product]
                        }
                    }
                } )
            }
        }
        pizza.calories = resultCal;
        pizza.price = resultPrice;
    }
    localStorage.getItem("_user-pizzas-list") === "null" ?
        localStorage.setItem("_user-pizzas-list", JSON.stringify(pizzas)) : localStorage.setItem("_user-custom-pizzas-list", JSON.stringify(pizzas))
}
