import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddCommentsComponent } from '../add-comments/add-comments.component';
import { ModalData } from '../add-comments/add-comments.component';
import { ActivatedRoute, Router } from '@angular/router';
import { CodeReviewService } from '../code-review.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-checklist-detalis',
  templateUrl: './checklist-detalis.component.html',
  styleUrls: ['./checklist-detalis.component.css']
})

export class ChecklistDetailsComponent implements OnInit {
  checklistHeading: string = '';
  deleteValue: any
  auth_token: any
  addMainQuestion: any
  addSubQuestion: any
  technologyId:any
  technologyName:any
  sideNavData:any
  sideNavHeading:any
  leftNavId:any
  checkListId:any
  tabCheckListData:any
  updatedParentQuestionsData:any[]=[]
  parentQuestionsData:Object[]=[]
  completeCheckList:Object[]=[]
  marginTop: any = '2%';
 postCheckListQuestionsData:any={
  data: [],
total:{
  rating: "",
  achievedRating: ""
  },
totlaPerc : {
  rating: "",
  achievedRating: ""
},
technologiesId: "",
checkListQuestionsId:""
}

selectedItemIndex: number= 0;


  constructor(private codeService: CodeReviewService, private dialog: MatDialog, private router: Router, private activatedRouter: ActivatedRoute) { }

  ngOnInit(): void {

    console.log('sidenavdata',this.sideNavData);

    this.auth_token = JSON.parse(localStorage.getItem('auth_token') || '{}')


    this.activatedRouter.paramMap.subscribe((res: any) => {
      this.technologyId = res.params.id,
        this.technologyName = res.params.techname
    })
    this.getSideNavData()
    this.postCheckListQuestionsData.technologiesId=this.technologyId
    this.getCompleteChecklist()
    // this.getTabCheckListData(this.sideNavHeading)
    // this.onSelectSideNav(this.sideNavData[0],0)

  }

  getCompleteChecklist(){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.auth_token}`
    });
    this.codeService.getCompleteReviewTrackerDetails(headers,this.technologyId).subscribe((res:any)=>{
      console.log(res.data[0].data);

      if(res.data.length){
        this.updatedParentQuestionsData=res.data[0].data
        this.checkListId=res.data[0]._id
      console.log(this.updatedParentQuestionsData);

      }
      else{
        this.updatedParentQuestionsData=res.data
      }
      console.log('existing or updated array',this.updatedParentQuestionsData);


    })
  }

  getSideNavData() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.auth_token}`
    });
    this.codeService.getSideNav(this.technologyId, headers).subscribe((res: any) => {
      if(res.success==true && res.data){
        this.sideNavData = res.data[0].leftNav
      this.leftNavId= res.data[0]._id
      console.log('sidenav List', res);
      }


    })



  }

  saveCheckListData(){
    this.router.navigate(['/header/codereview-managment'])
  }



  onSelectSideNav(heading: any, index: number) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.auth_token}`
    });
    console.log('heading', heading);
    this.sideNavHeading = heading
    this.marginTop = '0%';
    this.getTabCheckListData(this.sideNavHeading)
    this.selectedItemIndex = index;



  }

  getTabCheckListData(heading:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.auth_token}`
    });
    this.codeService.getReviewTrackerDetails(headers,undefined,this.technologyId,heading).subscribe((res:any)=>{
      console.log(res.data[0].data[0].value);
      this.tabCheckListData=res.data[0].data[0].value
    })


  }


  // test() {
  //   const listItems = document.querySelectorAll("#checklistHeadingList li");
  //   // Add a click event listener to each <li> to toggle the "selected" class
  //   listItems.forEach((item) => {
  //     item.addEventListener("click", () => {
  //       // Remove the "selected" class from all <li> elements
  //       listItems.forEach((li) => li.classList.remove("selected"));
  //       // Add the "selected" class to the clicked <li> element
  //       item.classList.add("selected");
  //     });
  //   });
  // }

  addSideNavData() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.auth_token}`
    });
    let checklistHeadingJson = {
      "leftNav": [this.checklistHeading],
      "technologiesId": this.technologyId
    }
    let updatetHeadingJson = {
      "leftNav": this.checklistHeading,
      "leftNavId": this.leftNavId
    }
    if(this.sideNavData){
      this.codeService.updateSideNav(updatetHeadingJson, headers).subscribe((res:any)=>{
        if(res.success == true ){
          this.getSideNavData()
        }
      })
    }
    else{
      this.codeService.postSideNav(checklistHeadingJson, headers).subscribe((res:any)=>{
        if(res.success == true ){
          this.getSideNavData()
        }
      })

    }


  }

  deletePopup(sideNavHeading?:any, sectionName?:any,index?:number) {
    console.log(sideNavHeading);
    console.log(sectionName);
    console.log(index);

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.auth_token}`
    });
    const sampleData: ModalData = {
      popupHeaderTitle: 'Do you really want to delete?',
      popupOkBtn: 'Delete',
      popupCancelBtn: 'Cancel',
      popupDeleteBool: true
    }
    const dialogRef = this.dialog.open(AddCommentsComponent, {
      data: sampleData
    })
    dialogRef.afterClosed().subscribe((val: any) => {
      console.log(val)
      this.deleteValue = val.value
      console.log(this.deleteValue);
      if (this.deleteValue == 'Yes') {
        console.log('Val deleted');
        console.log(sideNavHeading,sectionName);
        if(index!=-1){
          this.tabCheckListData.splice(index,1)
          console.log('updated tabchecklistdata',this.tabCheckListData);
          const ifExistingKey=this.findIndexOfExistingKey(this.updatedParentQuestionsData,this.sideNavHeading)
        if(ifExistingKey!=-1){
          this.updatedParentQuestionsData[ifExistingKey].value=this.tabCheckListData
          const updatedJsonObj={
            data:this.updatedParentQuestionsData,
            checkListQuestionsId:this.checkListId,
            technologiesId:this.technologyId

          }
          this.codeService.updateCheckListQuestions(updatedJsonObj,headers).subscribe((res:any)=>{
            console.log(res);
            this.getCompleteChecklist()
            this.getTabCheckListData(this.sideNavHeading)


          })

        }


        }
        else{
          let deleteJson={
            "leftNav":sectionName,
            "leftNavId":this.leftNavId,
            "remove":true
          }
          this.codeService.updateSideNav(deleteJson,headers).subscribe((res:any)=>{
            console.log(res);
            this.getSideNavData()
          })
        }




      }
      else {
        console.log('Cancelled deletion');
      }
    })
  }

  findIndexOfExistingKey(array:any[],searchItem:string):number{
    return array.findIndex((item:any)=>item.key===searchItem)
  }

  addMainQuestionPopup() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.auth_token}`
    });
    const sampleData: ModalData = {
      popupHeaderTitle: 'Add Main Question',
      popupOkBtn: 'Add',
      popupCancelBtn: 'Cancel',
      popupAddMainQuestionBool: true
    }
    const dialogRef = this.dialog.open(AddCommentsComponent, {
      data: sampleData
    })
    dialogRef.afterClosed().subscribe((val: any) => {

      console.log('existing array',this.updatedParentQuestionsData);

      this.addMainQuestion = val.value.key
      console.log(this.addMainQuestion);
      if(val.value.btnValue=='ok'){
        if (this.updatedParentQuestionsData.length==0) {
          const parentCheckListObjext={
              key:this.addMainQuestion,
            options:'',
            rating:'',
            achievedRating:'',
            comments:''
          }
          this.parentQuestionsData.push(parentCheckListObjext)
          const parentWithKey={
            key:this.sideNavHeading,
            value:this.parentQuestionsData
          }
          this.postCheckListQuestionsData.data.push(parentWithKey)

          console.log('created checklist parent object',this.postCheckListQuestionsData);

          this.codeService.postCheckListQuestions(this.technologyId,this.sideNavHeading,this.postCheckListQuestionsData,headers).subscribe((res:any)=>{
            if(res.success==true){
              this.parentQuestionsData=[]
              console.log(res);
              this.getCompleteChecklist()
              this.getTabCheckListData(this.sideNavHeading)

            }

          })
        }
        else {
          this.postCheckListQuestionsData.checkListQuestionsId=this.checkListId
          const ifExistingKey=this.findIndexOfExistingKey(this.updatedParentQuestionsData,this.sideNavHeading)
          if(ifExistingKey!=-1){
            console.log(this.sideNavHeading,'is there in the list');
                const updatedParentCheckListObjext={
                key:this.addMainQuestion,
                options:'',
                rating:'',
                achievedRating:'',
                comments:''
              }

                this.updatedParentQuestionsData[ifExistingKey].value.push(updatedParentCheckListObjext)
                console.log('updated parent checklist array',this.updatedParentQuestionsData);
                const updatedJsonObj={
                  data:this.updatedParentQuestionsData,
                  checkListQuestionsId:this.checkListId,
                  technologiesId:this.technologyId

                }
                this.codeService.updateCheckListQuestions(updatedJsonObj,headers).subscribe((res:any)=>{
                  console.log(res);
                  this.getTabCheckListData(this.sideNavHeading)


                })

          }
          else{
            const parentCheckListObjext={
                    key:this.addMainQuestion,
                  options:'',
                  rating:'',
                  achievedRating:'',
                  comments:''
                }
                this.parentQuestionsData.push(parentCheckListObjext)
                const parentWithKey={
                  key:this.sideNavHeading,
                  value:this.parentQuestionsData
                }
                this.updatedParentQuestionsData.push(parentWithKey)
                const updatedJsonObj={
                  data:this.updatedParentQuestionsData,
                  checkListQuestionsId:this.checkListId,
                  technologiesId:this.technologyId

                }
                console.log(updatedJsonObj);

                this.codeService.updateCheckListQuestions(updatedJsonObj,headers).subscribe((res:any)=>{
                  if(res.success==true){
                    this.parentQuestionsData=[]
                    console.log(res);
                   this.getTabCheckListData(this.sideNavHeading)

                  }

                })

          }



        }
      }



    })

  }
  editMainQuestionPopup(index:number,tabkey:string,parentTab:string){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.auth_token}`
    });
    console.log('index',index,'tabkey',tabkey,'parent tab',parentTab);
    console.log(this.sideNavHeading);

    const sampleData: ModalData = {
      popupHeaderTitle: ' edit main question',
      popupOkBtn: 'Add',
      popupCancelBtn: 'Cancel',
      popupEditMainQuestionBool: true,
      popupTabKey:tabkey
    }
    const dialogRef = this.dialog.open(AddCommentsComponent, {
      data: sampleData
    })
    dialogRef.afterClosed().subscribe((val:any)=>{
      if(val.value.btnValue=='edit'){
        console.log(val)
        this.tabCheckListData[index].key=val.value.key
        console.log('updated checklist data',this.tabCheckListData);

        const ifExistingKey=this.findIndexOfExistingKey(this.updatedParentQuestionsData,this.sideNavHeading)
        if(ifExistingKey!=-1){
          this.updatedParentQuestionsData[ifExistingKey].value=this.tabCheckListData
          const updatedJsonObj={
            data:this.updatedParentQuestionsData,
            checkListQuestionsId:this.checkListId,
            technologiesId:this.technologyId

          }
          this.codeService.updateCheckListQuestions(updatedJsonObj,headers).subscribe((res:any)=>{
            console.log(res);
            this.getCompleteChecklist()
            this.getTabCheckListData(this.sideNavHeading)


          })

        }



      }
      else{
        console.log('cancelled');

      }

    })



  }

  addSubQuestionPopup() {
    const sampleData: ModalData = {
      popupHeaderTitle: 'Add Sub Question',
      popupOkBtn: 'Add',
      popupCancelBtn: 'Cancel',
      popupAddSubQuestionBool: true
    }
    const dialogRef = this.dialog.open(AddCommentsComponent, {
      data: sampleData
    })
    dialogRef.afterClosed().subscribe((val: any) => {
      this.addSubQuestion = val.value
      console.log(this.addSubQuestion);
      if (this.addSubQuestion) {
        console.log('Sub question added');
      }
      else {
        console.log('Cancelled sub question addition');

      }
    })
  }

}
