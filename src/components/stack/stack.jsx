import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomeScreen } from "../screens/homeScreen";
import { FavouriteScreen } from "../screens/favouriteScreen";
import { ErrorScreen } from "../screens/errorScreen";
import RecipeDetailScreen from "../screens/detailedScreen";
import { createContext, useState } from "react";

export const GlobalData = createContext();
export const Stack = () => {
    const [favourites,setIsFavourites]=useState([])
    const [favouritesCount,setFavouritesCount]=useState(0)
    const [searchedRecipe,setSearchedRecipe]=useState('')
  const addFavouriteHandler = (recipe) => {
    const itemIsExists=favourites.find(each=>each.id===recipe.id)
        if(!itemIsExists){
          const updatedFavourites = [...favourites, recipe];
          setIsFavourites(updatedFavourites);
          setFavouritesCount(updatedFavourites.length);
        }else{
            alert('Item already exists')
        }   
       

  };
  const removeFavouriteHandler=(ind)=>{
     const updatedFavourites = favourites.filter((each) => each.id !== ind);
    setIsFavourites(updatedFavourites);
    setFavouritesCount(updatedFavourites.length);
  }

const searchRecipe=(recipeName)=>{
  if(recipeName){
    setSearchedRecipe(recipeName)
  }

}
  
  return (
    <GlobalData.Provider
      value={{
        addFavouriteHandler,
        favouriteRecipes:favourites,
        removeFavouriteHandler,
        favouritesCount,
        searchRecipe,
        searchedRecipe
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/home" element={<HomeScreen />} />
          <Route path="favourites" element={<FavouriteScreen />} />
          <Route path="/recipes/:recipeId" element={<RecipeDetailScreen />} />
          <Route path="/*" element={<ErrorScreen />} />
        </Routes>
      </BrowserRouter>
    </GlobalData.Provider>
  );
};
