const express = require('express')
const path = require('path')
const { engine } = require('express-handlebars')
// const logger = require('./middleware/logger')
const members = require('./Members')

const app = express()

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'))
// })

// Init middleware
// app.use(logger)

// Handlebars Middleware
app.engine(
  'handlebars',
  engine({ extname: '.handlebars', defaultLayout: 'main' })
)
app.set('view engine', 'handlebars')

// Body Parser
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Home Page Route
app.get('/', (req, res) =>
  res.render('index', {
    title: 'Members App',
    members,
  })
)

// Set static folder
app.use(express.static(path.join(__dirname, 'public')))

// Members API Routes
app.use('/api/members', require('./routes/api/members'))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
