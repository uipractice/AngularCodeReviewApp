import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map,  } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CodeReviewService {
baseUrl='https://cg3zhj7w4a.execute-api.ap-south-1.amazonaws.com/default/api'
  constructor(private http:HttpClient) { }

  getReviewDetails(){
    return this.http.get(`${this.baseUrl}/details`).pipe(map((res:any)=>{
      return res
    }))
  }
  postReviewDetails(data:any){
    return this.http.post(`${this.baseUrl}/details`,data)
  }
  onDeleteDetails(data:any){
    return this.http.delete(`${this.baseUrl}/details?detailsId=${data}`)
  }
  onEditDetails(data:any){
    return this.http.put(`${this.baseUrl}/details`,data)
    
  }
  getTechnicalStackDetails(){
    return this.http.get(`${this.baseUrl}/technicalStack`)
  }
  getTechnologyDetails(data:any){
    return this.http.get(`${this.baseUrl}/technologies?technicalStackId=${data}`)
  }
  getSelectedReviewDetails(data:any){
    return this.http.get(`${this.baseUrl}/details?detailsId=${data}`)
  }
  getReviewTrackerDetails(stackId?:any,techId?:any,step?:any){
    return this.http.get(`${this.baseUrl}/checkListQuestions?technicalStackId=${stackId}&technologiesId=${techId}&type=${step}`)
  }
  getOptions(){
    return this.http.get(`${this.baseUrl}/options`).pipe(
      map((res:any)=>{
        return res
      })
    )


  }
  getSideNav(stackId:any,techId:any){
    return this.http.get(`${this.baseUrl}/lefNavData?technicalStackId=${stackId}&technologiesId=${techId}`)
  }
} 
