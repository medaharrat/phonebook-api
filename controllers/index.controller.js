/* Get all subscribers in the collection */ 
exports.index = async (req, res) => {
    res.render('index', { title: 'Phonebook API' });
};