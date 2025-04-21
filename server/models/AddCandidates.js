import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  experience: {
    type: Number,
  },
  status: {
    type: String,
    enum: ["Pending", "Interviewing", "Selected", "Rejected"],
  },
  resumePath: { 
    type: String 
},
});

const AddCandidates = mongoose.model("AddCandidates", candidateSchema);

export default AddCandidates;
