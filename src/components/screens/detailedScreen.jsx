import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { recipe_listing } from '../../endpoints/http';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importing Bootstrap CSS
import { GlobalData } from '../stack/stack';
import { Header } from '../header/navbar';


function RecipeDetailScreen() {
  const { recipeId } = useParams();
  const [recipeDetails, setRecipeDetails] = useState({});
  const [isFavourite, setIsFavourite] = useState(false);
  const {addFavouriteHandler}=useContext(GlobalData)

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${recipe_listing}/${recipeId}`);
        if (response.status === 200) {
          setRecipeDetails(response.data);
        }
      } catch (error) {
        
      }
    };
    fetchData();
  }, [recipeId]);

  // Toggle favorite status
  const toggleFavourite = () => {
    addFavouriteHandler(recipeDetails)
    


  };

  // If recipeDetails is empty, return a loading state
  if (!recipeDetails.id) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <Header/>
          <div className="container mt-4">
      <div className="row">
        {/* Recipe Image */}
        <div className="col-md-6">
          <img
            src={recipeDetails.image}
            alt={recipeDetails.name}
            className="img-fluid rounded"
            style={{ height: '400px', objectFit: 'cover' }}
          />
        </div>

        {/* Recipe Details */}
        <div className="col-md-6">
          <h2>{recipeDetails.name}</h2>
          <p>
            <strong>Cuisine:</strong> {recipeDetails.cuisine} <br />
            <strong>Difficulty:</strong> {recipeDetails.difficulty} <br />
            <strong>Servings:</strong> {recipeDetails.servings} <br />
            <strong>Calories:</strong> {recipeDetails.caloriesPerServing} kcal
          </p>
          <p>
            <strong>Prep Time:</strong> {recipeDetails.prepTimeMinutes} minutes <br />
            <strong>Cook Time:</strong> {recipeDetails.cookTimeMinutes} minutes
          </p>
          <p>
            <strong>Rating:</strong> {recipeDetails.rating} ({recipeDetails.reviewCount} reviews)
          </p>

          {/* Favourite Button */}
          <button
            className={`btn ${isFavourite ? 'btn-success' : 'btn-outline-secondary'}`}
            onClick={toggleFavourite}
          >
            {isFavourite ? 'Added to Favourites' : 'Add to Favourites'}
          </button>
        </div>
      </div>

      {/* Ingredients Section */}
      <div className="mt-5">
        <h4>Ingredients</h4>
        <ul className="list-group">
          {recipeDetails.ingredients &&
            recipeDetails.ingredients.map((ingredient, index) => (
              <li key={index} className="list-group-item">
                {ingredient}
              </li>
            ))}
        </ul>
      </div>

      {/* Instructions Section */}
      <div className="mt-5">
        <h4>Instructions</h4>
        <ol className="list-group list-group-numbered">
          {recipeDetails.instructions &&
            recipeDetails.instructions.map((instruction, index) => (
              <li key={index} className="list-group-item">
                {instruction}
              </li>
            ))}
        </ol>
      </div>
    </div>
    </>
  
  );
}

export default RecipeDetailScreen;
