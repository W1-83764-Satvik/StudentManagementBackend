import mongoose from "mongoose";

const studentSchema = mongoose.Schema({
    
        name : {
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        age : {
            type:Number,
            required:true
        },
        description : {
            type:String,
        }

},
 {
    timestamps:true
})

export const Student = mongoose.model("Student", studentSchema)