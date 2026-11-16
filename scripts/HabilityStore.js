
/**
 * 
 */
class GoldenQuestion{
    /** @type {string} */questionString = "";
    /** @type {string} */answerGoodString = "";
    /** @type {string} */answerBadString = "";
    /** @type {boolean} */alreadyGottenQuestion = false;

    /**
     * 
     * @param {string} question 
     * @param {string} good 
     * @param {string} bad 
     * @param {boolean} gotten 
     */
    constructor(question,good,bad,gotten)
    {
        this.questionString = question;
        this.answerGoodString = good;
        this.answerBadString = bad;
        this.alreadyGottenQuestion = gotten;
    }
}
/**
 * 
 */
class GoldenQuestionStore
{

    /**@type {Array<GoldenQuestion>}*/notAnsweredQuestions = [];
    /**@type {Array<GoldenQuestion>}*/answeredQuestions = [];

    getRandomNotAnswered()
    {
        const random = Math.floor(Math.random() * this.notAnsweredQuestions.length);
        return this.notAnsweredQuestions.at(random);
    }

    remove(question)
    {
        let index = this.notAnsweredQuestions.indexOf(question);
        if (index > -1) 
            { // only splice array when item is found
                this.notAnsweredQuestions.splice(index, 1); // 2nd parameter means remove one item only
                this.answeredQuestions.push(question);
            }
    }
    /**
     * 
     * @param {GoldenQuestion} question 
     */
    addQuestion(question){
        if(question.alreadyGottenQuestion)this.answeredQuestions.push(question);
        else this.notAnsweredQuestions.push(question);
    }

    populateWithBaseQuestions(){
        this.addQuestion(new GoldenQuestion("Have you brushed your teeth yesterday? Did you close the tap while doing so?","Yes to both","No",false));
        this.addQuestion(new GoldenQuestion("Did you wash your hands everytime it was needed?","Yes","No",false));
        this.addQuestion(new GoldenQuestion("Did you eat at least one portion of vegetables or fruits yesterday?","Yes","No",false));
        this.addQuestion(new GoldenQuestion("Yesterday, did you do the dishes or put the plates in the diswhasher after eating?","Yes","No",false));
        this.addQuestion(new GoldenQuestion("Did you drink alcohol or too much caffeine Yesterday?","No","Yes",false));
        this.addQuestion(new GoldenQuestion("Did you drink sugar rich drinks (soda) yesterday?","No","Yes",false));
        this.addQuestion(new GoldenQuestion("Did you doomscroll on your phone in your bed yesterday ?","No","Yes",false));
        this.addQuestion(new GoldenQuestion("Did you go back to sleep after you alarm rang yesterday morning?","I woke up in time","I overslept",false));
        this.addQuestion(new GoldenQuestion("Did you achieve your last walking goal?","Yes","No",false));
        this.addQuestion(new GoldenQuestion("Did you snack too much yesterday ?","No","Yes",false));
        this.addQuestion(new GoldenQuestion("Did you cook something by doing more than reheating a meal in the microwave yesterday?","Yes","No",false));
        this.addQuestion(new GoldenQuestion("Did you change your bed sheets in the last 4 weeks?","Yes","No",false));
        this.addQuestion(new GoldenQuestion("Did you drink at least 8 glasses of water yesterday?","Yes","No",false));
    }
}
/**
 * 
 */
class SideQuest {
    /**@type {number}*/minimumTime = 0;
    /**@type {number}*/maximumTime = 0;
    /**@type {string}*/questName = "";
    /**@type {string}*/questDescription = "";

    /**@type {number}*/oneStarReward = 0;
    /**@type {number}*/twoStarsReward = 0;
    /**@type {number}*/threeStarsReward = 0;
    /**@type {number}*/fourStarsReward = 0;

    constructor(name,desc,minTime,maxTime,one,two,three,four){
        this.minimumTime = minTime;
        this.maximumTime=maxTime;
        this.questName = name;
        this.questDescription = desc;
        this.oneStarReward= one;
        this.twoStarsReward = two;
        this.threeStarsReward = three;
        this.fourStarsReward = four;
    }

}

/**
 * 
 */
class SideQuestStore{
    /**@type {Array<SideQuest>}*/quests = [];

    addQuest(quest){
        this.quests.push(quest);
    }

    getRandomQuest(time){
        let q = this.quests.filter(a=> a.minimumTime <= time && a.maximumTime>= time);
        if(q.length>0){
            let random = Math.floor(Math.random * q.length);
            return q.at(random);
        }
        else return null;
    }

    populateWithBaseQuests(){
        this.addQuest(new SideQuest("Quick reinforcement exercise","Do some Calisthenics like push ups/squats. You can also use weights or other equipments if you have some, or do other types of reinforcement exercises.",4,16,2,4,6,8));
        this.addQuest(new SideQuest("Wipe a surface of the Guild Hall","Wipe a desk, a drawer or a table, or just tidy what's not supposed to be on there.",4,16,2,3,4,5));
        this.addQuest(new SideQuest("Tidy the Tavern's Kitchen","You have a few minutes, sort a shelf or the fridge, throw away some expired goods.",4,16,3,5,6,7));
        this.addQuest(new SideQuest("Prepare a meal","Depending on what time it is, you can cook something, or just prepare what you'll need for your next meal, or dress the table!",19,46,2,5,10,20));
        this.addQuest(new SideQuest("Wash your hands","Only if you need to or if you havent washed them recently, go watch your hands.",2,8,1,1,2,2));
        this.addQuest(new SideQuest("Hydrate","Drink some healthy liquids. Water is good for you.",2,16,1,1,2,3));
        this.addQuest(new SideQuest("Wash some dishes","Put some items in the diswasher, empty it if it's clean, start it if it's full. Or if you're brave enough, wash some heavy equipment in the sink manually.",14,46,2,4,8,12));
        this.addQuest(new SideQuest("Vacuum Clean a room","Pick a room that is the right size for the time you have, and Vacuum Clean it. Or sweep the floor.",14,46,3,5,7,9));
    }
}

/** The main side quest store, containing the available side quests and methods to grab random ones.
 * @type {SideQuestStore} */let sideQuestStore = null;
/** The main golden question store, containing available and remaining golden questions and methods to grab and check random ones.
 * @type {GoldenQuestionStore} */let goldenQuestionStore = null;

/** Sets the sideQuestStore variable to a new and populated store */
function freshSideQuests(){
    sideQuestStore = new SideQuestStore();
    sideQuestStore.populateWithBaseQuests();
}
/** Sets the goldenQuestionStore to a new and populated store */
function freshGoldenQuestions(){
    goldenQuestionStore = new GoldenQuestionStore();
    goldenQuestionStore.populateWithBaseQuestions();
}