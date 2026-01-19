const express = require('express');
const server = express();

server.set('view engine', 'ejs');
server.use(express.urlencoded());

let tasks = [
    {
        no: '1',
        tname: 'jogging',
        tdes: 'benificial for my physical health ',
        tdate: '12/1/2025'
    },
    {
        no: '2',
        tname: 'reading',
        tdes: 'benificial for my mental health ',
        tdate: '12/1/2025'
    },
    {
        no: '3',
        tname: 'study',
        tdes: 'benificial for my career health ',
        tdate: '12/1/2025'
    },
    {
        no: '4',
        tname: ' water',
        tdes: 'benificial for my body',
        tdate: '12/1/2025'
    }
];

server.post('/add-task', (req, res) => {
    tasks.push(req.body);
    console.log('Tasks added success');
    return res.redirect('/');
})

server.get("/delete-task/:no", (req, res) => {
    let no = req.params.no;
    tasks = tasks.filter(task => task.no != no);
    return res.redirect('/');
})

server.get("/edit-task/:no", (req, res) => {
    let no = req.params.no;
    let record = tasks.find(task => task.no == no);
    return res.render('updateTask', { task: record });
})

server.post('/update-task', (req, res) => {
    let { no, name, des, date } = req.body;

    tasks = tasks.map(task => {
        if (task.no == no) {
            task.tname = name;
            task.tdes = des;
            task.tdate = date;
        }
        return task;
    });

    return res.redirect("/");
})

server.get('/', (req, res) => {
    res.render('index', { tasks });
})

server.listen(8001, () => {
    console.log(`Server Start at http://localhost:8001`);
})