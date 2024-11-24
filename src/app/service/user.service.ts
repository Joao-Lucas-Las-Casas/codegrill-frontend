import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoginDto} from '../dto/LoginDto';
import {UserDto} from '../dto/UserDto';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private readonly http: HttpClient) {
  }

  public login(email: string | undefined, password: string | undefined) {
    return this.http.post<LoginDto>("http://localhost:8080/v1/login", {
      email: email,
      password: password
    });
  }

  public isLogged() {
    const token = localStorage.getItem("token");
    return !!token;

  }

  public createUser(user: UserDto): Observable<UserDto> {
    return this.http.post<UserDto>("http://localhost:8080/v1/users/create", {
      email: user.username,
      password: user.password,
      name: user.name,
      taxId: user.taxId,
      image: user.image,
      phone: user.phone,
      zipCode: user.zipCode
    });
  }
}
