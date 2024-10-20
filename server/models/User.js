const {Schema,model} = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new Schema(
    {
        username:{
            type:String,
            unique:true,
            required:true,
            trim:true
        },
        password:{
            type:String,
            unique:true,
            required:true,
            trim:true
        },
        schedule:[{
            type:Schema.Types.ObjectId,
            ref:'day'
        }],
        journal:[{
            type:Schema.Types.ObjectId,
            ref:'entry'
        }]
    },
)

userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        this.passord = await bcrypt.hash(this.password,10)
    }
})

userSchema.methods.isCorrectPassword = async function (password){
    return bcrypt.compare(password,this.password)
}

const User = model('user',userSchema)
module.exports = User