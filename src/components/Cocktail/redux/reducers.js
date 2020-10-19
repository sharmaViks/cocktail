import { createReducer } from 'reduxsauce'
import { Types } from './actions'

export const INITIAL_STATE = { allCocktails: null }

export const allCocktails = (state = INITIAL_STATE, action) => {
    return { ...state, allCocktails: action.allCocktails }
}
export const allCategories = (state = INITIAL_STATE, action) => {
    return { ...state, allCategories: action.allCategories }
}
export const allGlasses = (state = INITIAL_STATE, action) => {
    return { ...state, allGlasses: action.allGlasses }
}
export const allIngredients = (state = INITIAL_STATE, action) => {
    return { ...state, allIngredients: action.allIngredients }
}
export const allAlcohols = (state = INITIAL_STATE, action) => {
    return { ...state, allAlcohols: action.allAlcohols }
}

export const HANDLERS = {

    [Types.ALL_COCKTAILS]: allCocktails,
    [Types.ALL_CATEGORIES]: allCategories,
    [Types.ALL_GLASSES]: allGlasses,
    [Types.ALL_INGREDIENTS]: allIngredients,
    [Types.ALL_ALCOHOLS]: allAlcohols

}

export default createReducer(INITIAL_STATE, HANDLERS)