const Subscriber = require("../models/subscriber.model");
const Phone = require("../models/phone.model");

/* Get all subscribers in the collection */ 
exports.getAllSubscribers = async (req, res) => {
    await Subscriber.find({}, "name phone -_id")
        .populate({path: "phone", select: "number -_id"})
        .lean()   
        .then(subscribers => {
            res.status(200).send({ subscribers });
        })
        .catch(err => {
            return res.status(400).send({ error: `${err}` })
        });
};

/* Get a subscriber by phone number */
exports.getByPhone = async (req, res) => {
    // Find phone
    await Phone.findOne({ number: req.params.phone })
    .then(phone => {
        if (phone == null || phone.length == 0) return res.status(404).send({ error: `[x] Sorry! the phone number ${req.params.phone} does not exist.` });
        // Find subscriber
         Subscriber.findOne({ "phone": phone._id })
            .then(subscriber => {
                if (subscriber == null || subscriber.length == 0)
                    return res.status(404).send({ error: "[x] Sorry! there is no subscriber to this number." });
                res.status(200).send(subscriber.name);
            })
    })
    .catch(err => {
        return res.status(400).send({ error: `${err}` });
    });
};

/* Get phone numbers of a subscriber */
exports.getByName = async (req, res) => {
    await Subscriber
        .find({
            name: req.params.name.toLowerCase()
        }, "name -_id")
        .populate({ path: "phone", select: "number -_id" })
        .lean()
        .then(subscriber => {
            if (subscriber == null || subscriber.length == 0) 
                return res.status(404).send({ error: `[x] Sorry! there is no subscriber with this name.` });
            res.status(200).send(subscriber);
        })
        .catch(err => {
            return res.status(400).send({ error: `${err}` });
        });
};

/* Insert a new subscriber */
exports.createNew = async (req, res) => {
    let { name, phone } = req.body;

    // Add phone
    let newPhone = new Phone({ number: phone });

    await newPhone
        .save()
        .then(phone => {
            // Add subscriber
            Subscriber.findOneAndUpdate(
                { name: name.toLowerCase() }, 
                { $push: {phone: phone} }, 
                { new: true, upsert: true }
            )
            .then(subscriber => {
                res.status(201).send({ subscriber: subscriber });
            }).catch(err => {
                return res.status(400).send({ error: `${err}` });
            });
        });
};

/* Removes a subscriber by name and phone number */
exports.remove = async (req, res) => {
    let {number, name} = req.body;

    /* Approach #1: A user might have multiple phone numbers, and since
    *   that phone number can only be used be him/her, we should delete them
    *   before deleting the user.
    */
    Subscriber
        .find({name: name.toLowerCase()}, "-_id phone")
        .populate({ path: "phone", select: "_id -number" })
        .lean()
        .then(subscriber => {
            if (subscriber == null || subscriber.length == 0) {
                return res.status(404).send({ error: "[x] Sorry! there is no subscriber with this name." });
            }
            let phoneIds = [];
            subscriber[0].phone.forEach(id => { phoneIds.push(id._id) });
            // Delete numbers
            Phone
                .deleteMany({_id: { $in: phoneIds }})
                .then(response => {
                    // Remove Subscriber
                    Subscriber
                        .deleteOne({ name: name.toLowerCase() })
                        .then(response => {
                            res.status(200).send(`[>] ${phoneIds.length + 1} documents were deleted for ${name}.`);
                        })
                })
                .catch(err => {
                    return res.status(400).send({ error: `${err}` });
                });
        });


    /* Approach #2: A user might have multiple phone numbers, but since we
    *   do not posess any constraints over the database, we can just delete the user,
    *   the phone number in the argument, and leave the other numbers.
    *   This risks of having multiple unecessary records.
    */
};