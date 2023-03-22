const User = require("./database/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { config } = require("dotenv");
const JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY;

const loginWithEmailPassword = async (email, password) => {
  const user = await User.findOne({
    where: { emailAddress: email },
  });
  console.log(user);
  if (!user) {
    {
      status: 401;
    }
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return user;
  }

  const token = jwt.sign({ user_id: user.id, email }, JWT_PRIVATE_KEY, {
    expiresIn: "2h",
  })

  return { token, user };
};

const verifyToken = async (token) => {
  if (!token) {
    return { status: 401 };
  }
  try {
    const decoded = jwt.verify(token,JWT_PRIVATE_KEY);

    const user = await User.findByPk(user.id);
    if (!user) {
      return
      {
        status: 401;
      }
    }
    return decoded;
  } catch (error) {
    return { status: 401 };
  }
};


const loginWithApi = async (apikey) => {
  let user = await User.findOne({
    where: {
      apikey: apikey,
    }
  });

  user = user.dataValues

  if(!user) return { status: 401 }
  
  return user
}
console.log(verifyToken());

module.exports = { loginWithEmailPassword, verifyToken, loginWithApi };
