class QuestComponent extends Component {
    constructor(id, cssclass, quest) {
        super(id, "div", cssclass, "",false);
        /**@type {Quest} */
        this.quest = quest;
        
        this.questName = null;
        this.questDescription = null;
        this.infoDiv = null;
        this.questLength = null;
        this.questRubyReward = null;
        this.createElement();
    }
    /**@type {ButtonComponent}*/startQuestButton = null;
    /**@type {ButtonComponent} */restartQuest = null;
    /**@type {QuestBarComponent} */questBar= null;

    createElement() {
        const cpn = super.createElement();
        // Create and add components for quest details
        this.questName = new SpanComponent("questName", "questName", this.quest.questName);
        this.questDescription = new TextBlockComponent("questDescription", "questDescription", this.quest.questDescription);

        this.infoDiv = new DivComponent("questInfoDiv","questInfoDiv","");
        this.questLength = new SpanComponent("questLength", "questLength", `Length: ${this.formatTime(this.quest.length)}`);
        this.questRubyReward = new SpanComponent("questRubyReward", "questRubyReward", `${this.quest.rubyReward}`);
        this.questRubyReward.addComponent(new EmojiComponent("rubyRewardquestdisplay","rubyrewardquestdisplay",pstore.currencyRuby.name))

        this.infoDiv.addComponent(this.questLength);
        this.infoDiv.addComponent(this.questRubyReward);
        // Add components to the QuestComponent
        cpn.addComponent(this.questName);
        cpn.addComponent(new BrComponent());
        cpn.addComponent(this.questDescription);
        cpn.addComponent(new BrComponent());
        cpn.addComponent(this.infoDiv);
        let d = new DivComponent("questStartButtonDiv","startQuestButtonDiv","");
        cpn.addComponent(d);
        this.startQuestButton = new ButtonComponent("startQuestButton","startQuestButton", () => this.startQuest(cpn),"START");
        this.restartQuest = new ButtonComponent("newQuestButton","startQuestButton",()=> {this.reloadQuest(cpn)}, "RELOAD")
        d.addComponent(this.startQuestButton);
        d.addComponent(new BrComponent());
        d.addComponent(this.restartQuest);
        this.questBar = new QuestBarComponent("questBar","questBar");
        cpn.addComponent(cpn.questBar);
        return cpn;
    }

    /**
     * 
     * @param {QuestComponent} cpn 
     */
    startQuest(cpn){
        console.log(cpn.quest.questName);
        cpn.questBar.setQuest(cpn.quest.length)
    }
    formatTime(milliseconds) {
        const minutes = Math.floor(milliseconds / 60000);
        const seconds = ((milliseconds % 60000) / 1000).toFixed(0);
        return `${minutes}m ${seconds}s`;
    }
    reloadQuest(cpn){
        questHandler.loadNewRandomQuest();
        cpn.setNewQuest(questHandler.currentQuest);
    }

    setNewQuest(/**@type {Quest} */quest){
        this.quest = quest;
        this.questName.setText(quest.questName);
        this.questDescription.setText(quest.questDescription);
        this.questLength.setText(`Length: ${this.formatTime(quest.length)}`);
        this.questRubyReward.clearComponents();
        this.questRubyReward.setText("");
        this.questRubyReward.addComponent(new SpanComponent("rrrr","","").setText(quest.rubyReward));
        this.questRubyReward.addComponent(new EmojiComponent("rubyRewardquestdisplay","rubyrewardquestdisplay",pstore.currencyRuby.name));
    }
}