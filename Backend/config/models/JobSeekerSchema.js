const mongoose =require('mongoose');
const schema=mongoose.Schema;
const seekerSchema=new schema({
    // type:{
    //     type:String,
    //     require:true,
        
    // },
    active:{
        type:Boolean,
        default:false,
        require:true
    },
    FirstName:{
        type:String,
        require:true,
        
    },
    LastName:{
        type:String,
        require:true,
    },
    UserName:{
        type:String,
        require:true,
        unique:true
    },
    Password:{
        type:String,
        require:true,
    },
    Address:{
        type:String,
        require:true,
    },
    Phone:{
        type:String,
        require:true,
    },
    Email:{
        type:String,
        require:true,
        unique:true
    },
    Resume:{
        type:String,
        require:true
    },
    Skills:{
        type:String,
        require:true
    },
    Experience:{
        type:Number,
        require:true
    },
    Photo:{
        type:String,
        require: true
    }
},
    {
        timestamps:true
});
var User=mongoose.model('Suser',seekerSchema);
module.exports=User;
