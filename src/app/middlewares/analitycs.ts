import { Middleware } from "@reduxjs/toolkit";
import { initialize, event as trackEvent } from 'react-ga'


initialize("UA-00000-01", { debug: true, titleCase: false })

export const analitycs : Middleware = (store) => (next) => (action) => {
    if(!action.meta || !action.meta.analitycs) return next(action);

    const { category } = action.meta.analitycs;

    trackEvent({
        category,
        action: action.type,
    });

    store.dispatch({
        type: 'GA-EVENT',
        payload: { category, action: action.type },
    });

    return next(action)
}