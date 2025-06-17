const express = require('express');
const bodyParser = require('body-parser');

// My Database Array
const myDatabase = [
    { id: 1, name: 'Item 1', description: 'This is item 1' },
    { id: 2, name: 'Item 2', description: 'This is item 2' },
    { id: 3, name: 'Item 3', description: 'This is item 3' },
    { id: 4, name: 'Item 4', description: 'This is item 4' },
    { id: 5, name: 'Item 5', description: 'This is item 5' },
    { id: 6, name: 'Item 6', description: 'This is item 6' },
    { id: 7, name: 'Item 7', description: 'This is item 7' },
    { id: 8, name: 'Item 8', description: 'This is item 8' },
    { id: 9, name: 'Item 9', description: 'This is item 9' },
    { id: 10, name: 'Item 10', description: 'This is item 10' }
];

// Initialize the Express application
const app = express();
const port = 3000;
app.use(express.json());

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/items', (req, res) => {
    res.json(myDatabase);
});

app.get('/items/:id', (req, res) => {
    try{
        const itemId = parseInt(req.params.id, 10);
        const item = myDatabase.find(i => i.id === itemId);
        
        if (item) {
            res.json(item);
        } else {
            res.status(404).send('Item not found');
        }
    } catch(err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/post-items', (req, res) => {
    try {
        const { name, description } = req.body;

        if (!name || !description) {
            return res.status(400).send('Name and description are required');
        }

        const newItem = {
            id: myDatabase.length + 1,
            name,
            description
        };

        myDatabase.push(newItem);
        res.status(201).json(newItem);
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
});

app.put('/update-items/:id', (req, res) => {
    try {
        const itemId = parseInt(req.params.id, 10);
        const { name, description } = req.body;

        if (!name || !description) {
            return res.status(400).send('Name and description are required');
        }

        const itemIndex = myDatabase.findIndex(i => i.id === itemId);

        if (itemIndex !== -1) {
            myDatabase[itemIndex] = { id: itemId, name, description };
            res.json(myDatabase[itemIndex]);
        } else {
            res.status(404).send('Item not found');
        }
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
});

app.delete('/delete-items/:id', (req, res) => {
    try {
        const itemId = parseInt(req.params.id, 10);
        const itemIndex = myDatabase.findIndex(i => i.id === itemId);

        if (itemIndex !== -1) {
            myDatabase.splice(itemIndex, 1);
            res.status(204).send();
        } else {
            res.status(404).send('Item not found');
        }
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
});

