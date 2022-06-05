const { exec } = require('child_process');

// To execute this, make sure to convert the file somefile.sh into executable (chmod +x somefile.sh)

exec('./somefile.sh', (error, stdout, stderr) => {
    if (error) {
        console.log("error: ", error.message);
        return;
    }

    if (stderr) {
        console.log("stderr: ", stderr);
        return;
    }

    console.log("stdout: ", stdout);
})