let some=document.getElementById("submission")
let expense=document.querySelector(".expenses")
let income=document.querySelector(".income")



let ListExpenses=[]
let ListIncomes=[]

const localStorageTransExp=JSON.parse(localStorage.getItem("Expenses"));
const localStorageTransInc=JSON.parse(localStorage.getItem("Incomes"));

if(localStorageTransExp && localStorageTransInc ){
    ListExpenses=localStorageTransExp;
    ListIncomes=localStorageTransInc;
    displayTransactions();
}
else if(localStorageTransExp ){  
    ListExpenses=localStorageTransExp;
   
    displayTransactions();
}else if(localStorageTransInc ){
    ListIncomes=localStorageTransInc;
   
    displayTransactions();
}

function sum(numbers){
    let total=0;
   
    for (let i = 0; i < numbers.length; i++) {
        total += numbers[i].amount;
    }
      return total;
}




some.addEventListener('click',()=>{
    let amt=document.getElementById("amount").value
    let info=document.getElementById("info").value

    
   
    if(amt<0){

    const expense={
        description:info,
        amount:Number(amt)
    }
       ListExpenses.push(expense)
       localStorage.setItem("Expenses",JSON.stringify(ListExpenses))
       displayTransactions()
    
     }else if(amt>0){

        const income={
            description:info,
            amount:Number(amt)
        }

        ListIncomes.push(income)
        localStorage.setItem("Incomes",JSON.stringify( ListIncomes))
        displayTransactions()
        document.querySelector('#info').value=""
        document.querySelector('#amount').value=""
     }

})


document.getElementById('deleteAll').addEventListener('click',()=>{
    localStorage.removeItem("Incomes");
    localStorage.removeItem("Expenses");
    ListExpenses=[]
    ListIncomes=[]

    displayTransactions();

})




function displayTransactions() {
    let expensesHTML = "";
    let incomeHTML = "";

    expense.innerHTML = loop(ListExpenses);
    income.innerHTML = loop(ListIncomes);

   document.querySelector("#totalExpense").innerHTML=`<p>your total expense :  ${sum(ListExpenses)} </p>`;
   document.querySelector("#totalIncome").innerHTML=`<p>your total income :  ${sum(ListIncomes)} </p>`;
    document.querySelector(".savings").innerText = (sum(ListExpenses)+sum(ListIncomes));
}

function loop(type){
    let html=""
    for (let i = 0; i < type.length; i++) {
        html += "<p>"+type[i].description + " " +type[i].amount +"</p>";
    }
    return html;

}



expense.addEventListener('click',removeItemExp)

income.addEventListener('click',removeItemInc)


function removeItemExp(event){
    if(event.target && event.target.nodeName ==='P'){
        let element = event.target;
        
        const index=Array.from(element.parentNode.children).indexOf(element);

        ListExpenses.splice(index,1)
        localStorage.setItem("Expenses",JSON.stringify(ListExpenses))
 
        displayTransactions();

         
    }
}

function removeItemInc(event){
    if(event.target && event.target.nodeName ==='P'){
        let element = event.target;
       
        const index=Array.from(element.parentNode.children).indexOf(element);

        ListIncomes.splice(index,1)
        localStorage.setItem("Incomes",JSON.stringify(ListIncomes))
 
        displayTransactions();

         
    }
}



// i am making todo list 

