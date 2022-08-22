function createIncrement() 
{
    let count=0;
    
    function increment() 
    {
    count++;   
    }
    
     let message=`Count is ${count}`;
    
    function log() 
    {
        console.log(message);
    }

return [increment,log];
}
const [increment,log] = createIncrement();
increment();
increment();
increment();
log();// What is logged? 
//Answer is: Count is 0, because log() function has its own lexical environment,
// still pointing to the count variable with value 0.
//the increment() function called increases the value of count variable by 1 three times but in its own
//lexical environment which is not acessessed by the log() fuction as the message variable is declared outside
//the scope/block of increment().
