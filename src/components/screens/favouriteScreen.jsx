import { useContext } from "react";
import { GlobalData } from "../stack/stack";
import 'bootstrap/dist/css/bootstrap.min.css';

export const FavouriteScreen = () => {
  const { favouriteRecipes = [], removeFavouriteHandler } = useContext(GlobalData); // Default to an empty array



  return (
    <div className="container my-4">
      <h1 className="text-center mb-4">Favourite Recipes</h1>
      {favouriteRecipes.length > 0 ? (
        <ul className="list-group">
          {favouriteRecipes.map((recipe) => (
            <li key={recipe.id} className="list-group-item">
              <div className="d-flex align-items-center">
                <img 
                  src={recipe.image} 
                  alt={recipe.name} 
                  className="img-fluid me-3" 
                  style={{ width: '80px', height: '80px', objectFit: 'cover' }} 
                />
                <div className="flex-grow-1 d-flex justify-content-between align-items-center">
                  <h5>{recipe.name}</h5>
                  <div>
                    <button 
                      className="btn btn-link" 
                      data-bs-toggle="collapse" 
                      data-bs-target={`#details-${recipe.id}`} 
                      aria-expanded="false" 
                      aria-controls={`details-${recipe.id}`}>
                      Details
                    </button>
                    <button 
                      className="btn btn-danger ms-2" 
                      onClick={() => removeFavouriteHandler(recipe.id)}>
                      Remove
                    </button>
                  </div>
                </div>
              </div>
              <div className="collapse" id={`details-${recipe.id}`}>
                <p>
                  <strong>Prep Time:</strong> {recipe.prepTimeMinutes} mins <br />
                  <strong>Cook Time:</strong> {recipe.cookTimeMinutes} mins <br />
                </p>
                <h6>Ingredients:</h6>
                <ul>
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
                <h6>Instructions:</h6>
                <ol>
                  {recipe.instructions.map((instruction, index) => (
                    <li key={index}>{instruction}</li>
                  ))}
                </ol>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <h3 className="text-center">No favourites found</h3>
      )}
    </div>
  );
};
