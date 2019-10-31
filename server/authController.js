const bcrypt = require('bcryptjs')

module.exports = {
    register: async (req, res) => {
        console.log('hit register function')
        const {firstName, lastName, email, password} = req.body
        const db = req.app.get('db');

        let foundUser = await db.check_email(email);
        foundUser = foundUser[0]
        if(foundUser){
           return res.status(409).send('An account with that email already exists.')
        }

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)

        let newUser = await db.register({firstName, lastName, email, password: hash})
        newUser = newUser[0]
        req.session.user = {...newUser}
        res.status(200).send(req.session.user)
    },

    login: async (req, res) => {
        const {email, password} = req.body;
        const db = req.app.get('db');

        let foundUser = await db.check_email(email)
        foundUser = foundUser[0]
        if(!foundUser){
            res.status(401).send('An account with that email does not exist.')
        }

        const authenticated = bcrypt.compareSync(password, foundUser.password)

        if(authenticated){
            delete foundUser.password
            req.session.user = foundUser
            return res.status(202).send(req.session.user)
        } else {
            res.status(401).send('Password is incorrect')
        }

        // console.log(req.session)
    },

    logout: (req, res) => {
        // console.log('hit logout', req.session)
        req.session.destroy();
        // console.log(req.session)
        res.sendStatus(200)
    },

    checkUser: (req, res) => {
        // console.log('hit checkUser', req.session)
        if(req.session.user){
            res.status(200).send(req.session.user)
        } 
        res.sendStatus(200)
    }   
}