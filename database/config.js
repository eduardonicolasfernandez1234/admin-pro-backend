const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('DB online');
    } catch (error) {
        console.error(error);
        throw Error('Error a la hora de levantar la DB ver los logs');
    }
};

module.exports = {
    dbConnection
};