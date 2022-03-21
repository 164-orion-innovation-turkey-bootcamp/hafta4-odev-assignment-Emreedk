import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  login = new BehaviorSubject(false);

  constructor(private httpClient: HttpClient) {}

  postData(user) {
    const userUrl = 'http://localhost:3000/users';
    return this.httpClient.post(userUrl, { user });
  }
  getData() {
    return this.httpClient.get('http://localhost:3000/users/').pipe(
      map((responseData) => {
        let newArray = [];
        for (let key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            newArray.push(responseData[key]);
          }
        }
        return newArray;
      })
    );
  }
}
