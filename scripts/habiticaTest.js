/*var authorID = "8eedf32f-b93b-4033-af1f-92fc1f56a5d0"
var appName = "holeowTest"

function appID() {return authorID +"-"+ appName;}
var userID ="8eedf32f-b93b-4033-af1f-92fc1f56a5d0";
var APITOKEN = ""*/
/*
function HEADERS(){
    return {
        "x-client": appID(),
        "x-api-user": userID,
        "x-api-key": APITOKEN,
        "Content-Type": "application/json"
    }
}
*/
async function t(){
    const url = "https://habitica.com/api/v3/user?userFields=items.food,stats.gp";
    try{
        const response = await fetch(url,{
            method: "GET",
            headers: HEADERS()
        })
        if(!response.ok){
            trialSpan.setText("HTTP error! status: " + response.status);
        }
        const result = await response.json();
        if(result.success == true){
            //trialSpan.setText("Gold: " + result.data.stats.gp);
            var result2 = await update(result.data.stats.gp);
            if(result2.success){
                trialSpan.setText(JSON.stringify(result2));
                console.log("success")
            }
            else{
                trialSpan.setText(JSON.stringify(result2));
                console.log("problem")
            }

        }
        //trialSpan.setText(JSON.stringify(result,null,2));
    }
    catch(error){
        trialSpan.setText(error.message)
    }
}
    async function update(gp){
        const url = "https://habitica.com/api/v3/user";
        try{

            const response = await fetch(url,{
                method: "PUT",
                headers: HEADERS(),
                body: '{"stats.gp":'+(Number(gp)+5)+'}'

                
            })
if(response.ok) {var rs = response.json();return rs;}
else console.log("HTTP Error : status:" + response.status)
        }
        catch(error){
            trialSpan.setText(error.message)
            console.log(error.message);
    }
    
}