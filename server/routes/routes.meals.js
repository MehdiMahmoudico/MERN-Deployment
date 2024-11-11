const MealController = require("../controllers/controller.meals");


module.exports = (app) => {
    app.get("/api/meals",MealController.findALLMeals);
    app.get("/api/meals/:id", MealController.findOneSingleMeal);
    app.post("/api/meals",MealController.createNewMeal);
    app.patch("/api/meals/:id", MealController.updateExistingMeal);
    app.delete("/api/meals/:id", MealController.deleteAnExistingMeal);
}