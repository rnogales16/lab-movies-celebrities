const express = require("express");
const authRouter = express.Router();
const User = require("../../models/User.model");

const bcrypt = require("bcryptjs");

const saltRounds = process.env.SALT || 10;

const zxcvbn = require("zxcvbn");
const { Mongoose } = require("mongoose");


// GET  '/auth/login'
authRouter.get("/login", (req, res) => {
  console.log("Inside login")
  res.render("auth-views/login-form");
});

authRouter.post("/login", (req, res)=>{
  const {username, password} = req.body

  // 1. Check if the username and password are provided
  if (username === "" || password === "") {
    res.render("auth-views/login-form", { errorMessage: "Username and Password are required." });
    return; // stops the execution of the function further
  }

  User.findOne({username})
  .then(user=>{
         // 3.1 If the user is not found, show error message
         if (!user) {
          res.render("auth-views/login-form", { errorMessage: "Input invalid" });
        } else {
        // 3.2 If user exists ->  Check if the password is correct
        const encryptedPassword = user.password;
        const passwordCorrect = bcrypt.compareSync(password, encryptedPassword);
        // After this line we know that the user exist and if they typed the correct password

        if(passwordCorrect){
          req.session.currentUser = user;
          res.redirect("/home-users")
          
        } else {
          res.render("auth-views/login-form", { errorMessage: "Name OR pwd is incorrect" });
        }
        }
  })

})





// GET    '/auth/signup'     -  Renders the signup form
authRouter.get("/signup", (req, res) => {
  res.render("auth-views/signup-form");
});

// POST    '/auth/signup'
authRouter.post("/signup", (req, res, next) => {
  // 1. Get the username and password from req.body
  const { username, password } = req.body;

  // 2.1 Check if the username and password are provided
  if (username === "" || password === "" || password.length < 5) /* !email.includes('@')) */  {//aqui podemos crear los requerimientos para contraseñas y emails
    res.render("auth-views/signup-form", {
      errorMessage: "Username and Password are required.",
    });
    return; // stops the execution of the function furhter
  }

  // 2.2 Verify the password strength
  // const passwordStrength = zxcvbn(password).score;

  // console.log("zxcvbn(password) :>> ", zxcvbn(password));
  // console.log("passwordStrenth :>> ", passwordStrength);
  // if (passwordStrength < 3) {
  //   res.render("auth-views/signup-form", {
  //     errorMessage: zxcvbn(password).feedback.warning,
  //   });
  //   return;
  // }

  // 3. Check if the username is not taken
  User.findOne({ username }) // This is the sugar syntax for {"username": username}
    .then((userObj) => {
      if (userObj) {
        // if user was found
        res.render("auth-views/signup-form", {
          errorMessage: `Username ${username} is already taken.`,
        });
        return;
      } else {
        // Allow the user to signup if above conditions are ok

        // 4. Generate salts and encrypt the password
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPassword = bcrypt.hashSync(password, salt);

        // 5. Create new user in DB, saving the encrypted password
        User.create({ username, password: hashedPassword })
          .then((user) => {
            // 6. When the user is created, redirect (we choose - home page)
            res.redirect("/");
          })
          .catch((err) => {
            if (err instanceof mongoose.Error.ValidationError){//aqui miramos si el error es de validacion(falta user o pwd)
              res.render("auth-views/signup-form", {
                errorMessage: err.message,
              });
            }else {
              next(err)
            }
          });
      }
    })
    .catch((err) => next(err));

  // X.  Catch errors coming from calling to User collection
});

//let's code the logout
authRouter.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      res.render("error", { message: "Something went wrong! Yikes!" });
    }else {
      res.redirect('/')
    }
  })
})

module.exports = authRouter;
