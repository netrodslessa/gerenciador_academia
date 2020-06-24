const fs = require('fs')
const data = require("./data.json")
// CREATE
exports.post = (req, res)=>{
    //req.body
    // constructor é uma função que cria um objeto
    // return res.send(keys) // ["avatar_url",  "name",  "birth",  "gender",  "services" ]
    const keys = Object.keys(req.body)

    // percorrer o array
    // validação
    for(key of keys){
        if (req.body[key] == "")
            return res.send('Please, fill all fields!')
            // se estiver um campo vaziu, retorna o erro acima
            // se usar só uma linha após o if não precisa de {}
    }
    let {avatar_url, birth, created_at, id, name, services, gender} = req.body

    // mudar a data de nascimento
    birth = Date.parse(req.body.birth)

    // pegar a data do sistema
    created_at = Date.now()

    // inserindo chave primária -> number é outro constructor
    id = Number(data.instructors.length + 1)
    // desestruturando:
    

    // inserindo itens com o push, usa o objeto como parâmetro para organizar os dados
    data.instructors.push({
        avatar_url,
        birth, created_at, 
        id, 
        name, 
        services, 
        gender
    }) 
    // "data.json" -> local
    // JSON constructor 
    // stringify -> com o metodo passado o valor
    // callback -> função que retorna após executar algo, neste caso, escrever no writefile
    // a callback ajuda a não travar o aplicativo
    fs.writeFile("data.json", JSON.stringify(data, null, 2), (err)=>{
        if (err) return res.send("Write file error", err)
        return res.redirect("/instructors")
    })
    // return res.send(req.body) //{"avatar_url": "",  "name": "",  "birth": "",  "gender": "M",  "services": ""}
}
// UPDATE

// DELETE