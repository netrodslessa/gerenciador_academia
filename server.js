const express = require("express")
const nunjucks = require("nunjucks")
const routes = require("./routes")
const methodOverride = require("method-override")

const server = express()
// responsável por fazer  funcionar o req.body 
server.use(express.urlencoded({extended:true}))

server.use(express.static('public'))
// usar o put e delete
server.use(methodOverride('_method'))

server.use(routes)


// Configurar tamplate engine

server.set("view engine", "njk")

    // configurar o nunjuks
nunjucks.configure("views", {
    express: server,
    autoescape: false, // deixa o nunjucks executar tags HTML
    noCache: true
})



server.listen(5000, ()=>{
    console.log("server is running")
})