const { findLatestUserRepo } = require('../data-access/user.repo');
const { SETTINGS } = require('../constants/commons.settings');

const createUserRef = async () => {
    let user = await findLatestUserRepo();
    let userNo;

    if (user.length > 0) {
        userNo = String(Number(user[0]?.refNo?.toString().slice(2)) + 1).padStart(4, '0');
    } else {
        userNo = String(1).padStart(4, '0');
    }

    return `IA${userNo}`;
};

const createCustomerRef = async () => {
    let customer = await findLatestCustomerRepo();
    let customerNo;

    if (customer.length > 0) {
        customerNo = String(Number(customer[0]?.refNo?.toString().slice(2)) + 1).padStart(4, '0');
    } else {
        customerNo = String(1).padStart(4, '0');
    }

    return `IC${customerNo}`;
};

const createVendorRef = async () => {
    let vendor = await findLatestVendorRepo();
    let vendorNo;

    if (vendor.length > 0) {
        vendorNo = String(Number(vendor[0]?.refNo?.toString().slice(2)) + 1).padStart(4, '0');
    } else {
        vendorNo = String(1).padStart(4, '0');
    }

    return `IV${vendorNo}`;
};

const createGiftCardRef = async () => {
    let giftCard = await findLatestGiftCardRepo({
        'type.name': {
            $nin: [SETTINGS.GIFT_TYPE.SMART_STANDARD, SETTINGS.GIFT_TYPE.SMART_EXPERIENCE],
        },
    });
    let giftCardNo;

    if (giftCard.length > 0) {
        giftCardNo = String(Number(giftCard[0]?.refNo?.toString().slice(2)) + 1).padStart(4, '0');
    } else {
        giftCardNo = String(1).padStart(4, '0');
    }

    return `IG${giftCardNo}`;
};

module.exports = {
    createUserRef,
    createCustomerRef,
    createVendorRef,
    createGiftCardRef,
};
