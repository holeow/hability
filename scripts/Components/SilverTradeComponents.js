class SilverTradeComponent extends Component {
    constructor(id,cssclass) {
        super(id,"div",cssclass, "",false);
         /**@type {SpanComponent}*/this.userIDSpan = null;
        /**@type {FieldComponent}*/this.UserIDField = null;
         /**@type {SpanComponent}*/this.userAPITOKENSpan = null;
        /**@type {FieldComponent}*/this.userAPITOKENField = null;
        /**@type {SpanComponent}*/this.descriptionSpan = null;
        /**@type {FieldComponent}*/this.habiticaGoldField = null;
        /**@type {ButtonComponent}*/this.payButton = null;
        /**@type {SpanComponent}*/this.statusSpan = null;
        this.createElement();
    }

    createElement(){
       const cpn = super.createElement();
        this.userIDSpan = new SpanComponent("uidspan","uidspan","Your Habitica User ID:");
        this.UserIDField = new FieldComponent("uidfield","uidField","EXAMPLE:8eedf32f-b93b-4033-af1f-9xxx-xxxx ");

        let storeduid = localStorageManager.loadData("useruid");
        if(storeduid)this.UserIDField.setValue(storeduid);
        this.userAPITOKENSpan = new SpanComponent("apitspan","apitspan","Your Habitica API Token:");
        this.userAPITOKENField = new FieldComponent("apitfield","apitfield","DIFFERENT FROM USER ID");
        let storedapit = localStorageManager.loadData("userapit");
        if(storedapit) this.userAPITOKENField.setValue(storedapit);
        cpn.addComponent(this.userIDSpan);
        cpn.addComponent(this.UserIDField);
                cpn.addComponent(new BrComponent());
        cpn.addComponent(this.userAPITOKENSpan);
        cpn.addComponent(this.userAPITOKENField);
                cpn.addComponent(new BrComponent());






       this.descriptionSpan = new SpanComponent("silverTextDescriptionSpan","silverTextDescriptionSpan","").setText("Amount of Habitica gold coins to spend:");
       cpn.addComponent(this.descriptionSpan);
       this.habiticaGoldField = new FieldComponent("silverTradeField","silverTradeField","Gold");
       this.habiticaGoldField.numericMode = true;
       cpn.addComponent(this.habiticaGoldField);
       this.payButton = new ButtonComponent("silverTradeButton","silverTradeButton",()=> this.pay(cpn),"Pay");
       cpn.addComponent(this.payButton);
       this.statusSpan = new SpanComponent("silverTradeStatus","silverTradeStatus","");
       this.statusSpan.addComponent(new SpanComponent("silverTradeStatusCurrentStatus","","").setText("Waiting for input..."));
       cpn.addComponent(this.statusSpan);
    }

/**
 * 
 * @param {SilverTradeComponent} cpn 
 */
    async pay(cpn){
        if(cpn.UserIDField.getValue()!= undefined && cpn.UserIDField.getValue()!= "" && cpn.UserIDField.getValue()!= null)
        {
            if(cpn.userAPITOKENField.getValue()!= undefined && cpn.userAPITOKENField.getValue()!= "" && cpn.userAPITOKENField.getValue()!= null)
            {
                if(cpn.habiticaGoldField.getValue()!= undefined && cpn.habiticaGoldField.getValue()!= "" && cpn.habiticaGoldField.getValue()!= null)
                {
                    let amount = parseInt(cpn.habiticaGoldField.getValue());
                    if(!isNaN(amount) && amount>0)
                    {
                        cpn.payButton.setEnabled(false);
                        cpn.statusSpan.clearComponents();
                        cpn.statusSpan.addComponent(new SpanComponent("silverTradeStatusCurrentStatus","","").setText("Asking current Gold from Habitica..."))
                        let result = await getAmountOfGoldInHabitica(cpn);
                        if(result.status == "error"){
                            console.log("Error in asking habitica gold : " + result.content);
                            cpn.statusSpan.clearComponents();
                            cpn.statusSpan.addComponent(new SpanComponent("silverTradeStatusCurrentStatus","txtcolorred","").setText("Error checking gold, check logs!"));
                            cpn.payButton.setEnabled(true);
                        }
                        else {
                            let mny = result.money;
                            if(mny >= amount){
                                //PROCEED
                                cpn.statusSpan.clearComponents();
                                cpn.statusSpan.addComponent(new SpanComponent("silverTradeStatusCurrentStatus","","").setText("Paying the Gold in Habitica..."))
                                let result2 = await updateGoldAndProceed(cpn,parseInt(mny-amount));
                                if(result2.status == "error"){
                                    console.log("Error in paying habitica gold : " + result2.content);
                                cpn.statusSpan.clearComponents();
                                cpn.statusSpan.addComponent(new SpanComponent("silverTradeStatusCurrentStatus","txtcolorred","").setText("Error paying gold, check logs!"));
                                cpn.payButton.setEnabled(true);
                                }
                                else{
                                    habilityData.addSilver(amount);
                                    cpn.statusSpan.clearComponents();
                                    cpn.statusSpan.addComponent(new SpanComponent("silverTradeStatusCurrentStatus","txtcolorgreen","").setText("Bought " + amount + " silver !"));
                                    cpn.payButton.setEnabled(true);
                                }

                            }
                            else{
                                cpn.statusSpan.clearComponents();
                                cpn.statusSpan.addComponent(new SpanComponent("silverTradeStatusCurrentStatus","txtcolorred","").setText("Error: Not enough GOLD"));
                                cpn.payButton.setEnabled(true);
                            }
                        }


                    }
                }
            }
        }
    }




}


var authorID = "8eedf32f-b93b-4033-af1f-92fc1f56a5d0"
var appName = "holeowTest"

function appID() {return authorID +"-"+ appName;}
/**
 * 
 * @param {SilverTradeComponent} component 
 * @returns 
 */
function HEADERS(component){
    return {
        "x-client": appID(),
        "x-api-user": component.UserIDField.getValue(),
        "x-api-key": component.userAPITOKENField.getValue(),
        "Content-Type": "application/json"
    }
}


/**
 * 
 * @param {SilverTradeComponent} component 
 * @returns 
 */
async function getAmountOfGoldInHabitica(component){
    const url = "https://habitica.com/api/v3/user?userFields=items.food,stats.gp";
    try{
        const response = await fetch(url,{
            method: "GET",
            headers: HEADERS(component)
        })
        if(!response.ok){

            return {status : "error", money : -1, content: "HTTP error status:" + response.status}
        }
        const result = await response.json();
        if(result.success == true){
            localStorageManager.saveData("useruid", component.UserIDField.getValue());
            localStorageManager.saveData("userapit",component.userAPITOKENField.getValue());
            return {status : "ok", money : Number(result.data.stats.gp)}
        }
        else return {status : "error", money: -1, content:JSON.stringify(result,null,2)};
        //trialSpan.setText(JSON.stringify(result,null,2));
    }
    catch(error){
        return {status : "error", money: -1, content: error.message};
    }
}

async function updateGoldAndProceed(component,gpafter){
    const url = "https://habitica.com/api/v3/user";
        try{

            const response = await fetch(url,{
                method: "PUT",
                headers: HEADERS(component),
                body: '{"stats.gp":'+(Number(gpafter))+'}'

                
            })
if(response.ok) 
    {
        var rs = await response.json();
        if(rs.success == true){
            return {status: "ok"};
        }
        else {
            return {status: "error", content : JSON.stringify(rs)}
        }
    }
else return {status : "error", content: "HTTP error status:" + response.status}
        }
        catch(error){
            return {status : "error", content: error.message};
    }
}