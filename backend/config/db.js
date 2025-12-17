const mongoose=require('mongoose')

const connection=async()=>{
    try {
        mongoose.connection.on('connected',()=>console.log("database connected"))
        await mongoose.connect(`${process.env.MONGODB_URL}`)
    } catch (error) {
        console.error(error.message)
    }
}

module.exports =connection