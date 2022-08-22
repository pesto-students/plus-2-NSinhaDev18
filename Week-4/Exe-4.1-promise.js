function getNumber(){
    return Math.random();
}

function divCheck(){
    return new Promise(function(resolve,reject){
        setTimeout(()=>{
            if(getNumber %5 ===0){
                reject();
            } 
            else{
                resolve();
            }
        },1000);
    });
}
divCheck().then(()=>{console.log("Problem resolved")})
.catch(()=>{console.log("rejected")})

    

//p.then(value=>{console.log(value)});
//p.catch(value=>{console.error(error);})
