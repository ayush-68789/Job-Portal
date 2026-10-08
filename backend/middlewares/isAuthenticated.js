const jwt = require("jsonwebtoken");

const authCookieOptions = {
    httpOnly: true,
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/'
};

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false,
            })
        }
        const decode = await jwt.verify(token, process.env.SECRET_KEY);
        if(!decode){
            return res.status(401).json({
                message:"Invalid token",
                success:false
            })
        };
        req.id = decode.userId;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).clearCookie("token", authCookieOptions).json({
            message: "Session expired. Please log in again.",
            success: false,
        });
    }
}

module.exports = { isAuthenticated };
