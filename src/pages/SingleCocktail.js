import React from "react";
import Loading from "../components/Loading";
import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
const url = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";

const SingleCocktail = () => {
  const cocktID = useParams().id;
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchDetails = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${url}${cocktID}`);
      const data = await response.json();

      if (data.drinks) {
        const {
          strDrink: name,
          strDrinkThumb: image,
          strAlcoholic: info,
          strCategory: category,
          strGlass: glass,
          strInstructions: instructions,
          strIngredient1: ing1,
          strIngredient2: ing2,
          strIngredient3: ing3,
          strIngredient5: ing4,
          strIngredient4: ing5,
        } = data.drinks[0];

        setDescription({
          name,
          image,
          info,
          category,
          glass,
          instructions,
          ingredients: [ing1, ing2, ing3, ing4, ing5],
        });
        setLoading(false);
      } else {
        setDescription(null);
      }

      /*       console.log(data.drinks[0]); */
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchDetails();
  }, [cocktID]);
  if (loading) return <Loading />;
  if (!description)
    return <h2 className="section-title">No cocktail to display!</h2>;

  return (
    <section className="section cocktail-section">
      <Link to="/" className="btn btn-primary">
        Back to Homepage
      </Link>
      <h2 className="section-title">{description.name}</h2>
      <div>
        <img src={description.image} alt={description.name}></img>
        <div className="drink-info">
          <p>
            <span className="drink-data">Name :</span>
            {description.name}
          </p>
          <p>
            <span className="drink-data">Category :</span>
            {description.category}
          </p>
          <p>
            <span className="drink-data">Info :</span>
            {description.info}
          </p>
          <p>
            <span className="drink-data">Glass :</span>
            {description.glass}
          </p>
          <p>
            <span className="drink-data">Instructions :</span>
            {description.instructions}
          </p>
          <p>
            <span className="drink-data">Ingredients :</span>
            {description.ingredients.map(
              (ing) => ing && <span> {`${ing}, `}</span>
            )}
          </p>
        </div>
      </div>
    </section>

    /*  <div>
      <h2>single cocktail page </h2>

      <h4>{`${description.name}`}</h4>
      <h4>Opis: {`${description.instructions}`} </h4>
    </div> */
  );
};

export default SingleCocktail;
