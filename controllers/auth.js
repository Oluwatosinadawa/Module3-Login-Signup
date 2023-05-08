const userSchema = require ("../models/users")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const JWT_SECRET = "cbeucbuebcuececneceicne";

const signup_get = async (req, res, next) => {
    return res.render("signup", {error: ""})
};
const signup_user = async (req, res, Next) => {
    const { email, password, address, username, gender, date_of_birth, name, confirm_password } = req.body
    try {
        // if (password !== confirm_password) return res.render("signup", { error: "password does not match" });

        if (password !== confirm_password) return res.render("signup", { error: "password do not match" });
    const user = await userSchema.findOne({ email});
    if (user) return res.render("signup", { error: "user already exist" });
    const hashed = bcrypt.hashSync(password, 10)
    const newUser = new userSchema({    
        email,
        password:hashed,
        name,
        address,
        username,
        gender,
        date_of_birth
    });
    const data = await newUser.save();
    console.log(data);
    return res.redirect("/auth/login");    
    } catch (error) {
        console.log(error.code);
    return res.render("signup", { error: error.code == 11000 ? "user duplicated" : error.message});
    }
};

// const signup_user = async (req, res, next) => {
//     const { name, username, email, password, password2 } = req.body;
//   let errors = [];

// //   if (!name || !username || !email || !password || !password2) {
// //     errors.push({ msg: 'Please enter all fields' });
// //   }

//   if (password != password2) {
//     errors.push({ msg: 'Passwords do not match' });
//   }

// //   if (password.length < 6) {
// //     errors.push({ msg: 'Password must be at least 6 characters' });
// //   }

//   if (errors.length > 0) {
//     res.render('signup', {
//       errors,
//       name,
//       email,
//       password,
//       password2
//     });
//   } else {
//     User.findOne({ email: email }).then(user => {
//       if (user) {
//         errors.push({ msg: 'Email already exists' });
//         res.render('signup', {
//           errors,
//           name,
//           email,
//           password,
//           password2
//         });
//       } else {
//         const newUser = new User({
//           name,
//           email,
//           password
//         });

//         bcrypt.genSalt(10, (err, salt) => {
//           bcrypt.hash(newUser.password, salt, (err, hash) => {
//             if (err) throw err;
//             newUser.password = hash;
//             newUser
//               .save()
//               .then(user => {
//                 req.flash(
//                   'success_msg',
//                   'You are now registered and can log in'
//                 );
//                 res.redirect('/auth/login');
//               })
//               .catch(err => console.log(err));
//           });
//         });
//       }
//     });
//   }
//     // return res.redirect("/auth/login")
// };

const login_get = async (req, res, next) => {
    try {
        return res.render("login", {error: ""}) 
    } catch (error) {
        console.log(error)
        return res.render("login", {error: error.message})
    }
};
const login_post = async (req, res, next) => {
    const { email, password} = req.body;
    try {
        if (!email || !password) return res.render("login", {error: "email or password required" });
        const user = await userSchema.findOne ({email});
        if (!user) return res.render("login", {error: "incorrect email" });
        console.log(`user data =>${user}`)
        const comparePwd = await bcrypt.compare (password, user.password)
        if (!comparePwd) return res.render ("login", {error: "incorrect password"})
        user.password= undefined
        return res.redirect("/auth/profile", {user})
    } catch (error) {
        console.log(error);
        return res.render("login", {error: error.message}) 
        // return res.redirect("/auth/profile", {user})
       
    }
};

// const login_post = async (req, res, next) => {
//     const { email, password} = req.body;
//     try {
//         if (!email || !password) return res.render("login", {error: "email or password required" });
//         const user = await userSchema.findOne ({email});
//         if (!user) return res.render("login", {error: "incorrect email" });
//         const comparePwd = await bcrypt.compare (password, user.password)
//         if (!comparePwd) return res.render ("login", {error: "incorrect password"})
//         user.password= undefined
//         return res.redirect("/auth/profile", {user})
//     } catch (error) {
//         console.log(error);
//         return res.render("login", {error: error.message})        
//     }
// };
// const login_post = async (req, res) => {
//     const { email, password } = req.body;
//     try {
//       const user = await userSchema.findOne({ email });
//       if (!email || !password) return res.render("login", { error: `email or password required`, isLoggedIn: false });
      
//       if (!user) return res.render("login", { error: `email or password is incorrect`, isLoggedIn: false });
//       const comparePwd = await bcrypt.compare(password, user.password);
//       if (!comparePwd) return res.render("login", { error: `password is incorrect`, isLoggedIn: false });
//       user.password = undefined;
//       req.user = user;
//       const token = await jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1d" });
//       res.cookie("edsa_token", token, {
//         maxAge: 3600000,
//         httpOnly: true,
//         expires: 3600000,
//         secure: true,
//       });
//       return res.redirect("/");
//     } catch (error) {
//       console.log(error);
//       return res.render("login", { error: error.message, isLoggedIn: false });
//     }
//   };
// const profile = (req, res) => {
//         return res.render ("profile")
// }
module.exports ={
    signup_get,
    signup_user,
    login_get,
    login_post,
    // profile
}

console.log ("authController is working")