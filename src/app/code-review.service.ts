import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { map,  } from 'rxjs/operators';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CodeReviewService {
  logout() {
    throw new Error('Method not implemented.');
  }
baseUrl='https://cg3zhj7w4a.execute-api.ap-south-1.amazonaws.com/default/api'
userDetails=new Subject()
projectDetails=new Subject()
  constructor(private http:HttpClient) { }
  getUserDetails(headers:any){

    return this.http.get(`${this.baseUrl}/user`,{headers}).pipe(map((res:any)=>{
      return res
    }))
  }

  getUSersList(headers:any){
    return this.http.get(`${this.baseUrl}/users`,{headers}).pipe(map((res:any)=>{
      return res
    }))

  }





  getReviewDetails(headers:any){
    return this.http.get(`${this.baseUrl}/details`,{headers}).pipe(map((res:any)=>{
      return res
    }))
  }
  updateReviewDetails(data:any,headers:any){
    return this.http.put(`${this.baseUrl}/details`,data,{headers}).pipe(map((res:any)=>{
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

  }vie
  getTechnicalStackDetails(headers:any){
    return this.http.get(`${this.baseUrl}/technicalStack`,{headers})
  }
  getTechnologyDetails(headers:any){
    return this.http.get(`${this.baseUrl}/technologies`,{headers})
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
  saveCheckListData(data:any,headers:any){
    return this.http.post(`${this.baseUrl}/checklist`,data,{headers})
  }
  getSavedCheckListData(headers:any,detailsId:any){
    return this.http.get(`${this.baseUrl}/checklist?detailsId=${detailsId}`,{headers})
  }

  createUser(data:any,headers:any){
    return this.http.post(`${this.baseUrl}/users`,data,{headers})
  }

  }

