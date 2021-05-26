const Movimento = require('../models/movimento')

module.exports = app => {
    app.get('/movimento', (req, res) => {
        Movimento.lista(res)
    })

    app.get('/movimento/:id',(req, res) => {
        const id = parseInt(req.params.id)
        Movimento.buscaPorId(id, res)
    })

    app.patch('/movimento/:id', (req, res) =>{
        const id = parseInt(req.params.id)
        const valores = req.body
        Movimento.altera(id, valores, res)
    })
    
    app.post('/movimento', (req, res) => {
        const movimento = req.body
        Movimento.adiciona(movimento, res)
    })
}
