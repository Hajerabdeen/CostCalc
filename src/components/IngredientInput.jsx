import PropTypes from "prop-types";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FiAlertCircle } from "react-icons/fi";

const IngredientInput = ({
  onAddIngredient,
  onSaveIngredient,
  savedIngredients,
}) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      cost: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .trim()
        .matches(/^[a-zA-Z\u0600-\u06FF\s]*$/, "Name can only contain letters")
        .required("Please enter an ingredient name"),
      cost: Yup.number()
        .positive("Cost must be greater than 0")
        .required("Please enter a valid cost")
        .typeError("Cost must be a number"),
    }),
    onSubmit: (values) => {
      onAddIngredient({
        name: values.name.trim(),
        cost: parseFloat(values.cost),
      });
      formik.resetForm();
    },
  });

  const handleSave = () => {
    formik.setTouched({
      name: true,
      cost: true,
    }); // Mark fields as touched so errors show up
    if (formik.isValid && formik.dirty) {
      onSaveIngredient({
        name: formik.values.name.trim(),
        cost: parseFloat(formik.values.cost),
      });
      formik.resetForm();
    }
  };

  return (
    <div className="input-container">
      <h2>Add Ingredient</h2>
      <form onSubmit={formik.handleSubmit} className="input-group">
        <input
          type="text"
          placeholder="Ingredient Name"
          {...formik.getFieldProps("name")}
          className="ingredient-input"
        />
        {formik.touched.name && formik.errors.name && (
          <div className="red-col err-msg">
            <FiAlertCircle />
            <p className="err">{formik.errors.name}</p>
          </div>
        )}

        <input
          type="number"
          placeholder="Cost"
          {...formik.getFieldProps("cost")}
          className="cost-input"
          min="0"
          step="0.01"
        />
        {formik.touched.cost && formik.errors.cost && (
          <div className="red-col err-msg">
            <FiAlertCircle />
            <p className="err">{formik.errors.cost}</p>
          </div>
        )}

        <div className="button-group">
          <button type="submit" className="add-btn">
            Add to Recipe
          </button>
          <button type="button" onClick={handleSave} className="save-btn">
            Save Ingredient
          </button>
        </div>
      </form>

      {savedIngredients.length > 0 && (
        <div className="saved-ingredients">
          <h3>Saved Ingredients</h3>
          <div className="saved-grid">
            {savedIngredients.map((ingredient, index) => (
              <div
                key={index}
                className="saved-item"
                onClick={() => {
                  formik.setFieldValue("name", ingredient.name);
                  formik.setFieldValue("cost", ingredient.cost.toString());
                }}
              >
                {ingredient.name}
                <span>(${ingredient.cost.toFixed(2)})</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

IngredientInput.propTypes = {
  onAddIngredient: PropTypes.func.isRequired,
  onSaveIngredient: PropTypes.func.isRequired,
  savedIngredients: PropTypes.array.isRequired,
};

export default IngredientInput;
