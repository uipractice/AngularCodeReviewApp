import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CodeReviewService } from './code-review.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private codeService:CodeReviewService,private route:Router){}
  userDetails:any
  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.codeService.userDetails.subscribe((res:any)=>{
        this.userDetails=res       
        console.log(this.userDetails);
        
      })

      if(route.data['role'].includes(this.userDetails)){
        return true
      }
      else{
        return false
      }
    
    }
  
}
