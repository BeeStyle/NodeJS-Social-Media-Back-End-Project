import mongoose from 'mongoose'
const connectDB = async () => {
    return await mongoose.connect(process.env.LOCALDBURI)
        .then(result => {
            console.log(`DB Connected`);
        }).catch(err => console.log(`Fail to connectDB... ${err}`))
}
export default connectDB