
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PasswordCheckService {

    public checkPasswordStrength(password: string): number {

        let numberOfElements = 0;
        numberOfElements = /.*[a-z].*/.test(password) ? ++numberOfElements : numberOfElements;      // Lowercase letters
        numberOfElements = /.*[A-Z].*/.test(password) ? ++numberOfElements : numberOfElements;      // Uppercase letters
        numberOfElements = /.*[0-9].*/.test(password) ? ++numberOfElements : numberOfElements;      // Numbers
        numberOfElements = /[^a-zA-Z0-9]/.test(password) ? ++numberOfElements : numberOfElements;   // Special characters (inc. space)

        return numberOfElements;
    }
}
