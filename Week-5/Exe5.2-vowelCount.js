    let str=``;
    let map1=new Map();
    let a=0;
    function vowelCount(str){
        const regexp=/[AEIOUaeiou]/gi;
        map1.set(`${a=a+1}`,`${str.match(regexp).length}`);
        return map1;
    }
    console.log(vowelCount("Pesto Curriculum"));
    console.log(vowelCount("Curriculum"));
    console.log(vowelCount("Javascript is wonderful"));
    console.log(vowelCount("Learn React"));
    

    



