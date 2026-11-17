class HabilityData{

     /** @type {number} */ currencySilver = 0;
     /** @type {number} */ currencyRuby = 0;
     /** @type {number} */ currencyGold = 0;
     /** @type {number} */ currencyWood = 0;


     /** @type {number} */ playerXP = 0;
     /** @type {number} */ playerEnergy = 0;

     /**@type {SpanComponent} */ currencyRubySpan = null;
     /**@type {SpanComponent} */ currencySilverSpan = null;
     /**@type {SpanComponent} */ currencyGoldSpan = null;
     /**@type {SpanComponent} */ currencyWoodSpan = null;
     /**@type {SpanComponent} */ playerLevelSpan = null;
     /**@type {SpanComponent} */ playerXPSpan = null;
     /**@type {SpanComponent} */ playerEnergySpan = null;
     /**@type {SpanComponent} */ playerLevelSpan = null;

     /**
     * Calculate the XP required for the next level.
     * @returns {number} XP required for the next level.
     */
     xpRequiredForNextLevel() {
        return Math.floor(100 * Math.pow(1.5, this.getLevel()));
    }
    xpRequiredForCurrentLevel(){
     if(this.getLevel() ==0)return 0;
     return Math.floor(100 * Math.pow(1.5,this.getLevel()-1));
    }

    /**
     * Get the current level based on the total XP.
     * @returns {number} The current level.
     */
    getLevel() {
        return this.getLevelForXP(this.playerXP); 
    }

    getLevelForXP(xp){
     let level = 0;
     let xpRequired = 0;
     while(xp >=xpRequired){
          level++;
          xpRequired = Math.floor(100 * Math.pow(1.5,level));
     }
     return level;
    }
    

    updateLevelAndXP(){
        this.playerLevel = this.getLevel();
        let current = this.playerXP - this.xpRequiredForCurrentLevel();
        if(this.playerXPSpan!=null)this.playerXPSpan.setText(""+Math.floor(current)+"/"+ Math.ceil(this.xpRequiredForNextLevel() - this.xpRequiredForCurrentLevel()));
        if(this.playerLevelSpan!=null)this.playerLevelSpan.setText("Level "+this.getLevel());
        

    }


    setRubies(rubies) {
        if (this.currencyRubySpan != null) {
            this.currencyRubySpan.setText(rubies);
        }
        this.currencyRuby = rubies;
        localStorageManager.saveData("currencyRubies", rubies);
    }

    addRubies(rubies) {
        this.setRubies(this.currencyRuby + rubies);
    }

    tryPayRubies(rubies) {
        if (this.currencyRuby >= rubies) {
            this.setRubies(this.currencyRuby - rubies);
            return true;
        }
        return false;
    }

    setSilver(silver) {
        if (this.currencySilverSpan != null) {
            this.currencySilverSpan.setText(silver);
        }
        this.currencySilver = silver;
        localStorageManager.saveData("currencySilver", silver);
    }

    addSilver(silver) {
        this.setSilver(this.currencySilver + silver);
    }

    tryPaySilver(silver) {
        if (this.currencySilver >= silver) {
            this.setSilver(this.currencySilver - silver);
            return true;
        }
        return false;
    }

    setGold(gold) {
        if (this.currencyGoldSpan != null) {
            this.currencyGoldSpan.setText(gold);
        }
        this.currencyGold = gold;
        localStorageManager.saveData("currencyGold", gold);
    }

    addGold(gold) {
        this.setGold(this.currencyGold + gold);
    }

    tryPayGold(gold) {
        if (this.currencyGold >= gold) {
            this.setGold(this.currencyGold - gold);
            return true;
        }
        return false;
    }

    setWood(wood) {
        if (this.currencyWoodSpan != null) {
            this.currencyWoodSpan.setText(wood);
        }
        this.currencyWood = wood;
        localStorageManager.saveData("currencyWood", wood);
    }

    addWood(wood) {
        this.setWood(this.currencyWood + wood);
    }

    tryPayWood(wood) {
        if (this.currencyWood >= wood) {
            this.setWood(this.currencyWood - wood);
            return true;
        }
        return false;
    }


    setXP(xp) {
        if (this.playerXPSpan != null) {
            this.playerXPSpan.setText(xp);
        }
        this.playerXP = xp;
        this.updateLevelAndXP();
        localStorageManager.saveData("playerXP", xp);
    }

    addXP(xp) {
        this.setXP(this.playerXP + xp);
    }

    setEnergy(energy) {
        if (this.playerEnergySpan != null) {
            this.playerEnergySpan.setText(energy);
        }
        this.playerEnergy = energy;
        localStorageManager.saveData("playerEnergy", energy);
    }

    addEnergy(energy) {
        this.setEnergy(this.playerEnergy + energy);
    }

    tryPayEnergy(energy) {
        if (this.playerEnergy >= energy) {
            this.setEnergy(this.playerEnergy - energy);
            return true;
        }
        return false;
    }

     
}

class FoodCheck{
     /**@type {number} */ recommendedCalories = 2000;
     /**@type {number} */ recommendedCarbs = 200;
     /**@type {number} */ recommendedFats = 75;
     /**@type {number} */ recommendedProteins = 60;
     /**@type {number} */ recommendedFruitsAndVegetables = 400;


     /**@type {number} */ minCalories = 1500;
     /**@type {number} */ maxCalories = 2500;
     /**@type {number} */ minCarbs = 150;
     /**@type {number} */ maxCarbs = 250;
     /**@type {number} */ minFats = 60;
     /**@type {number} */ maxFats = 90;
     /**@type {number} */ minProteins = 45;
     /**@type {number} */ maxProteins = 75;
     /**@type {number} */ minFruitsAndVegetables = 300;


      /** @type {MealTracker} */ mealTracker;
     constructor(){
          this.mealTracker = new MealTracker();
     }
     

     setGoals(mincalories, maxcalories,mincarbs,maxcarbs,minfats,maxfats,minproteins,maxproteins,vegetables){
            this.minCalories = mincalories;
            this.maxCalories = maxcalories;
            this.minCarbs = mincarbs;
            this.maxCarbs = maxcarbs;
            this.minFats = minfats;
            this.maxFats = maxfats;
            this.minProteins = minproteins;
            this.maxProteins = maxproteins;
            this.minFruitsAndVegetables = vegetables;
     }

     checkIfPossibleMin(){
          var totalMin = (this.minCarbs*4) + (this.minProteins *4) + (this.minFats*9);
          return {possible : totalMin <= this.maxCalories, totalMin : totalMin};
     }

     addMeal(meal) {
        this.mealTracker.addMeal(meal);
    }
     replaceMeal(oldMeal, newMeal) {
     this.mealTracker.replaceMeal(oldMeal, newMeal);
     }
     deleteMeal(meal){
          this.mealTracker.deleteMeal(meal);
     }
    checkMealGoals() {
        const { totalCalories, totalCarbs, totalFats, totalProteins, totalVegetables } = this.mealTracker;

        let score = 0;
        if (totalCalories >= this.minCalories && totalCalories <= this.maxCalories) {
            score += 1;
        }
        if (totalCarbs >= this.minCarbs && totalCarbs <= this.maxCarbs) {
            score += 1;
        }
        if (totalFats >= this.minFats && totalFats <= this.maxFats) {
            score += 1;
        }
        if (totalProteins >= this.minProteins && totalProteins <= this.maxProteins) {
            score += 1;
        }
        if (totalVegetables >= this.minFruitsAndVegetables) {
            score += 1;
        }

        return score;
    }
}

class Meal{
     /** @type {number} */ calories = 0;
    /** @type {number} */ carbs = 0;
    /** @type {number} */ fats = 0;
    /** @type {number} */ proteins = 0;
    /** @type {number} */ vegetables = 0;
    /** @type {Date} */ dateTime = new Date();

    /**
     * Constructor to initialize a Meal object.
     * @param {number} calories - The number of calories in the meal.
     * @param {number} carbs - The number of carbohydrates in the meal.
     * @param {number} fats - The number of fats in the meal.
     * @param {number} proteins - The number of proteins in the meal.
     * @param {number} vegetables - The number of vegetables in the meal.
     */
    constructor(calories, carbs, fats, proteins, vegetables, date) {
        this.calories = calories;
        this.carbs = carbs;
        this.fats = fats;
        this.proteins = proteins;
        this.vegetables = vegetables;
        this.dateTime = date == undefined || date == null ? new Date() : date;

    }
}

class MealTracker {
    /** @type {number} */ totalCalories = 0;
    /** @type {number} */ totalCarbs = 0;
    /** @type {number} */ totalFats = 0;
    /** @type {number} */ totalProteins = 0;
    /** @type {number} */ totalVegetables = 0;
    /** @type {Meal[]} */ meals = [];

    /**
     * Add a meal to the tracker and update the totals.
     * @param {Meal} meal - The meal to add.
     */
    addMeal(meal) {
        this.meals.push(meal);
        this.updateTotals(meal, true);
        this.saveMealsToLocalStorage();
    }

    /**
     * Replace an existing meal with a new one and recalculate the totals.
     * @param {Meal} oldMeal - The meal to replace.
     * @param {Meal} newMeal - The new meal to add.
     */
    replaceMeal(oldMeal, newMeal) {
        const index = this.meals.indexOf(oldMeal);
        if (index !== -1) {
            this.updateTotals(oldMeal, false);
            this.meals[index] = newMeal;
            newMeal.dateTime = oldMeal.dateTime;
            this.updateTotals(newMeal, true);
            this.saveMealsToLocalStorage();
        }
    }

    deleteMeal(meal){
        const index = this.meals.indexOf(meal);
        if (index !== -1) {
            this.updateTotals(meal, false);
            this.meals.splice(index, 1);
            this.saveMealsToLocalStorage();
        }
    }
    /**
     * Update the totals based on a meal.
     * @param {Meal} meal - The meal to update the totals with.
     * @param {boolean} add - Whether to add or subtract the meal's values.
     */
    updateTotals(meal, add) {
        const factor = add ? 1 : -1;
        this.totalCalories += meal.calories * factor;
        this.totalCarbs += meal.carbs * factor;
        this.totalFats += meal.fats * factor;
        this.totalProteins += meal.proteins * factor;
        this.totalVegetables += meal.vegetables * factor;
        if (this.foodCheckStatusComponent) {
            this.foodCheckStatusComponent.updateStatus();
        }
        if(this.mealListComponent){
            this.mealListComponent.reset();
        }
        
    }

     /**
     * Save meals to localStorage.
     */
    saveMealsToLocalStorage() {
        localStorageManager.saveData('meals', this.meals);
    }

    /**
     * Load meals from localStorage.
     */
    loadMealsFromLocalStorage() {
        const mealsData = localStorageManager.loadData('meals');
        if (mealsData) {
            this.meals = mealsData.map(mealData => new Meal(
                mealData.calories,
                mealData.carbs,
                mealData.fats,
                mealData.proteins,
                mealData.vegetables,
                new Date(mealData.dateTime)
            ));
            this.updateTotalsFromMeals();
        }
    }
    /**
     * Update totals from the list of meals.
     */
    updateTotalsFromMeals() {
        this.totalCalories = 0;
        this.totalCarbs = 0;
        this.totalFats = 0;
        this.totalProteins = 0;
        this.totalVegetables = 0;

        this.meals.forEach(meal => {
            this.totalCalories += meal.calories;
            this.totalCarbs += meal.carbs;
            this.totalFats += meal.fats;
            this.totalProteins += meal.proteins;
            this.totalVegetables += meal.vegetables;
        });

        if (this.foodCheckStatusComponent) {
            this.foodCheckStatusComponent.updateStatus();
        }
    }

    /**@type {FoodCheckStatusComponent} */foodCheckStatusComponent = null;
    /**@type {MealListComponent} */ mealListComponent = null;
}


const habilityData = new HabilityData();
const foodCheck = new FoodCheck();
foodCheck.mealTracker.loadMealsFromLocalStorage();
