import { useState, useEffect } from 'react';
import IngredientInput from './components/IngredientInput';
import CostDisplay from './components/CostDisplay';

const App = () => {
  const [ingredients, setIngredients] = useState([]);
  const [savedIngredients, setSavedIngredients] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('savedIngredients');
    if (saved) setSavedIngredients(JSON.parse(saved));
  }, []);

  const handleAddIngredient = (ingredient) => {
    setIngredients([...ingredients, ingredient]);
  };

  const handleSaveIngredient = (ingredient) => {
    const newSaved = [...savedIngredients, ingredient];
    setSavedIngredients(newSaved);
    localStorage.setItem('savedIngredients', JSON.stringify(newSaved));
  };

  const handleRemoveIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  return (
    <div className='container'>
      <h1>Recipe Cost Calculator</h1>
      <div className='app-grid'>
        <div className='input-section'>
          <IngredientInput
            onAddIngredient={handleAddIngredient}
            onSaveIngredient={handleSaveIngredient}
            savedIngredients={savedIngredients}
          />
        </div>
        <div className='display-section'>
          <CostDisplay
            ingredients={ingredients}
            onRemoveIngredient={handleRemoveIngredient}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
