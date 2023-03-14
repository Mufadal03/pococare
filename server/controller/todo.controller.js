const axios = require('axios')
const getTodos = async(req, res) => {
    try {
        const { data } = await axios.get('https://dummyjson.com/todos?limit=20')
        res.status(200).send(data)
    } catch (error) {
        res.status(400).send({response:'something went wrong'})
    }
}





module.exports={getTodos}