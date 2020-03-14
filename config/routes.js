module.exports  = (app) => {
    
    const users  = require  ('../controllers/UserController');

    // Create user
    app.post('/user/create', users.create);

    // Get all user
    app.get('/user/create', users.getAll)

    // Find one user
    app.get('/user/:userId', users.findOne );

    // Update user
    app.put('/user/:userId',  users.update)

    // Delete user
    app.delete('/user/:userId', users.delete);

     // Login user
     app.post('/user/login', users.login);
}