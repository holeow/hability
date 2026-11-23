class MealInputComponent extends Component {
    constructor(id, cssclass) {
        super(id, "div", cssclass, "");
        
        this.caloriesField = new FieldComponent("calories", "inputField", "Calories");
        this.carbsField = new FieldComponent("carbs", "inputField", "Carbs");
        this.fatsField = new FieldComponent("fats", "inputField", "Fats");
        this.proteinsField = new FieldComponent("proteins", "inputField", "Proteins");
        this.vegetablesField = new FieldComponent("vegetables", "inputField", "Vegetables");
        this.caloriesField.numericMode = true;
        this.carbsField.numericMode = true;
        this.fatsField.numericMode = true;
        this.proteinsField.numericMode = true;
        this.vegetablesField.numericMode = true;
        
        this.submitButton = new ButtonComponent("submitButton", "submitButton", this.handleSubmit.bind(this), "Submit");

        this.addComponent(new SpanComponent("kl","inputLabel","").setText("Kcal:"));
        this.addComponent(this.caloriesField);
                this.addComponent(new SpanComponent("cbl","inputLabel","").setText("Carbs:"));

        this.addComponent(this.carbsField);
                this.addComponent(new SpanComponent("fl","inputLabel","").setText("Fats:"));

        this.addComponent(this.fatsField);
                this.addComponent(new SpanComponent("pl","inputLabel","").setText("Proteins:"));

        this.addComponent(this.proteinsField);
                this.addComponent(new SpanComponent("vgl","inputLabel","").setText("Veggies/Fruits:"));

        this.addComponent(this.vegetablesField);

        this.addComponent(this.submitButton);
    }

    handleSubmit() {
        let calories = parseFloat(this.caloriesField.getValue());
        if(isNaN(calories))calories= 0;
        let carbs = parseFloat(this.carbsField.getValue());
        if(isNaN(carbs))carbs= 0;
        let fats = parseFloat(this.fatsField.getValue());
        if(isNaN(fats))fats= 0;
        let proteins = parseFloat(this.proteinsField.getValue());
        if(isNaN(proteins))proteins= 0;
        let vegetables = parseFloat(this.vegetablesField.getValue());
        if(isNaN(vegetables))vegetables= 0;

        if (!isNaN(calories) && !isNaN(carbs) && !isNaN(fats) && !isNaN(proteins) && !isNaN(vegetables)) {
            const meal = new Meal(calories, carbs, fats, proteins, vegetables);
            foodCheck.addMeal(meal);
        } else {
            console.error("Invalid input values");
        }
    }
}

class FoodCheckGoalSetupComponent extends Component {
    constructor(id, cssclass) {
        super(id, "div", cssclass, "");

        this.minCaloriesField = new FieldComponent("minCalories", "inputField", "Min Calories");
        this.maxCaloriesField = new FieldComponent("maxCalories", "inputField", "Max Calories");
        this.minCarbsField = new FieldComponent("minCarbs", "inputField", "Min Carbs");
        this.maxCarbsField = new FieldComponent("maxCarbs", "inputField", "Max Carbs");
        this.minFatsField = new FieldComponent("minFats", "inputField", "Min Fats");
        this.maxFatsField = new FieldComponent("maxFats", "inputField", "Max Fats");
        this.minProteinsField = new FieldComponent("minProteins", "inputField", "Min Proteins");
        this.maxProteinsField = new FieldComponent("maxProteins", "inputField", "Max Proteins");
        this.minVegetablesField = new FieldComponent("minVegetables", "inputField", "Min Vegetables");

        this.minCaloriesField.numericMode = true;
        this.maxCaloriesField.numericMode = true;
        this.minCarbsField.numericMode = true;
        this.maxCarbsField.numericMode = true;
        this.minFatsField.numericMode = true;
        this.maxFatsField.numericMode = true;
        this.minProteinsField.numericMode = true;
        this.maxProteinsField.numericMode = true;
        this.minVegetablesField.numericMode = true;
        this.submitButton = new ButtonComponent("submitButton", "submitButton", this.handleSubmit.bind(this), "Set Goals");

        this.addComponent(this.minCaloriesField);
        this.addComponent(this.maxCaloriesField);
        this.addComponent(this.minCarbsField);
        this.addComponent(this.maxCarbsField);
        this.addComponent(this.minFatsField);
        this.addComponent(this.maxFatsField);
        this.addComponent(this.minProteinsField);
        this.addComponent(this.maxProteinsField);
        this.addComponent(this.minVegetablesField);
        this.addComponent(this.submitButton);

        
    }

    


    handleSubmit() {
        let minCalories = parseFloat(this.minCaloriesField.getValue());
                if(isNaN(minCalories))minCalories= 0;

        let maxCalories = parseFloat(this.maxCaloriesField.getValue());
                if(isNaN(maxCalories))maxCalories= minCalories;

        let minCarbs = parseFloat(this.minCarbsField.getValue());
                if(isNaN(minCarbs))minCarbs= 0;

        let maxCarbs = parseFloat(this.maxCarbsField.getValue());
                if(isNaN(maxCarbs))maxCarbs= minCarbs;

        let minFats = parseFloat(this.minFatsField.getValue());
                if(isNaN(minFats))minFats= 0;

        let maxFats = parseFloat(this.maxFatsField.getValue());
                if(isNaN(maxFats))maxFats= minFats;

        let minProteins = parseFloat(this.minProteinsField.getValue());
                if(isNaN(minProteins))minProteins= 0;

        let maxProteins = parseFloat(this.maxProteinsField.getValue());
                if(isNaN(maxProteins))maxProteins= minProteins;

        let minVegetables = parseFloat(this.minVegetablesField.getValue());
                if(isNaN(minVegetables))minVegetables= 0;


        if (!isNaN(minCalories) && !isNaN(maxCalories) && !isNaN(minCarbs) && !isNaN(maxCarbs) &&
            !isNaN(minFats) && !isNaN(maxFats) && !isNaN(minProteins) && !isNaN(maxProteins) && !isNaN(minVegetables)) {
            foodCheck.setGoals(minCalories, maxCalories, minCarbs, maxCarbs, minFats, maxFats, minProteins, maxProteins, minVegetables);
            console.log("Food check goals set:", foodCheck);
        } else {
            console.error("Invalid input values");
        }
    }
}
class FoodCheckStatusComponent extends Component {
    constructor(id, cssclass) {
        super(id, "div", cssclass, "");

        this.categories = [
            { name: "Calories", minField: "minCalories", maxField: "maxCalories", currentField: "totalCalories" },
            { name: "Carbs", minField: "minCarbs", maxField: "maxCarbs", currentField: "totalCarbs" },
            { name: "Fats", minField: "minFats", maxField: "maxFats", currentField: "totalFats" },
            { name: "Proteins", minField: "minProteins", maxField: "maxProteins", currentField: "totalProteins" },
            { name: "Vegetables", minField: "minFruitsAndVegetables", maxField: null, currentField: "totalVegetables" }
        ];

        this.categories.forEach(category => {
            const categoryDiv = new DivComponent(`${category.name}Div`, "categoryDiv", "");

            const label = new SpanComponent(`${category.name}Label`, "categoryLabel", `${category.name}:`);
            categoryDiv.addComponent(label);

            const currentSpan = new SpanComponent(`${category.name}Current`, "categoryCurrent", "0");
            categoryDiv.addComponent(currentSpan);

            const goalSpan = new SpanComponent(`${category.name}Goal`, "categoryGoal", "0");
            categoryDiv.addComponent(goalSpan);

            const progressBar = new ProgressBarComponent(`${category.name}ProgressBar`, "progressBar", "");
            

            categoryDiv.addComponent(progressBar);

            this.addComponent(categoryDiv);

            this[`${category.name}CurrentSpan`] = currentSpan;
            this[`${category.name}GoalSpan`] = goalSpan;
            this[`${category.name}ProgressBar`] = progressBar;
        });
        this.yesterdayDiv = new DivComponent("yesterdayDiv","yesterdayDiv","");
        this.addComponent(this.yesterdayDiv);
        this.yesterdayStatus = new SpanComponent("yesterdayStatus","yesterdayStatus","")
        this.yesterdayDiv.addComponent(this.yesterdayStatus);
        this.newDayButton = new ButtonComponent("newDayFoodButton","newDayFoodButton",this.newDay,"This is a new day!");
        this.yesterdayDiv.addComponent(this.newDayButton);
        
        foodCheck.mealTracker.foodCheckStatusComponent = this;
        this.updateStatus();
    }
    newDay()
    {
        foodCheck.startNewDay();
    }

    updateStatus() 
    {
        this.categories.forEach(category => {
            const current = foodCheck.mealTracker[category.currentField];
            const min = foodCheck[category.minField] || 0;
            const max = foodCheck[category.maxField] || 0;

            this[`${category.name}CurrentSpan`].setText("Curr:" + current + " / ");
            this[`${category.name}GoalSpan`].setText(`${min} - ${max}`);

            if (max > 0) {
                
                const progressPercentage = (current / (max == 0? min: max)) * 100;

                this[`${category.name}ProgressBar`].setValue(Math.floor(progressPercentage));
            }
            else {
                let progressPercentage = 100;
                if(min != 0){
                    progressPercentage = (current / (max == 0? min: max)) * 100;
                }
                 

                this[`${category.name}ProgressBar`].setValue(Math.floor(progressPercentage));
            }
        });
        this.yesterdayStatus.setText(foodCheck.mealTracker.containsMealsFromYesterday ? "Contains meals from yesterday" : "Today's meals (yesterday's score:" + foodCheck.yestScore + ")");
        /*if(foodCheck.mealTracker.containsMealsFromYesterday){
            this.newDayButton.removeClass("hidden");
        }
        else this.newDayButton.addClass("hidden");*/
    }
}

class MealEditComponent extends Component {
    constructor(id, cssclass, meal) {
        super(id, "div", cssclass, "");

        this.meal = meal;

        this.caloriesField = new FieldComponent("caloriesField", "inputField", meal.calories).setValue(meal.calories);
        this.caloriesField.numericMode = true;
        this.addComponent(new SpanComponent("calorieslabel","mealLabel","").setText("Kcal:"))
        this.addComponent(this.caloriesField);

        this.carbsField = new FieldComponent("carbsField", "inputField", meal.carbs).setValue(meal.carbs);
        this.carbsField.numericMode = true;
        this.addComponent(new SpanComponent("carbslabel","mealLabel","").setText("Carbs:"))
        this.addComponent(this.carbsField);

        this.fatsField = new FieldComponent("fatsField", "inputField", meal.fats).setValue(meal.fats);
        this.fatsField.numericMode = true;
        this.addComponent(new SpanComponent("fatslabel","mealLabel","").setText("Fats:"))
        this.addComponent(this.fatsField);

        this.proteinsField = new FieldComponent("proteinsField", "inputField",meal.proteins).setValue(meal.proteins);
        this.proteinsField.numericMode = true;
        this.addComponent(new SpanComponent("proteinslabel","mealLabel","").setText("Proteins:"))
        this.addComponent(this.proteinsField);

        this.vegetablesField = new FieldComponent("vegetablesField", "inputField", meal.vegetables).setValue(meal.vegetables);
        this.vegetablesField.numericMode = true;
        this.addComponent(new SpanComponent("vegelabel","mealLabel","").setText("Vegetables/Fruits:"))
        this.addComponent(this.vegetablesField);


        this.dateTimeValue = new SpanComponent("dateTimeValue", "mealValue", meal.dateTime.toLocaleString('en-US', { hour: '2-digit', minute: '2-digit' }));
        this.addComponent(new SpanComponent("timelabel","mealLabel","").setText("Time:"));
        this.addComponent(this.dateTimeValue);

        this.updateButton = new ButtonComponent("updateButton", "updateButton", () => this.updateMeal(),"");
        this.updateButton.setText("Update meal");
        this.addComponent(this.updateButton);
    }

    updateMeal() {
        const newMeal = new Meal(
            isNaN(parseFloat(this.caloriesField.getValue())) ? 0 :parseFloat(this.caloriesField.getValue()) ,
            isNaN(parseFloat(this.carbsField.getValue())) ? 0 :parseFloat(this.carbsField.getValue()) ,
            isNaN(parseFloat(this.fatsField.getValue())) ? 0 :parseFloat(this.fatsField.getValue()) ,
            isNaN(parseFloat(this.proteinsField.getValue())) ? 0 :parseFloat(this.proteinsField.getValue()) ,
           isNaN(parseFloat(this.vegetablesField.getValue())) ? 0 :parseFloat(this.vegetablesField.getValue()) ,
        );
        newMeal.dateTime = this.meal.dateTime; // Keep the original date and time

        foodCheck.mealTracker.replaceMeal(this.meal, newMeal);
    }
}
class MealListComponent extends Component {
    constructor(id, cssclass) {
        super(id, "div", cssclass, "");
        foodCheck.mealTracker.mealListComponent = this;
        this.mealEditComponents = [];
        this.updateList();
    }

    updateList() {
        // Clear existing components
        this.clearComponents();
        this.mealEditComponents = [];
        // Create and add MealEditComponent for each meal
        this.mealEditComponents = foodCheck.mealTracker.meals.map(meal => {
            let mealEdit = new MealEditComponent(`mealEdit-${meal.dateTime.getTime()}`, "mealEdit", meal);
            this.addComponent(mealEdit);
            return mealEdit;
        });
    }

    reset() {
        this.updateList();
    }
}