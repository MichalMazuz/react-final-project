
const fs = require('fs');

function get(req, res) {
    fs.readFile("songs.json", "utf-8", (err, data) => {
        if (err) {
            res.status(500).send("error read file student ")
        } else {
            res.send(JSON.parse(data));
        }

    })
}
//אפשרות ראשונה ליצא פונקציה מדף
exports.getById = (req, res) => {

    fs.readFile("songs.json", "utf-8", (err, data) => {
        if (err) {
            res.status(500).send("error read file student ")
        } else {
            let id = req.params.id;

            data = JSON.parse(data);
            let student = data.find(st => st.id == id)

            if (student == undefined) {
                res.status(500).send("not found student by tz " + id);
            } else {
                res.send(student);
            }

        }


    })
}


exports.post = (req, res) => {

    fs.readFile("songs.json", "utf-8", (err, data) => {
        //המרה של טקסט למערך
        let students = JSON.parse(data);
        //body =  לתוכן שנשלח בפונקציה פןסט 
        students.push(req.body);
        fs.writeFile("songs.json", JSON.stringify(students), (err) => {
            if (err) {
                res.status(500).send("error  in add sudent ");
            } else {
                res.send("sucess add");
            }
        })
    })
}
//אפשרות שניה ליצא פונקציה מדף
exports.get = get;
