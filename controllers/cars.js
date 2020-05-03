const Cars = require('../models/carmodel');
const Booking = require('../models/booking');

exports.showCars = (req,res,next) => {
    Cars.find()
    .then(cars => {
        console.log(cars);
        res.status(200).json(cars);
    })
    .catch(err =>{
        console.log(err);
    });
};

exports.getCar = (req,res,next) =>{
    const carId = req.params.carId;
    Cars.findById(carId)
    .then(car =>{
        var result=[],i;
        var books = car.bookings;
        var current_date = Number((new Date()).getTime());
        for(i=0;i<books.length;i++){
            if(books[i].end_date>=current_date && books[i].start_date<=current_date){
                result.push(books[i]);
            }
        }
        res.status(200).json({
            message: 'Car and its currently Active Booking Details',
            model: car.model_val,
            vehicle_no: car.vehicle_no,
            capacity: car.capacity,
            rent_per_day: car.rent,
            current_active_booking: result
        })
    })
    .catch(err => {
        console.log(err);
    });
};

exports.addCars = (req,res,next) => {
    const model_val = req.body.model_val;
    const vehicle_no = req.body.vehicle_no;
    const capacity = req.body.capacity;
    const rent = req.body.rent;

    const car = new Cars({
        model_val: model_val,
        vehicle_no: vehicle_no,
        capacity: capacity,
        rent: rent
    });
    car.save()
    .then(result =>{
        console.log('Car added Successfully');
        res.status(201).json({
            message:'New Car added Successfully!',
            Car: car
        });
    })
    .catch(err =>{
        console.log(err);
    });
    //201 success + addition to db
    
};

exports.bookCars = (req,res,next) => {
    const carId = req.params.carId;
    const cust_name = req.body.customer_name;
    const mob = req.body.mobile;
    let from = new Date(req.body.start_date);
    from = from.getTime();
    let to = new Date(req.body.end_date);
    to = to.getTime();

    //booking db
    const booking = new Booking({
        car_id: carId,
        customer_name: cust_name,
        mobile: mob,
        from: from,
        to: to
    });

    booking.save()
    .then(result => {
        console.log('Booking successful');
    })
    .catch(err => {
        console.log(err);
    });

    //car db
    Cars.findById(carId)
    .then(car =>{
        car.bookings.push({
            customer_name: cust_name,
            mobile: mob,
            start_date: from,
            end_date: to
        });
        car.save()
        .then(result => {
            console.log('Booking added to car db');
            res.status(201).json({
                message:'Car Booked Successfully!',
                model_val: car.model_val,
                vehicle_no: car.vehicle_no,
                booked_by: cust_name,
                mobile_no: mob,
                issue_date: new Date(from),
                return_date: new Date(to)
            });
            
        })
        .catch(err => {
            console.log(err);
        });
    })
    .catch(err => {
        console.log(err);
    });
};

exports.filterCars = (req,res,next) => {
    const cap = req.body.capacity;
    let frm_date = new Date(req.body.start_date);
    let to_date = new Date(req.body.end_date);
    if(frm_date){
        frm_date = frm_date.getTime();
    }
    if(to_date){
        to_date = to_date.getTime();
    }    


    var arr1=[],arr2=[];
    Cars.find({
        capacity:{$eq:cap}
    })
    .then(car =>{
        arr1 = car;
        console.log('!!!!!',arr1);
    })
    .catch(err =>{
        console.log(err);
    });

    Booking.find({$or: [
        {from:{ $lte: frm_date},to: {$gte: frm_date}},
        {from:{ $lte: to_date},to: {$gte: to_date}}
    ]},
    {car_id:1,_id:0}
    )
    .then(book =>{
        arr2 = book;
        var i,result=[];
        if(arr2.length == 0){
            result = arr1;
        }
        for(i=0;i<arr2.length;i++){
            result.push(arr1.find(function checkAdult(x) {
                return (x._id).toString() !== (arr2[i].car_id).toString();
            }));
        }
        console.log(result);
        res.status(200).json({
            message:'Available cars:',
            cars: result
        });
    })
    .catch(err=>{
        console.log(err);
    });

};

exports.deleteCar = (req,res,next)=>{
    const carId = req.params.carId;
    var result=[];
    Cars.findById(carId)
    .then(car =>{
        var i;
        var books = car.bookings;
        var current_date = Number((new Date()).getTime());
        for(i=0;i<books.length;i++){
            if(books[i].end_date>=current_date){
                result.push(books[i]);
            }
        }
        return result;
    })
    .then(result =>{

        console.log(result);
        if(result.length==0){
            Cars.findByIdAndRemove(carId)
            .then(x =>{
                res.status(201).json({
                    message: 'Car Deleted Successfully',
                });
            })
            .catch(err =>{
                console.log(err);
            });
        }
        else{
            res.status(200).json({
                message: 'Deletion failed due to current/future bookings',
            });
        }


    })
    .catch(err => {
        console.log(err);
    });
    

};

exports.updateCar = (req,res,next)=>{
    const model_val = req.body.model_val;
    const vehicle_no = req.body.vehicle_no;
    const capacity = req.body.capacity;
    const rent_per_day = req.body.rent; 
    const carId = req.params.carId;
    var result=[];
    console.log(carId);
    Cars.findById(carId)
    .then(car =>{
        var i;
        var books = car.bookings;
        var current_date = Number((new Date()).getTime());
        for(i=0;i<books.length;i++){
            if(books[i].end_date>=current_date){
                result.push(books[i]);
            }
        }

        console.log(result);
        if(result.length==0){
            car.model_val = model_val,
            car.vehicle_no = vehicle_no,
            car.capacity = capacity,
            car.rent = rent_per_day

            return car.save();
            
        }
        else{
            res.status(200).json({
                message: 'Updation failed due to current/future bookings',
            });
        }
    })
    .then(result =>{
            res.status(201).json({
                message: 'Car Updated Successfully',
            });
    })
    .catch(err => {
        console.log(err);
    });
    
    
};