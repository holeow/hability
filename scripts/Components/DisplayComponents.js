class HeaderComponent extends Component{
    constructor(){
        super("header","div","header","",false);


        this.currencyRubySpan = null;
        this.currencyRubyIcon = null;
        this.currencySilverSpan = null;
        this.currencySilverIcon = null;
        this.headerRubyDiv = null;
        this.headerIcon = null;
        this.headerIcon = null;




        this.createElement();
    }


    createElement(){
        super.createElement();
        this.currencyRubyIcon = new PictureComponent("headerRubyIcon","rubyIcon",pstore.currencyRuby.name)
        this.currencyRubySpan = new SpanComponent("headerRubyText","rubyText","1450")
        this.currencySilverIcon = new PictureComponent("headerSilverIcon","rubyIcon",pstore.currencySilver.name)
        this.currencySilverSpan = new SpanComponent("headerSilverText","rubyText","1450");
        habilityData.currencyRubySpan = this.currencyRubySpan;
        habilityData.currencySilverSpan = this.currencySilverSpan;
        this.headerRubyDiv = new DivComponent("headerRubyDiv","rubyDiv","")
        this.headerIcon = new PictureComponent("headerIcon","icon",pstore.iconGriffin.name)

        this.headerRubyDiv.addComponent(this.currencyRubyIcon);
        this.headerRubyDiv.addComponent(this.currencyRubySpan);
        this.headerRubyDiv.addComponent(this.currencySilverIcon);
        this.headerRubyDiv.addComponent(this.currencySilverSpan);
        
        this.addComponent(this.headerIcon);
        this.addComponent(this.headerRubyDiv);
        this.addComponent(new ButtonComponent("resetButton","resetButton",()=> {localStorageManager.clearData()},"").setText("Reset Data"));

    }
}

class NavigationBarComponent extends Component{
    constructor(){
        super("navigationBar","div","navigationBar","",false);







        this.createElement();
    }
    createElement(){
        super.createElement();

        
        this.addComponent(new SpanComponent("navSpan1","navSpan","Home"))
        this.addComponent(new SpanComponent("navSpan2","navSpan","FoodCheck").setOnClick(openFoodCheck))
        this.addComponent(new SpanComponent("navSpan3","navSpan","Quests").setOnClick(toggleQuest));
        this.addComponent(new SpanComponent("navSpan4","navSpan","Silver").setOnClick(openSilverTrade))
    }
}

function closeAll(){
    silverTradeDiv.addClass("hidden");
    foodCheckDiv.addClass("hidden");
    questDiv.addClass("hidden");
}

function openSilverTrade(){
    closeAll();
    silverTradeDiv.removeClass("hidden");
}

function openFoodCheck(){
    closeAll();
    foodCheckDiv.removeClass("hidden");
}
function toggleQuest(){
    closeAll();
    questDiv.removeClass("hidden");
    let quest = questHandler.currentQuest;
    questDiv.clearComponents();
    let questcpn = new QuestComponent("questInfo","questInfo",quest);
    questDiv.addComponent(questcpn);
    questcpn.questBar.setQuest();
}