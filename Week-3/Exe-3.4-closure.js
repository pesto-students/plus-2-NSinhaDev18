function createStack() 
{
    return{
        items:[],
        push(item) 
        {
            this.items.push(item);
        },
        pop() {
            return this.items.pop();
            }
};
}
//const st= createStack();

const stack=createStack();
const st=stack;
stack.push(10);
stack.push(5);
stack.pop();// => 5
stack.items;// => [10]
console.log(st.items);
console.log(stack.items); // [10,100,1000];// Encapsulationbroken!functioncreateStack() {// Write your code here...}conststack=createStack();stack.push(10);stack.push(5);stack.pop();// => 5stack.items;// => undefined
