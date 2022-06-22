const express = require('express');
const { fork } = require('child_process');

app = express();

app.get('/one', (req, res) => {
    const sum = longComputation();
    res.send({sum: sum})
})

app.get('/two', async (req, res) => {
    const sum = await longComputationPromise();
    res.send({sum: sum})
})

app.get('/three', (req, res) => {
    const child = fork('./002_child_processes/long_task.js');
    child.send('start');
    child.on('message', (sum) => {
        res.send({sum: sum});
    });
})


app.listen(3000, (req, res) => {
    console.log("Server running on port 3000")
})


function longComputation() {
    let sum = 0;
    for(let i=0; i<1e9; i++) {
        sum += i;
    }
    return sum;
}

function longComputationPromise() {
    return new Promise((resolve, reject) => {
        let sum = 0;
        for(let i=0; i<1e9; i++) {
            sum += i;
        }
        resolve(sum)
    })
}