import { BehaviorSubject } from 'rxjs';
import SETTINGS from '../config/common.settings';
import axios from 'axios';

// Create an instance of the HTTP client
const httpClient = axios.create({
  baseURL: `${SETTINGS.BASE_API}`,
  // Other configurations if needed
});

export class ForgotResetPasswordService {
  constructor() {
    this.http = httpClient;
    this.reqResetPasswordResponse = {};
    this.onReqResetPasswordResponseChange = new BehaviorSubject({});
  }

  requestResetPassword(payload) {
    return new Promise((resolve, reject) => {
      this.http.post('/api/request-reset-password', payload)
        .then(response => {
            console.log(payload);
          this.reqResetPasswordResponse = response.data;
          console.log(this.reqResetPasswordResponse)
          this.onReqResetPasswordResponseChange.next(this.reqResetPasswordResponse);
          resolve(this.reqResetPasswordResponse);
        })
        .catch(error => {
          if (error.response && error.response.status === 403) {
            // Handle 403 error if needed
          }
          reject(error.response ? error.response.data : error.message);
        });
    });
  }

  validatePWResetToken(token) {
    return new Promise((resolve, reject) => {
      this.http.post('/api/validate-reset-password', { token })
        .then(response => {
          console.log(response.data);
          resolve(response.data);
        })
        .catch(error => {
          reject(error.response ? error.response.data : error.message);
        });
    });
  }

  resetPassword(payload) {
    return new Promise((resolve, reject) => {
      this.http.post('/api/reset-password', payload)
        .then(response => {
        console.log("reset-pp"+response);
          resolve(response.data);
        })
        .catch(error => {
          reject(error.response ? error.response.data : error.message);
        });
    });
  }
}

