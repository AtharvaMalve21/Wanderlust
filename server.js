const express = require("express");
const app = express();
const users = require("./routes/user.js");
const posts = require("./routes/post.js");
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const PORT = 3000;

const sessionOptions = {
  secret: "mysupersecretstring",
  resave: false,
  saveUninitialized: true,
};

app.use(session(sessionOptions));
app.use(flash());

app.get("/register", (req, res) => {
  let { name } = req.query;
  req.session.name = name;
  req.flash("success", "user registered successfully!");
  console.log(req.session.name);
  res.redirect("/hello");
});

app.get("/hello", (req, res) => {
  res.render("page.ejs", {
    name: req.session.name,
    msg: req.flash("success"),
  });
});

// app.get("/reqcount", (req, res) => {
//   if(req.session.count) {
//     req.session.count++ ;
//   } else {
//     req.session.count = 1 ;
//   }
//   res.send(`You sent a request ${req.session.count} times`);
// });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// const cookieParser = require("cookie-parser");
// app.use(cookieParser("mySecret"));

// app.get("/getsignedcookie", (req, res) => {
//   res.cookie("color", "red", { signed: true });
//   res.send("cookie sent!");
// });

// app.get("/getcookies", (req, res) => {
//   res.cookie("hello", "namaste");
//   res.cookie("Tea", "sugar");
//   res.send("sent cookie!");
// });

// app.get("/", (req, res) => {
//   console.log(req.cookies);
//   res.send("Hello World!");
// });

// app.use("/users", users);
// app.use("/posts", posts);
