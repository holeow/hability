var counter = 0;
function incrementAndReturn(){
counter++;
return counter;
}

class Component {
    constructor(id, balise, cssclass, inner) {
        
        /**
         * @type {string}
         */
        this.id = id;
        /**
         * @type {string}
         */
        this.innerHTML=inner;
        /**
         * @type {number}
         */
        this.elementID = incrementAndReturn();
        /**
         * @type {Map}
         */
        this.components = new Map();
        /**
         * @type {boolean}
         */
        this.online = false;
        /**
         * @type {string}
         */
        this.txt = "";
        /**
         * @type {boolean}
         */
        this.modeTxt = false;
        /**
         * @type {string}
         */
        this.cssclass = cssclass;
        /**
         * @type {string}
         */
        this.balise = balise;
        /**
         * @type {function}
         */
        this.onclick = null;
        /**
         * @type {HTMLElement}
         */
        this.element = null;

        this.createElement();
        
    }
    /**
     * @type {string}
     */
    get fullID(){
        return "hlwComponent_"+this.elementID+"_"+this.id;
    }
      /**
     * @type {string}
     */
    get fullBaliseA(){
        return "<"+this.balise+' id="'+this.fullID+'"'+ (this.cssclass!=""? ' class="'+this.cssclass+'"' : "")+">";
    }
      /**
     * @type {string}
     */
    get fullBaliseB(){
        return "</"+this.balise+">";
    }
      /**
     * @type {string}
     */
    get html() {
        return this.fullBaliseA+this.innerHTML+this.fullBaliseB;
    }
/**
 * 
 * @returns {Component}
 */
    createElement(){
        var element = document.createElement(this.balise);
        element.id = this.fullID;
        element.className = this.cssclass;
        if(this.innerHTML!= ""){
            element.innerHTML = this.innerHTML;
        }
        if(this.modeTxt){
            element.innerText = this.txt;
        }
        if(this.onclick!= null){
            element.onclick =this.onclick;
        }
        this.element = element;
        return this;

    }
    /**
     * 
     * @param {string} clas 
     * @returns {Component}
     */
    addClass(clas){
        this.element.classList.add(clas)
        return this;
    }
     /**
     * 
     * @param {string} clas
     * @returns {Component} 
     */
    removeClass(clas){
        this.element.classList.remove(clas)
        return this;
    }
     /**
     * 
     * @param {string} text 
     * @returns {Component}
     */
    setText(text) {
        this.element.innerText = text;
        return this;
    }
    /**
     * 
     * @param {string} html 
     * @returns {Component}
     */
    setInnerHTML(html) {
        this.element.innerHTML = html;
        return this;
    }
     /**
     * 
     * @param {Component} component 
     * @returns {Component}
     */
    addComponent(component){
        this.components.set(component.id, component);
        this.modeTxt = false;
        if(component.element!=null && this.element!=null)this.element.appendChild(component.element);
        return this;
        
    }
    /**
     * 
     * @param {Component} component 
     * @returns {Component}
     */
    removeComponent(component){
        this.components.delete(component.id);
        component.element.remove();
        return this;
    }
    /**
     * 
     * @param {string} id 
     * @returns {Component}
     */
    removeComponentWithId(id){
        var cpn = this.components.get(id);
        this.components.delete(id);
        cpn.element.delete();
        return this;
    }
    /**
     * 
     * @param {function} onclick 
     * @returns {Component}
     */
    setOnClick(onclick){
       this.onclick = onclick;
       this.element.onclick = onclick;
       return this;
    }
    clearComponents(){
        var newMap = new Map(this.components);
        for(let comp of newMap.values()){
            this.removeComponent(comp);
        }
        return this;

    }
    
    /*

    
    reloadSilently(){
        if(this.modeTxt)this.innerHTML = this.txt;
        else{
            for (const [key, value] of this.components.entries()) {
            this.innerHTML += value.html;
            }   
        }
    }
    reload(){
        if(this.modeTxt){
            document.getElementById("hlwComponent_"+this.elementID+"_"+this.id).innerText = this.txt;
            this.innerHTML = this.txt;
            return;
        }

        var element = document.getElementById("hlwComponent_"+this.elementID+"_"+this.id);
        element.innerHTML = "";
        this.innerHTML = "";
        for (const [key, value] of this.components.entries()) {
            element.innerHTML += value.html;
            this.innerHTML += value.html;
            value.online = true;

        }   
    }
    reloadSequence(){

        if(this.modeTxt){
            document.getElementById("hlwComponent_"+this.elementID+"_"+this.id).innerText = this.txt;
            this.innerHTML = this.txt;
            return;
        }
        else{
            var element = document.getElementById("hlwComponent_"+this.elementID+"_"+this.id);
            if(this.online)element.innerHTML = "";
            this.innerHTML = "";
            var arr = [];
            this.addInvertedToArray(arr);
            var ar2 = arr.reverse();
            for(const value of ar2){
                value.reloadSilently();
                value.online = true;
            }
            for(const value of this.components.values()){
                this.innerHTML+=value.html;
               
            }
            
            if(this.online)element.innerHTML = this.innerHTML;
            for (const value of ar2){
                if(value.onclick!=null){
                    document.getElementById("hlwComponent_"+value.elementID+"_"+value.id).onclick = value.onclick;
                }
            }
        }

    }

    addInvertedToArray(array){
        for (const [key, value] of this.components.entries()) {
            array.push(value);
            value.addInvertedToArray(array);
        }

    }
        */
}

class DivComponent extends Component {
    constructor(id,cssclass, innerHTML) {
        super(id, "div",cssclass, innerHTML);
        
    }
}
class SpanComponent extends Component {
    constructor(id, cssclass, innerHTML) {
        super(id, "span",cssclass, innerHTML);
        
    }
}
class BrComponent extends Component{
    constructor(){
        super("","br","","");
    }
}

class ImgComponent extends Component{
    
    constructor(id, cssclass, src) {
        super(id, "img",cssclass, "");
        this.setSrc(src);
    }
    get fullBaliseA(){
        return "<"+this.balise+' id="'+this.fullID+'"'+ (this.cssclass!=""? ' class="'+this.cssclass+'"' : "")+' src="'+this.src+'">';
    }
    get fullBaliseB(){
        return "";
    }
    createElement(){
        var cpn = super.createElement();
        if(this.src!="" || this.src!= null || this.src!= undefined){
            cpn.element.src = this.src;
        }
        return cpn;
    }
    setSrc(src){
        this.src = src;
        this.element.src = src;
        return this;
    }
}

class PictureComponent extends ImgComponent{
    constructor(id,cssclass,pictureName){
        super(id,cssclass,pictureStore.get(pictureName).link);
    }

    setPicture(pictureName){
        this.setSrc(pictureStore.get(pictureName).link);
    }
}

class LinkComponent extends Component{
    constructor(id, cssclass, href, innerHTML) {
        super(id, "a",cssclass, innerHTML);
        this.setHref( href);
    }

    get fullBaliseA(){
        return "<"+this.balise+' id="'+this.fullID+'"'+ (this.cssclass!=""? ' class="'+this.cssclass+'"' : "")+ (this.href!="" ? ' href="'+this.href+'"'+'>' : ">");
    }

    get fullBaliseB(){
        return "</"+this.balise+">";
    }

    setHref(href){
        this.href = href;
        if(this.href=="" || this.href== null || this.href== undefined) this.element.removeAttribute("href");
        this.element.href =href==""? null :  href;
        return this;
    }
    createElement(){
        var cpn = super.createElement();
        if(this.href!="" && this.href!= null && this.href!= undefined){
            cpn.element.href = this.href;
        }
        return cpn;
    }
    
}
/**
 * @extends Component
 * 
 */
class QuestBarComponent extends Component{
    constructor(id,cssclass){
       super(id, "progress",cssclass, "");
        /** @type {number} */
        this.setValue(0);
        this.setMaxTime(0);
        this.actualtime = 0;
        
    }
   


    createElement(){
        var cpn = super.createElement();
        cpn.element.value = 0;
        cpn.element.max= 1000;
        return this;
    }

    setValue(val){
        this.value = val;
        if(this.element!=null && this.element!= undefined)this.element.value = Math.floor(val); 
        return this;
        
    }
    setMaxTime(milliseconds){

        this.maxTime = milliseconds;

    }

    async setQuest(milliseconds){
        this.value = 0;
        let startTime = new Date().getTime();
        this.actualtime = 0;
        this.setMaxTime(milliseconds);
        while (this.actualtime< this.maxTime){
            await new Promise(r => setTimeout(r, 50));
            let newTime = new Date().getTime();
            this.actualtime = newTime - startTime;
            this.setValue(Math.floor((this.actualtime / this.maxTime)*1000))
            if(this.actualtime >= this.maxTime)
                console.log("Quest Done !")
        }
    }

    


}
/**
 * @extends Component
 * 
 */
class ProgressBarComponent extends Component{
    constructor(id,cssclass){
       super(id, "progress",cssclass, "");
        /** @type {number} */
        this.setValue(0);
        
    }
   


    createElement(){
        var cpn = super.createElement();
        cpn.element.value = 0;
        cpn.element.max= 100;
        return this;
    }

    setValue(val){
        this.value = val;
        if(this.element!=null && this.element!= undefined)this.element.value = Math.floor(val); 
        return this;
        
    }
    

    


}

class QuestDivComponent extends DivComponent
{

    constructor(){
        super("questDiv","questDiv hidden","");
        this.questBar = new QuestBarComponent("questBar","questBar");
        this.addComponent(this.questBar);
    }

    createElement(){
        //var qb = this.questBar.createElement();
        var cpn = super.createElement();
        return this;
        
    }

}

class ButtonComponent extends Component{
    constructor(id,cssclass,onclick,innerHTML){
        super(id,"button",cssclass,innerHTML);
        this.setOnClick(onclick);
    }
}

class FieldComponent extends Component {
    constructor(id, cssclass, placeholder) {
        super(id, "input", cssclass, "");
        this.setPlaceholder(placeholder);
        this.inputHandler = null;
        this.value = "";
    }

    get fullBaliseA() {
        return "<" + this.balise + ' id="' + this.fullID + '"' + (this.cssclass !== "" ? ' class="' + this.cssclass + '"' : "") + (this.placeholder !== "" ? ' placeholder="' + this.placeholder + '"' : "") + ">";
    }

    get fullBaliseB() {
        return "";
    }

    createElement() {
        var cpn = super.createElement();
        cpn.element.type = "text";
        if (this.placeholder !== "") {
            cpn.element.placeholder = this.placeholder;
        }
        cpn.element.addEventListener("input", this.handleInput.bind(this));
        return cpn;
    }

    numericMode = false;

    setPlaceholder(placeholder) {
        this.placeholder = placeholder;
        if (this.element !== null) {
            this.element.placeholder = placeholder;
        }
        return this;
    }
    setValue(value){
        this.value = value;
        if(this.element!=null){
            this.element.value = value;
        }
        return this;
    }

    handleInput(event) {
        if(this.numericMode){
            const inputValue = event.target.value;
            if (/^\d*$/.test(inputValue)) {
                this.lastValidValue = inputValue;
                if (this.inputHandler !== null) {
                    this.inputHandler(inputValue);
                }
            } else {
                event.target.value = this.lastValidValue == undefined ? "": this.lastValidValue;
            }
        }
        else{
            if (this.inputHandler !== null) {
            this.inputHandler(event.target.value);
        }
        }





    }

    setInputHandler(handler) {
        this.inputHandler = handler;
        return this;
    }

    getValue() {
        return this.element.value;
    }
}


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
            console.log("Meal added:", meal);
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

        this.updateStatus();
        foodCheck.mealTracker.foodCheckStatusComponent = this;
    }

    updateStatus() {
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

function addComponentToElement(component, targetElement) {
    targetElement.appendChild( component.element);
    component.online = true;
}
function addComponent(component, targetComponent) {
    targetComponent.addComponent(component);
}

function forceDeleteComponent(component){
    component.element.delete();
}