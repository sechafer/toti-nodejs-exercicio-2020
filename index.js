const express = require('express')
const { Sequelize, DataTypes } = require('sequelize')


const app = express ();
const sequelize = new Sequelize ({
    dialect: 'sqlite',
    storage:'./task-101.db'
});

const Task = require ('./models/tasks')
const tasks = Task ( sequelize, DataTypes)
// We need to parse JSON coming from requests

app.use(express.json())

/*/ List tasks
app.get('/tasks', (req, res) => {
  res.json({ action: 'Listing tasks' })
})*/

// Create task
/* app.post('/tasks', (req, res) => {
  const body = req.body

  res.json(body)
}) */

app.get('', (req, res) =>{
  res.send ('<h1>Home task</h1>')
})

app.get('/tasks', async (req, res) =>{    
  const task1 = await tasks.findAll()
  res.json ({ action: task1 })
  })

app.get('/tasks/:id', async (req, res) =>{
  const task1_ID = req.params.id 
  const task1 = await tasks.findByPk(task1_ID)
  res.json({ task1 })
})

app.post('/tasks', async (req, res) =>{
  const body = req.body
  const new_task = await tasks.create({
      description: body.description,
      done: body.done
  })
  res.json({ new_task })
})

app.put('/tasks/:id', async (req, res) =>{
  try{
      const task1_ID = req.params.id
      const body = req.body
      const task1 = await tasks.findByPk(task1_ID)
      task1.update({
          description: body.description,
          done: body.done
      });        
      res.send({ action: 'Update task', task1:task1 })
  } catch (error) {
      return res.send( `<h1> Error Update: </h1><br><h2>Server error:</h2><br><h2>${error}</h2>`)
  }
})


app.delete('/tasks/:id', async (req, res) => {
  try{
      const ID = req.params.id
      const delete_task = await tasks.destroy({ where: { ID: ID } })
      res.send({ action: 'Delete task', delete_task: delete_task })
  } catch (error) {
      return res.send( `<h1>Error Delete </h1><br><h2> Server error:</h2><br><h2>${error}</h2>`)
  }
})

app.listen(8080, () => {
  console.log('Listening port number 8080')
})
