const {age, date} = require("../../lib/utils")
const member = require("../models/Member")


module.exports = {
    index (req, res) {
        member.all((members)=>{
            return res.render('members/index', {members})
        })
    },
    create (req, res) {
        member.instructorsSelectOptions((options)=>{
            return res.render("members/create", { instructorOptions: options })

        })

    },
    post (req, res) {
        const keys = Object.keys(req.body)
        for(key of keys){
            if (req.body[key] == "")
                return res.send('Please, fill all fields!')
        }
        member.create(req.body, (member)=>{
            return res.redirect(`/members/${member.id}`)
        }) 
    },
    show (req, res) {
        member.find(req.params.id, (member)=>{
            if(!member) return res.send("Member not found!")
            member.age = age(member.birth)
            member.birth = date(member.birth).birthDay
            return res.render("members/show", { member })
        })
    },
    edit (req, res) {
        member.find(req.params.id, (member)=>{
            if(!member) return res.send("Member not found!")
            member.birth = date(member.birth).iso
            member.instructorsSelectOptions((options)=>{
                return res.render("members/edit", {member,  instructorOptions: options })
    
            })
        })
    },
    put (req, res) {
        const keys = Object.keys(req.body)
        for(key of keys) {
            if(req.body[key] == ""){
                return res.send("Member not found!")
            }
        }
        member.update(req.body, ()=>{
            return res.redirect(`members/${req.body.id}`)
        })
    },
    delete (req, res) {
        member.delete(req.body.id, ()=>{
            return res.redirect(`members`)
        }) 
    },
}
