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
    return { status: 401 };
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return user;
  }

  const token = jwt.sign({ user_id: user.id, email }, JWT_PRIVATE_KEY, {
    expiresIn: "2h",
  });

  return { token, user };
};

const verifyToken = async (token) => {
  if (!token) {
    return { status: 401 };
  }
  try {
    const decoded = jwt.verify(token, JWT_PRIVATE_KEY);

    const user = await User.findByPk(user.id);
    if (!user) {
      return { status: 401 }
    }
    return decoded;
  } catch (error) {
    return { status: 401 };
  }
};

const loginWithApi = async (apiKey) => {
  let user = await User.findOne({
    where: {
      apiKey: apiKey,
    },
  });

  /*   user = user.dataValues; */

  if (!user) {
    return { status: 401 }
  };

  return {user, apiKey};
};

const authorizeIfAdmin = async (token, func) => {
  const user = await verifyToken(token);
  const is_admin = user.is_admin;
  if (!is_admin) {
    return { status: 401 };
  } else {
    try {
     return func(user);
    } catch (error) {
      return { status: 401 };
    }
  }
  /* let role = await User.findByPk({
    where: {
      is_Admin: is_Admin,
    },
  })
  if (role && token) {
    if (role === "is_Admin") {
      await User.findById(token);
    } else {
      return { status: 401 };
    }
  }else {
    return { status: 401 , message: "Role or TOKEN not present"};
  } */
};

const authorizeToken = async (token, func) => {
  const user = await verifyToken(token);
  return func(user);
};

const authorizeApi = async (apiKey, func) => {
  const user = await loginWithApi(apiKey);
  func(user);
  return func;
};
console.log(verifyToken());

module.exports = {
  loginWithEmailPassword,
  verifyToken,
  loginWithApi,
  authorizeIfAdmin,
  authorizeToken,
  authorizeApi,
};
