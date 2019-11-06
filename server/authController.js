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
    },

    logout: (req, res) => {
        req.session.destroy();
        res.sendStatus(200)
    },

    checkUser: (req, res) => {
        if(req.session.user){
            res.status(200).send(req.session.user)
        } 
        res.sendStatus(200)
    },

    getUserInfo: async (req, res) => {
        console.log('hit getUserInfo')
        const db = req.app.get('db');
        console.log(req.session.user)
        const {user_id} = req.session.user

        let userInfo = await db.get_user_info(user_id);
        userInfo = userInfo[0]
        delete userInfo.password
        res.status(200).send(userInfo);             
    },

    updateUserInfo: async (req, res) => {
        const db = req.app.get('db');
        const {email, first_name, last_name, currentPassword, newPassword} = req.body
        const {user_id} = req.session.user

        // let foundUser = await db.check_email(email)
        // foundUser = foundUser[0]

        // const authenticated = bcrypt.compareSync(currentPassword, foundUser.password)

        // if(authenticated){
        //     let userInfo = await db.get_user_info(user_id);
        //     res.status(200).send(userInfo)
        // } else {
        //     res.status(401).send('Current password is not correct.')
        // }

        let userInfo = await db.update_user_info({user_id, email, first_name, last_name, password})

        res.status(200).send(userInfo)
    }   
}