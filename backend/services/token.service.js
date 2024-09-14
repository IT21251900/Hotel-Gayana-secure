const config = require("config");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const { Types } = require("mongoose");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const { SETTINGS } = require("../constants/commons.settings");
const {
    createUserRefreshTokenRepo,
    findOneAndDeleteUserRefreshTokenRepo,
    findOneUserRefreshTokenRepo,
} = require("../data-access/token.repo");
const { log } = require("../util/logger");
const { aggregateUserRepo } = require("../data-access/user.repo");

const ObjectId = Types.ObjectId;

const generateJWT = async (user, isRefresh, userType) => {
    try {
        if (!user._id || !user.email) {
            log.error("User details have not been found");
            throw { message: "User details have not been found" };
        }
        let payload = null;

        switch (userType) {
            case SETTINGS.USERS.ADMIN:
                payload = {
                    userId: user._id,
                    role: user.role,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    email: user.email,
                    userType,
                    permissions: user.role?.permissions?.map((p) => p.code) || [],
                };
                delete payload?.role?.permissions;
                break;
            case SETTINGS.USERS.CUSTOMER:
                payload = {
                    userId: user._id,
                    firstname: user.firstName,
                    lastname: user.lastName,
                    email: user.email,
                    userType,
                };
                break;
        }

        const signOptions = {
            issuer: config.get("auth.accessToken.issuer"),
            expiresIn: config.get("auth.accessToken.expiresIn"),
            algorithm: "RS256",
        };

        const filePath = path.join(__dirname, "../../config/private.pem");
        const key = fs.readFileSync(filePath, "utf8");
        const passphrase = config.get("auth.accessToken.passphrase");

        const token = await jwt.sign(payload, { key, passphrase }, signOptions);
        if (!isRefresh) {
            const rtPayload = {
                refreshToken: uuidv4(),
            };

            const rtSignOptions = {
                issuer: config.get("auth.refreshToken.issuer"),
                expiresIn: config.get("auth.refreshToken.expiresIn"),
            };

            await createUserRefreshTokenRepo({
                user: user._id,
                refreshToken: rtPayload.refreshToken,
            });

            const generatedRToken = await jwt.sign(
                rtPayload,
                config.get("auth.refreshToken.secret"),
                rtSignOptions
            );

            log.info("Token generated & Login successful");

            return {
                access_token: token,
                refresh_token: generatedRToken,
                user: payload,
            };
        } else {
            log.info("Token refreshed!");
            return {
                access_token: token,
            };
        }
    } catch (error) {
        log.error("Token not generated");
        throw error;
    }
};

const validateRefreshTokenReq = async (isRefresh, token, userType) => {
    if (!token) {
        log.error("Token not found");
        throw { message: "Token not found" };
    }
    try {
        const data = await jwt.verify(token, config.get("auth.refreshToken.secret"));
        const refreshTokenData = await findOneUserRefreshTokenRepo({
            refreshToken: data.refreshToken,
        });
        if (!refreshTokenData) {
            throw {
                message: "Refresh token not found in system. Unable to issue access token",
            };
        }
        switch (userType) {
            case SETTINGS.USERS.ADMIN:
                const user = (
                    await aggregateUserRepo({ _id: new ObjectId(refreshTokenData.user) })
                )[0];
                return await generateJWT(user, isRefresh, userType);
            case SETTINGS.USERS.CUSTOMER:
                const customer = await findOneCustomerRepo({
                    _id: new ObjectId(refreshTokenData.user),
                });
                return await generateJWT(customer, isRefresh, userType);
        }
    } catch (error) {
        const decoded = jwt.decode(token, { complete: true });
        if (error.message === config.get("auth.refreshToken.errorMessage")) {
            await findOneAndDeleteUserRefreshTokenRepo({
                refreshToken: decoded.payload.refreshToken,
            });
            log.error("Expired refresh token");
            throw { message: "Expired refresh token" };
        } else {
            log.error("Invalid refresh token");
            throw { message: "Invalid refresh token" };
        }
    }
};

module.exports = {
    generateJWT,
    validateRefreshTokenReq,
};
