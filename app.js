
const express = require('express');
const config = require('./config.json')
const joi_userSchema = require('./joi_schemas/new_user')
const get_mongoose_connection = require('./utils/get_mongoose_connection')
const User = require('./mongoose_schemas/user_model')


const app = express();
app.use(express.json());


const PORT = config.PORT || 8080;
// we can define and use ENV variable isf we want to deploy this app 



get_mongoose_connection()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error)
    })



app.post('/user', async (req, res) => {
    try {
        let user_object = req.body;
        console.log(user_object);

        // validate usr input using Joi schema
        const validationResult = await joi_userSchema.validateAsync(user_object);

        if (validationResult.error) {
            return res.status(400).send('Validation error: ' + validationResult.error.details[0].message);
        }

        // Calculae discount percentage based on state
        switch (user_object.state) {
            case 'Maharastra':
            case 'Rajasthan':
                user_object.discount_percentage = 50;
                break;
            case 'Karnataka':
            case 'Kerala':
            case 'TamilNadu':
                user_object.discount_percentage = 60;
                break;
            default:
                user_object.discount_percentage = 40;
        }

        const newUser = new User(user_object);
        const savedUser = await newUser.save();

        res.status(200).json(savedUser);

    } catch (error) {
        if (error.code === 11000) {
            const msg = {
                message: 'Value already exists',
                duplicates: error.keyPattern,
                values: error.keyValue
            };
            return res.status(409).json(msg);
        }
        console.error(error);
        res.status(500).json({ error: error });
    }
});


app.use('/', (req, res, next) => { res.send("<h1> invalid route / route not found") })
