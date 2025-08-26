import React from 'react';

const MealCard = ({ meal }) => {
    return (
        <div className="meal-card">
            <img src={meal.strMealThumb} alt={meal.strMeal} />
            <h3>{meal.strMeal}</h3>
        </div>
    );
};

export default MealCard;