const mongoose =require('mongoose');
const schema=mongoose.Schema;
const providerSchema=new schema({
    CompanyName:{
        type:String,
        require:true,
        
    },
    CompanyDomain:{
        type:String,
        require:true
    },
    Established:{
        type:String,
        require:true
    },
    Password:{
        type:String,
        require:true,
    },
    EmployeeCount:{
            type:String,
            require:true
    },
    Address:{
        type:String,
        require:true
    },
    Email:{
        type:String,
        require:true
    }
},
    {
        timestamps:true   
});
var User=mongoose.model('Puser',providerSchema);
module.exports=User;
