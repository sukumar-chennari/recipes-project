import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { recipe_listing } from "../../endpoints/http";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { Header } from "../header/navbar";
import { GlobalData } from "../stack/stack";

export const HomeScreen = () => {
  const { addFavouriteHandler, searchedRecipe } = useContext(GlobalData);
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  // Fetch all recipes once when the component loads
  useEffect(() => {
    const fetchData = async () => {
      try {
        let res = await axios.get(recipe_listing);
        if (res.status === 200) {
          setRecipes(res.data.recipes); // Save the fetched recipes
          setFilteredRecipes(res.data.recipes); // Initially show all recipes
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  // Filter recipes whenever the searchedRecipe changes
  useEffect(() => {
    if (searchedRecipe.trim() === "") {
      // If search is empty, show all recipes
      setFilteredRecipes(recipes);
    } else {
      // Filter recipes based on the searchedRecipe
      const filtered = recipes.filter((recipe) =>
        recipe.name.toLowerCase().includes(searchedRecipe.toLowerCase())
      );
      setFilteredRecipes(filtered);
    }
  }, [searchedRecipe, recipes]);

  const addToFavourites = (recipe) => {
    addFavouriteHandler(recipe);
  };

  return (
    <>
      <Header />
      <div className="container mt-4">
        <div className="row">
          {filteredRecipes.length > 0 ? (
            filteredRecipes.map((recipe) => (
              <div className="col-md-4 mb-4" key={recipe.id}>
                <div className="card h-100">
                  <img
                    src={recipe.image}
                    className="card-img-top"
                    alt={recipe.name}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{recipe.name}</h5>
                    <p className="card-text">
                      <strong>Ingredients:</strong>
                      <ul>
                        {recipe.ingredients
                          .slice(0, 3)
                          .map((ingredient, index) => (
                            <li key={index}>{ingredient}</li>
                          ))}
                        {recipe.ingredients.length > 3 && <li>...</li>}
                      </ul>
                      <strong>Prep Time:</strong> {recipe.prepTimeMinutes} mins
                      <br />
                      <strong>Servings:</strong> {recipe.servings}
                      <br />
                      <strong>Difficulty:</strong> {recipe.difficulty}
                    </p>
                  </div>

                  <div className="card-footer">
                    <button
                      className="btn btn-primary me-2"
                      onClick={() => addToFavourites(recipe)}
                    >
                      Add to favourites
                    </button>
                    <button style={{border:'none'}}>
                      
                    <Link 
                      to={`/recipes/${recipe.id}`} 
                      className="btn btn-secondary" 
                      style={{ textDecoration: "none", color: "white" }}
                    >
                      View details
                    </Link>
                    </button>
                    <small className="text-muted d-block mt-2">
                      Rating: {recipe.rating} ⭐ ({recipe.reviewCount} reviews)
                    </small>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </>
  );
};
