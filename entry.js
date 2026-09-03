const express = require('express'); //підключення express
const projectRoutes = require('./routes/project.routes.js');
const app = express();
const PORT = 3000;
app.use(express.json());
app.use('/api/projects', projectRoutes);

// запуск сервера
app.listen(PORT, () => {  
  console.log("Сервер готовий до роботи! Відкрийте посилання: http://localhost:" + PORT);
});
