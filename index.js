
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

let users = [];

// Create a user
app.post('/users', (req, res) => {
    const user = req.body;
    user.id = users.length + 1;
    users.push(user);
    res.status(201).send(user);
});

// Get all users
app.get('/users', (req, res) => {
    res.send(users);
});

// Get a single user by ID
app.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id == req.params.id);
    if (user) {
        res.send(user);
    } else {
        res.status(404).send({ message: 'User not found' });
    }
});

// Update a user
app.put('/users/:id', (req, res) => {
    const user = users.find(u => u.id == req.params.id);
    if (user) {
        Object.assign(user, req.body);
        res.send(user);
    } else {
        res.status(404).send({ message: 'User not found' });
    }
});

// Delete a user
app.delete('/users/:id', (req, res) => {
    const index = users.findIndex(u => u.id == req.params.id);
    if (index > -1) {
        users.splice(index, 1);
        res.status(204).send();
    } else {
        res.status(404).send({ message: 'User not found' });
    }
});

app.listen(port, () => {
    console.log(`Backend server is running at http://localhost:${port}`);
});
