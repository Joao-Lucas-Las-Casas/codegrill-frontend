import {Component} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {UserDto} from '../../dto/UserDto';
import {UserService} from '../../service/user.service';

@Component({
  selector: 'app-register',
  imports: [
    RouterLink,
    FormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  user: UserDto = {
    name: "",
    username: "",
    password: "",
    taxId: "",
    image: "",
    phone: "",
    zipCode: "",
  };

  constructor(private readonly userService: UserService, private readonly router: Router) {
  }

  public createUser() {
    return this.userService.createUser(this.user).subscribe(() => this.router.navigate(['/login']));
  }

}
