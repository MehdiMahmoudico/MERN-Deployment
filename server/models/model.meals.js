const mongoose = require("mongoose");

const mealSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "{PATH} is required"],
        minLength: [3, "{PATH} minimum 3 characters long"],
        maxLength: [20, "{PATH} maximum 20 characters long"],
    },
    cooktime: {
        type: Number,
        required: [true, "{PATH} is required"],
        min: [2, "{PATH} minimum 2 minutes"],
        max: [240, "{PATH} maximum 240 minutes"],
    },
    directions: {
        type: String,
        required: [true, "{PATH} is required"],
        minlength: [10, "{PATH} minimum 10 characters long"],
    },
    ingredients: {
        type: [String],
        validate: {
            validator: function(ingredients) {
                const restrictedIngredients = ["salt", "pepper", "cheese"];
                return !ingredients.some(ingredient => restrictedIngredients.includes(ingredient.toLowerCase()));
            },
            message: "Ingredients cannot contain 'salt', 'pepper', or 'cheese'.",
        },
    }
}, {timestamps: true});

const Meal = mongoose.model("Meal", mealSchema);

module.exports = Meal;
