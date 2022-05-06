exports.verifyInput = (req, res, next) => {
    let errors = [];

    if (req.body) {
        if (!req.body.name) {
            errors.push("[x] Missing name.");
        }
        if (!req.body.phone) {
            errors.push("[x] Missing phone number.");
        }
        if (req.body.phone && !req.body.phone.match("^[0-9]{10}")) {
            errors.push("[x] Phone number has to respect the following format: 10 digits (e.g. 0123456789).");
        }
        if (req.body.name && !req.body.name.match("^[a-zA-Z]*$")) {
            errors.push("[x] Name has to be a string (e.g. Josh).");
        }
    } else {
        errors.push("[x] Missing phone number.");
    }

    if (errors.length) {
        return res.status(400).send({errors: errors.join(',')});
    } else {
        return next();
    }
};