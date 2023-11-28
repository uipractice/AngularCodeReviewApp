import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CodeReviewService {

  logout() {
    throw new Error('Method not implemented.');
  }

  baseUrl = 'https://cg3zhj7w4a.execute-api.ap-south-1.amazonaws.com/default/api'
  userDetails = new Subject()
  projectDetails = new Subject()

  constructor(private http: HttpClient) { }

  getUserDetails(headers: any) {
    return this.http.get(`${this.baseUrl}/user`, { headers }).pipe(map((res: any) => {
      return res
    }))
  }
  getUSersList(headers: any) {
    return this.http.get(`${this.baseUrl}/users`, { headers }).pipe(map((res: any) => {
      return res
    }))
  }
  updatetUsersList(data: any, headers: any) {
    return this.http.put(`${this.baseUrl}/users`, data, { headers }).pipe(map((res: any) => {
      return res
    }))
  }
  getReviewDetails(headers: any) {
    return this.http.get(`${this.baseUrl}/details`, { headers }).pipe(map((res: any) => {
      return res
    }))
  }
  updateReviewDetails(data: any, headers: any) {
    return this.http.put(`${this.baseUrl}/details`, data, { headers }).pipe(map((res: any) => {
      return res
    }))
  }
  postReviewDetails(data: any, headers: any) {
    return this.http.post(`${this.baseUrl}/details`, data, { headers })
  }
  exportToExcel(data: any, headers: any) {
    return this.http.post(`${this.baseUrl}/reportSending`, data, { headers })
  }
  sendLinkTokenToMail(data: any, headers: any) {
    return this.http.post(`${this.baseUrl}/forgotPassword`, data, { headers })
  }
  resetPasswordOnAuthorization(data: any, headers: any) {
    return this.http.post(`${this.baseUrl}/resetPassword`, data, { headers })
  }
  onDeleteDetails(data: any, headers: any) {
    return this.http.delete(`${this.baseUrl}/details?detailsId=${data}`, { headers })
  }
  onEditDetails(data: any, headers: any) {
    return this.http.put(`${this.baseUrl}/details`, data, { headers })
  }
  getTechnicalStackDetails(headers: any) {
    return this.http.get(`${this.baseUrl}/technicalStack`, { headers })
  }
  getTechnologyDetails(headers: any) {
    return this.http.get(`${this.baseUrl}/technologies`, { headers })
  }
  addTechnologyDetails(headers: any, data: any) {
    return this.http.post(`${this.baseUrl}/technologies`, data, { headers })
  }
  deleteTechnologies(headers: any, technologiesId: any) {
    return this.http.delete(`${this.baseUrl}/technologies?technologiesId=${technologiesId}`, { headers })
  }
  getSelectedReviewDetails(data: any, headers: any) {
    return this.http.get(`${this.baseUrl}/details?detailsId=${data}`, { headers })
  }
  getReviewTrackerDetails(headers: any, stackId?: any, techId?: any, step?: any) {
    return this.http.get(`${this.baseUrl}/checkListQuestions?technicalStackId=${stackId}&technologiesId=${techId}&type=${step}`, { headers })
  }
  getCompleteReviewTrackerDetails(headers: any, stackId?: any) {
    return this.http.get(`${this.baseUrl}/checkListQuestions?technologiesId=${stackId}`, { headers })
  }
  getOptions(headers: any) {
    return this.http.get(`${this.baseUrl}/options`, { headers }).pipe(
      map((res: any) => {
        return res
      })
    )
  }
  getSideNav(techId: any, headers: any) {
    return this.http.get(`${this.baseUrl}/lefNavData?technologiesId=${techId}`, { headers })
  }
  postSideNav(data: any, headers: any) {
    return this.http.post(`${this.baseUrl}/lefNavData`, data, { headers })
  }
  updateSideNav(data: any, headers: any) {
    return this.http.put(`${this.baseUrl}/lefNavData`, data, { headers })
  }


  saveCheckListData(data: any, headers: any) {
    return this.http.post(`${this.baseUrl}/checklist`, data, { headers })
  }
  updateCheckListData(data: any, headers: any) {
    return this.http.put(`${this.baseUrl}/checklist`, data, { headers })
  }
  getSavedCheckListData(headers: any, detailsId: any, key?: any) {
    return this.http.get(`${this.baseUrl}/checklist?detailsId=${detailsId}&key=${key}`, { headers })
  }
  getCompleteSavedCheckListData(headers: any, detailsId: any) {
    return this.http.get(`${this.baseUrl}/checklist?detailsId=${detailsId}`, { headers })
  }


  createUser(data: any, headers: any) {
    return this.http.post(`${this.baseUrl}/users`, data, { headers })
  }
  postCheckListQuestions(technologiesId: any, step: any, data: any, headers: any) {
    return this.http.post(`${this.baseUrl}/checkListQuestions?technologiesId=${technologiesId}&type=${step}`, data, { headers })
  }
  updateCheckListQuestions( data: any, headers: any) {
    return this.http.put(`${this.baseUrl}/checkListQuestions`, data, { headers })
  }

}

