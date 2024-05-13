import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

    loginForm!:FormGroup;

    ngOnInit():void{
      this.setForm();
      
    }

    constructor(
      private _router:Router,
      private _login:LoginService
    ){

    }

    setForm(){
      this.loginForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required])
      })
    }

    submit() {
      if (this.loginForm.valid) {
        this._login.loginUser(this.loginForm.value).subscribe({
          next: (resp: any) => {
            console.log('Server response:', resp);
            if (resp.msg === 'Login successful') {
              console.log(resp);

              localStorage.setItem("firstname",resp.result.firstName);
              localStorage.setItem("lastname",resp.result.lastname);
              localStorage.setItem("email",resp.result.email);
              localStorage.setItem("id",resp.result._id);
              localStorage.setItem("token",resp.token);

              let timerInterval:any;
              Swal.fire({
                position: 'top-end',
                title: "Login successful!",
                html: "I will close in <b></b> milliseconds.",
                timer: 1000,
                timerProgressBar: true,
                didOpen: () => {
                  Swal.showLoading();
                  const timer:any = Swal.getPopup()?.querySelector("b");
                  timerInterval = setInterval(() => {
                    timer.textContent = `${Swal.getTimerLeft()}`;
                  }, 100);
                },
                willClose: () => {
                  clearInterval(timerInterval);
                }
              }).then((result) => {
                /* Read more about handling dismissals below */
                if (result.dismiss === Swal.DismissReason.timer) {
                  console.log("I was closed by the timer");
                  this._router.navigate(['/dashboard']);
                }
              });
          }
        },
          error: (err) => {
            console.log('Error during login:', err); 
            if (err.error && err.error.msg) {
              alert(err.error.msg); // Display the error message from the server
              Swal.fire({
                title: "Login failed",
                text: err.error.msg,
                icon: "error"
              });
            } else {
              alert('An error occurred during login');
            }
          }
        });
      }
    }
  }    