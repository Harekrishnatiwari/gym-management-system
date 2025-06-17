const Membership = require('../Modals/membership');



exports.addMembership = async (req, res) => {
    try {
        // Check if req.gym exists
        if (!req.gym) {
            return res.status(404).json({ error: 'Gym information is missing' });
        }

        const { months, price } = req.body;

        const memberShip = await Membership.findOne({ gym: req.gym._id, months });  // Use findOne instead of find for better result

        if (memberShip) {
            memberShip.price = price;
            memberShip.months = months;
            await memberShip.save();
            return res.status(200).json({
                message: "Updated Successfully"
            });
        } else {
            const newMembership = new Membership({ price, months, gym: req.gym._id });
            await newMembership.save();
            return res.status(200).json({
                message: "Added Successfully"
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: "Server Error"
        });
    }
};


exports.getmembership=async(req,res)=>{
    try{
        const loggedInId = req.gym._id;
        const memberShip = await Membership.find({gym:loggedInId});
                res.status(200).json({
                    message:"Membership Fetched Successfully",
                    membership:memberShip
                   })
    }catch(err){
        console.log(err);
        res.status(500).json({
            error:"Server Error"
        })
    }
}