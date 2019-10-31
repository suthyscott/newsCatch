module.exports = {
    saveArticle: async (req, res) => {
        const db = req.app.get('db');
        const {title, name, author, description, url, urlToImage, content, publishedAt} = req.body
        const {user_id} = req.session.user

        console.log(name)

        await db.save_article({title, name, author, description, url, urlToImage, content, user_id, publishedAt})

        res.sendStatus(200)
    }
}