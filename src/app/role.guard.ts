import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CodeReviewService } from './code-review.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private codeService:CodeReviewService,private router:Router){}
  userDetails:any
  canActivate( route: ActivatedRouteSnapshot) {
  

    const adminRole='admin'
    if(route.data['role'].includes(adminRole)){
      this.router.navigate(['/adminUserList'])
      return true
    }
    else{
      this.router.navigate(['/startCodeReviewTracker'])
      return false
    }
  }
    
}
