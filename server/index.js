 require('dotenv').config()
 
 const express = require('express')
 const massive = require('massive')
 const session = require('express-session')
 const app = express()

 const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env
 const authCtrl = require('./authController')
 const ctrl = require('./Controller')

 app.use(express.json())

 massive(CONNECTION_STRING).then(db => {
     app.set('db', db);
     console.log('DB connected')
 })

 app.use(session({
     resave: false,
     saveUninitialized: true,
     secret: SESSION_SECRET,
     cookie: {
         maxAge: 1000 * 60 * 60 * 8
     }
 }))

//  Auth endpoints
app.post('/api/auth/register', authCtrl.register)
app.post('/api/auth/login', authCtrl.login)
app.post('/api/auth/logout', authCtrl.logout)
app.get('/api/auth/user', authCtrl.checkUser)

app.post('/api/article', ctrl.saveArticle)
app.get('/api/savedarticles', ctrl.getSavedArticles)

 const port = SERVER_PORT

 app.listen(port, () => console.log(`Take us to warp ${port}!`))