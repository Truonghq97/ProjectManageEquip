module.exports  = (app) => {
    
    const users  = require  ('../controllers/UserController');
    const equipments = require ('../controllers/EquipmentController');

    // User
    app.post('/user/create', users.create);
    app.get('/user/create', users.getAll)
    app.get('/user/:userId', users.findOne );
    app.put('/user/:userId',  users.update)
    app.delete('/user/:userId', users.delete);
    app.post('/user/login', users.login);

    // Equipment
    app.post('/equipment/create', equipments.create);
    app.get('/equipment/create', equipments.getAll);
    app.get('/equipment/:equipmentId', equipments.findOne);
    app.put('/equipment/:equipmentId', equipments.update);
    app.delete('/equipment/:equipmentId', equipments.delete);
}