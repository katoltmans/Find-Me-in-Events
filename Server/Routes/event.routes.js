const EventController = require("../Controllers/event.controller");
const authenticate = require("../Config/authentication.middleware");

module.exports = (app) => {
  //all events routes....
  app.get("/api/events", authenticate, EventController.getAllEvents);
  app.get("/api/events/:id", authenticate, EventController.getOneEvent);
  app.post("/api/events", authenticate, EventController.createEvent);
  app.put("/api/events/:id", authenticate, EventController.updateOneEvent);
  app.delete("/api/events/:id", authenticate, EventController.deleteOneEvent);
  app.get("/api/getmyevents", authenticate, EventController.getMyEvents);

  //all comment routes...
  app.put("/api/comment/:eventId", authenticate, EventController.addComment);
  app.put(
    "/api/uncomment/:commentId",
    authenticate,
    EventController.deleteComment
  );

  //join or not decision
  app.put("/api/decision/:eventId", authenticate, EventController.AddDecision);

  //all like routes...
  app.put("/api/like", authenticate);
  app.put("/api/unlike", authenticate);
};
