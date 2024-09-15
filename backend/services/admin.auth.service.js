const {
  aggregateUserRepo,
  createUserPwReset,
  createUserRepo,
  findAllUsersRepo,
  findOneAndUpdateUserRepo,
  findOneUserRepo,
  findUserPwResetToken,
  findUserPwResetTokenAndDelete,
  getPagedUsersRepo,
} = require("../data-access/user.repo");
const passwordGen = require("generate-password");
const { sendEmailService } = require("./email.service");
const { SETTINGS } = require("../constants/commons.settings");
const config = require("config");
const { log } = require("../util/logger");
const bcrypt = require("bcrypt");
const { generateJWT } = require("./token.service");
const {
  findOneAndDeleteUserRefreshTokenRepo,
} = require("../data-access/token.repo");
const { v4: uuidv4 } = require("uuid");
const { createUserRef } = require("../util/reference-numbers");

const signInUserService = async (password, email, userType) => {
  try {
    let user;
    console.log(email);
    const admin = (await aggregateUserRepo({ email }))[0];
    if (!admin || admin.archived) {
      throw { message: "Admin not found!", userCheck: true };
    }
    if (!admin.active) {
      throw {
        message: "Admin has been deactivated. Please contact system admin",
        activateCheck: true,
      };
    }
    return await validateUser(password, admin, SETTINGS.USERS.ADMIN);
  } catch (e) {
    log.error(e.message || "User not found");
    throw e;
  }
};

const validateUser = async (password, user, userType) => {
  try {
    const result = await bcrypt.compare(password, user.password);
    if (!result) {
      throw {
        message: "Invalid User name or Password!",
        credentialCheck: true,
      };
    }
    return await generateJWT(user, false, userType);
  } catch (e) {
    log.error(e.message);
    throw e;
  }
};

const logoutUserService = async (data) => {
  await findOneAndDeleteUserRefreshTokenRepo(data);
};

const changeUserPasswordService = async (data) => {
  try {
    const user = await findOneUserRepo({ _id: data.id });
    const result = await bcrypt.compare(data.oldPassword, user.password);
    if (result === false) {
      throw {
        message: "You entered wrong old password",
        oldPwdCheck: true,
      };
    }
    await findOneAndUpdateUserRepo({ _id: data.id }, data);
    return { done: true, message: "Password changed successfully!" };
  } catch (e) {
    throw e;
  }
};

const resetUserPasswordService = async (id) => {
  try {
    const password = passwordGen.generate({
      length: 8,
      numbers: true,
      lowercase: true,
      uppercase: true,
    });
    const user = await findOneAndUpdateUserRepo({ _id: id }, { password });
    await sendEmailService(
      SETTINGS.EMAIL.USER_PASSWORD_RESET,
      {
        name: user.firstname + " " + user.lastname,
        email: user.email,
        password,
        url: `${config.get("frontEndUrl")}/admin`,
      },
      user.email,
      "Password Reset"
    );
    return {
      done: true,
      message: "Password reset information sent to user's Email.",
    };
  } catch (e) {
    throw e;
  }
};

const createUserService = async (data) => {
  try {
    const emailCheck = await findOneUserRepo({ email: data.email });
    if (emailCheck) {
      throw { message: "Email is already existing!", emailCheck: true };
    } else {
      const password = passwordGen.generate({
        length: 8,
        numbers: true,
        lowercase: true,
        uppercase: true,
      });
      data.refNo = await createUserRef();
      data.password = password;
      const user = await createUserRepo(data);
      await sendEmailService(
        SETTINGS.EMAIL.USER_NEW_PASSWORD_SEND,
        {
          name: user.firstname + " " + user.lastname,
          email: user.email,
          password,
          url: `${config.get("frontEndUrl")}/admin`,
        },
        user.email,
        `Welcome to Infinity Gift Card`
      );
      user.password = undefined;
      return user;
    }
  } catch (e) {
    throw e;
  }
};

const findOneAndUpdateUserService = async (filters, data) => {
  try {
    const emailCheck = await findOneUserRepo({ email: data.email });
    if (emailCheck && emailCheck._id.toString() !== filters._id.toString()) {
      throw { message: "Email is already existing!", emailCheck: true };
    }
    const user = await findOneAndUpdateUserRepo(filters, data);
    user.password = undefined;
    return user;
  } catch (e) {
    throw e;
  }
};

const requestUserPasswordResetService = async (email, userType) => {
  try {
    let user;
    switch (userType) {
      case SETTINGS.USERS.ADMIN:
        user = await findOneUserRepo({ email });
        break;
      case SETTINGS.USERS.CUSTOMER:
        user = await findOneCustomerRepo({ email });
        break;
    }

    if (user) {
      const pwResetData = await createUserPwReset({
        user: user._id,
        token: uuidv4(),
      });
      await sendEmailService(
        SETTINGS.EMAIL.PASSWORD_RESET,
        {
          url: `${config.get("frontEndUrl")}/auth/reset-password/${
            pwResetData.token
          }`,
          name: user.firstname + " " + user.lastname,
        },
        email,
        "Password Reset"
      );
      return {
        done: true,
        message: "Password reset link sent to your Email.",
      };
    } else {
      return {
        done: false,
        message: "No user was found for this Email.",
      };
    }
  } catch (e) {
    throw e;
  }
};

const validateUserPWResetTokenService = async (token) => {
  try {
    const pwReset = await findUserPwResetToken({ token });
    if (pwReset) {
      return { done: true, message: "Token validated.", data: pwReset };
    } else {
      return { done: false, message: "Invalid or expired token." };
    }
  } catch (e) {
    throw e;
  }
};

const validateAndUpdateUserPwService = async (token, password, userType) => {
  try {
    const pwReset = await findUserPwResetToken({ token });

    let user;
    switch (userType) {
      case SETTINGS.USERS.ADMIN:
        user = await findOneUserRepo({ _id: pwReset.user });
        break;
      case SETTINGS.USERS.CUSTOMER:
        user = await findOneCustomerRepo({ _id: pwReset.user });
        break;
    }

    if (pwReset && user) {
      await Promise.all([
        passwordUpdateRepoCheck(user._id, password, userType),
        findUserPwResetTokenAndDelete({ token }),
      ]);
      await sendEmailService(
        SETTINGS.EMAIL.PASSWORD_CHANGED,
        {
          url: `${config.get("frontEndUrl")}/admin`,
          name: user.firstname + " " + user.lastname,
        },
        user.email,
        "Password reset successfully"
      );
      return { done: true, message: "Password reset successfully" };
    } else {
      return {
        done: false,
        message: "Password reset failed. Invalid or expired token.",
      };
    }
  } catch (e) {
    throw e;
  }
};

const passwordUpdateRepoCheck = (userId, password, userType) => {
  switch (userType) {
    case SETTINGS.USERS.ADMIN:
    case SETTINGS.USERS.CUSTOMER:
      return findOneAndUpdateUserRepo({ _id: userId }, { password });
  }
};

const findAllUsersService = async (data) => {
  try {
    const result = await findAllUsersRepo(data);
    return result;
  } catch (e) {
    throw e;
  }
};

const getPagedUsersService = async (data) => {
  try {
    return await getPagedUsersRepo(data);
  } catch (e) {
    throw e;
  }
};

const findOneUserByIdService = async (id) => {
  try {
    const user = await findOneUserRepo({ _id: id });
    user.password = undefined;
    return user;
  } catch (e) {
    throw e;
  }
};

const requestCustomerPasswordResetService = async (email, userType) => {
  try {
    let user;
    switch (userType) {
      case SETTINGS.USERS.ADMIN:
        user = await findOneUserRepo({ email });
        break;
      case SETTINGS.USERS.CUSTOMER:
        user = await findOneCustomerRepo({ email });
        break;
    }

    if (user) {
      const pwResetData = await createUserPwReset({
        user: user._id,
        token: uuidv4(),
      });
      await sendEmailService(
        SETTINGS.EMAIL.PASSWORD_RESET,
        {
          url: `${config.get("webSiteUrl")}/auth/reset-password/${
            pwResetData.token
          }`,
          name: user.firstname + " " + user.lastname,
        },
        email,
        "Password Reset"
      );
      return {
        done: true,
        message: "Password reset link sent to your Email.",
      };
    } else {
      return {
        done: false,
        message: "No user was found for this Email.",
      };
    }
  } catch (e) {
    throw e;
  }
};

module.exports = {
  signInUserService,
  logoutUserService,
  changeUserPasswordService,
  resetUserPasswordService,
  createUserService,
  findOneAndUpdateUserService,
  requestUserPasswordResetService,
  validateUserPWResetTokenService,
  validateAndUpdateUserPwService,
  findAllUsersService,
  getPagedUsersService,
  findOneUserByIdService,
  requestCustomerPasswordResetService,
};
