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



    loadDataFromLocalStorage(){
        let rb = localStorageManager.loadData("currencyRubies");
        this.currencyRuby = rb ==null || rb == undefined ? 0 : Number(rb);
        




        this.resetSpans();
    }

    resetSpans(){
        if(this.currencyRubySpan)this.currencyRubySpan.setText(this.currencyRuby);
        if(this.currencySilverSpan)this.currencySilverSpan.setText(this.currencySilver);
        if(this.currencyGoldSpan)this.currencyGoldSpan.setText(this.currencyGold);
        if(this.currencyWoodSpan)this.currencyWoodSpan.setText(this.currencyWood);
        if(this.playerLevelSpan)this.playerLevelSpan.setText(this.getLevel());
        if(this.playerXPSpan)this.playerXPSpan.setText(this.xp - this.xpRequiredForCurrentLevel());
        if(this.playerEnergySpan)this.playerEnergySpan.setText(this.playerEnergy);
    }




     /**
     * Calculate the XP required for the next level.
     * @returns {number} XP required for the next level.
     */
     xpRequiredForNextLevel() 
     {
        return Math.floor(100 * Math.pow(1.5, this.getLevel()));
     }
    xpRequiredForCurrentLevel()
    {
     if(this.getLevel() ==0)return 0;
     return Math.floor(100 * Math.pow(1.5,this.getLevel()-1));
    }

    /**
     * Get the current level based on the total XP.
     * @returns {number} The current level.
     */
    getLevel() 
    {
        return this.getLevelForXP(this.playerXP); 
    }

    getLevelForXP(/**@type {number}*/xp)
    {
     let level = 0;
     let xpRequired = 0;
     while(xp >=xpRequired)
        {
          level++;
          xpRequired = Math.floor(100 * Math.pow(1.5,level));
        }
     return level;
    }
    

    updateLevelAndXP()
    {
        this.playerLevel = this.getLevel();
        let current = this.playerXP - this.xpRequiredForCurrentLevel();
        if(this.playerXPSpan!=null)this.playerXPSpan.setText(""+Math.floor(current)+"/"+ Math.ceil(this.xpRequiredForNextLevel() - this.xpRequiredForCurrentLevel()));
        if(this.playerLevelSpan!=null)this.playerLevelSpan.setText("Level "+this.getLevel());
        

    }
    

    setRubies(/**@type {number}*/rubies,/**@type {boolean=}*/dontsave = false) 
    {
        if (this.currencyRubySpan != null) {
            this.currencyRubySpan.setText(rubies);
        }
        this.currencyRuby = rubies;
        if(dontsave==undefined || !dontsave){console.log("saving rubies");localStorageManager.saveData("currencyRubies", rubies)};
    }

    addRubies(/**@type {number}*/rubies) 
    {
        this.setRubies(this.currencyRuby + rubies);
    }

    tryPayRubies(/**@type {number}*/rubies) 
    {
        if (this.currencyRuby >= rubies) 
        {
            this.setRubies(this.currencyRuby - rubies);
            return true;
        }
        return false;
    }

    setSilver(/**@type {number}*/silver,/**@type {boolean=}*/dontsave = false) 
    {
        if (this.currencySilverSpan != null) 
        {
            this.currencySilverSpan.setText(silver);
        }
        this.currencySilver = silver;
        if(dontsave==undefined || !dontsave)localStorageManager.saveData("currencySilver", silver);
    }

    addSilver(/**@type {number}*/silver) 
    {
        this.setSilver(this.currencySilver + silver);
    }

    tryPaySilver(/**@type {number}*/silver) 
    {
        if (this.currencySilver >= silver) 
        {
            this.setSilver(this.currencySilver - silver);
            return true;
        }
        return false;
    }

    setGold(/**@type {number}*/gold,/**@type {boolean=}*/dontsave = false) 
    {
        if (this.currencyGoldSpan != null) 
        {
            this.currencyGoldSpan.setText(gold);
        }
        this.currencyGold = gold;
        if(dontsave==undefined || !dontsave)localStorageManager.saveData("currencyGold", gold);
    }

    addGold(/**@type {number}*/gold) 
    {
        this.setGold(this.currencyGold + gold);
    }

    tryPayGold(/**@type {number}*/gold) 
    {
        if (this.currencyGold >= gold) 
        {
            this.setGold(this.currencyGold - gold);
            return true;
        }
        return false;
    }

    setWood(/**@type {number}*/wood,/**@type {boolean=}*/dontsave = false) 
    {
        if (this.currencyWoodSpan != null) 
        {
            this.currencyWoodSpan.setText(wood);
        }
        this.currencyWood = wood;
        if(dontsave==undefined || !dontsave)localStorageManager.saveData("currencyWood", wood);
    }

    addWood(/**@type {number}*/wood) 
    {
        this.setWood(this.currencyWood + wood);
    }

    tryPayWood/**@type {number}*/(wood) 
    {
        if (this.currencyWood >= wood) 
        {
            this.setWood(this.currencyWood - wood);
            return true;
        }
        return false;
    }


    setXP(/**@type {number}*/xp,/**@type {boolean=}*/dontsave = false) 
    {
        if (this.playerXPSpan != null) 
        {
            this.playerXPSpan.setText(xp);
        }
        this.playerXP = xp;
        this.updateLevelAndXP();
        if(dontsave==undefined || !dontsave)localStorageManager.saveData("playerXP", xp);
    }

    addXP(/**@type {number}*/xp) 
    {
        this.setXP(this.playerXP + xp);
    }

    setEnergy(/**@type {number}*/energy,/**@type {boolean=}*/dontsave = false) 
    {
        if (this.playerEnergySpan != null) 
        {
            this.playerEnergySpan.setText(energy);
        }
        this.playerEnergy = energy;
        if(dontsave==undefined || !dontsave)localStorageManager.saveData("playerEnergy", energy);
    }

    addEnergy(/**@type {number}*/energy) 
    {
        this.setEnergy(this.playerEnergy + energy);
    }

    tryPayEnergy(/**@type {number}*/energy) 
    {
        if (this.playerEnergy >= energy) 
        {
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

    /**@type {number} */ yestScore = 0;
      /** @type {MealTracker} */ mealTracker;
     constructor()
     {
          this.mealTracker = new MealTracker(); 
     }

     /**@type {FoodCheckStatusComponent} */goalComponent = null;
     

     setGoals(mincalories, maxcalories,mincarbs,maxcarbs,minfats,maxfats,minproteins,maxproteins,vegetables)
     {
            this.minCalories = mincalories;
            this.maxCalories = maxcalories;
            this.minCarbs = mincarbs;
            this.maxCarbs = maxcarbs;
            this.minFats = minfats;
            this.maxFats = maxfats;
            this.minProteins = minproteins;
            this.maxProteins = maxproteins;
            this.minFruitsAndVegetables = vegetables;

            localStorageManager.saveData('fcg', {
                mk: mincalories,
                pk: maxcalories,
                mc: mincarbs,
                pc: maxcarbs,
                mf: minfats,
                pf: maxfats,
                mp: minproteins,
                pp: maxproteins,
                v: vegetables
            });
            if(this.goalComponent)this.goalComponent.updateStatus();
     }

     loadGoalsFromLocalStorage() 
     {
        const goals = localStorageManager.loadData('fcg');
        if (goals) {
            this.minCalories=(goals.mk);
            this.maxCalories=(goals.pk);
            this.minCarbs=(goals.mc);
            this.maxCarbs=(goals.pc);
            this.minFats=(goals.mf);
            this.maxFats=(goals.pf);
            this.minProteins=(goals.mp);
            this.maxProteins=(goals.pp);
            this.minFruitsAndVegetables=(goals.v);
            if(this.goalComponent)this.goalComponent.updateStatus();
        }

         let yesterday = new Date();
        yesterday.setDate(yesterday.getDate()-1);
        yesterday.setHours(0,0,0,0);

        let pys = localStorageManager.loadData("fcscsc");
        if(pys){
            pys = parseInt(pys);
        }
        
        let dt = localStorageManager.loadData("fcscdt");
        if(dt){ dt = parseInt(dt);}
        if(dt){ dt = new Date(dt);}
        if(dt && dt.getTime() == yesterday.getTime() ){
            this.yestScore = pys;
            console.log("yestscore:" + this.yestScore);
        }
        this.goalComponent.updateStatus();
    }

     checkIfPossibleMin()
     {
          var totalMin = (this.minCarbs*4) + (this.minProteins *4) + (this.minFats*9);
          return {possible : totalMin <= this.maxCalories, totalMin : totalMin};
     }

     addMeal(meal) 
    {
        this.mealTracker.addMeal(meal);
    }
     replaceMeal(oldMeal, newMeal) 
     {
     this.mealTracker.replaceMeal(oldMeal, newMeal);
     }
     deleteMeal(meal)
     {
          this.mealTracker.deleteMeal(meal);
     }
    checkMealGoals() 
    {
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

    startNewDay(){
        let yesterday = new Date();
        yesterday.setDate(yesterday.getDate()-1);
        yesterday.setHours(0,0,0,0);
        let score = this.checkMealGoals();
        localStorageManager.saveData("fcscsc",score);
        localStorageManager.saveData("fcscdt",yesterday.getTime());
        this.yestScore = score;
        this.mealTracker.meals = [];
        this.mealTracker.saveMealsToLocalStorage();
        this.mealTracker.updateTotalsFromMeals();
        this.mealTracker.mealListComponent.updateList();
    }
}

class Meal
{
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
    /**@type {boolean} */ containsMealsFromYesterday = false;

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
            let nm = mealsData.map(mealData => new Meal(
                mealData.calories,
                mealData.carbs,
                mealData.fats,
                mealData.proteins,
                mealData.vegetables,
                new Date(mealData.dateTime)
            ));

                let today = new Date();
                today.setHours(0,0,0,0);
                let yesterday = new Date();
                yesterday.setDate(today.getDate()-1);
                yesterday.setHours(0,0,0,0);
            for(const ml of nm){
                if(ml.dateTime.getTime()>= yesterday.getTime() && ml.dateTime.getTime()< today.getTime())//Then meal was from yesterday
                {
                    this.containsMealsFromYesterday = true;
                }
                if(ml.dateTime.getTime()>= yesterday.getTime()){
                    this.meals.push(ml);
                }
                
            }
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
         let today = new Date();
                today.setHours(0,0,0,0);
                let yesterday = new Date();
                yesterday.setDate(today.getDate()-1);
                yesterday.setHours(0,0,0,0);
            for(const ml of this.meals){
                if(ml.dateTime.getTime()>= yesterday.getTime() && ml.dateTime.getTime()< today.getTime())//Then meal was from yesterday
                {
                    this.containsMealsFromYesterday = true;
                }
            }
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
