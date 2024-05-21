import { Router } from "express";
import Event from "../models/Event.js";
import Participant from "../models/Participant.js";
const router = Router();

router.get("/", async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/register/:eventId", async (req, res) => {
  const { eventId } = req.params;
  const { fullName, email, dateOfBirth, referralSource } = req.body;
  const participant = new Participant({
    eventId,
    fullName,
    email,
    dateOfBirth,
    referralSource,
  });

  try {
    const newParticipant = await participant.save();
    res.status(201).json(newParticipant);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/events/:eventId", async (req, res) => {
  const { eventId } = req.params;

  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/events/:eventId/participants", async (req, res) => {
  const eventId = req.params.eventId;

  try {
    const participants = await Participant.find({ eventId });
    res.json(participants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
