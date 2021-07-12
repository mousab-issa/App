const jwt = require('jsonwebtoken');

module.exports  = async (req, res, next) => {
    const authHeader = req.headers['authorization']
    // to remove the Bearer word
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)
    jwt.verify(token, process.env.JWTPRIVATEKEY, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}