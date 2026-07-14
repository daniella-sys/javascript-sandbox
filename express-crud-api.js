// імпорт бібліoтеки
import express from 'express';
const PORT = 2000;
const app = express();
app.use(express.json()); //виконується для всіх запитів

//створення масиву для зберігання даних
let repositories = [
    { id: 1, title: "javascript-learning", description: "Мої конспекти та практика по JS", language: "JavaScript" },
    { id: 2, title: "blender-3d-models", description: "3D сітки та текстури", language: "Blender" },
    { id: 3, title: "nmt-physics-notes", description: "Формули для підготовки", language: "Markdown" }
];
//HTTP запит GET
app.get('/repos', (req, res) => {
    return res.json(repositories);
});
//HTTP запит POST
app.post('/repos', (req, res) => {
   if(!req.body.title){
    return res.status(400).json({"error": "Назва репозиторію обов'язкова!"}); //повертає стаитус та помилку якщо користувач не ввів назву
   }else{
    let newrepositories = {
       id: repositories.length + 1,
       title: req.body.title,
       description: req.body.description,
       language: req.body.language
    };
    repositories.push(newrepositories);
    res.status(201).json(newrepositories);
   }
});
//HTTP запит DELETE
app.delete('/repos/:id', (req, res) => {
    const Id = Number(req.params.id); //беремо з запиту користувача і перетворюємо на число бо req.body.id передається у текстовому вигляді
    //шукаємо Id
    const foundid = repositories.findIndex(item => item.id === Id);
    if(foundid === -1){
      return res.status(404).json({"error": "Not Found"});
    }else{
      repositories.splice(foundid, 1); //видалення елементу 
      res.status(201).json({"message": "Репозиторій видалено!"});
    }
 });
 //HTTP запит PUT
 app.put('/repos/:id', (req, res) => {
  //Знайти проєкт за id з адреси.
  const find_id = Number(req.params.id);
  //шукаємо сам об'єкт, а не індекс
  const find_object = repositories.find(item => item.id === find_id);
  //Якщо проєкт є: оновити його поля
  if(!find_object){
   res.status(404).json({"error": "Not Found"});
  }else{
    find_object.title = req.body.title || find_object.title;
    find_object.description = req.body.description !== undefined ? req.body.description : find_object.description;
    find_object.language = req.body.language !== undefined ? req.body.language : find_object.language;
    res.status(200).json(find_object);
 }
 });
 //для розробника
app.listen(PORT, () => {
  console.log("===Сервер успішно запущено! Введіть посилання в браузер===" + "http://localhost:" + PORT);
});
//GET та POST — на http://localhost:2000/repos
//DELETE та PUT — на http://localhost:2000/repos/1 (або інше ID наприкінці).
