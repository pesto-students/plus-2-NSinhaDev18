    let str=``;
    let word=[];
    word.push("Pesto Curriculum");
    word.push("Orange fruit");
    word.push("Apple");
    let map1=new Map();
    let a=0;
    function vowelCount(str){
        const regexp=/[AEIOUaeiou]/gi;
        map1.set(`${a=a+1}`,`${str.match(regexp).length}`);
        return map1;
    }
    word.forEach(word=>{
        vowelCount(word);
    });
    console.log(map1);
    

    



