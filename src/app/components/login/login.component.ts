import {Component} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {UserService} from '../../service/user.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string | undefined;
  password: string | undefined;

  constructor(private readonly userService: UserService,
              private readonly router: Router) {
  }

  public login() {
    return this.userService.login(this.email, this.password).subscribe(value => {
      localStorage.setItem("token", value.token);
      this.router.navigate(["/"]).then();
    });
  }
}
