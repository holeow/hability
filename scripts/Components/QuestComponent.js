class QuestComponent extends Component {
    constructor(id, cssclass, quest) {
        super(id, "div", cssclass, "",false);
        this.quest = quest;
        this.createElement();
    }


    createElement() {
        const cpn = super.createElement();
        // Create and add components for quest details
        const questName = new SpanComponent("questName", "questName", this.quest.questName);
        const questDescription = new TextBlockComponent("questDescription", "questDescription", this.quest.questDescription);

        const infoDiv = new DivComponent("questInfoDiv","questInfoDiv","");
        const questLength = new SpanComponent("questLength", "questLength", `Length: ${this.formatTime(this.quest.length)}`);
        const questRubyReward = new SpanComponent("questRubyReward", "questRubyReward", `Ruby Reward: ${this.quest.rubyReward}`);

        infoDiv.addComponent(questLength);
        infoDiv.addComponent(questRubyReward);
        // Add components to the QuestComponent
        cpn.addComponent(questName);
        cpn.addComponent(new BrComponent());
        cpn.addComponent(questDescription);
        cpn.addComponent(new BrComponent());
        cpn.addComponent(infoDiv);

        return cpn;
    }

    formatTime(milliseconds) {
        const minutes = Math.floor(milliseconds / 60000);
        const seconds = ((milliseconds % 60000) / 1000).toFixed(0);
        return `${minutes}m ${seconds}s`;
    }
}