function prepareDough(size){
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("Тісто для " + size + " піци розкатано 🍕");
      }, 1000);
    });
}
function additional_order(drink){
   return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("Підготовлення вашого додаткового замовленння...буде відправлено разом з основним замовленням!");
      }, 2000);
   });
}

function bakePizza(doughStatus){
    return new Promise((resolve, reject) => {
       setTimeout(() => {
          resolve("-> Піца успішно спечена в печі! ");
       }, 1200);
    });
}

function deliverPizza(readyPizza){
    return new Promise((resolve, reject) => {
     setTimeout(() => {
       resolve("-> Кур'єр доставив замовлення! Смачного!");
     }, 1100);
    });
}

//вивід у звичайних функціях робити через resolve/reject
async function orderPizzaProcess(){
    console.log("Замовлення прийнято! Починаємо готувати...");
    //вивід 1 процесу приготування піци
    let step1 = await prepareDough("big");
    console.log(step1);
    //вивід 2 процесу приготування піци
    let step2 = await bakePizza(step1);
    console.log(step2);
    let step3 = await additional_order('coca-cola');
    console.log(step3);
    //завершення
    let finalResult = await deliverPizza(step2 + '+' + step3);
    console.log(finalResult);
}
//виклик функції
orderPizzaProcess();
