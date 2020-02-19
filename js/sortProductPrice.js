"use strict";

export function sortProductPrice (arr, how) {
    if( how === "up" ) {
        arr.sort( (a,b) => a.price - b.price )
    } else {
        arr.sort( (a,b) => b.price - a.price)
    }
}