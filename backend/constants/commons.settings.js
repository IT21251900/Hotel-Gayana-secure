class SETTINGS {
    static USERS = {
        ADMIN: "ADMIN",
        CUSTOMER: "CUSTOMER",
        VENDOR: "VENDOR",
    };
    
    static EMAIL = {
        CUSTOMER_NEW_PASSWORD_SEND: "customer-new-password-send.ejs",
        USER_NEW_PASSWORD_SEND: "user-new-password-send.ejs",
        PASSWORD_RESET: "password-reset.ejs",
        PASSWORD_CHANGED: "password-changed.ejs",
    };
    
    static EMAIL_CONFIG = {
        username: "noreply@purple.lk",
        password: "pnHSwZaB8r8xfL9",
        host: "smtp-mail.outlook.com",
        port: 587,
    };

    
    static GIFT_TYPE = {
        STANDARD: "STANDARD",
        SMART_STANDARD: "SMART_STANDARD",
        SMART_EXPERIENCE: "SMART_EXPERIENCE",
    };
    
    static VENDOR_CHANNEL = {
        STORE: "STORE",
        ONLINE: "ONLINE",
        BOTH: "BOTH",
    };
    
    static GIFT_CATEGORY_TYPE = {
        OCCASION: "OCCASION",
        EXPERIENCE: "EXPERIENCE",
        CORPORATE: "CORPORATE",
        LOCATION: "LOCATION",
        CATEGORY: "CATEGORY",
        WHO_IS_IT_FOR: "WHO_IS_IT_FOR",
    };
    
    static VENDOR_PARTNERSHIP = {
        CASH: "CASH",
        ACCOUNT: "ACCOUNT",
        CONSIGNMENT: "CONSIGNMENT",
    };
    
    static CARD_CONFIGURE_SETTING = {
        MESSAGE: "MESSAGE",
        GREETING: "GREETING",
        DESIGN: "DESIGN",
    };
    
    static CARD_CONFIGURE_SETTING_GREETING = {
        GIF: "GIF",
        VIDEO: "VIDEO",
    };
    
    static ORDER_STATUS = {
        PROCESSING: "PROCESSING",
        COMPLETED: "COMPLETED",
    };
    
    static RECIPIENT_STATUS = {
        NOT_SENT: "NOT_SENT",
        SEND: "SEND",
        OPENED: "OPENED",
    };
    
    static ORDER_TYPE = {
        ADMIN_BULK: "ADMIN_BULK",
        CUSTOMER_SINGLE: "CUSTOMER_SINGLE",
    };
    
    static SENDING_METHOD = {
        EMAIL: "EMAIL",
        SMS: "SMS",
        BOTH: "BOTH",
    };
}

module.exports = { SETTINGS };
