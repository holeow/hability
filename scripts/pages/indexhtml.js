
let body = document.body;

let container = new DivComponent("container","container","")
let header = new HeaderComponent();

container.addComponent(header);


let navigationBar = new NavigationBarComponent();
container.addComponent(navigationBar);


let foodCheckDiv=  new CompositeFoodCheckComponent(); //new DivComponent("FoodCheck","foodCheckDiv hidden","");

let questDiv = new QuestDivComponent()


let silverTradeDiv = new DivComponent("silverTrade","silverTrade hidden","");
silverTradeDiv.addComponent(new SilverTradeComponent("silverTradeCPN","silverTradeCPN"));

container.addComponent(questDiv);
container.addComponent(foodCheckDiv);

container.addComponent(silverTradeDiv);

addComponentToElement(container,body);



habilityData.loadDataFromLocalStorage();
foodCheck.loadGoalsFromLocalStorage();



