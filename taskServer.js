// імпорт бібліотек модулів 
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');

// підключення БД та Express
const { PrismaClient } = require('@prisma/client');
const app = express();
const prisma = new PrismaClient();

app.use(express.json());

const PORT = 3000;
const SECRET_KEY = 'ygjdghehgy7t2637eyudghjiwsndn983877e78uhdjn';


// МІДЛВАР АВТОРИЗАЦІЇ
const authMiddleware = (req, res, next) => {
  const auth = req.headers.authorization; // витягує токен із заголовка
  if (!auth || !auth.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // якщо все добре — обрізаємо і робимо чистий токен
  const token = auth.split(' ')[1];
  try {
    const decoded = jwt.verify(token, SECRET_KEY); // перевірка токена
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
};


// МОДУЛЬ АВТЕНТИФІКАЦІЇ ТА ПРОФІЛЮ
// Реєстрація користувача
app.post('/api/auth/register', async (req, res) => {
  const { email, password, name } = req.body; // витягуємо дані
  try {
    if (!email || !password || !name) {
      return res.status(400).json({ error: "Необхідно заповнити усі поля!" });
    }

    // якщо дані є — хешуємо пароль і створюємо користувача 
    const hashedpassword = await bcrypt.hash(password, 12);
    const newUser = await prisma.user.create({
      data: {
        email: email,
        name: name,
        password: hashedpassword
      },
      select: {
        id: true,
        name: true,
        email: true
      }
    });

    res.status(201).json({ message: "Успішно створено користувача!", user: newUser });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Авторизація користувача
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    // перевірка на наявність заповнених полів
    if (!email || !password) {
      return res.status(400).json({ error: "Необхідно заповнити поля!" });
    }

    // пошук користувача за email
    const user = await prisma.user.findUnique({
      where: { email }
    });

    // якщо не знайшло
    if (!user) {
      return res.status(404).json({ error: "Не знайдено!" });
    }

    // перевірка пароля
    const ispasswordvalid = await bcrypt.compare(password, user.password);
    if (!ispasswordvalid) {
      return res.status(400).json({ error: "Неправильний пароль або email!" });
    }

    // все зійшлось — створюємо токен
    const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: "2h" });
    res.status(200).json({ message: "Вас успішно авторизовано!", token: token });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Зміна (оновлення) пароля
app.patch('/api/auth/change-password', authMiddleware, async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  try {
    if (!oldPassword || !newPassword) {
      return res.status(400).json({ error: "Вкажіть старий та новий паролі!" });
    }

    // пошук користувача за ID з токена
    const user = await prisma.user.findUnique({
      where: { id: req.user.userId }
    });

    if (!user) {
      return res.status(404).json({ error: "Користувача не знайдено!" });
    }

    // Bcrypt звіряє введений старий пароль із захешованим у БД
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Старий пароль невірний!" });
    }

    // якщо все правильно — хешуємо новий пароль
    const hashedNewPassword = await bcrypt.hash(newPassword, 12);
    await prisma.user.update({
      where: { id: req.user.userId },
      data: { password: hashedNewPassword }
    });

    res.status(200).json({ message: "Успішно оновлено пароль!" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// МОДУЛЬ КЕРУВАННЯ ЗАДАЧАМИ (TASKS)
// Створення нової задачі
app.post('/api/tasks', authMiddleware, async (req, res) => {
  const { title, projectId } = req.body;
  try {
    if (!title) {
      return res.status(400).json({ error: "Назва задачі обов'язкова!" });
    }

    const newTask = await prisma.task.create({
      data: {
        title,
        userId: req.user.userId,
        ...(projectId && { projectId: Number(projectId) })
      }
    });

    res.status(201).json({ message: "Успішно створено завдання!", task: newTask });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Отримання всіх задач авторизованого користувача
app.get('/api/tasks/my-tasks', authMiddleware, async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      where: { userId: req.user.userId },
      include: {
        project: true,
        user: {
          select: { id: true, name: true, email: true }
        }
      }
    });

    res.status(200).json(tasks);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Оновлення статусу задачі за ID
app.patch('/api/tasks/:id', authMiddleware, async (req, res) => {
  const { id } = req.params; // витягуємо Id з URL
  const { title, status } = req.body;

  try {
    // пошук завдання за id і перевірка чи взагалі є
    const task = await prisma.task.findUnique({
      where: { id: Number(id) }
    });

    if (!task) {
      return res.status(404).json({ error: "Не знайдено!" });
    }

    // перевіряємо чи належить завдання користувачу
    if (task.userId !== req.user.userId) {
      return res.status(403).json({ error: "Ви можете оновлювати лише свої завдання!" });
    }

    // ОНОВЛЮЄМО тільки ті поля, які передані у req.body
    const updatetask = await prisma.task.update({
      where: { id: Number(id) },
      data: {
        ...(title && { title }),
        ...(status && { status })
      }
    });

    res.status(200).json({ message: "Успішно оновлено!", task: updatetask });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// запуск сервера
app.listen(PORT, () => {  
  console.log("Сервер готовий до роботи! Відкрийте посилання: http://localhost:" + PORT);
});
