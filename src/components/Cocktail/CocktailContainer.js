import React, { useEffect } from 'react';
import Cocktail from './Cocktail';
import get_cocktails from './redux/index';
import { useSelector, useDispatch } from 'react-redux'

const CocktailContainer = () => {
    const dispatch = useDispatch();
    const all_cocktails = useSelector(state => state.cocktail.allCocktails)
    const all_categories = useSelector(state => state.cocktail.allCategories)
    const all_glasses = useSelector(state => state.cocktail.allGlasses)
    const all_ingredients = useSelector(state => state.cocktail.allIngredients)
    const all_alcohols = useSelector(state => state.cocktail.allAlcohols)

    useEffect(() => {
        dispatch(get_cocktails.get_cocktails('search.php?f=a'));
        dispatch(get_cocktails.get_filters('category'));
        dispatch(get_cocktails.get_filters('glass'));
        dispatch(get_cocktails.get_filters('ingredient'));
        dispatch(get_cocktails.get_filters('alcohol'));
    }, [])


    const applyFilters = (filters) => {
        if (filters.length > 0) {
            dispatch(get_cocktails.get_cocktails('filter.php?' + filters));
        }
        else{
            dispatch(get_cocktails.get_cocktails('search.php?f=a'));
        }
    }

    const handleSearch =(event)=>{
        let searchText = event.target.value;
        if(searchText.length>0){
            dispatch(get_cocktails.get_cocktails('search.php?s='+searchText));
        }
        else{
            dispatch(get_cocktails.get_cocktails('search.php?f=a'));
        }
    }


    const props = { all_cocktails, all_categories, all_glasses, all_ingredients, all_alcohols, applyFilters,handleSearch };
    return <Cocktail {...props}
    />
}

export default CocktailContainer;