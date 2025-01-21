import jwt from 'jsonwebtoken'
const SECRET_KEY = '5EEC4FDF792C1ED5B7B989712B8B55EEC4FDF792C1ED5B7B989712B8B5';

const authenticateMiddleware = (socket, next) => {
    // for postman using bea
    var token = socket.handshake.auth.token;
    if (token == null || token == "")
    {
        // for postman using bearer
        const authHeader = socket.request.headers['authorization'];
        token = authHeader && authHeader.split(' ')[1];
    }
    if (!token) {
        return next(new Error('Authentication error: Token missing'));
    }

    try {
        validateToken(token);
        console.log("passed auth")
        return next();
    } catch (error) {
        return next(new Error('Authentication error: ' + error.message));
    }
};

const validateToken = (token) => {
    if (!token) {
        throw new Error('Token is required');
    }
    
    try {
        const decoded = jwt.verify(token, SECRET_KEY, { algorithms: ['HS256'] });
        return decoded;
    } catch (err) {
        throw new Error('Invalid or expired token');
    }
  };
  
export default authenticateMiddleware;
