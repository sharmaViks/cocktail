import { Creators } from './actions';
const allCocktails = Creators.allCocktails;
const allCategories = Creators.allCategories;
const allGlasses = Creators.allGlasses;
const allIngredients = Creators.allIngredients;
const allAlcohols = Creators.allAlcohols;
const API_URL = "https://www.thecocktaildb.com/api/json/v1/1/"


const get_cocktails = (type) => {
	return dispatch => {
		let url = new URL(API_URL);
		url += type;
		return fetch(url, {
			method: 'GET',
			headers: {
				Accept: "application/json"
			}
		})
			.then((res) => res.json())
			.then((data) => {
				dispatch(allCocktails(data.drinks))
			})
			.catch((err) => {
				console.log(err)
			})
	}

};

const get_filters = (filterType) => {
	return dispatch => {
		let url = new URL(API_URL) + 'list.php';
		if (filterType == 'category') {
			url += '?c=list';
		}
		else if (filterType == 'glass') {
			url += '?g=list';
		}
		else if (filterType == 'ingredient') {
			url += '?i=list';
		}
		else if (filterType == 'alcohol') {
			url += '?a=list';
		}

		return fetch(url, {
			method: 'GET',
			headers: {
				Accept: "application/json"
			}
		})
			.then((res) => res.json())
			.then((data) => {
				if (filterType == 'category') {
					dispatch(allCategories(data.drinks))
				}
				else if (filterType == 'glass') {
					dispatch(allGlasses(data.drinks))
				}
				else if (filterType == 'ingredient') {
					dispatch(allIngredients(data.drinks))
				}
				else if (filterType == 'alcohol') {
					dispatch(allAlcohols(data.drinks))
				}
				
			})
			.catch((err) => {
				console.log(err)
			})
	}

};

export default { get_cocktails, get_filters }