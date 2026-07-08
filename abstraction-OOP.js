//4 OOP
class Appliance{
  constructor(brand){
    this.brand = brand;
  }
  turnOn(){
    throw new Error("Метод turnOn() має бути реалізований у дочірньому класі!");
  }
}
class WashingMachine extends Appliance{
  constructor(brand){
    super(brand);
  }
  turnOn(){
    return this.brand + "Набираю воду та запускаю барабан.";
  }
}
class Microwave extends Appliance{
  constructor(brand){
    super(brand);
  }
  turnOn(){
     return this.brand + "Вмикаю магнетрон, тарілка починає крутитися.";
  }
}
function testAppliance(applianceInstance){
  try{
    const result = applianceInstance.turnOn();
    console.log(result);
  }catch(error){
    console.log("Причина:" + error);
  }
}
const washingmachine = new WashingMachine("Samsung");
const microwave = new Microwave("Samsung");
testAppliance(washingmachine);
testAppliance(microwave);


class Vehicle{
  constructor(type){
    this.type = type;
  }
  move(){
    throw new Error("Метод move() має бути реалізований у дочірньому класі!");
  }
}
class Car extends Vehicle{
  constructor(type){
    super(type);
  }
  move(){
    return this.type + "автомобіль їде по дорозі на чотирьох колесах.";
  }
}
class Plane extends Vehicle{
  constructor(type){
      super(type);
}
    move(){
      return this.type + "літак піднімається в повітря та летить.";
    }
}
function startVehicle(vehicleInstance){
  try{
    const dbjk = vehicleInstance.move();
    console.log(dbjk);
  }catch(error){
    console.log("Причина:" + error);
  }
}
const car = new Car("гоночний");
const plane =  new Plane("пасажирський");
startVehicle(car);
startVehicle(plane);
const jds = new Vehicle("abstract");
startVehicle(jds);
