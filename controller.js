import Data from "./model.js";
import mongoose from "mongoose";

//Get all data
export const getallData = async(req, res) => {
    try{
        const data = await Data.find();
        if(data.length<1){
            const array = [];
            res.status(200).json(array);
        }else {
            res.status(200).json(data);
        }
    } catch(error) {
        res.status(404).json({message: error.message});
    }
}

//Add Data
export const addData = async(req, res) => {
    const data = req.body;
    const Img = req.file.filename;
    data.ProfilePicture = Img;

    const newData = new Data({...data});

    try{
        if(!data.Name || !data.City || !data.Salary || !data.Mobile || !data.ProfilePicture){
            res.status(400).json({message: "All fields are required"})
        } else {
            await newData.save();
            res.status(201).json(newData);
        }
    }catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const updateData = async(req, res) => {
    const {dataId} = req.params;
    const data = req.body;

    if(req.file) {
        const Img = req.file.filename;
        data.ProfilePicture = Img;
    }
    
    try {
        if(!mongoose.Types.ObjectId.isValid(dataId))
        return res.status(404).json(`No Data associated with id ${dataId}`)

        const updatedData = ({...data, _id: dataId});
        await Data.findByIdAndUpdate(dataId, updatedData);
        res.status(200).json(updatedData);

    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const deleteData = async(req, res) => {
    const {dataId} = req.params;
    
    try {
        if(! await Data.findById(dataId)) {
            return res.status(404).json(`No Data associated with id ${dataId}`);
        } else {
            await Data.findByIdAndDelete(dataId);
            res.json({message: "Data deleted successfully"});
        }
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}