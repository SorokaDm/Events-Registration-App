import { Schema, model, Types } from "mongoose";

const participantSchema = new Schema({
  eventId: { type: Types.ObjectId, ref: "Event", required: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  referralSource: { type: String, required: true },
});

const Participant = model("Participant", participantSchema);

export default Participant;
