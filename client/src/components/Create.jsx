import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

const Create = ({ addMeal }) => {
  const [state, setState] = useState({
    name: "",
    cooktime: 0,
    directions: "",
    ingredients: ["", "", ""],
    errors: {}
  });
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const validateName = (name) => {
    if (name.length < 3) return "Name minimum 3 characters long";
    if (name.length > 20) return "Name maximum 20 characters long";
    return "";
  };

  const validateCooktime = (cooktime) => {
    if (cooktime < 2) return "Cook Time minimum 2 minutes";
    if (cooktime > 240) return "Cook Time maximum 240 minutes";
    return "";
  };

  const validateDirections = (directions) => {
    if (directions.length < 10) return "Directions minimum 10 characters long";
    return "";
  };

  const validateIngredients = (ingredients) => {
    const restrictedIngredients = ["salt", "pepper", "cheese"];
    for (let ingredient of ingredients) {
      if (restrictedIngredients.includes(ingredient.toLowerCase())) {
        return "Ingredients cannot contain 'salt', 'pepper', or 'cheese'.";
      }
    }
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState(prevState => ({
      ...prevState,
      [name]: value,
      errors: {
        ...prevState.errors,
        [name]: name === "name" ? validateName(value) :
               name === "cooktime" ? validateCooktime(value) :
               name === "directions" ? validateDirections(value) :
               name === "ingredients" ? validateIngredients(prevState.ingredients) :
               prevState.errors[name]
      }
    }));
  };

  const handleIngredientChange = (index, value) => {
    const newIngredients = [...state.ingredients];
    newIngredients[index] = value;
    setState(prevState => ({
      ...prevState,
      ingredients: newIngredients,
      errors: {
        ...prevState.errors,
        ingredients: validateIngredients(newIngredients)
      }
    }));
  };

  const isFormValid = () => {
    return (
      !validateName(state.name) &&
      !validateCooktime(state.cooktime) &&
      !validateDirections(state.directions) &&
      !validateIngredients(state.ingredients)
    );
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!isFormValid()) {
      return;
    }
    const tempObj = {
      name: state.name,
      cooktime: state.cooktime,
      directions: state.directions,
      ingredients: state.ingredients
    };

    axios.post(`http://localhost:8000/api/meals`, tempObj)
      .then(res => {
        addMeal(res.data);
        navigate('/');
        window.location.reload();

      })
      .catch(err => {
        const errorObj = {};
        if (err.response && err.response.data && err.response.data.errors) {
          const errorResponse = err.response.data.errors;
          for (const key in errorResponse) {
            if (errorResponse.hasOwnProperty(key)) {
              errorObj[key] = errorResponse[key].message;
            }
          }
        } else {
          errorObj.general = "An unexpected error occurred. Please try again.";
        }
        setState(prevState => ({
          ...prevState,
          errors: errorObj
        }));
      });
  };

  return (
    <div>
      {pathname !== "/" ? (
        <aside>
          <Link to="/" className="product-btn">
            <button className="btn btn-primary active">Back Home</button>
          </Link>
        </aside>
      ) : null}
      <div className="card-header d-flex justify-content-between">
        <h3>Create Meal</h3>
      </div>
      <div className='container'>
        <h1>Create Meal</h1>
        <form onSubmit={submitHandler}>
          {Object.values(state.errors).map((err, index) => (
            <p style={{ color: 'red' }} key={index}>{err}</p>
          ))}
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name:</label>
            <input
              name="name"
              value={state.name}
              onChange={handleChange}
              type="text"
              className="form-control"
              id="name"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="cooktime" className="form-label">Cook Time:</label>
            <input
              name="cooktime"
              value={state.cooktime}
              onChange={handleChange}
              type="number"
              className="form-control"
              id="cooktime"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="directions" className="form-label">Directions:</label>
            <textarea
              name="directions"
              value={state.directions}
              onChange={handleChange}
              className="form-control"
              id="directions"
              rows="3"
            ></textarea>
          </div>
          <div className="mb-3">
            <label className="form-label">Ingredients:</label>
            {state.ingredients.map((ingredient, index) => (
              <div key={index} className="mb-2">
                <input
                  value={ingredient}
                  onChange={e => handleIngredientChange(index, e.target.value)}
                  type="text"
                  className="form-control"
                  placeholder={`Ingredient ${index + 1}`}
                />
              </div>
            ))}
          </div>
          <button type="submit" className="btn btn-primary" disabled={!isFormValid()}>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Create;
