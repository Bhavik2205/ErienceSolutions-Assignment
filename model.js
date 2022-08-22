import mongoose from "mongoose";
const DataSchema = mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    City: {
        type: String,
        enum: ["Nagpur", "Ahmedabad", "Bangalore", "Chennai", "Hyderabad"]
    },
    Salary: {
        type: String,
        required: true
    },
    Mobile: {
        type: Number,
        required: true
    },
    ProfilePicture: {
        type: String,
        required: true
    }
})

var Datamodel = mongoose.model('Datamodel', DataSchema);

export default Datamodel;