import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  private errorMessage: string = '';

  public username: string = '';
  public password: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {}

  validateUserInput() {
    if (this.username.length < 4) {
      this.errorMessage = 'El usuario tiene muy pocas carácteres';
      return false;
    }
    if (this.password.length < 8) {
      this.errorMessage = 'La contraseña es de mínimo 8 carácteres';
      return false;
    }
    return true;
  }

  logIn() {
    const authForm = {
      user: this.username,
      password: this.password,
    };

    if (!this.validateUserInput()) {
      Swal.fire('Error', this.errorMessage, 'error');
      this.errorMessage = '';
      return;
    }

    this.authService.loginUser(authForm).subscribe(
      (resp) => {
        console.log(resp);
        if (resp.token) {
          this.router.navigateByUrl('/admin');
        }
      },
      (err) => {
        Swal.fire('Error', 'Wrong credentials', 'error');
      }
    );
  }
}
