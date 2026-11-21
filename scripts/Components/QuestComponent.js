class QuestComponent extends Component {
    constructor(id, cssclass, quest) {
        super(id, "div", cssclass, "",false);
        /**@type {Quest} */
        this.quest = quest;
        this.createElement();
    }
    /**@type {ButtonComponent}*/startQuestButton = null;
    /**@type {QuestBarComponent} */questBar= null;

    createElement() {
        const cpn = super.createElement();
        // Create and add components for quest details
        const questName = new SpanComponent("questName", "questName", this.quest.questName);
        const questDescription = new TextBlockComponent("questDescription", "questDescription", this.quest.questDescription);

        const infoDiv = new DivComponent("questInfoDiv","questInfoDiv","");
        const questLength = new SpanComponent("questLength", "questLength", `Length: ${this.formatTime(this.quest.length)}`);
        const questRubyReward = new SpanComponent("questRubyReward", "questRubyReward", `${this.quest.rubyReward}`);
        questRubyReward.addComponent(new EmojiComponent("rubyRewardquestdisplay","rubyrewardquestdisplay",pstore.currencyRuby.name))

        infoDiv.addComponent(questLength);
        infoDiv.addComponent(questRubyReward);
        // Add components to the QuestComponent
        cpn.addComponent(questName);
        cpn.addComponent(new BrComponent());
        cpn.addComponent(questDescription);
        cpn.addComponent(new BrComponent());
        cpn.addComponent(infoDiv);
        let d = new DivComponent("questStartButtonDiv","startQuestButtonDiv","");
        cpn.addComponent(d);
        this.startQuestButton = new ButtonComponent("startQuestButton","startQuestButton", () => this.startQuest(cpn),"START");
        d.addComponent(this.startQuestButton);
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
}