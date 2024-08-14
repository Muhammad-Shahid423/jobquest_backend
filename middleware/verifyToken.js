const jwt = require("jsonwebtoken");

// Middleware: verifyToken
const verifyToken = (req, res, next) => {
    console.log("verifyToken called");  // Log for verifyToken
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SEC, (err, user) => {
            if (err) {
                console.log("Token verification failed:", err.message);
                return res.status(403).json("Token is not valid!");
            }
            req.user = user;
            console.log("Token verified, user set:", req.user);
            next();
        });
    } else {
        console.log("No token provided");
        return res.status(401).json("You are not authenticated!");
    }
};

// Middleware: verifyTokenAndAuthorization
const verifyTokenAndAuthorization = (req, res, next) => {
    console.log("verifyTokenAndAuthorization called");  // Log for verifyTokenAndAuthorization
    verifyToken(req, res, () => {
        if (req.user._id === req.params.id) {
            console.log("Authorization successful");
            next();
        } else {
            console.log("Authorization failed");
            res.status(403).json("You are not allowed to perform this operation!");
        }
    });
};

// Middleware: verifyTokenAndAdmin
// Middleware: verifyTokenAndAdmin
const verifyTokenAndAdmin = (req, res, next) => {
    console.log("verifyTokenAndAdmin middleware called");  // Log for verifyTokenAndAdmin
    verifyToken(req, res, () => {
        console.log("verifyToken completed in verifyTokenAndAdmin");
        if (!req.user) {
            console.log("Token verification failed, no user found.");
            return res.status(403).json("Token verification failed, no user found.");
        }

        if (req.user.isAdmin) {
            console.log("User is admin");  // Log for admin check
            next();
        } else {
            console.log("User is not admin");  // Log for failed admin check
            res.status(403).json("You are not allowed to do that!");
        }
    });
};

module.exports = { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin };