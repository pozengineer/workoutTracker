var db = require("../models");

module.exports = function (app) {
    app.get("/api/workouts", function (req, res) {
        db.Workout.find({}).then(function (dbWorkout) {
            res.json(dbWorkout);
        });
    });

    app.get("/api/workouts/range", (req, res) => {
        db.Workout.find({})
            .populate("workouts")
            .then(dbUser => {
                res.json(dbUser);
            })
            .catch(err => {
                res.json(err);
            });
    });


    app.post("/api/workouts", ({ body }, res) => {
        console.log({ body })
        db.Workout.create(body)
            .then(dbWorkout => {
                res.json(dbWorkout);
            })
            .catch(err => {
                res.json(err);
            });
    });



    app.put("/api/workouts/:id", ({ body, params }, res) => {
        console.log(body)
        db.Workout.updateOne({ _id: params.id }, {
            $push: {
                exercises: {
                    type: body.type,
                    name: body.name,
                    duration: body.duration,
                    distance: body.distance,
                    weight: body.weight,
                    reps: body.reps,
                    sets: body.sets
                }
            }
        })
            .then(dbUser => {
                res.json(dbUser);
            })
            .catch(err => {
                res.json(err);
            });
    });


    app.get("/workouts", (req, res) => {
        db.Workout.find({})
            .populate("workouts")
            .then(dbUser => {
                res.json(dbUser);
            })
            .catch(err => {
                res.json(err);
            });
    });


    // app.put("/workouts/:id", function (req, res) {
    //   db.Workout.updateOne({ _id: req.params.id }, { type: req.body.type }, { name: req.body.name }, { duration: req.body.duration }, { distance: req.body.distance },
    //     { weight: req.body.weight }, { reps: req.body.reps }, { sets: req.body.sets }).then(function (dbWorkout) {
    //       res.json(dbWorkout);
    //     });
    // });
};
