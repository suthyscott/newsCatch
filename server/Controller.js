module.exports = {
    saveArticle: async (req, res) => {
        const db = req.app.get('db');
        const {title, name, author, description, url, urlToImage, content, publishedAt} = req.body
        const {user_id} = req.session.user

        await db.save_article({title, name, author, description, url, urlToImage, content, user_id, publishedAt})

        res.sendStatus(200)
    }, 

    getSavedArticles: async (req, res) => {
        const db = req.app.get('db');
        const {user_id} = req.session.user

        let usersArticles = await db.get_saved_articles(user_id)

        res.status(200).send(usersArticles)

    },

    deleteArticle: async (req, res) => {
        console.log('hit deleteArticle')
        const db = req.app.get('db')
        console.log(req.params)
        const {id} = req.params

        await db.delete_saved_article(id)
        res.status(200).send('article deleted.')
    }
}