const express = require('express')
const routes = express.Router()
const instructors = require("./controllers/instructors")
const members = require("./controllers/members")

routes.get('/', (req, res)=>{
    return res.redirect('/instructors')
})

routes.get("/instructors", instructors.index)

routes.get("/instructors/create", instructors.create)

routes.get('/instructors/:id', instructors.show)

routes.get('/instructors/:id/edit' , instructors.edit)

routes.post("/instructors", instructors.post)

// HTTP   -> estamos usando o protocolo HTTP ->
// VERBS HTTP:
// GET    -> Receber -> RESOURCE (ENTIDADE QUE REPRESENTA UM OBJETO)
// POST   -> Criar um Novo RESOURCE com dados enviados
// PUT    -> Atualizar -> RESOURCE
// DELETE -> Deletar -> RESOURCE

routes.put("/members", members.put)

routes.delete("/members", members.delete)

// MEMBERS === === === === === === === === === === === 

routes.get("/members", members.index)

routes.get("/members/create", members.create)

routes.get('/members/:id', members.show)

routes.get('/members/:id/edit' , members.edit)

routes.post("/members", members.post)

// HTTP   -> estamos usando o protocolo HTTP ->
// VERBS HTTP:
// GET    -> Receber -> RESOURCE (ENTIDADE QUE REPRESENTA UM OBJETO)
// POST   -> Criar um Novo RESOURCE com dados enviados
// PUT    -> Atualizar -> RESOURCE
// DELETE -> Deletar -> RESOURCE

routes.put("/instructors", instructors.put)

routes.delete("/instructors", instructors.delete)

routes.get("/members", (req, res)=>{
    return res.render('members')
})

module.exports = routes