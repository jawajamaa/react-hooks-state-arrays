import React, { useState } from "react";
import { spicyFoods, getNewRandomSpicyFood } from "../data";

function SpicyFoodList() {
  const [foods, setFoods] = useState(spicyFoods);
  const [filterBy, setFilterBy] = useState("All");

  function handleAddFood() {
    const newFood = getNewRandomSpicyFood();
    console.log(newFood);
    const newFoodArray = [...foods, newFood];
    setFoods(newFoodArray);
  }
//  working function to delete a Li when selected (clicked on)
  // function handleLiClick(id) {
  //   const newFoodArray = foods.filter(food=> id !== food.id);
  //   setFoods(newFoodArray);
  // }

  function handleLiClick(id) {
    const newFoodArray = foods.map(food=> {
      if (id === food.id) {
        return {
          ...food, heatLevel: food.heatLevel+1,
        };
      } else {
        return food;
      }
    });
    setFoods(newFoodArray);
  }
  
  const foodsToDisplay = foods.filter(food => {
    if (filterBy === "All") {
      return true;
    } else {
      return food.cuisine === filterBy;
    }
  });

// original map() method to display foods
  // const foodList = foods.map((food) => (
  //   <li key={food.id} onClick={() => handleLiClick(food.id)}>
  //     {food.name} | Heat: {food.heatLevel} | Cuisine: {food.cuisine}
  //   </li>
  // ));

  const foodList = foodsToDisplay.map((food) => (
    <li key={food.id} onClick={() => handleLiClick(food.id)}>
      {food.name} | Heat: {food.heatLevel} | Cuisine: {food.cuisine}
    </li>
  ));


function handleFilterChange(event) {
  setFilterBy(event.target.value);
}

  return (
    <div>
      <button onClick={handleAddFood}>Add New Food</button>
      <select name="filter" onChange={ handleFilterChange }>
        <option value="All">All</option>
        <option value="American">American</option>
        <option value="Sichuan">Sichuan</option>
        <option value="Thai">Thai</option>
        <option value="Mexican">Mexican</option>
      </select>
      <ul>{foodList}</ul>
    </div>
  );
}

export default SpicyFoodList;
