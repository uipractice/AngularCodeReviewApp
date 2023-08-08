import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { map,  } from 'rxjs/operators';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CodeReviewService {
baseUrl='https://cg3zhj7w4a.execute-api.ap-south-1.amazonaws.com/default/api'
userDetails=new Subject()
  constructor(private http:HttpClient) { }
  getUserDetails(headers:any){
   
    return this.http.get(`${this.baseUrl}/user`,{headers}).pipe(map((res:any)=>{
      return res
    }))
  }

  

 


  getReviewDetails(headers:any){
   
    return this.http.get(`${this.baseUrl}/details`,{headers}).pipe(map((res:any)=>{
      return res
    }))
  }
  postReviewDetails(data:any,headers:any){
    return this.http.post(`${this.baseUrl}/details`,data,{headers})
  }
  onDeleteDetails(data:any,headers:any){
    return this.http.delete(`${this.baseUrl}/details?detailsId=${data}`,{headers})
  }
  onEditDetails(data:any,headers:any){
    return this.http.put(`${this.baseUrl}/details`,data,{headers})
    
  }
  getTechnicalStackDetails(headers:any){
    return this.http.get(`${this.baseUrl}/technicalStack`,{headers})
  }
  getTechnologyDetails(data:any,headers:any){
    return this.http.get(`${this.baseUrl}/technologies?technicalStackId=${data}`,{headers})
  }
  getSelectedReviewDetails(data:any,headers:any){
    return this.http.get(`${this.baseUrl}/details?detailsId=${data}`,{headers})
  }
  getReviewTrackerDetails(headers:any,stackId?:any,techId?:any,step?:any){
    return this.http.get(`${this.baseUrl}/checkListQuestions?technicalStackId=${stackId}&technologiesId=${techId}&type=${step}`,{headers})
  }
  getOptions(headers:any){
    return this.http.get(`${this.baseUrl}/options`,{headers}).pipe(
      map((res:any)=>{
        return res
      })
    )


  }
  getSideNav(stackId:any,techId:any,headers:any){
    return this.http.get(`${this.baseUrl}/lefNavData?technicalStackId=${stackId}&technologiesId=${techId}`,{headers})
  }

 
  }

