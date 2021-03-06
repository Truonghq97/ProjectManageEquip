module.exports  = (app) => {
    
    const users  = require  ('../controllers/UserController');
    const equipments = require ('../controllers/EquipmentController');
    const management = require ('../controllers/ManageModel');

    
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });

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

    // Management
    app.post('/management/create', management.create);
    app.get('/management/create', management.getAll);
    app.get('/management/:managementId', management.findOne);
    app.put('/management/:managementId', management.update);
    app.delete('/management/:managementId', management.delete);

}