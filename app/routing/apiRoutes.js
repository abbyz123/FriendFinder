let friends = require("../data/friends.js");

module.exports = function (app) {
    // response best match
    app.post("/api/friends", function(req, res) {
        let minDiff = -1;
        let bestMatchIdx = -1;

        for (let i = 0; i < friends.length; i++) {
            let diff = sumDiff(req.body.scores, friends[i].scores);
            if (-1 === minDiff || diff < minDiff) {
                minDiff = diff;
                bestMatchIdx = i;
            }
        }

        friends.push(req.body);

        res.json(friends[bestMatchIdx]);
    });

    // response all the friends
    app.get("/api/friends", function(req, res) {
        res.json(friends);
    })
}

// function array sum
function sumDiff(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        throw "array length should be the same!"
    } else {
        let result = 0;
        for (let i = 0; i < arr1.length; i++) {
            result += (Math.abs(arr1[i] - arr2[i]));
        }

        return result;
    } 
}