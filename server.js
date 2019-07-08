const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const fetch = require('node-fetch');

const studentArray = [];
class Student {
    constructor(setCity, setCompany, setEmail, setFirstName, setGrades, setId, setLastName, setPic, setSkill) {
        this.city = setCity;
        this.company = setCompany;
        this.email = setEmail;
        this.firstName = setFirstName;
        this.grades = setGrades;
        this.id = setId;
        this.lastName = setLastName;
        this.pic = setPic;
        this.skill = setSkill;
        this.average = 0;
    }
    setAverage() {
        let sumGrades = 0;
        for (let i = 0; i < this.grades.length; i++) {   
            sumGrades += parseInt(this.grades[i]);
        }
        this.average = (sumGrades / this.grades.length);
    }
}

app.use(express.static("./views/"));

var HTTP_PORT = process.env.PORT || 8080;

function onHttpStart() {
    console.log("Express http server listening on: " + HTTP_PORT);
}

app.engine(".hbs", exphbs({
    extname: ".hbs",
    defaultLayout: "main",
    helpers: {
        grades: function(context) {
            let out = "<ul>";
            let studentIndex = context.data.index
            let currentStudent = context.data.root.studentData;
            for (let i = 0; i < currentStudent[studentIndex].grades.length; i++) {
                out += "<li> Test:" + (i + 1) + " " + parseInt(currentStudent[studentIndex].grades[i]) + "%</li>";
            }
            out += "</ul>";
            return out;
        }
    }
}));

app.set("view engine", ".hbs");

app.get("/", function(req, res){
    fetch('https://www.hatchways.io/api/assessment/students')
    .then(response => response.json())
    .then(json => {
        for (let i = 0; i < json.students.length; i++) {
            let student = new Student(json.students[i].city, json.students[i].company, 
            json.students[i].email, json.students[i].firstName, json.students[i].grades, 
            json.students[i].id, json.students[i].lastName, json.students[i].pic, json.students[i].skill);
            student.setAverage();
            studentArray.push(student);
        }
        //console.log(studentArray)
        // console.log(gradesArray);
        res.render("home", { studentData: studentArray});

    });
});

app.listen(HTTP_PORT, onHttpStart);