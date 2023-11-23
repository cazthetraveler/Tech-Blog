const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");

const SequelizedStore = require("connect-session-sequelize")(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
  secret: "something idk...",
  cookie: {},
  resave: false,
  saveUnitialized: true,
  store: new SequelizedStore({
    db: sequelize,
  }),
};

app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
});
