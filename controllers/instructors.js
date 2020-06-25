const fs = require('fs')
const data = require("../data.json")
const {age, date} = require("../utils")

// INDEX -> TABLE

exports.index = (req, res)=>{
    
    return res.render('instructors/index', { instructors: data.instructors })
}

// SHOW
exports.show = (req,res) => {
    // req.params -> usa-se os :
    const {id} = req.params
    const foundInstructor = data.instructors.find((instructor)=>{
        return id == instructor.id 
    })
    if (!foundInstructor) return res.send("Instructor not found!")

    const instructor = {
        ...foundInstructor,// coloca tudo que tem dentro do objeto
        age: age(foundInstructor.birth),
        service: foundInstructor.services.split(","),
        created_at: new Intl.DateTimeFormat('pt-BR').format(foundInstructor.created_at),
    }

    return res.render("./instructors/show", {instructor})
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
    const id = Number(data.instructors.length + 1)
    // desestruturando:
    

    // inserindo itens com o push, usa o objeto como parâmetro para organizar os dados
    data.instructors.push({
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
        return res.redirect("/instructors")
    })
    // return res.send(req.body) //{"avatar_url": "",  "name": "",  "birth": "",  "gender": "M",  "services": ""}
}

// CREATE
exports.create = (req, res)=>{
    return res.render("instructors/create")
}

// EDIT

exports.edit = (req, res)=>{
    // req.params -> usa-se os :
    const {id} = req.params
    const foundInstructor = data.instructors.find((instructor)=>{
        return id == instructor.id 
    })
    if (!foundInstructor) return res.send("Instructor not found!")

    const instructor = {
        ...foundInstructor,
        birth: date(foundInstructor.birth)
    }

    return res.render('instructors/edit', { instructor })
}

// PUT

exports.put = (req, res) =>{
    const {id} = req.body
    let index = 0
    const foundInstructor = data.instructors.find((instructor, foundIndex)=>{
        if (id == instructor.id){
            index = foundIndex
            return true;
        }
    })
    if (!foundInstructor) return res.send("Instructor not found!")

    const instructor = {
        ...foundInstructor,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }

    data.instructors[index] = instructor

    fs.writeFile("data.json", JSON.stringify(data, null, 2), (err)=>{
        if (err) return res.send("Write error: ", err)

        return res.redirect(`/instructors/${id}`)
    })
}

// DELETE

exports.delete = (req, res) =>{
    const { id } = req.body

    const filteredInstructors = data.instructors.filter((instructor)=>{
        return instructor.id != id
    })

    data.instructors = filteredInstructors

    fs.writeFile("data.json", JSON.stringify(data, null, 2), (err)=>{
        if(err) return res.send("Write error: ", err)
    })

    return res.redirect("/instructors")
}