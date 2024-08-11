const jwt = require('jsonwebtoken')
const connection = require('../partials/connection_mongoose');
const User = require('../models/user')
const Task = require('../models/tasks')
const activity_logs = require('../models/activity_logs');

const suiviActivity = async (req,res,next)=>{
    const id = req.params.id
    const user = req.body;
     if(req.method == "post" && req.path == `/tasks/:${id}`){
        let  newActivity = new activity_logs({user_id : user.user_id , description : "modification" , action : 'update',task_id : id  })
        await newActivity.save()
        next()
    }
    else if(req.method == "delete" && req.path == `/tasks/:${id}`){
        let  newActivity = new activity_logs({user_id : user.user_id , description : "suppression" , action : 'delete',task_id : id  })
        await newActivity.save()
        next()
    }
    next();
};

module.exports = suiviActivity;