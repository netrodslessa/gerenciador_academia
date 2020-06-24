module.exports = {

    age: (timeStamp) => {
        const today = new Date()
        const birthDate = new Date(timeStamp)

        let age = today.getFullYear() - birthDate.getFullYear()

        const month = today.getMonth() - birthDate.getMonth()

        if (month < 0 || month == 0 && today.getDate <= birthDate.getDate()) {
            age -= 1
        }

        return age
    },
    date: (timeStamp) =>{
        const date = new Date(timeStamp)
        // YYYY
        const year = date.getUTCFullYear()
        // MM
        const month = `0${date.getUTCMonth() + 1}`.slice(-2)
        // DD
        const day = `0${date.getUTCDate()}`.slice(-2)

        return `${year}-${month}-${day}`
    }
}