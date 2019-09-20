var express = require('express');
var router = express.Router();

const { Connection } = require('../db/Connection.js');

// API endpoint. localhost:3000/records POST request will handled using below code block.
router.post('/', (req, res) => {

    let response = {
        code: null,
        msg: null,
        records: []
    };

    Connection.db.collection('records').aggregate([
        {
            // Projection stage for summation of the values of counts array.
            $project: {
                _id : 0 ,
                key: "$key",
                createdAt: "$createdAt",
                totalCount: {$sum: "$counts"}
            }
        },
        {
            // Match stage for filtering the previous stage's output data.
            $match: {
                // Check if totalCount is in between minCount and maxCount.
                totalCount: {
                    $gt: req.body.minCount,
                    $lt: req.body.maxCount
                },
                createdAt: {
                    // Check if createdAt is in between startDate and endDate.
                    $gt: new Date(req.body.startDate),
                    $lt: new Date(req.body.endDate)
                }
            }
        }
    ]).toArray().then((data) =>{
        response.records = data;
        response.code = 0;
        response.msg = "Success";
        res.status(200).json(response)
    }).catch((error) => {
        response.code = 1; // It represents error status.
        response.msg = "An error occured";
        res.status(400)
    });
});


module.exports = router;
