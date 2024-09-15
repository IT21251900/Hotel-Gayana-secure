

class SETTINGS {
  static ACCESS_TOKEN = '%&^%^*@&*#';
  static REFRESH_TOKEN = '&@&#&$(@&##';
  static USER_PRIVILEGES = '%$^%((*';
  static USER_PERMISSIONS = ')(&^&%^$*&*&$&*()*';
  static USER_ROLE = ')(&^&%^$*&**&^%^&&^&&$&*()*';
  static LOGGED_IN_USER = '#$%@^^%';

  // BASE_API is set from environment configuration
  static BASE_API = "http://localhost:8000";

  static KEYS = {
    SECRET: 'iIUsWtNZcf',
  };

  static REGEX = {
    PASSWORD: {
      EXP: '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$',
    },
    PHONE: {
      EXP: '^[0-9]{1,10}$',
    },
    ID: {
      EXP: '^[0-9]{9}v$',
    },
    LETTERS: {
      EXP: '[a-zA-Z\\s]*$',
    },
  };
}

export default SETTINGS;
