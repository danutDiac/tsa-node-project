let { findItemByUserId, readFile } = require("../helpers/helpers")

let countDays=(user)=>{
    let countDays=21
        for (let i in user){
            countDays-=user[i].daysOff.length
        }
    return String(countDays)
}

let getDaysOff=(req,res)=>{
    readFile("db/daysOff.json")
    .then(data=>{
        let daysOff=JSON.parse(data);
        let id=req.params.id;
        let user=findItemByUserId(daysOff,Number(id));
    
        if(user.length!=0){
            let remainingDays=countDays(user)
            res.send(remainingDays)
        }
        else{
            res.status(404).json({message:"User not found"})
        }

    })
    .catch(error=>{
        res.status(500);
        res.json({
            serverErrorMessage: "the error was logged and we’ll be checking it shortly"
        })
    })
}

module.exports={
    getDaysOff,
    countDays
}