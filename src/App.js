import React from 'react';
import CocktailContainer from './components/Cocktail/CocktailContainer';
import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <CocktailContainer />
    </Provider>
  );
}

export default App;
