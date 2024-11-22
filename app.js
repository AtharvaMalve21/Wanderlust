const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const app = express();
const PORT = 8080;
const path = require("path");
const flash = require("connect-flash");
app.use(flash());
const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");
const users = require("./routes/user.js") ;
const session = require("express-session");
const passport = require("passport");
const localStragety = require("passport-local");
const user = require("./models/user.js");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use(methodOverride("_method"));

const sessionOptions = {
  secret: "mysupersecretcode",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

app.use(session(sessionOptions));

app.engine("ejs", ejsMate);

const MONGODB_URI = "mongodb://127.0.0.1:27017/wanderlust";

app.use(passport.initialize());

app.use(passport.session());

passport.use(new localStragety(user.authenticate()));

passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

const connectDB = async () => {
  await mongoose
    .connect(MONGODB_URI)
    .then(() => {
      console.log(`Connection with DB is successfull!`);
    })
    .catch((err) => console.log(err.message));
};

connectDB();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

app.get("/demouser", async (req, res) => {
  var fakeUser = new user({
    email: "abcd@gmail.com",
    username: "delta-student",
  });
  var registeredUser = await user.register(fakeUser, "helloworld");
  res.send(registeredUser);
});

app.use("/",users) ;

app.use("/listings", listings);

app.use("/listings/:id/reviews", reviews);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
