const express = require("express");
const dotenv = require("dotenv");
const db = require("../backend/config/Database.js");
const SequelizeStore = require("connect-session-sequelize");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const session = require("express-session");

const UserRoute = require("./routes/UserRoute.js");
const AuthRoute = require("./routes/AuthRoute.js");
const Inteldakim = require("./routes/InteldakimRoute.js")
const Lalintalkim = require("./routes/LalintalkimRoute.js")
const Tikkim = require("./routes/TikkimRoute.js")
const TataUsaha = require("./routes/TataUsahaRoute.js")

dotenv.config();

const app = express();

const sessionStore = SequelizeStore(session.Store)

const store = new sessionStore({
    db: db
})

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));

app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        secure: 'auto'
    }
}))
app.use(cookieParser());
app.use(express.json());

app.use(UserRoute);
app.use(AuthRoute);
app.use(Inteldakim);
app.use(Lalintalkim);
app.use(Tikkim);
app.use(TataUsaha);

app.listen(process.env.APP_PORT, ()=> console.log("Server Sedang berjalan di http://localhost:5000"));