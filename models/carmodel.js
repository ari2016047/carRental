const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const carSchema = new Schema({
    model_val: {
        type: String,
        required: true
    },
    vehicle_no: {
        type: String,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    rent: {
        type: Number,
        required: true
    },
    bookings:[{
        customer_name: {
            type: String,
            required: false
        },
        mobile: {
            type: Number,
            required: false
        },
        start_date: {
            type: Number,
            required: false
        },
        end_date: {
            type: Number,
            required: false
        }
    }]
});



module.exports = mongoose.model('cars', carSchema);