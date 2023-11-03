export const themeHueLight = {
    base: '#000',
    primary: '#FFF',
    primary_light: '#F3F5F7',
    secondary_light: '#E5E5E5',
    secondary: '#8B3DFF'
}

export const themeHueDark = {
    base: '#FFF',
    primary: '#1F1B24',
    primary_light: '#413D45',
    secondary_light: '#413D45',
    secondary: '#8B3DFF'
}

export const initialState = {
   theme: 'Light',
   themeHue: themeHueLight
}

export const actionTypes = {
   setTheme: "SETTHEME"
}

const reducer = (state, action) => {
    switch (action.type) {
        case actionTypes.setTheme:
            return {
                ...state,
                theme: action.theme,
                themeHue: action.theme === 'Light' ? themeHueLight : themeHueDark
            };
        
        default: 
            return state;
    }
};

export default reducer;