import React, { useState, useContext, useEffect } from "react";
import { useCallback } from "react";

const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

const AppContext = React.createContext();

const AppProvider = (props) => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("beach");
  const [cocktails, setCocktails] = useState([]);

  const fetchDrinks = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${url}${searchTerm}`);
      const data = await response.json();

      if (data.drinks) {
        const newCocktails = data.drinks.map((item) => {
          const { idDrink, strDrink, strDrinkThumb, strAlcoholic, strGlass } =
            item;
          return {
            id: idDrink,
            name: strDrink,
            info: strAlcoholic,
            image: strDrinkThumb,
            glass: strGlass,
          };
        });
        setCocktails(newCocktails);
      } else {
        setCocktails([]);
      }
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  }, [searchTerm]);

  useEffect(() => {
    fetchDrinks();
  }, [searchTerm]);

  const providerValue = { loading, cocktails, setSearchTerm };

  return (
    <AppContext.Provider value={providerValue}>
      {props.children}
    </AppContext.Provider>
  );
};

// make sure use
/* export const useGlobalContext = () => {
  return useContext(AppContext);
}; */

export { AppContext, AppProvider };
