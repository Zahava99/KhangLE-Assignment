require('dotenv').config({ path: 'assignment.env' })
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const connectDB = require('./config/db')
const session = require('express-session');
const path = require('path')
const app = express()
connectDB()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
// Session cho Web
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

// Cấu hình EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files
// app.use(express.static(path.join(__dirname, 'public')));
// Routes API (Token)
app.use('/api/users', require('./routes/user.routes'))
app.use('/api/categories', require('./routes/category.routes'))
app.use('/api/products', require('./routes/product.routes'))

//Routes Web (MVC)
// app.use('/dashboard', require('./webRoutes/dashboard.routes'))
// app.use('/login', require('./webRoutes/login.routes'))
app.use('/dashboard', require('./routes/dashboard.routes'));
app.use('/login', require('./routes/login.routes'));
app.use('/logout', require('./routes/logout.routes'));
//
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

//Swagger
const swaggerUi = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Assignment 1',
      version: '1.0.0'
    },
    servers: [{ url: 'http://localhost:5000' }],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [
      {
        BearerAuth: []
      }
    ]
  },
  apis: ['./routes/*.js'] // Đọc từ các route files
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))