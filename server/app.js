const express = require("express");
const cors = require("cors");
const fs = require("fs");
   
const app = express();

const jsonParser = express.json();

app.use(cors());
app.use(express.static(__dirname + "/public"));
  
const filePath = "workouts.json";

// get workouts list
app.get("/api/workouts", function(req, res){
       
    const content = fs.readFileSync(filePath,"utf8");
    const workouts = JSON.parse(content);
    res.send(workouts);
});

// get workout by id
app.get("/api/workouts/:id", function(req, res){
       
    const id = req.params.id;
    const content = fs.readFileSync(filePath, "utf8");
    const workouts = JSON.parse(content);
     
    const workout = workouts.find(w => w.id == id);
    
    if(workout){
        res.send(workout);
    }
    else{
        res.status(404).send();
    }
});

// add workout
app.post("/api/workouts", jsonParser, function (req, res) {
      
    if(!req.body) return res.sendStatus(400);
      
    const workoutDate = req.body.date;
    const workoutType = req.body.type;
    const workoutDistance = req.body.distance;
    const workoutComment = req.body.comment;

    let workout = {
        date: workoutDate, 
        type: workoutType,
        distance: workoutDistance,
        comment: workoutComment,
    };
      
    let data = fs.readFileSync(filePath, "utf8");
    let workouts = JSON.parse(data);
      
    // find max id
    const maxId = Math.max.apply(
        null, 
        workouts.map(w => w.id)
    );

    // set id to workout
    workout.id = maxId+1;
    
    workouts.push(workout);
    data = JSON.stringify(workouts);

    // save updates to file
    fs.writeFileSync(filePath, data);

    res.send(workout);
});

// update workout
app.put("/api/workouts", jsonParser, function(req, res){
    
    if(!req.body) return res.sendStatus(400);
      
    const workoutId = req.body.id;
    const workoutDate = req.body.date;
    const workoutType = req.body.type;
    const workoutDistance = req.body.distance;
    const workoutComment = req.body.comment;

    let data = fs.readFileSync(filePath, "utf8");
    const workouts = JSON.parse(data);
    const indexToUpdate = workouts.findIndex(w => w.id == workoutId);

    if(indexToUpdate > -1){

        let workout = workouts[indexToUpdate];

        workout.date = workoutDate;
        workout.type = workoutType;
        workout.distance = workoutDistance;
        workout.comment = workoutComment;

        data = JSON.stringify(workouts);
        fs.writeFileSync(filePath, data);
        res.send(workout);
    }
    else{
        res.status(404);
    }
});

// delete workout by id
app.delete("/api/workouts/:id", function(req, res){
       
    const id = req.params.id;
    let data = fs.readFileSync(filePath, "utf8");
    let workouts = JSON.parse(data);
    
    const indexToRemove = workouts.findIndex(w => w.id == id);

    if (indexToRemove > -1){
        workouts.splice(indexToRemove, 1);
        data = JSON.stringify(workouts);
        fs.writeFileSync(filePath, data);
        
        res.send('OK');
    } else {
        res.status(404).send();
    }
});


   
app.listen(5000, function(){
    console.log("Server started");
});