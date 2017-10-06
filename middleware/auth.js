const config = require('../jwtConfig/config');
const jwt = require('jsonwebtoken');


module.exports = {
    validate: function(req, res, next) {

        // checks for token in request object
        const token = req.body.token || req.query.token || req.headers['x-access-token'];

        // decode token
        if (token) {
            // verifies secret and checks exp
            jwt.verify(token, config.secret, function (err, decoded) {
                if (err) {
                    return res.json({message: 'Failed to validate authentication token.'});
                } else {
                    // if everything is good, save to request for use in other routes
                    req.decoded = decoded;
                    next();
                }
            });
        }
        else{
            return res.json({message: 'Authentication token missing.'});
        }
    },

};
