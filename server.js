const express = require("express")
const nunjucks = require("nunjucks")
const videos = require("./data")

const server = express()

server.use(express.static('public'))

// Configurar tamplate engine

server.set("view engine", "njk")

    // configurar o nunjuks
nunjucks.configure("views", {
    express: server,
    autoescape: false, // deixa o nunjucks executar tags HTML
    noCache: true
})

server.get("/", (req, res)=>{
    const about = {
        avatar_url: "https://avatars3.githubusercontent.com/u/62668777?s=400&u=91ef0dc11a68b62d3f48212dcc857cb0d3f786a1&v=4",
        name: "Rodrigo Lessa",
        role: "Dev JR",
        description: 'Futuro programador full stack estudando pela <a href="https://rocketseat.com.br/" target="_blank">Rocketseat</a>',
        links: [
            {name: "Github", URL: 'https://github.com/netrodslessa'},
            {name: "Twitter", URL: 'https://twitter.com/login?lang=pt'},
            {name: "Linkedin", URL: 'https://br.linkedin.com/'}
        ]
    }

    return res.render("about", { about })
})

server.get("/portfolio", (req, res)=>{

    return res.render("portfolio", {items: videos})
})

server.get("/video", (req, res)=>{
    const id = req.query.id
    
    const video = videos.find((video)=>{

        return video.id == id
    })

    if (!video){
        return res.send('video not found!')
    }
    
    return res.render("video", {item: video})
    
})

server.listen(5000, ()=>{
    console.log("server is running")
})