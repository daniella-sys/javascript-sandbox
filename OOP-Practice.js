//ООП
class Model3D{
  constructor(name, polyCount, format){
    this.name = name;
    this.polyCount = polyCount;
    this.format = format;
  }
    getDetails(){
      console.log("Модель:" + this.name + ", формат:" + this.format + ", полігонів:" + this.polyCount);
    }
}
//створюю справжні об'єкти
const model1 = new Model3D("Robot_Hand", 4500, "fbx");
const model2 = new Model3D("Spaceship", 12000, "blend");
//викликаємо метод
model1.getDetails();
model2.getDetails();

class MeshOptimizer{
  constructor(modelName, polygons){
    this.modelName = modelName;
    this.polygons = polygons;
  }
    decimate(factor){
      this.polygons *= factor;
      console.log("Модель"  + this.modelName+ "оптимізована. Нова кількість полігонів:" + this.polygons);
    }
}
const model = new MeshOptimizer("SciFi_Helmet", 8000);
model.decimate(0.5);
model.decimate(0.75);

class GameRoom{
  constructor(roomName, maxPlayers){
    this.roomName = roomName;
    this.maxPlayers = maxPlayers;
    this.players = [];
  }
    addPlayer(nickname){
      if(this.players.length < this.maxPlayers){
        this.players.push(nickname);
        console.log("Гравець" + nickname + "зайшов у кімнату" + this.roomName);
      }else{
        console.log("Неможливо додати" + nickname + "Кімната" + this.roomName + "переповнена!");
      }
    }
}
const room = new GameRoom("Pro_Players", 2);
room.addPlayer("Cyber_Cat");
room.addPlayer("Bhk_9");
room.addPlayer("Spam_Bot");

class SceneInventory{
  constructor(sceneName){
    this.assets = []; //назви 3D-об'єктів
    this.sceneName = sceneName;
  }
   addAsset(assetName){
    this.assets.push(assetName);
    console.log("Об'єкт" + assetName + "додано до сцени " + this.sceneName);
   }
   checkAsset(assetName){
    if(this.assets.includes(assetName)){
      console.log('Об`єкт' + assetName + 'присутній на сцені.');
    }else{
      console.log("Об'єкт" + assetName + "відсутній на сцені!");
    }
   }
}
const scene1 = new SceneInventory("Cyberpunk_City");
scene1.addAsset("Neon_Sign");
scene1.addAsset('Flying_Car');
scene1.checkAsset("Main_Character");
scene1.checkAsset("Neon_Sign");


class Sklad{
  constructor(misto){
    this.misto = misto;
    this.korobky = [];
  }
  novyZavoz(nazvaKorobky){
    this.korobky.push(nazvaKorobky);
    console.log("На складі у" + this.misto + "привезли коробку " + nazvaKorobky);
  }
  vydatyKorobku(nazvaKorobky){
    if(this.korobky.includes(nazvaKorobky)){
      this.korobky = this.korobky.filter(item => item !== nazvaKorobky);
      console.log("Коробка" + nazvaKorobky + "видана зі складу");
    }else{
      console.log("Помилка: коробки" + nazvaKorobky + "немає на складі в місті" + this.misto + "!");
    }
  }
}
const sklad = new Sklad("Київ");
sklad.novyZavoz("Лего");
sklad.novyZavoz("Пазли");
sklad.vydatyKorobku('Лего');
sklad.vydatyKorobku("Ляльки");


class Garazh{
  constructor(vlasnyk){
    this.vlasnyk = vlasnyk;
    this.mashyny = [];
  }
  partyMashynu(nazvaMashyny){
    this.mashyny.push(nazvaMashyny);
    console.log("У гараж власника" + this.vlasnyk + "припарковано:" + nazvaMashyny);
  }
  vyїhaty(nazvaMashyny){
    if(this.mashyny.includes(nazvaMashyny)){
      this.mashyny = this.mashyny.filter((item) => item !== nazvaMashyny);
      console.log("Машина" + nazvaMashyny + "виїхала з гаража.");
    }else{
      console.log("Помилка: машини" + nazvaMashyny  + "немає в гаражі!");
    }
  }
}
const garazh = new Garazh("Max");
garazh.partyMashynu("Audi");
garazh.partyMashynu("BMW");
garazh.vyїhaty("Tesla");

class Pleier{
  constructor(nazvaPleylista){
    this.pisni = [];
    this.nazvaPleylista = nazvaPleylista;
  }
  dodatyPisniu(nazvaPisni){
    this.pisni.push(nazvaPisni);
    console.log("У плейлист" + this.nazvaPleylista + "додано пісню:" + nazvaPisni);
  }
  vydalytyPisniu(nazvaPisni){
    if(this.pisni.includes(nazvaPisni)){
      this.pisni = this.pisni.filter((item) => item !== nazvaPisni);
      console.log("Пісня" + nazvaPisni + "видалена з плейлиста.");
  }else{
    console.log("Помилка: пісні" + nazvaPisni + "немає в плейлісті!");
  }
}
}
const pleier = new Pleier("Рок-хіти");
pleier.dodatyPisniu("Song_1");
pleier.dodatyPisniu("Song_2");
pleier.vydalytyPisniu("Pop_Song");

class ChatBuf{
  constructor(nazvaChatu){
    this.povidomlennia = [];
    this.nazvaChatu = nazvaChatu;
  }
  nadislaty(tekst){
    this.povidomlennia.push(tekst);
    console.log("У чат" + this.nazvaChatu + "надіслано:" + tekst);
  }
  vydalyty(tekst){
    if(this.povidomlennia.includes(tekst)){
      this.povidomlennia = this.povidomlennia.filter((item) => item !== tekst);
      console.log("Повідомлення" + tekst + "видалено.");
    }else{
      console.log("Помилка: тексту" + tekst + "не знайдено в чаті" + this.nazvaChatu + "!");
    }
  }
}
const chat = new ChatBuf("Флудилка");
chat.nadislaty("Привіт усім");
chat.nadislaty("Як справи?");
chat.vydalyty("Привіт усім");
chat.vydalyty("Бувай");
