const jwt = require("jsonwebtoken"); 
const secret = 'test';

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    // const isCustomAuth = token.length < 500;
    let decodedData;

    if (token) {      
      decodedData = jwt.verify(token, secret);

      req.userId = decodedData?._id;
    } else {
      decodedData = jwt.decode(token);

      req.userId = decodedData?._id;
    }    
    console.log(token);

    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = auth