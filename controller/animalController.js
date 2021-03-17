const Animal = require('../model/animal');

module.exports = {
    get: async (req, res) => {
        const animals = Animal.find().then((animals) => res.json(animals));
    },
    post: async (req, res) => {
        const animal = new Animal(req.body);
        const createdAnimal = await animal.save();
        res.status(201).json(createdAnimal);
    },
    delete: async (req, res) => {
        try { await Animal.deleteOne({ _id: req.params.id }); } catch (e) {
            res.status(400).send("Bad request");
        }
        res.status(200).end();
    },
    put: async (req, res) => {
        let animal;
        try {
            await Animal.findByIdAndUpdate(req.params.id, req.body);
            animal = await Animal.findById(req.params.id);
        } catch (e) {
            res.status(400).send("Bad request");
        }
        if (animal) {
            res.json(animal);
        }
    },
    getById: async (req, res) => {
        let animal;
        try {
            animal = await Animal.findById(req.params.id);
        } catch (e) {
            res.status(400).send("Bad request");
        }

        if (animal) {
            res.json(animal);
        } else {
            res.status(404).send("Not found");
        }
    }
}