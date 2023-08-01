import { HttpClient } from '@angular/common/http';
import { Component, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {



  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'hide-header');
  }



  public loginForm!: FormGroup

  constructor(private renderer: Renderer2, private formbuilder: FormBuilder,private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formbuilder.group({
      email: [''],
      password: ['', Validators.required]
    })
    this.renderer.addClass(document.body, 'hide-header');

  }
  login(){
    this.http.get<any>("https://cg3zhj7w4a.execute-api.ap-south-1.amazonaws.com/default/api/login")
    .subscribe((res: any[])=>{
      const user = res.find((a:any)=>{
        return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password
      });
      if(user){
        alert('Login Succesful');
        this.loginForm.reset()
      this.router.navigate(["home"])
      }else{
        alert("user not found")
      }
    },(_err: any)=>{
      alert("Something went wrong")
    })
  }

}
