//dom
const easterEgg=document.querySelector('[easter-egg]');
const allClearBtn=document.querySelector('[data-clear]');
const currentOperantTextField=document.querySelector('[data-current-operand]');
const previousOperantTextField=document.querySelector('[data-previous-operand]');
const deleteBtn=document.querySelector('[data-delete]');
const operatorBtn=document.querySelectorAll('[data-operate]');
const numberBtn=document.querySelectorAll('[data-number]');
const equalsBtn=document.querySelector('[data-equals]');

//calculator app
class Calculator{
    constructor(currentOperantTextField,previousOperantTextField){
        this.currentOperantTextField=currentOperantTextField;
        this.previousOperantTextField=previousOperantTextField;
        this.clear();
    }
    clear(){
        this.currentOperant='';
        this.previousOperant='';
        this.operation=undefined;
    }
    delete(){
        this.currentOperant=this.currentOperant.toString().slice(0,-1);
    }
    append(number){
        
        if(this.currentOperant.includes('.') && number==='.'){return}
        this.currentOperant=this.currentOperant.toString()+number.toString();
    }
    updateDisplay(){
 this.currentOperantTextField.innerHTML=this.getDisplayNumber(this.currentOperant);
 if (this.operation !=null){
 this.previousOperantTextField.innerHTML=`${this.getDisplayNumber(this.previousOperant)} ${this.operation}`;}
 else{this.previousOperantTextField.innerHTML="";} 
    }
    chooseOperation(operation){
        if(this.currentOperant===''){return}
        if(this.previousOperant!==''){this.compute();}
        this.operation=operation;
        this.previousOperant=this.currentOperant;
        this.currentOperant='';
    }
     compute(){
        let computation;
        const prev=parseFloat(this.previousOperant);
        const current=parseFloat(this.currentOperant);
        if(isNaN(prev)||isNaN(current)){return}
        switch(this.operation){
            case '÷':if(current==0){alert('cannot divide by 0');
             return}
            else{computation=prev/current;}
            break;
            case '×':computation=prev*current;
            break;
            case '−':computation=prev-current;
            break;
            case '+':computation=prev+current;
            break;
            default: return;
        }
        this.currentOperant=computation;
        this.operation=undefined;
        this.previousOperant='';
     }
     getDisplayNumber(number){
        const StringNumber=number.toString();
        const integerDigits=parseFloat(StringNumber.split('.')[0]);//return all the integers before the .
        const decimalDigits=StringNumber.split('.')[1];//return all after .
        let displayInteger;
        if(isNaN(integerDigits)){displayInteger='';}
        else{ displayInteger = integerDigits.toLocaleString('en',{maximumFractionDigits:0}); }
        if (decimalDigits !==undefined){return `${displayInteger}.${decimalDigits}`;}
        else{return displayInteger;}
     }



}

const calculator=new Calculator(currentOperantTextField,previousOperantTextField);
// when pressing any number
numberBtn.forEach(button=>{
    button.addEventListener('click',()=>{
        
        calculator.append(button.value);
        
        calculator.updateDisplay();
    });
});
//when pressing any operator ÷ × − +
operatorBtn.forEach((button)=>{
    button.addEventListener('click',()=>{
        
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
});
//when pressing AC
allClearBtn.addEventListener('click',()=>{
        
    calculator.clear();
    calculator.updateDisplay();
});
//when pressing DEL
deleteBtn.addEventListener('click',()=>{
        
    calculator.delete();
    calculator.updateDisplay();
});
//when pressing =
equalsBtn.addEventListener('click',()=>{
        
    calculator.compute();
    calculator.updateDisplay();
});
//easter egg btn action
easterEgg.addEventListener("click",()=>{
if (confirm("Check out my portfolio?")) {
  window.location.href = "./portreplacement.html";
}

});
//adding key press for desktop
document.addEventListener("keydown",(event)=>{
    if( event.key >=0 && event.key <=9){
        console.log("number");
        calculator.append(event.key);
        calculator.updateDisplay();
    }
    if (event.key === "Enter"){
        calculator.compute();
        calculator.updateDisplay();}
    
    if(event.key ==="+"||event.key ==="-"||event.key ==="*"||event.key ==="/"){
        calculator.chooseOperation(event.key);
        calculator.updateDisplay();
    }
    if (event.key==="Escape"){
        calculator.clear();
        calculator.updateDisplay();
    }
    if(event.key === "Backspace"){
        calculator.delete();
    calculator.updateDisplay();
    }
});
