const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookingSchema = new Schema({
        car_id: { 
            type: Schema.Types.ObjectId,
            ref: 'cars' 
        },
        customer_name: {
            type: String,
            required: true
        },
        mobile: {
            type: Number,
            required: true
        },
        from:{
            type: Number,
            required: true
        },
        to:{
            type: Number,
            required: true
        }
   
});



module.exports = mongoose.model('booking', bookingSchema);