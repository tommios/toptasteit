const express = require("express");
const helmet = require("helmet");
const compression = require("compression");
const csrf = require("csurf");
const flash = require("connect-flash");
const exphbs = require("express-handlebars");
const session = require("express-session");
const MongoStore = require("connect-mongodb-session")(session);
const path = require("path");
const mongoose = require("mongoose");
const homeRoutes = require("./routes/home");
const productsRoutes = require("./routes/products");
const addRoutes = require("./routes/add");
const cardRoutes = require("./routes/card");
const ordersRoutes = require("./routes/orders");
const authRoutes = require("./routes/auth");
const profileRoutes = require("./routes/profile");
const foodsCalorieRoutes = require("./routes/foods-calorie");
const formOrderRoutes = require("./routes/formOrder");
const paymentAndDeliveryRoutes = require("./routes/paymentAndDelivery");
const cakeToppingsRoutes = require("./routes/cakeToppings");
const addCakeToppingsRoutes = require("./routes/addCakeToppings");
const varMiddleware = require("./middleware/variables");
const userMiddleware = require("./middleware/user");
const errorHandler = require("./middleware/error");
const fileMiddleware = require("./middleware/file");
const keys = require("./keys");

const app = express();

//#region HandleBars Settings Конфигурация объекта HandleBars

const hbs = exphbs.create({
  defaultLayout: "main",
  extname: "hbs",
  helpers: require("./utils/hbs-helpers")
});

// Сохранение сессии в БД MongoDB
const store = new MongoStore({
  collection: "sessions",
  uri: keys.MONGODB_URI
});

// Регистрируем модуль hbs как движок для рендеринга html-страниц
app.engine("hbs", hbs.engine);

// Указываем дополнительные параметры view engine и views
app.set("view engine", "hbs");
app.set("views", "views");

// Регистрируем папку public как статическую
app.use(express.static(path.join(__dirname, "public")));
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/icons", express.static(path.join(__dirname, "icons")));

app.use(express.urlencoded({ extended: true }));

// Настройка сессии
app.use(
  session({
    secret: keys.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store
  })
);

// Добавляем middleware для загрузки в облако Amazon aws S3 фото аватарки профиля, и фото тортов
//app.use(fileMiddleware.single("avatar"));
app.use(
  fileMiddleware.fields([
    { name: "avatar", maxCount: 1 },
    { name: "img", maxCount: 1 },
    { name: "image", maxCount: 1 }
  ])
);

// Добавляем middleware
app.use(csrf()); // промежуточный обработчик csurf для защиты от подделки межсайтовых запросов
app.use(flash()); // Flash-сообщения
app.use(helmet()); // Добавление headers. Защита от некоторых веб-уязвимостей
//                        путем соответствующей настройки заголовков HTTP
//                      ( https://expressjs.com/ru/advanced/best-practice-security.html )
app.use(compression());
app.use(varMiddleware);
app.use(userMiddleware);

// Указываем роуты на страницы
app.use("/", homeRoutes);
app.use("/products", productsRoutes);
app.use("/add", addRoutes);
app.use("/card", cardRoutes);
app.use("/orders", ordersRoutes);
app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);
app.use("/foods-calorie", foodsCalorieRoutes);
app.use("/formOrder", formOrderRoutes);
app.use("/paymentAndDelivery", paymentAndDeliveryRoutes);
app.use("/cakeToppings", cakeToppingsRoutes);
app.use("/addCakeToppings", addCakeToppingsRoutes);

app.use(errorHandler);

//#endregion

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    await mongoose.connect(keys.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
}

start();
