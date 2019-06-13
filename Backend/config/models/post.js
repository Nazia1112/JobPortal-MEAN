const mongoose =require('mongoose');

const schema=mongoose.Schema;
const postSchema=new schema({
    Provider_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Puser'
    },
    appliedUsers_id:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Suser'
        }
       ],
       LastDate:{
           type:Date,
           require:true
       },
    count:{
        type:Number,
        default:0
    },
    Package:{
        type:Number,
        require:true
    },
    JobTitle:{
        type:String,
        require:true
    },
    SkillsRequire:{
        type:String,
        require:true
    },
    Description:{
        type:String,
        require:true
    },
    ExperienceRequire:{
        type:Number,
        require:true
    },
    Location:{
        type:String,
        require:true
    },
    Vacancies:{
        type:Number,
        require:true
    }
},
    {
        timestamps:true   
});

var posts=mongoose.model('providerpost',postSchema);
module.exports=posts;
