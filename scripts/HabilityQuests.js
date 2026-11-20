



class Quest{
    /**@type {string} */ get questName(){return "";}
    /**@type {string} */ get questDescription(){return "";}
    /**@type {number} */ get length(){return -1;}
    /**@type {number} */ get rubyReward(){return -1;}

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

    get questName(){return "Find the " + this.selectedTypeName+ " of " + this.selectedLoreName + "."}
    get questDescription(){return "The " + this.selectedTypeName + " was lost centuries ago. I need you to find it for me, and bring it back ! The needed informations are written inside this scroll."}
    get length(){return this.selectedLength;}
    get rubyReward() {return this.calculatedRubyReward;}
}