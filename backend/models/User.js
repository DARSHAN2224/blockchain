import mongoose from "mongoose";

const encrptDataSchema = new mongoose.Schema({
  encryptedData: {
    type: String,
    required: true,
  },
  iv: {
    type: String,
    required: true,
  }
},{ timestamps: true });

const EncrptData = mongoose.model("EncrptData", encrptDataSchema);
export default EncrptData;


