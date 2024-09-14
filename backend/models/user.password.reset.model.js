const config = require('config');
const moment = require('moment');
const mongoose = require('mongoose');

const { Schema, model } = mongoose;

// Define the UserPWReset schema
const UserPWResetSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        default: null,
    },
    token: {
        type: String,
        required: [true, 'Token is required'],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    expiredAt: {
        type: Date,
        default: function() {
            return moment().add(
                config.get('auth.passwordReset.time'),
                config.get('auth.passwordReset.unit')
            ).toDate();
        },
    },
});

// Create and export the UserPWReset model
const UserPWReset = model('UserPWReset', UserPWResetSchema);

module.exports = { UserPWReset };
