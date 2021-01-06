import Model from "./../models/model.js";
export const createRecord = async (req, res) => {
  try {
    const newModel = new Model(req.body);
    await newModel.save();

    res.status(201).json(newModel);
  } catch (err) {
    console.log(err.message);
  }
};

export const showRecord = async (req, res) => {
  try {
    const allRecord = await Model.find();
    res.status(201).json(allRecord);
  } catch (err) {
    console.log(err.message);
  }
};

export const updateRecord = async (req, res) => {
  try {
    console.log(req.params.id);
    await Model.findById(req.params.id, (err, singleRecord) => {
      console.log(singleRecord);
      res.json(singleRecord);
    });
    console.log(singleRecord);
    res.status(200).json(singleRecord);
  } catch (err) {
    console.log("Some error ocuredd");
  }
};

export const updateRecordInDatabase = async (req, res) => {
  //console.log(req.params.id);
  await Model.findById(req.params.id, (error, response) => {
    if (!response) {
      res.status(400).send("Data not found");
    } else {
      response.firstName = req.body.firstName;
      response.task = req.body.task;
      response.description = req.body.description;
      response.photo = req.body.photo;
      response.priority = req.body.priority;
      response.is_completed = req.body.is_completed;
    }
    response.save().then((response) => res.json("Updated"));
  });
};

export const deleteRecord = async (req, res) => {
  await Model.findByIdAndDelete(req.params.id, (error, response) => {
    if (!response) {
      res.status(400).send("data not found");
    } else {
      console.log("Deleted..", response);
      res.status(200).json({ response });
    }
  });
};
