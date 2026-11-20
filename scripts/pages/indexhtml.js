
let body = document.body;

let container = new DivComponent("container","container","")
let header = new DivComponent("header","header","")

let headerIcon = new PictureComponent("headerIcon","icon",pstore.iconGriffin.name)

let headerRubyIcon = new PictureComponent("headerRubyIcon","rubyIcon",pstore.currencyRuby.name)
let headerRubyText = new SpanComponent("headerRubyText","rubyText","1450")
habilityData.currencyRubySpan = headerRubyText;
let headerRubyDiv = new DivComponent("headerRubyDiv","rubyDiv","")

headerRubyDiv.addComponent(headerRubyIcon);
headerRubyDiv.addComponent(headerRubyText);
container.addComponent(header);
header.addComponent(headerIcon);
header.addComponent(headerRubyDiv);
header.addComponent(new ButtonComponent("resetButton","resetButton",()=> {localStorageManager.clearData()},"").setText("Reset Data"));


let navigationBar = new DivComponent("navigationBar","navigationBar","")
navigationBar.addComponent(new SpanComponent("navSpan1","navSpan","Home"))
navigationBar.addComponent(new SpanComponent("navSpan2","navSpan","FoodCheck").setOnClick(openFoodCheck))
navigationBar.addComponent(new SpanComponent("navSpan3","navSpan","Quests").setOnClick(toggleQuest));
navigationBar.addComponent(new SpanComponent("navSpan4","navSpan","Settings"))
container.addComponent(navigationBar);


//let trialSpan = new SpanComponent("trial","","").setText("Hello world")

//container.addComponent(trialSpan);

let foodCheckDiv= new DivComponent("FoodCheck","foodCheckDiv hidden","");
let fcsc = new FoodCheckStatusComponent("foodCheckStatus","")
foodCheckDiv.addComponent(fcsc);
foodCheck.goalComponent = fcsc;
foodCheckDiv.addComponent(new FoodCheckGoalSetupComponent("goalSetup",""));
foodCheckDiv.addComponent(new BrComponent());
foodCheckDiv.addComponent(new BrComponent());
foodCheckDiv.addComponent(new BrComponent());
foodCheckDiv.addComponent(new BrComponent());
foodCheckDiv.addComponent(new MealInputComponent("meal",""));
foodCheckDiv.addComponent(new BrComponent());
foodCheckDiv.addComponent(new BrComponent());
foodCheckDiv.addComponent(new BrComponent());
foodCheckDiv.addComponent(new BrComponent());
foodCheckDiv.addComponent(new BrComponent());
foodCheckDiv.addComponent(new MealListComponent("mealList",""));
let questDiv = new QuestDivComponent()

container.addComponent(questDiv);
container.addComponent(foodCheckDiv);


addComponentToElement(container,body);

//questDiv.removeClass("hidden");

//questDiv.questBar.setQuest(300000);

habilityData.loadDataFromLocalStorage();
foodCheck.loadGoalsFromLocalStorage();
//habilityData.addRubies(5);

function openFoodCheck(){
    foodCheckDiv.removeClass("hidden");
}
function tr(value){
    console.log(value);
}
function toggleQuest(){
    questDiv.toggleClass("hidden");
    let quest = new FetchLostItemQuest();
    quest.generate();
    questDiv.clearComponents();
    let questcpn = new QuestComponent("questInfo","questInfo",quest);
    questDiv.addComponent(questcpn);
}

