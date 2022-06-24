const EventController = require('../Controllers/event.controller');

module.exports = app => {
    app.get('/api/events', EventController.getAllEvents);
    app.put('/api/events/:id', EventController.updateOneEvent);
    app.post('/api/events', EventController.createEvent);
    app.get('/api/events/:id', EventController.getOneEvent);
    app.delete('/api/events/:id', EventController.deleteOneEvent);

}