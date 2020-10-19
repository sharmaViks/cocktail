import { combineReducers } from 'redux'
import { createStore, applyMiddleware  } from 'redux';
import thunk from 'redux-thunk';
import cocktailReducer from './components/Cocktail/redux/reducers';

const cocktailApp = combineReducers({
    cocktail:cocktailReducer
})


const store = createStore(cocktailApp,(applyMiddleware(thunk)))

export default store