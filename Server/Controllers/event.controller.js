const Event = require('../Models/event.model');

module.exports.getAllEvents = (req, res) => {
    Event.find()
    .then((allEvent) => {
        res.json({events : allEvent})
        console.log('Running Query: find()', allEvent)
    })
    .catch((err) => {
        res.json({message: 'Something went wrong running Query: find()', error: err})
    }) 
};

module.exports.createEvent = (req, res) => {
    Event.create(req.body) 
    .then((newEvent) => {
        res.json({event : newEvent})
        console.log('Running Query: create()', newEvent)
    })
    .catch((err) => {
        res.json({message: 'Something went wrong running Query: create()', error: err})
    })
};

module.exports.getOneEvent = (req, res) => {
    Event.findOne({_id: req.params.id})
    .then((oneEvent) => {
        res.json({event : oneEvent})
        console.log('Running Query: findOne()', oneEvent)
    })
    .catch((err) => {
        res.json({message: 'Something went wrong running Query: findOne()', error: err})
    })
};

module.exports.updateOneEvent = (req, res) => {
    Event.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, runValidators: true})
    .then((updated) => {
        res.json({event : updated})
        console.log('Running Query: findOneAndUpdate()', updated)
    })
    .catch((err) => {
        res.json({message: 'Something went wrong running Query: findOneAndUpdate()', error: err})
    })
};

module.exports.deleteOneEvent = (req, res) => {
    Event.deleteOne({_id: req.params.id})
    .then((results) => {
        res.json({result: results});
        console.log('Running Query: deleteOne()', results)
    })
    .catch((err) => {
        res.json({message: 'Something went wrong running Query: find()', error: err})
    })
};
