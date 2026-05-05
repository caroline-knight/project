const db = require('../database')

// encrypt password on 'create' & use the built-in cryptography function from JS
var crypto = require('crypto');

// use the local function to create a salt. a salt is just some random text. 
const createSalt = () => {
  return crypto.randomBytes(16).toString('hex');
}

// a function to encrypt a password given a salt.
const encryptPassword = (password, salt) => {
  return crypto.pbkdf2Sync(password, salt, 310000, 32, 'sha256').toString('hex')
}

// const users = [
//   {
//     name: 'caroline',
//     email: 'chend227@pratt.edu', 
//     salt: 'd4f75743c6e5f8f026867a33db465077', 
//     encryptedPassword: '7b9fe1c383870e117667c56e1caca36c1e21f9951cb03ea7056f71723bfa8837'
//   }
// ];

// exports.all = users;

exports.add = async (user) => {
  const salt = createSalt(); // creates a new salt, so every user has a unique salt.
  let encryptedPassword = encryptPassword(user.password, salt)
  return db.getPool()
    .query("INSERT INTO users(email, name, salt, password) VALUES ($1, $2, $3, $4) RETURNING *",
      [user.email, user.name, salt, encryptedPassword])
};

  // const newUser = { // create a new user object
  //   name: user.name,
  //   email: user.email,
  //   salt: salt, // store the salt for this user (required for login)
  // //   encryptedPassword: encryptPassword(user.password, salt) // stores the encrypted password
  // }
  // console.log(newUser);
  // users.push(newUser); // store the new user

exports.getByEmail = async (email) => {
  const { rows } = await db.getPool().query("select * from users where email = $1", [email])
  return db.camelize(rows) [0];
};

// encrypt password on 'login'
exports.login = async (login) => {
  let user = await exports.getByEmail(login.email); // start with user lookup based on email
  if (!user) {
    return null; // if no user is found, return null. 
  }
  const encryptedPassword = encryptPassword(login.password, user.salt); //  encrypt the password provided at login with the user's salt
  if (user.password === encryptedPassword) { // if the encrypted passwords match, return the user. if they do not match, return null. 
    return user;
  }
  return null;
};