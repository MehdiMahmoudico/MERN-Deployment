const Meal = require("../models/model.meals");

module.exports.findALLMeals = (req, res) => {
    Meal.find()
      .then((Meals) => {
    //   console.log("all Meals", Meals);
        res.json(Meals);   
      })
      .catch((err) => {
        res.status(400).json(err);
        
      });
  };
  
  module.exports.findOneSingleMeal = (req, res) => {
    Meal.findOne({ _id: req.params.id })
      .then((oneSingleMeal) => {
        res.json(oneSingleMeal );
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  };
  
  module.exports.createNewMeal = (req, res) => {
    Meal.create(req.body)
      .then((newlyCreatedMeal) => {
        res.json({ Meal: newlyCreatedMeal });
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  };
  
  module.exports.updateExistingMeal = (req, res) => {
    Meal.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
      runValidators: true,
    })
      .then((updatedMeal) => {
        res.json({ Meal: updatedMeal });
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  };
  
  module.exports.deleteAnExistingMeal = (req, res) => {
    Meal.deleteOne({ _id: req.params.id })
      .then((result) => {
        res.json({ result: result });
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  };