//3  OOP
//батьківський клас
class Employee{
  constructor(name){
    this.name = name;
  }
  calculatePay(){
    return 0;
  }
}
//дочірній клас
class FullTimeEmployee extends Employee{
  constructor(name, monthlySalary){
    super(name);
    this.monthlySalary = monthlySalary;
  }
  calculatePay(){
    return this.monthlySalary;
  }
}
class HourlyEmployee extends Employee{
  constructor(name, hoursWorked, hourlyRate){
    super(name);
    this.hourlyRate = hourlyRate;
    this.hoursWorked = hoursWorked;
  }
  calculatePay(){
    return this.hoursWorked * this.hourlyRate;
  }
}
function printSalary(employeeInstance){
  const step = employeeInstance.calculatePay();
  console.log("Працівник" + employeeInstance.name + "заробив" + step + "грн");
}
const ff = new FullTimeEmployee("Max", 230000);
const ff3 = new HourlyEmployee("Olena", 7, 37000);
//виклик звичайної функціїї
printSalary(ff);
printSalary(ff3);


class Player{
  constructor(model){
    this.model = model;
  }
  playMusic(){
    return "Пристрій" + this.model + "готовий до роботи";
  }
}
class PhonePlayer extends Player{
  constructor(model){
    super(model);
  }
  playMusic(){
    return "Телефон" + this.model + "грає трек зі Spotify";
  }
}
class VinylPlayer extends Player{
  constructor(model){
    super(model);
  }
  playMusic(){
    return "Вініловий плеєр" + this.model + "крутить платівку з легким потріскуванням";
  }
}
function startAudio(playerInstance){  //приймає об'єкт плеєра
   const trackInfo = playerInstance.playMusic();
   console.log(trackInfo);
}  
const phone = new PhonePlayer("Iphone");
const vinyl =  new VinylPlayer('Audio-Technica');
startAudio(phone);
startAudio(vinyl);

//батьківський
class Hero{
  constructor(name){
    this.name = name;
  }
  superAttack(){
    return "Герой" + this.name  + "робить звичайний удар";
  }
}
class Magician extends Hero{
  constructor(name){
    super(name);
  }
  superAttack(){
    return "Маг" + this.name  + "викликає вогняний дощ!";
  }
}
class Robot extends Hero{
  constructor(name){
    super(name);
  }
  superAttack(){
     return "Робот" + this.name + "стріляє лазером з очей!";
  }
}
function activateUltimate(heroInstance){
  const hitResult = heroInstance.superAttack();
  console.log(hitResult);
}
const mag = new Magician("Max");
const robot = new Robot("Max");
activateUltimate(mag);
activateUltimate(robot);
