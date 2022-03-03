const mongoose = require('mongoose')

const reqString = {
    type:String,
    require:true,
    trim:true
}

const vlogSchema = new mongoose.Schema({
    title:{type:String,required:true},
    image:{type:String,required:true},
    shortSummary:{type:String,required:true},
    webURL:{type:String},
    category:{type:String,required:true},
    city:{type:String,required:true},
    author:{type:String,required:true},
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    }
}, {
    timestamps: true,
    versionKey: false

}
)

const VlogSchema = mongoose.model("vlog",vlogSchema)

module.exports = VlogSchema