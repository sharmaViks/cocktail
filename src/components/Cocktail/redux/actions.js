import { createActions } from 'reduxsauce'
 
const { Types, Creators } = createActions({
	allCocktails:['allCocktails'],
	allCategories:['allCategories'],
	allGlasses:['allGlasses'],
	allIngredients:['allIngredients'],
	allAlcohols:['allAlcohols']
}, {})

export {Types, Creators}