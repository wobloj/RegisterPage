import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{type:String, required:true},
    email:{type:String, required:true},
    authentication:{
        password:{type:String, required:true, select:false},
        salt:{type:String, select:false},
        token:{type:String, select:false},
    }
})

export const UserModel = mongoose.model('User', userSchema);

export const getUsers = () => UserModel.find();
export const getUserByEmail = (email: string) => UserModel.findOne({email});
export const getUserByToken = (token: string) => UserModel.findOne({'authentication.token': token});
export const getUserById = (id: string) => UserModel.findById(id);
export const createUser = (values: Record<string, any>) => new UserModel(values).save().then((user) => user.toObject());
export const deleteUserById = (id:string) => UserModel.findOneAndDelete({_id:id});
export const updateUserById = (id:string, values: Record<string, any>) => UserModel.findOneAndUpdate({ id, values }, { new: true });
