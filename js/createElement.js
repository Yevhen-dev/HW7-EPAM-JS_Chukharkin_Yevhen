"use strict";

export function createElement( parent, tagName ) {
    return parent.appendChild(document.createElement(tagName))
}