const {date} = require("../../lib/utils")
const db = require("../../config/db")
const { show } = require("../controllers/instructors")

module.exports = {
    all(callback) {
        db.query(`select * from instructors`, (err, results) => {
            if (err) return res.send("Database Error!", err)
            callback(results.rows)
        })
    },
    create(data, callback) {

        const query = `
            INSERT INTO instructors (
                avatar_url,
                name,
                birth,
                gender,
                services,
                created_at
            ) VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id
        `
        const values = [
            data.avatar_url,
            data.name,
            date(data.birth).iso,
            data.gender,
            data.services,
            date(Date.now()).iso
        ]

        db.query(query, values, (err, results) => {
            if (err) return res.send("Database Error!", err)
            callback(results.rows[0])
        })
    },
    find(id, callback){
        db.query(`
        SELECT * 
        FROM 
        instructors 
        WHERE id= $1`, [id], (err, results) => {
           if (err) return res.send("Database Error!")
            callback(results.rows[0])
        })
    },
    update(data, callback){
        const query = `
        UPDATE instructors SET
            avatar_url=($1),
            name=($2),
            birth=($3),
            gender=($4),
            services=($5)
        WHERE id = $6
        `

        const values = [
            data.avatar_url,
            data.name,
            date(data.birth).iso,
            data.gender,
            data.services,
            data.id
        ]
        db.query(query, values, (err, results)=>{
            if (err) return res.send("Database Error!", err)
            callback()
        })
    }
}