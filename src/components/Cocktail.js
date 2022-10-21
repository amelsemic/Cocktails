import React from "react";
import { Link } from "react-router-dom";

const Cocktail = (props) => {
  return (
    <article className="cocktail">
      <div className="image-container">
        <img src={props.image} alt={props.name} />
      </div>
      <div className="cocktail-footer">
        <h3>{props.name}</h3>
        <h4>{props.glass}</h4>
        <p>{props.info}</p>
        <Link to={`/cocktail/${props.id}`} className="btn btn-primary">
          details
        </Link>
      </div>
    </article>
  );
};

export default Cocktail;
