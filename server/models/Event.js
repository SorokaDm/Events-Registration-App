import { Schema, model } from "mongoose";

const eventSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  eventDate: { type: Date, required: true },
  organizer: { type: String, required: true },
});

const Event = model("Event", eventSchema);

export default Event;
