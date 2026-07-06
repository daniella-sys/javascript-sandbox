//Система логування для Смарт-Будинку
import fs from 'fs/promises';
//батьківський клас 
class Device{
  constructor(deviceName){
    this.deviceName = deviceName;
  }
  turnOn(){
    return "Пристрій" + this.deviceName + "увімкнено";
  }
}
//дочірній клас 
class SecureDevice extends Device{
  #pinCode;
  constructor(deviceName, secretPin){
    super(deviceName);
    this.#pinCode = secretPin;
  }
  async activate(vvedenyPin){
    try{
      if(vvedenyPin === this.#pinCode){
        const steep1 = this.turnOn();
        const step2 = await fs.appendFile('home-logs.txt', steep1 + '\n');
        console.log(step2);
      }else{
        console.log("ПОМИЛКА: Спроба зламати пристрій" + this.deviceName +"!");
      }
    }catch(error){
      const step3 = error.message;
      const step4 = await fs.appendFile('home-logs.txt', step3);
      console.log(step4);
    }
  }
}
async function printReport(){
  try{
    const step5 = await fs.readFile('home-logs.txt', 'utf-8');
    console.log(step5);
  }catch(error){
    console.log(error);
  }
}
const device = new SecureDevice("Камера Охорони", 1234);
await device.activate(7778);
await device.activate(1234);
printReport();
