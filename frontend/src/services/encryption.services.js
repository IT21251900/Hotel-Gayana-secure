import CryptoJS from 'crypto-js';
import SETTINGS from '../config/common.settings';

class EncryptionService {
  constructor() {}

  encrypt(field) {
    return CryptoJS.AES.encrypt(field, SETTINGS.KEYS.SECRET).toString();
  }

  decrypt(cypherStr) {
    const bytes = CryptoJS.AES.decrypt(cypherStr.toString(), SETTINGS.KEYS.SECRET);
    return bytes.toString(CryptoJS.enc.Utf8);
  }
}

export default EncryptionService;
