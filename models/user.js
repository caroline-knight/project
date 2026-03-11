const users = [

{email: 'chend227@pratt.edu', name: 'caroline', salt: 'd4f75743c6e5f8f026867a33db465077', encryptedPassword: '7b9fe1c383870e117667c56e1caca36c1e21f9951cb03ea7056f71723bfa8837'}
];

// encrypt password on 'create'
var crypto = require('crypto'); // use the built-in cryptography function from JS
const createSalt = () => { // use the local function to create a salt. a salt is just some random text. 
  return crypto.randomBytes(16).toString('hex');
};
const encryptPassword = (password, salt) => { // a function to encrypt a password given a salt.
  return crypto.pbkdf2Sync(password, salt, 310000, 32, 'sha256').toString('hex')
};
exports.add = (user) => {
  let salt = createSalt(); // creates a new salt, so every user has a unique salt.
  let newUser = { // create a new user object
    email: user.email,
    name: user.name,
    salt: salt, // store the salt for this user (required for login)
    encryptedPassword: encryptPassword(user.password, salt) // stores the encrypted password
  }
  users.push(newUser); // store the new user
};

// 'find' executes a function for each element in the list and returns the first element that matches. when the function finds one that matches/is true, it stops looping and returns the true value.  uses Boolean.
exports.getByEmail = (email) => {
  return users.find((user) => user.email === email);
};

// encrypt password on 'login'
exports.login = (login) => {
  let user = exports.getByEmail(login.email); // start with user lookup based on email
  if (!user) { // if no user is found, return null. 
    return null;
  }
  let encryptedPassword = encryptPassword(login.password, user.salt); //  encrypt the password provided at login with the user's salt
  if (user.encryptedPassword === encryptedPassword) { // if the encrypted passwords match, return the user. if they do not match, return null. 
    return user;
  }
  return null;
};

exports.all = users;