const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const reqString = {
    type: String,
    required: true,
    trim: true,
};
const User = new mongoose.Schema(
  {
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique:true },
    password: { type: String, required: true },
    admin: { type: Boolean, required: true },
    username:{type:String,required:true},
    tokens: [
        {
            token: reqString,
        },
    ],
    vlog: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'vlog', required: true },
    ],
  },
  {
    versionKey: false,
    timestamps: true,

},
);
User.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8);
    }
    next();
});

User.methods.generateAuthToken = async function () {
    try {
        // jwt.sign(payload, secretOrPrivateKey,[optional,callback])
        const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET_KEY);
        this.tokens = this.tokens.concat({ token: token });
        await this.save();
        return token;
    } catch (err) {
        console.log(err);
    }
};
const model = mongoose.model("user", User);

module.exports = model

