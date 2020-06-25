const fs = require('fs')
const data = require("./data.json")
const {age, date} = require("./utils")

// INDEX -> TABLE

exports.index = (req, res)=>{
    
    return res.render('members/index', { members: data.members })
}

// SHOW
exports.show = (req,res) => {
    // req.params -> usa-se os :
    const {id} = req.params
    const foundMember = data.members.find((member)=>{
        return id == member.id 
    })
    if (!foundMember) return res.send("member not found!")

    const member = {
        ...foundMember,// coloca tudo que tem dentro do objeto
        age: age(foundMember.birth),
    }

    return res.render("./members/show", {member})
}

// POST
exports.post = (req, res) => {
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
    let {avatar_url, birth, name, services, gender} = req.body

    // mudar a data de nascimento
    birth = Date.parse(birth)

    // pegar a data do sistema
    const created_at = Date.now()

    // inserindo chave primária -> number é outro constructor
    const id = Number(data.members.length + 1)
    // desestruturando:
    

    // inserindo itens com o push, usa o objeto como parâmetro para organizar os dados
    data.members.push({
        id, 
        name, 
        avatar_url,
        birth, 
        services, 
        gender,
        created_at 
    }) 
    // "data.json" -> local
    // JSON constructor 
    // stringify -> com o metodo passado o valor
    // callback -> função que retorna após executar algo, neste caso, escrever no writefile
    // a callback ajuda a não travar o aplicativo
    fs.writeFile("data.json", JSON.stringify(data, null, 2), (err)=>{
        if (err) return res.send("Write file error", err)
        return res.redirect("/members")
    })
    // return res.send(req.body) //{"avatar_url": "",  "name": "",  "birth": "",  "gender": "M",  "services": ""}
}
// CREATES

exports.create = (req, res)=>{
    return res.render("members/create")
}

// EDIT

exports.edit = (req, res)=>{
    // req.params -> usa-se os :
    const {id} = req.params
    const foundMember = data.members.find((member)=>{
        return id == member.id 
    })
    if (!foundMember) return res.send("member not found!")

    const member = {
        ...foundMember,
        birth: date(foundMember.birth)
    }

    return res.render('members/edit', { member })
}

// PUT

exports.put = (req, res) =>{
    const {id} = req.body
    let index = 0
    const foundMember = data.members.find((member, foundIndex)=>{
        if (id == member.id){
            index = foundIndex
            return true;
        }
    })
    if (!foundMember) return res.send("member not found!")

    const member = {
        ...foundMember,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }

    data.members[index] = member

    fs.writeFile("data.json", JSON.stringify(data, null, 2), (err)=>{
        if (err) return res.send("Write error: ", err)

        return res.redirect(`/members/${id}`)
    })
}

// DELETE

exports.delete = (req, res) =>{
    const { id } = req.body

    const ilteredMembers = data.members.filter((member)=>{
        return member.id != id
    })

    data.members = ilteredMembers

    fs.writeFile("data.json", JSON.stringify(data, null, 2), (err)=>{
        if(err) return res.send("Write error: ", err)
    })

    return res.redirect("/members")
}