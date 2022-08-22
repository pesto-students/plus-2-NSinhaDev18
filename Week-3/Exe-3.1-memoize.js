function multiply(...args){
    let product=1;
    for(const el of args){
        product=product * el;
    }
    return product;
}
function memoize(fn){
    const cache=new Map();
    return function(...args){
        if(cache.has(args)){
            return cache.get(args);
        }
    cache.set(args, fn(...args))
    return cache.get(args);
    
    }
}
function time(fn){
    console.time();
    console.log(fn());
    console.timeEnd();
}


const multiplyM=memoize(multiply);
time(()=>multiplyM(2,2));
time(()=>multiplyM(999,999,999,999,999));
time(()=>multiplyM(999,999,999,999,999));
time(()=>multiplyM(999,999,999,999,999));
