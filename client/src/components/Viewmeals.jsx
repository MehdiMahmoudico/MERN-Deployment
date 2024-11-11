import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Create from './Create';
import Meals from './Meals';

const MealsView = () => {
  const [meals, setMeals] = useState([]);

  const findmeals = () => {
    axios.get('http://localhost:8000/api/meals')
      .then(res => setMeals(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    findmeals();
  }, []);

  const addMeal = (meal) => {
    setMeals(newMeak => [meal, ...newMeak]);
  };

  return (
    <div className="container">
      <Create addMeal={addMeal} /><span>&nbsp;&nbsp;</span>
      <Meals meals={meals} findmeals={findmeals} />
    </div>
  );
};

export default MealsView;
