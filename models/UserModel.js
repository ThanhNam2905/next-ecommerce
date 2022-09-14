import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
    {
        name: { type: String, require: true},
        email: { type: String, require: true, unique: true},
        password: { type: String, require: true},
        isAdmin: { type: Boolean, require: true, default: false},
        avatar: { type: String, require: true, default: 'https://www.shareicon.net/profession-occupation-professions-and-jobs-people-user-avatar-job-businessman-868320'},
        numberPhone: { type: String, require: true}
    }, {
        timestamps: true
    }
);

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;