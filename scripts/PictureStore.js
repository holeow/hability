class Picture {
    constructor(name,link,creator,creatorlink){
        this.name = name;
        this.link= link;
        this.creator = creator;
        this.creatorlink = creatorlink;
    }
}

class PictureStore {
    /**
     * @type {Map<string,Picture>}
     */
    byNames = new Map();
    /**
     * @type {Map<string,Array<Picture>>}
     */
    byCreator = new Map();

    /**
     * 
     * @param {Picture} picture 
     */
    addPicture(picture){
        this.byNames.set(picture.name,picture);

        if(this.byCreator.has(picture.creator)){
            this.byCreator.get(picture.creator).push(picture);
        }
        else{
            var arr = [];
            arr.push(picture);
            this.byCreator.set(picture.creator,arr);
        }
    }

    get(name){
        return this.byNames.get(name);
    }
}
/**
 * @type {PictureStore}
 */
const pictureStore = new PictureStore();
let pstore = {};
pstore.currencyRuby = new Picture("currencyRuby","img/dragonruby64.png","CHAT GPT","https://chatgpt.com")
pstore.currencySilver = new Picture("currencyRuby","img/dragonsilver64.png","CHAT GPT","https://chatgpt.com")
pstore.currencyGold = new Picture("currencyRuby","img/dragongold64.png","CHAT GPT","https://chatgpt.com")
pstore.currencyWood = new Picture("currencyRuby","img/dragonwood64.png","CHAT GPT","https://chatgpt.com")

pstore.iconGriffin = new Picture("iconGriffin", "img/griffin.png","flaticon","https://www.flaticon.com/free-icons/griffin")
pictureStore.addPicture(pstore.currencyRuby);
pictureStore.addPicture(pstore.iconGriffin);