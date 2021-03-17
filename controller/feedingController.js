const Animal = require("../model/animal");
const Feeding = require("../model/feeding");

module.exports = {
  getByAnimal: async (req, res) => {
    let animal;
    try {
      animal = await Animal.findById(req.params.id).populate("feedings");
    } catch (e) {
      res.status(400).send("Bad request");
    }

    if (animal) {
      res.json(animal.feedings);
    } else {
      res.status(404).send("Not found");
    }
  },
  postByAnimal: async (req, res) => {
    let animal;
    try {
      animal = await Animal.findById(req.params.id);
    } catch (e) {
      res.status(400).send("Bad request");
    }

    if (animal) {
      req.body.time = new Date();
      const feeding = new Feeding(req.body);
      animal.feedings.push(feeding);
      await feeding.save();
      await animal.save();
      res.status(201).end();
    } else {
      res.status(404).send("Not found");
    }
  },
  deleteByAnimal: async (req, res) => {
    try {
      //Hämtar animal från db
      let animal;
      animal = await Animal.findById(req.params.animalId);
      if (animal) {

        //Tar bort feedingen som är kopplad till animal
        animal.feedings = animal.feedings.filter(
          (feeding) => feeding._id != req.params.feedingId
        );
        await animal.save();

        //Tar bort feedingen från sin egen collection
        await Feeding.deleteOne({ _id: req.params.feedingId });

        res.status(200).end();
      } else {
        res.status(404).send("Not found");
      }
    } catch {
      res.status(500).end();
    }
  },
};
