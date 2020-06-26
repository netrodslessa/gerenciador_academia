const instructor = require('../models/instructor')
const {age, date} = require("../../lib/utils")

module.exports = {
    index (req, res) {
        instructor.all((instructors)=>{
            return res.render('instructors/index', {instructors})
        })
    },
    create (req, res) {
        return res.render("instructors/create")
    },
    post (req, res) {
        const keys = Object.keys(req.body)
        for(key of keys){
            if (req.body[key] == "")
                return res.send('Please, fill all fields!')
        }
        instructor.create(req.body, (instructor)=>{
            return res.redirect(`/instructors/${results.rows[0].id}`)
        }) 
    },
    show (req, res) {
        instructor.find(req.params.id, (instructor)=>{
            if(!instructor) return res.send("Instructor not found!")

            instructor.age = age(instructor.birth)
            instructor.services = instructor.services.split(',')
            instructor.created_at = date(instructor.created_at).format
            return res.render("instructors/show", { instructor })
        })
    },
    edit (req, res) {
        instructor.find(req.params.id, (instructor)=>{
            if(!instructor) return res.send("Instructor not found!")

            instructor.birth = date(instructor.birth).iso
            return res.render("instructors/edit", {instructor})
        })
    },
    put (req, res) {
        const keys = Object.keys(req.body)
        for(key of keys) {
            if(req.body[key] == ""){
                return res.send
            }
        }
        instructor.update(req.body, ()=>{
            return res.redirect(`instructors/${req}`)
        })
    },
    delete (req, res) {
        return 
    },
}
