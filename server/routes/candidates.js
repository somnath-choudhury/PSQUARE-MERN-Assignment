import express from "express";
import multer from "multer";
import path from "path";
import Candidate from "../models/AddCandidates.js";

const router = express.Router();

// Configure multer for PDF uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are allowed"), false);
    }
  },
});

// Add a candidate
router.post("/", upload.single("resume"), async (req, res) => {
  try {
    const { name, email, phone, position, experience, status } = req.body;
    const resumePath = req.file ? req.file.path : null;

    const candidate = new Candidate({
      name,
      email,
      phone,
      position,
      experience,
      status,
      resumePath,
    });

    await candidate.save();
    res.status(201).json(candidate);
  } catch (error) {
    console.error("Error saving candidate:", error);
    res.status(500).json({ message: "Failed to add candidate" });
  }
});

// Optional: Get all candidates
router.get("/", async (req, res) => {
  try {
    const candidates = await Candidate.find();
    res.json(candidates);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch candidates" });
  }
});

export default router;
