import { createContext } from "react";

export const ThemeContext = createContext(false);

export const ThemeDispatchContext = createContext(() => null);

export function themeReducer(theme, action) {
    switch (action.type) {
        case 'toggle':
            return !theme;
        default: {
            throw new Error('Unknown action');
        }
    }
}
