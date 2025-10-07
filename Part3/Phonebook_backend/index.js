const express = require('express');
const app = express();
app.use(express.json())


let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]
app.get('/api/persons', (req, res) => {
    res.send(persons);
})

app.get('/info', (req, res) => {
    res.send(`Phonebook has info for ${persons.length} people. ${new Date()}`);
})

// ✅ single person by id
app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id
  const person = persons.find(p => p.id === id)

  if (person) {
    res.send(person)
  } else {
    res.status(404).send({ error: 'Person not found' })
  }
})

// ✅ POST — add a new person
app.post('/api/persons', (req, res) => {
  const body = req.body

  // ❌ Missing data check
  if (!body.name || !body.number) {
    return res.status(400).json({ error: 'Name or number missing' })
  }

  // 🆔 Generate random unique ID
  const newPerson = {
    id: Math.floor(Math.random() * 1000000).toString(),
    name: body.name,
    number: body.number
  }

  persons = persons.concat(newPerson)

  res.send(newPerson)
})

// ✅ Delete person by id
app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id
  persons = persons.filter(p => p.id !== id)
  res.status(204).end()
})
 
app.listen(3001, () => {
    console.log('Server running on port 3001');
})