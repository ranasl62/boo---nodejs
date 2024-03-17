const Profile = require('../models/profile');
const GlobalResponse = require("./../response/globalResponse");
const STATUS = require("./../utils/statusCode");
const GlobalErrorHandler = require("./../utils/globalErrorHandle");

module.exports = {

    profileSave: async function (profile) {

        try {
            const newProfile = new Profile(profile);
            await newProfile.save();
            return GlobalResponse(STATUS.SUCCESS.CREATED, "Profile save successfully", newProfile);
        } catch (err) {
            return GlobalErrorHandler(err);
        }
    },

    profileGet: async function (id) {
        try {
            const profile = await Profile.findOne({_id: id});
            if (!profile) {
                return GlobalResponse(STATUS.CLIENT_ERRORS.NOT_FOUND, "Profile not found", null); // we can change the message with internationalization
            }
            return GlobalResponse(STATUS.SUCCESS.OK, "Profile retried successfully", profile);
        } catch (err) {
            return GlobalErrorHandler(err);
        }
    },

    profilesGet: async function () {
        try {
            const profiles = await Profile.find();
            if (!profiles) {
                return GlobalResponse(STATUS.CLIENT_ERRORS.NOT_FOUND, "Profiles not found", null); // we can change the message with internationalization
            }
            return GlobalResponse(STATUS.SUCCESS.OK, "Profile retried successfully", profiles);
        } catch (err) {
            return GlobalErrorHandler(err);
        }
    }
};