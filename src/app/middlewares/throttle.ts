import { Middleware } from "@reduxjs/toolkit";
type Map = {
     [key: string]: boolean 
};

const throttled : Map = {
    "throttle": true
}

export const throttle : Middleware = (store) => (next) => (action) => {
    const time = action.meta && action.meta.throttle; 
   
    if(!time) return next(action);

    if(!throttled[action.type]) return;

    throttled[action.type] = true;

    setTimeout(() => {
        throttled[action.type] = false;
    }, time);

    next(action);
}