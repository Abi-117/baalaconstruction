const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
{
  title:{
    type:String,
    required:true
  },

  category:{
    type:String,
    enum:["ongoing","completed"],
    default:"ongoing"
  },

  location:String,

  year:String,

  completion:String,

  progress:{
    type:Number,
    default:0
  },

  description:String,


  images:[
    {
      type:String
    }
  ],


  public_ids:[
    {
      type:String
    }
  ]

},
{
  timestamps:true
});


module.exports = mongoose.model("Project",projectSchema);