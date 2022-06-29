const mongoose = require("mongoose");
const statesArray = [
  "AL",
  "AK",
  "AZ",
  "AR",
  "CA",
  "CO",
  "CT",
  "DC",
  "DE",
  "FL",
  "GA",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "OH",
  "OK",
  "OR",
  "PA",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VT",
  "VA",
  "WA",
  "WV",
  "WI",
  "WY",
];

const EventSchema = new mongoose.Schema(
  {
    eventTitle: {
      type: String,
      required: [true, "Event must have a title"],
      minlength: [5, "Title can't be less than 5 characters"],
    },
    location: {
      street: {
        type: String,
        required: [true, "Enter Sreet"],
      },
      city: {
        type: String,
        required: [true, "Enter City"],
      },
      zipcode: {
        type: Number,
        required: [true, "Enter Zipcode"],
      },
      state: {
        type: String,
        uppercase: true,
        required: [true, "Enter State"],
        enum: statesArray,
      },
    },
    date: {
      type: Date,
        required : [true, 'When\'s the Event?']
    },
    time: {
      type: String,
      required: [true, "Can't have an Event without a set time, come on!"],
    },
    description: {
      type: String,
      required: [true, "Tell us what the Event is about."],
      minlength: [10, "Describe Event in minimum of 10 characters."],
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    image: {
      type: String,
      default: "/image/Meetup.png",
    },

    going: [
      {
        decision: {
          type: String,
          enum: ["Going", "Maybe", "Not-Going"],
        },
        personId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],

    comments: [
      {
        details: String,
        postedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        postedAt: { type: Date, default: Date.now },
      },
    ],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const Event = mongoose.model("Events", EventSchema);
module.exports = Event;
