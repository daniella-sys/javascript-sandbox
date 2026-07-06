//Успадкування
//батьківський клас
class Character{
  constructor(nickname){
    this.nickname = nickname;
  }
  greet(){
    console.log('Гравець' + this.nickname + 'онлайн.');
  }
}
//дочірній клас який успадковує все від батьківського класу
class Bot extends Character{
  //конструктор не треба писати підтягнеться з батьківського
  action(){
    console.log(this.nickname + 'патрулює територію.');
  }
}
const character = new Bot('NPC_Bob'); //створюємо від дочірнього класу
character.greet(); //працює взято в батьківсього класу
character.action();

class Transport{
  constructor(brand){
    this.brand = brand;
  }
  start(){
    console.log(this.brand + "заводить двигун");
  }
}
class Litak extends Transport{
  constructor(brand, maxVisota){
    //super() викликає конструктор батька передає щось до батьківського класу
    super(brand); //brandпараметр батьківського конструктора 
    this.maxVisota = maxVisota;
  }
  polit(){
    console.log(this.brand + "злітає на висоту" + this.maxVisota + "метрів!");
  }
}
const transport = new Litak("Мрія", 110000);
transport.start();
transport.polit();

class Room{
  constructor(roomNumber){
    this.roomNumber = roomNumber;
  }
  status(){
    console.log("Кімната №" + this.roomNumber + "готова до огляду.");
  }
}
class SeifRoom extends Room{
  #pin
  constructor(roomNumber, owner, secretpin){
    super(roomNumber);
    this.owner = owner;
    this.#pin = secretpin;
  }
  openSeif(vvedenyPin){
    if(vvedenyPin === this.#pin){
      console.log("Сейф відкрито! Власник:" + this.owner + "Кімната №" + this.roomNumber);
    }else{
      console.log("Помилка: невірний ПІН-код!");
    }
  }
}
const seifroom = new SeifRoom(12, "Max", 3989);
seifroom.status();
seifroom.openSeif();

class LabSector{
  constructor(sectorName){
    this.sectorName = sectorName;
  }
  info(){
    console.log("Лабораторія:" + this.sectorName);
  }
}
class BiometricDoor extends LabSector{
  #biometricKey //'секретний ключ '
  constructor(sectorName, scientist, secretKey){
    super(sectorName);
    this.scientist = scientist;
    this.#biometricKey = secretKey;
  }
  scan(vvedenyKey){
    if(vvedenyKey === this.#biometricKey ){
      console.log('Доступ дозволено! Вітаємо, доктор' + this.scientist + '. Двері у' + this.sectorName + 'відчинено.');
    }else{
      console.log("Тривога! Невідомий відбиток. Доступ у" + this.sectorName +"заблоковано!");
    }
  }
}
const door1 = new BiometricDoor("Room-1", "Olena", 17979);
const door2 = new BiometricDoor("Room-2", "Max", 38780);
door1.info();
door2.info();
door1.scan(17979);
door2.scan(4567);
