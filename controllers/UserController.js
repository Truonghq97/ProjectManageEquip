const User = require ('../models/UserModel');
const jwt = require ('jsonwebtoken');

// Create and save a new user
exports.create = (req, res) => {
    // Validate request 
    if(!req.body.userName) {
        return res.status(400).send ({
            message: "User content can not be empty"
        })
    }

    // Create user
    const user = new User({
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
    })
    // Save user in the database
    user.save()
    .then(data => {
        res.send(data);
    }).catch (err => {
        res.status(500).send({
            message: err.message
        })
    }) 
}

// Get all user
exports.getAll = (req, res) => {
    User.find()
    .then(users => {
        res.send(users)
    }).catch (err => {
        res.status(500).send({
            message: err.message
        })
    })
}

// Find a single User with a userId
exports.findOne = (req, res) => {

    var token = verifyToken(req, res);
    jwt.verify(token, 'secretkey', (err, authData) => {
        if(err) {
            res.sendStatus(404);
        } else {
            User.findById(req.params.userId)
            .then(user => {
                if(!user) {
                    return res.status(404).send({
                        message: "User not found with id " + req.params.userId
                    });            
                }
                res.send(user);
            }).catch(err => {
                if(err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "User not found with id " + req.params.userId
                    });                
                }
                return res.status(500).send({
                    message: "Error retrieving equipment with id " + req.params.userId
                });
            });
        }
    });

    
};

exports.delete = (req, res) => {
    var token = verifyToken(req, res);
    jwt.verify(token, 'secretkey', (err, authData) => {
        if (err) {
            res.sendStatus(404);
        } else {
            User.findByIdAndRemove(req.params.userId)
            .then(user => {
                if(!user) {
                    return res.status(400).send ({
                        message: "User not found with id " + req.params.userId
                    })
                } else if (user && authData.user[0].role == 'admin') {
                    res.send({message: "User deleted successfully"});
                } else {
                    res.send({message: "You do not have permission to delete user!!! "})
                }
                
            }). catch(err => {
                if(err.kind === 'ObjectId' || err.name === 'NotFound') {
                    return req.status(400).send ({
                        message: "User not found with id " + req.params.userId
                    })
                } else {
                    return req.status(500).send ({
                        message: "could not delete not with id " + req.params.userId
                    })
                }
            })
        }
    });
    
}

// Update user
exports.update = (req, res) => {
    // Validate request 
    if(!req.body.userName) {
        return res.status(400).send ({
            message: "User content can not be empty"
        })
    }

    var token = verifyToken(req, res);
    jwt.verify(token, 'secretkey', (err, authData) => {
        if(err) {
            res.sendStatus(404);
        } else {
            // Find user
            User.findByIdAndUpdate(req.params.userId, {
                userName: req.body.userName,
                email: req.body.email,
                password: req.body.password,
                role: req.body.role
            }, {new: true})
            .then( user => {
                if(!user) {
                    return res.status(400).send ({
                        message: "User not found with id " + req.params.userId
                    })
                } else 
                    res.send(user)
            }).catch(err => {
                if(err.kind === 'ObjectId') {
                    return req.status(400).send ({
                        message: "User not found with id " + req.params.userId
                    })
                } else {
                    return req.status(500).send ({
                        message: "Error updating not with id " + req.params.userId
                    })
                }
            })
        }
    });

    
} 

// Login user
exports.login = (req, res) => {
    const  userName = req.body.userName;
    const  password = req.body.password ;

    User.find({
         $and: [
            { userName: userName },
            { password: password}
        ] 
    }, function (err, user) {
        if (!err && user.length != 0) {
            jwt.sign ({user}, 'secretkey', (err, token) => {
                res.json({
                    token,
                    user
                })
            })
        }  else {
            res.send('fullName or password incorrect');
        }
    })
}   

// FORMAT OF TOKEN
// Authorization: Bearer <access_token>

// Verify Token
function verifyToken(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers['authorization']

    // Check if Bearer is undefined
    if (typeof bearerHeader !== 'undefined') {
        // Split at the space
        const bearer = bearerHeader.split(' ')
        // Get token from array
        const bearerToken = bearer[1];
        // Set the token
        req.token = bearerToken;
        // Next middleware
        return bearerToken;
        //next();
    } else {
        // Forbidden
        res.sendStatus(403);
    }
}