const Event = require("../Models/event.model");

const createEvent = (req, res) => {
  Event.create({
    ...req.body,
    createdBy: req.loggedInuser._id,
    going: [{ decision: "Going", personId: req.loggedInuser._id }],
  })
    .then((newEvent) => {
      res.json({ event: newEvent });
      console.log("Running Query: create()");
    })
    .catch((err) => {
      res.status(400).json({
        message: "Something went wrong running Query: create()",
        error: err,
      });
    });
};

const getAllEvents = (req, res) => {
  Event.find()
    .sort({ date: 1 })
    .populate("createdBy", "firstName lastName")
    .populate("comments", "details postedAt")
    .populate("comments.postedBy", "firstName lastName")
    .then((allEvent) => {
      res.json({ events: allEvent });
      console.log("Running Query: find()");
    })
    .catch((err) => {
      res.status(400).json({
        message: "Something went wrong running Query: find()",
        error: err,
      });
    });
};

const getMyEvents = async (req, res) => {
  try {
    const loggedInUser = req.loggedInuser;
    const events = await Event.find({ "going.personId": loggedInUser })
      .sort({ date: 1 })
      .populate("createdBy", "firstName lastName")
      .populate("going.personId", "firstName lastName");
    res.status(200).json(events);
  } catch (err) {
    console.log("Error while finding all my events", err);
    res.status(400).json(err);
  }
};
const getOneEvent = (req, res) => {
  Event.findOne({ _id: req.params.id })
    .populate("createdBy", "firstName lastName")
    .populate("comments", "details postedAt")
    .populate("comments.postedBy", " firstName lastName")
    .populate("going.personId", "firstName lastName")
    .then((oneEvent) => {
      res.json({ event: oneEvent });
      console.log("Running Query: findOne()", oneEvent);
    })
    .catch((err) => {
      res.status(400).json({
        message: "Something went wrong running Query: findOne()",
        error: err,
      });
    });
};

const updateOneEvent = (req, res) => {
  Event.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true,
  })
    .then((updated) => {
      res.json({ event: updated });
      console.log("Running Query: findOneAndUpdate()", updated);
    })
    .catch((err) => {
      res.status(400).json({
        message: "Something went wrong running Query: findOneAndUpdate()",
        error: err,
      });
    });
};

const deleteOneEvent = (req, res) => {
  Event.deleteOne({ _id: req.params.id })
    .then((results) => {
      res.json({ result: results });
      console.log("Running Query: deleteOne()", results);
    })
    .catch((err) => {
      res.status(400).json({
        message: "Something went wrong running Query: find()",
        error: err,
      });
    });
};
// we need to get the postID and comment details string from client req.body
const addComment = async (req, res) => {
  try {
    const comment = {
      details: req.body.details,
      postedBy: req.loggedInuser._id,
    };
    const addComment = await Event.findByIdAndUpdate(
      req.params.eventId,
      {
        $push: { comments: comment },
      },
      { new: true, runValidators: true }
    )
      .populate("comments.postedBy", "firstName lastName")
      .populate("createdBy", "firstName lastName");
    console.log("successfully added comment", addComment);
    res.status(200).json(addComment);
  } catch (err) {
    console.log("Error while adding new comment", err);
    res.status(400).json(err);
  }
};

// we have to get the eventId from client req.body
// we have to get the Comment Id from req.params.id
const deleteComment = async (req, res) => {
  try {
    const commentId = req.params.commentId;
    const eventId = req.body.eventId;
    const dltComment = await Event.findByIdAndUpdate(
      eventId,
      {
        $pull: { comments: { _id: commentId } },
      },
      { new: true, runValidators: true }
    );

    console.log("Successfully deleted the comment", dltComment);
    res.status(200).json(dltComment);
  } catch (err) {
    console.log("error while delteing the comment", err);
    res.status(400).json(err);
  }
};

// we need to get the eventID from req.params
// we need to get the decision[going, notgoing maybe]string from client req.body
const AddDecision = async (req, res) => {
  try {
    const userId = req.loggedInuser._id;
    const eventId = req.params.eventId;
    const goings = {
      decision: req.body.decision,
      personId: userId,
    };

    const event = await Event.findById(eventId);
    const findDecision = event.going.findIndex(
      (item) => item.personId == userId
    );
    console.log("findDecision", findDecision);
    if (findDecision == -1) {
      const addDecision = await Event.findByIdAndUpdate(
        eventId,
        {
          $push: { going: goings },
        },
        { new: true, runValidators: true }
      )
        .populate("going.personId", "firstName lastName")
        .populate("createdBy", "firstName lastName");
      console.log("Successfully addded the going decision", addDecision);
      res.status(200).json(addDecision);
    } else {
      const updateDecision = await Event.findOneAndUpdate(
        { _id: eventId, "going.personId": userId },
        {
          $set: { "going.$": goings },
        },
        { new: true, runValidators: true }
      )
        .populate("going.personId", "firstName lastName")
        .populate("createdBy", "firstName lastName");
      console.log("Successfully updated the decisiion", updateDecision);
      res.status(200).json(updateDecision);
    }
  } catch (err) {
    console.log("Error while adding or changing the decision", err);
    res.status(400).json(err);
  }
};

module.exports = {
  createEvent,
  getAllEvents,
  getOneEvent,
  updateOneEvent,
  deleteOneEvent,
  addComment,
  deleteComment,
  AddDecision,
  getMyEvents,
};
