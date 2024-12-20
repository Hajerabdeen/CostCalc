import PropTypes from "prop-types";

const CostDisplay = ({ ingredients, onRemoveIngredient }) => {
  const totalCost = ingredients.reduce(
    (total, ingredient) => total + ingredient.cost,
    0
  );

  return (
    <div className="cost-display">
      <h2>Recipe Ingredients</h2>
      <div className="ingredients-list">
        {ingredients.map((ingredient, index) => (
          <div key={index} className="ingredient-item ">
            <span className="ingredient-name">{ingredient.name}</span>
            <span className="ingredient-cost">
              ${ingredient.cost.toFixed(2)}
            </span>
            <button
              className="remove-btn"
              onClick={() => onRemoveIngredient(index)}
            >
              ×
            </button>
          </div>
        ))}
      </div>
      <div className="total-cost">Total Cost: ${totalCost.toFixed(2)}</div>
    </div>
  );
};

CostDisplay.propTypes = {
  ingredients: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      cost: PropTypes.number.isRequired,
    })
  ).isRequired,
  onRemoveIngredient: PropTypes.func.isRequired,
};

export default CostDisplay;
