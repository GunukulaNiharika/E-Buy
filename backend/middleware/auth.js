const jwt = require('jsonwebtoken')

module.exports.requireSignIn = function (req, res, next) {
    // Get token from header 
    const token = req.header('x-auth-token');

    // Check if no token
    if (!token) {
        return res.status(401).json({
            message: 'No token, auth denied'
        })
    }

    // Verify token 
    try {
        const decoded = jwt.verify(token, process.env.jwt_secret)
        // set user id in req.user
        req.user = decoded.user;
        next()
    } catch (error) {
        req.status(401).json({
            message: 'Token is not valid'
        })
    }
}

exports.userMiddleware = (req, res, next) => {
    if (req.user.role !== "user") {
      return res.status(400).json({ message: "User access denied" });
    }
    next();
  };
  
  exports.adminMiddleware = (req, res, next) => {
    if (req.user.role !== "admin") {
    //   if (req.user.role !== "super-admin") {
        return res.status(400).json({ message: "Admin access denied" });
    //   }
    }
    next();
  };