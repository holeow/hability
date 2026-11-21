var counter = 0;
function incrementAndReturn()
{
counter++;
return counter;
}

class Component {
    constructor(id, balise, cssclass, inner, createElement = true) {
        
        /**
         * @type {string}
         */
        this.id = id;
        /**
         * @type {string}
         */
        this.innerHTML=inner;
        /**
         * @type {number}
         */
        this.elementID = incrementAndReturn();
        /**
         * @type {Map}
         */
        this.components = new Map();
        /**
         * @type {boolean}
         */
        this.online = false;
        /**
         * @type {string}
         */
        this.txt = "";
        /**
         * @type {boolean}
         */
        this.modeTxt = false;
        /**
         * @type {string}
         */
        this.cssclass = cssclass;
        /**
         * @type {string}
         */
        this.balise = balise;
        /**
         * @type {function}
         */
        this.onclick = null;
        /**
         * @type {HTMLElement}
         */
        this.element = null;
        if(createElement)
        this.createElement();
        
    }
    /**
     * @type {string}
     */
    get fullID(){
        return "hlwComponent_"+this.elementID+"_"+this.id;
    }
      /**
     * @type {string}
     */
    get fullBaliseA(){
        return "<"+this.balise+' id="'+this.fullID+'"'+ (this.cssclass!=""? ' class="'+this.cssclass+'"' : "")+">";
    }
      /**
     * @type {string}
     */
    get fullBaliseB(){
        return "</"+this.balise+">";
    }
      /**
     * @type {string}
     */
    get html() {
        return this.fullBaliseA+this.innerHTML+this.fullBaliseB;
    }
/**
 * 
 * @returns {Component}
 */
    createElement(){
        var element = document.createElement(this.balise);
        element.id = this.fullID;
        element.className = this.cssclass;
        if(this.innerHTML!= ""){
            element.innerHTML = this.innerHTML;
        }
        if(this.modeTxt){
            element.innerText = this.txt;
        }
        if(this.onclick!= null){
            element.onclick =this.onclick;
        }
        this.element = element;
        return this;

    }
    /**
     * 
     * @param {string} clas 
     * @returns {Component}
     */
    addClass(clas){
        this.element.classList.add(clas)
        return this;
    }
     /**
     * 
     * @param {string} clas
     * @returns {Component} 
     */
    removeClass(clas){
        this.element.classList.remove(clas)
        return this;
    }

     /**
     * 
     * @param {string} clas 
     * @returns {Component}
     */
    toggleClass(clas){
        this.element.classList.toggle(clas)
        return this;
    }
    
    

     /**
     * 
     * @param {string} text 
     * @returns {Component}
     */
    setText(text) {
        this.element.innerText = text;
        return this;
    }
    /**
     * 
     * @param {string} html 
     * @returns {Component}
     */
    setInnerHTML(html) {
        this.element.innerHTML = html;
        return this;
    }
     /**
     * 
     * @param {Component} component 
     * @returns {Component}
     */
    addComponent(component){
        this.components.set(component.id, component);
        this.modeTxt = false;
        if(component.element!=null && this.element!=null)this.element.appendChild(component.element);
        return this;
        
    }
    /**
     * 
     * @param {Component} component 
     * @returns {Component}
     */
    removeComponent(component){
        this.components.delete(component.id);
        component.element.remove();
        return this;
    }
    /**
     * 
     * @param {string} id 
     * @returns {Component}
     */
    removeComponentWithId(id){
        var cpn = this.components.get(id);
        this.components.delete(id);
        cpn.element.remove();

        return this;
    }
    /**
     * 
     * @param {function} onclick 
     * @returns {Component}
     */
    setOnClick(onclick){
       this.onclick = onclick;
       this.element.onclick = onclick;
       return this;
    }
    clearComponents(){
        var newMap = new Map(this.components);
        for(let comp of newMap.keys()){
            this.removeComponentWithId(comp);
        }
        return this;

    }
}

class DivComponent extends Component {
    constructor(id,cssclass, innerHTML) {
        super(id, "div",cssclass, innerHTML);
        
    }
}
class SpanComponent extends Component {
    constructor(id, cssclass, innerHTML) {
        super(id, "span",cssclass, innerHTML);
        
    }
}
class TextBlockComponent extends Component{
    constructor(id,cssclass,innerHTML){
        super(id,"p",cssclass,innerHTML);
    }
}
class BrComponent extends Component{
    constructor(){
        super("","br","","");
    }
}

class ImgComponent extends Component{
    
    constructor(id, cssclass, src) {
        super(id, "img",cssclass, "");
        this.setSrc(src);
    }
    get fullBaliseA(){
        return "<"+this.balise+' id="'+this.fullID+'"'+ (this.cssclass!=""? ' class="'+this.cssclass+'"' : "")+' src="'+this.src+'">';
    }
    get fullBaliseB(){
        return "";
    }
    createElement(){
        var cpn = super.createElement();
        if(this.src!="" || this.src!= null || this.src!= undefined){
            cpn.element.src = this.src;
        }
        return cpn;
    }
    setSrc(src){
        this.src = src;
        this.element.src = src;
        return this;
    }
}

class PictureComponent extends ImgComponent{
    constructor(id,cssclass,pictureName){
        super(id,cssclass,pictureStore.get(pictureName).link);
    }

    setPicture(pictureName){
        this.setSrc(pictureStore.get(pictureName).link);
    }
}

class EmojiComponent extends PictureComponent{
    constructor(id,cssclass,pictureName){
        super(id,cssclass,pictureName);
        this.addClass("emoji");
    }
}

class LinkComponent extends Component{
    constructor(id, cssclass, href, innerHTML) {
        super(id, "a",cssclass, innerHTML);
        this.setHref( href);
    }

    get fullBaliseA(){
        return "<"+this.balise+' id="'+this.fullID+'"'+ (this.cssclass!=""? ' class="'+this.cssclass+'"' : "")+ (this.href!="" ? ' href="'+this.href+'"'+'>' : ">");
    }

    get fullBaliseB(){
        return "</"+this.balise+">";
    }

    setHref(href){
        this.href = href;
        if(this.href=="" || this.href== null || this.href== undefined) this.element.removeAttribute("href");
        this.element.href =href==""? null :  href;
        return this;
    }
    createElement(){
        var cpn = super.createElement();
        if(this.href!="" && this.href!= null && this.href!= undefined){
            cpn.element.href = this.href;
        }
        return cpn;
    }
    
}
/**
 * @extends Component
 * 
 */
class QuestBarComponent extends Component{
    constructor(id,cssclass){
       super(id, "progress",cssclass, "");
        /** @type {number} */
        this.setValue(0);
        this.setMaxTime(0);
        this.actualtime = 0;
        
    }
   


    createElement(){
        var cpn = super.createElement();
        cpn.element.value = 0;
        cpn.element.max= 1000;
        return this;
    }

    setValue(val){
        this.value = val;
        if(this.element!=null && this.element!= undefined)this.element.value = Math.floor(val); 
        return this;
        
    }
    setMaxTime(milliseconds){

        this.maxTime = milliseconds;

    }

    async setQuest(milliseconds){
        this.value = 0;
        let startTime = new Date().getTime();
        this.actualtime = 0;
        this.setMaxTime(milliseconds);
        while (this.actualtime< this.maxTime){
            await new Promise(r => setTimeout(r, 50));
            let newTime = new Date().getTime();
            this.actualtime = newTime - startTime;
            this.setValue(Math.floor((this.actualtime / this.maxTime)*1000))
            if(this.actualtime >= this.maxTime)
                console.log("Quest Done !")
        }
    }

    


}
/**
 * @extends Component
 * 
 */
class ProgressBarComponent extends Component{
    constructor(id,cssclass){
       super(id, "progress",cssclass, "");
        /** @type {number} */
        this.setValue(0);
        
    }
   


    createElement(){
        var cpn = super.createElement();
        cpn.element.value = 0;
        cpn.element.max= 100;
        return this;
    }

    setValue(val){
        this.value = val;
        if(this.element!=null && this.element!= undefined)this.element.value = Math.floor(val); 
        return this;
        
    }
    

    


}

class QuestDivComponent extends DivComponent
{

    constructor(){
        super("questDiv","questDiv hidden","");
        this.questBar = new QuestBarComponent("questBar","questBar");
        this.addComponent(this.questBar);
    }

    createElement(){
        //var qb = this.questBar.createElement();
        var cpn = super.createElement();
        return this;
        
    }

}

class ButtonComponent extends Component{
    constructor(id,cssclass,onclick,innerHTML){
        super(id,"button",cssclass,innerHTML);
        this.setOnClick(onclick);
    }
}

class FieldComponent extends Component {
    constructor(id, cssclass, placeholder) {
        super(id, "input", cssclass, "");
        this.setPlaceholder(placeholder);
        this.inputHandler = null;
        this.value = "";
    }

    get fullBaliseA() {
        return "<" + this.balise + ' id="' + this.fullID + '"' + (this.cssclass !== "" ? ' class="' + this.cssclass + '"' : "") + (this.placeholder !== "" ? ' placeholder="' + this.placeholder + '"' : "") + ">";
    }

    get fullBaliseB() {
        return "";
    }

    createElement() {
        var cpn = super.createElement();
        cpn.element.type = "text";
        if (this.placeholder !== "") {
            cpn.element.placeholder = this.placeholder;
        }
        cpn.element.addEventListener("input", this.handleInput.bind(this));
        return cpn;
    }

    numericMode = false;

    setPlaceholder(placeholder) {
        this.placeholder = placeholder;
        if (this.element !== null) {
            this.element.placeholder = placeholder;
        }
        return this;
    }
    setValue(value){
        this.value = value;
        if(this.element!=null){
            this.element.value = value;
        }
        return this;
    }

    handleInput(event) {
        if(this.numericMode){
            const inputValue = event.target.value;
            if (/^\d*$/.test(inputValue)) {
                this.lastValidValue = inputValue;
                if (this.inputHandler !== null) {
                    this.inputHandler(inputValue);
                }
            } else {
                event.target.value = this.lastValidValue == undefined ? "": this.lastValidValue;
            }
        }
        else{
            if (this.inputHandler !== null) {
            this.inputHandler(event.target.value);
        }
        }





    }

    setInputHandler(handler) {
        this.inputHandler = handler;
        return this;
    }

    getValue() {
        return this.element.value;
    }
}




function addComponentToElement(component, targetElement) {
    targetElement.appendChild( component.element);
    component.online = true;
}
function addComponent(component, targetComponent) {
    targetComponent.addComponent(component);
}

function forceDeleteComponent(component){
    component.element.delete();
}