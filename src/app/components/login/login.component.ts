import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})



export class LoginComponent {
  LoginForm!:FormGroup;

  constructor(private fb:FormBuilder, private userService:UserService, private router:Router){
    this.createForm();
    
  }

  createForm(): void{
    this.LoginForm=this.fb.group({
      email:['', [Validators.required,]],
      password:['', [Validators.required,Validators.minLength(6)]],
    })
  }


  Login(){
    if(this.LoginForm.valid){
      const userData=this.LoginForm.value;
      this.userService.loginUser(userData).subscribe({
        next:(response:any)=>{
          console.log("logged in successfully", response);
          const jwtToken =response;
          localStorage.setItem('token', jwtToken);
          this.router.navigate(['/worker']);

        },
        error:(error)=>{
          console.log("login failed ",error);
        }
      })
    }
  }




  goToRegister(){
    this.router.navigate(['/register']);
  }

  


}
