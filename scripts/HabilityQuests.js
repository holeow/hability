
class QuestHandler {
    /**@type {Quest} */ get currentQuest(){
        if(this.private_storedCurrentQuest == null){
            let q = this.loadCurrentQuestFromStorage();
            if(!q){
                q = new FetchLostItemQuest();
                q.generate();
                this.private_storedCurrentQuest = q;
                this.saveCurrentQuestToStorage();
                return this.private_storedCurrentQuest;
            }
            else{
                this.private_storedCurrentQuest = q;
                return this.private_storedCurrentQuest;
            }
        }
        else return this.private_storedCurrentQuest;
    }
    /**@type {Quest} */ private_storedCurrentQuest = null;

    loadCurrentQuestFromStorage(){
        let qc = localStorageManager.loadData("questcode");
        if(!qc) return null;
        else{
            if(qc == "fli"){
                let qs = localStorageManager.loadData("questData");
                if(!qs) return null;
                else{
                    let qu = new FetchLostItemQuest();
                    qu.reloadFromDataString(qs);
                    return qu;
                }
            }
            else return null;
        }
    }
    saveCurrentQuestToStorage(){
        let q = this.currentQuest;
        localStorageManager.saveData("questcode",q.questTypeCode);
        localStorageManager.saveData("questData", q.questData);
    }
}



class Quest{
    /**@type {string} */ get questName(){return "";}
    /**@type {string} */ get questDescription(){return "";}
    /**@type {number} */ get length(){return -1;}
    /**@type {number} */ get rubyReward(){return -1;}
    /**@type {string} */ get questTypeCode(){return "nul";}
    /**@type {string} */ get questData(){return JSON.stringify({});}

    generate(){}
    constructor(){}

}

class FetchLostItemQuest extends Quest
{

    /**@type {Array<string>} */ itemTypeName = ["medallion","key","elixir","ring","amulet","scroll"]
    /**@type {Array<string>} */ itemLoreName = ["Tsunegroth","Alaviar","Nicoumene","Al'Vaggor"]
    /**@type {Array<number>} */ possibleLengths = [300000,450000,600000,900000]
    /**@type {number} */ baseRubyRewardPerMinute = 0.25;

    /**@type {number} */ calculatedRubyReward = -1;
    /**@type {number} */ selectedLength = -1;
    /**@type {string} */ selectedTypeName = "";
    /**@type {string} */ selectedLoreName = "";

    /**@type {Date} */ startMoment = null;
    /**@type {Date} */ endMoment = null;


    constructor()
    {
        super();
    }

    generateRubyRewardAndLengthRandomly()
    {
        // Generate a random number between 0.5 and 3
        const randomMultiplier = Math.random() * (3 - 0.5) + 0.5;

        // Select a random length from the possibleLengths array
        this.selectedLength = this.possibleLengths[Math.floor(Math.random() * this.possibleLengths.length)];

        // Calculate the ruby reward
        const minutes = this.selectedLength / 60000; // Convert milliseconds to minutes
        this.calculatedRubyReward =Math.ceil( this.baseRubyRewardPerMinute * randomMultiplier * minutes);
    }

    generateNameRandomly(){
        this.selectedTypeName = this.itemTypeName[Math.floor(Math.random() * this.itemTypeName.length)];
        this.selectedLoreName = this.itemLoreName[Math.floor(Math.random() * this.itemLoreName.length)];

    }

    generate()
    {
        this.generateNameRandomly();
        this.generateRubyRewardAndLengthRandomly();
    }

    getDataString(){
        let obj = {v : 1,itn : this.itemTypeName.findIndex(a=>a== this.selectedTypeName), iln : this.itemLoreName.findIndex(a=> a == this.selectedLoreName), rr : this.calculatedRubyReward, sm:  this.startMoment? this.startMoment.getTime() : null, l : this.selectedLength}
        return JSON.stringify(obj);
    }
    reloadFromDataString(/**@type {string} */ datastring){
        let obj = JSON.parse(datastring);
        if(obj.v==1){
            let itnn = parseInt(obj.itn);
            if(isNaN(itnn) || itnn<0 || itnn>this.itemTypeName.length)itnn = 0;
            this.selectedTypeName = this.itemTypeName[itnn];


            let ilnn = parseInt(obj.iln);
            if(isNaN(ilnn) || itnn<0 || ilnn>this.itemLoreName.length)ilnn = 0;
            this.selectedLoreName = this.itemLoreName[ilnn];

            let rrr = parseInt(obj.rr);
            if(isNaN(rrr) || rrr<0) rrr =1;
            this.calculatedRubyReward = rrr;

            let smm  = null;
            if(obj.sm == null){

            }
            else{
                smm = parseInt(obj.sm);
                if(isNaN(smm) || smm<0)smm = null;
                else{
                    smm = new Date(smm);
                    this.startMoment = smm;
                }
            }

            let ll = parseInt(obj.l);
            if(isNaN(ll) || ll<0){
                ll = 300000;
            }
            this.selectedLength = ll;
            if(this.startMoment != null){
                this.endMoment = new Date(this.startMoment.getTime() + ll);
            }
        }
        else this.generate();
    }

    get questName(){return "Find the " + this.selectedTypeName+ " of " + this.selectedLoreName + "."}
    get questDescription(){return "The " + this.selectedTypeName + " was lost centuries ago. I need you to find it for me, and bring it back ! The needed informations are written inside this scroll."}
    get length(){return this.selectedLength;}
    get rubyReward() {return this.calculatedRubyReward;}
    get questTypeCode() {return "fli";}
    get questData() {return this.getDataString();}
}

const questHandler = new QuestHandler();