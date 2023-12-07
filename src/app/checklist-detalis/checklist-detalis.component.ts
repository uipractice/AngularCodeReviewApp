import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddCommentsComponent,ModalData } from '../add-comments/add-comments.component';
import { ActivatedRoute, Router } from '@angular/router';
import { CodeReviewService } from '../code-review.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-checklist-detalis',
  templateUrl: './checklist-detalis.component.html',
  styleUrls: ['./checklist-detalis.component.css']
})

export class ChecklistDetailsComponent implements OnInit {

  getActiveSelectedIndex(_t35: number) {
    throw new Error('Method not implemented.');
  }

  checklistHeading: string = '';
  deleteValue: any
  auth_token: any
  addMainQuestion: any
  addSubQuestion: any
  technologyId: any
  technologyName: any
  sideNavData: any
  sideNavHeading: any
  leftNavId: any
  checkListId: any
  tabCheckListData: any
  isLoaderActive:boolean=false
  updatedParentQuestionsData: any[] = []
  parentQuestionsData: Object[] = []
  childQuestionsData: Object[] = []
  completeCheckList: Object[] = []
  marginTop: any = '0%';
  ifCheckListData: boolean = false
  postCheckListQuestionsData: any = {
    data: [],
    total: {
      rating: "",
      achievedRating: ""
    },
    totlaPerc: {
      rating: "",
      achievedRating: ""
    },
    technologiesId: "",
    checkListQuestionsId: ""
  }
  selectedItemIndex: number = 0;

  constructor(private codeService: CodeReviewService, private dialog: MatDialog, private router: Router, private activatedRouter: ActivatedRoute) { }

  ngOnInit(): void {

    console.log('sidenavdata', this.sideNavData);

    this.auth_token = JSON.parse(localStorage.getItem('auth_token') || '{}')
    this.activatedRouter.paramMap.subscribe((res: any) => {
      this.technologyId = res.params.id
        this.technologyName = res.params.techname
    })
    this.getSideNavData()
    this.postCheckListQuestionsData.technologiesId = this.technologyId
    this.getCompleteChecklist()
  }

  getCompleteChecklist() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.auth_token}`
    });
    this.codeService.getCompleteReviewTrackerDetails(headers, this.technologyId).subscribe((res: any) => {
      console.log(res);
      
      console.log(res.data[0].data);
      if (res.data.length) {
        this.updatedParentQuestionsData = res.data[0].data
        this.checkListId = res.data[0]._id
        console.log(this.updatedParentQuestionsData);
      }
      else {
        this.updatedParentQuestionsData = res.data
      }
      console.log('existing or updated array', this.updatedParentQuestionsData);
    })
  }

  getSideNavData() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.auth_token}`
    });
    this.codeService.getSideNav(this.technologyId, headers).subscribe((res: any) => {
      if (res.success == true && res.data) {
        this.sideNavData = res.data[0].leftNav
        this.leftNavId = res.data[0]._id
        console.log('sidenav List', res);
        let sideNavFirstElement = res.data[0].leftNav[0]
        this.sideNavHeading = sideNavFirstElement
        this.getTabCheckListData(sideNavFirstElement)
      }
    })
  }

  saveCheckListData() {
    this.router.navigate(['/header/codereview-managment'])
  }

  onSelectSideNav(heading: any, index: number) {
    console.log('heading', heading);
    this.sideNavHeading = heading
    this.marginTop = '0%';
    this.getTabCheckListData(this.sideNavHeading)
    this.selectedItemIndex = index;
  }

  getTabCheckListData(heading: any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.auth_token}`
    });
    this.codeService.getReviewTrackerDetails(headers, undefined, this.technologyId, heading).subscribe((res: any) => {
      this.isLoaderActive=true
      if (res.data.length != 0) {
        this.ifCheckListData = true
        this.isLoaderActive=false
        console.log(res.data[0].data[0].value);
        this.tabCheckListData = res.data[0].data[0].value
      }
      else {
        this.ifCheckListData = false
        this.isLoaderActive=false

      }
    })
  }

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
    if (this.sideNavData) {
      this.codeService.updateSideNav(updatetHeadingJson, headers).subscribe((res: any) => {
        if (res.success == true) {
          this.getSideNavData()
          this.checklistHeading = ''
        }
      })
    }
    else {
      this.codeService.postSideNav(checklistHeadingJson, headers).subscribe((res: any) => {
        if (res.success == true) {
          this.getSideNavData()
          this.checklistHeading = ''
        }
      })
    }
  }

  deletePopup(index?: number, sectionName?: any, sideNavHeading?: any, childIndex?: number) {
    console.log('childIndex', childIndex);
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
        console.log(sideNavHeading, sectionName);
        if (index != -1) {
          this.tabCheckListData.splice(index, 1)
          console.log('updated tabchecklistdata', this.tabCheckListData);
          const ifExistingKey = this.findIndexOfExistingKey(this.updatedParentQuestionsData, this.sideNavHeading)
          if (ifExistingKey != -1) {
            this.updatedParentQuestionsData[ifExistingKey].value = this.tabCheckListData
            const updatedJsonObj = {
              data: this.updatedParentQuestionsData,
              checkListQuestionsId: this.checkListId,
              technologiesId: this.technologyId

            }
            this.codeService.updateCheckListQuestions(updatedJsonObj, headers).subscribe((res: any) => {
              console.log(res);
              this.getCompleteChecklist()
              this.getTabCheckListData(this.sideNavHeading)
            })
          }
        }
        else {
          let deleteJson = {
            "leftNav": sectionName,
            "leftNavId": this.leftNavId,
            "remove": true
          }
          this.codeService.updateSideNav(deleteJson, headers).subscribe((res: any) => {
            if (res.success == true) {
              this.getSideNavData()
              this.onSelectSideNav(sectionName, 0)

              const ifExistingKey = this.findIndexOfExistingKey(this.updatedParentQuestionsData, sectionName)
              if (ifExistingKey != -1) {
                this.updatedParentQuestionsData.splice(ifExistingKey, 1)
                console.log('deleted updated array', this, this.updatedParentQuestionsData);
                let updatedJson = {
                  data: this.updatedParentQuestionsData,
                  checkListQuestionsId: this.checkListId,
                  technologiesId: this.technologyId
                }
                this.codeService.updateCheckListQuestions(updatedJson, headers).subscribe((res: any) => {
                  console.log(res);
                  this.getCompleteChecklist()
                })
              }
            }
          })
        }
      }
      else {
        console.log('Cancelled deletion');
      }
    })
  }

  deleteSubChildPopup(index: number, childIndex: number, parentKey?: string) {
    console.log(parentKey);
    console.log(index, childIndex);
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
      this.deleteValue = val.value
      console.log(this.deleteValue);
      if (this.deleteValue == 'Yes') {
        this.tabCheckListData[index].value.splice(childIndex, 1)
        if (this.tabCheckListData[index].value.length == 0) {
          let updatedParentJson = {
            key: parentKey,
            options: '',
            rating: '',
            achievedRating: '',
            comments: ''
          }
          this.tabCheckListData[index] = (updatedParentJson)
        }
        const ifExistingKey = this.findIndexOfExistingKey(this.updatedParentQuestionsData, this.sideNavHeading)
        if (ifExistingKey != -1) {
          this.updatedParentQuestionsData[ifExistingKey].value = this.tabCheckListData
          const updatedJsonObj = {
            data: this.updatedParentQuestionsData,
            checkListQuestionsId: this.checkListId,
            technologiesId: this.technologyId
          }
          this.codeService.updateCheckListQuestions(updatedJsonObj, headers).subscribe((res: any) => {
            console.log(res);
            this.getTabCheckListData(this.sideNavHeading)
          })
        }
      }
      console.log('updated checklist', this.tabCheckListData);
    })
  }

  findIndexOfExistingKey(array: any[], searchItem: string): number {
    return array.findIndex((item: any) => item.key === searchItem)
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

      console.log('existing array', this.updatedParentQuestionsData);

      this.addMainQuestion = val.value.key
      console.log(this.addMainQuestion);
      if (val.value.btnValue == 'ok') {
        if (this.updatedParentQuestionsData.length == 0) {
          const parentCheckListObjext = {
            key: this.addMainQuestion,
            options: '',
            rating: '',
            achievedRating: '',
            comments: ''
          }
          this.parentQuestionsData.push(parentCheckListObjext)
          const parentWithKey = {
            key: this.sideNavHeading,
            value: this.parentQuestionsData
          }
          this.postCheckListQuestionsData.data.push(parentWithKey)

          console.log('created checklist parent object', this.postCheckListQuestionsData);

          this.codeService.postCheckListQuestions(this.technologyId, this.sideNavHeading, this.postCheckListQuestionsData, headers).subscribe((res: any) => {
            if (res.success == true) {
              this.parentQuestionsData = []
              console.log(res);
              this.getCompleteChecklist()
              this.getTabCheckListData(this.sideNavHeading)
            }
          })
        }
        else {
          this.postCheckListQuestionsData.checkListQuestionsId = this.checkListId
          const ifExistingKey = this.findIndexOfExistingKey(this.updatedParentQuestionsData, this.sideNavHeading)
          if (ifExistingKey != -1) {
            console.log(this.sideNavHeading, 'is there in the list');
            const updatedParentCheckListObjext = {
              key: this.addMainQuestion,
              options: '',
              rating: '',
              achievedRating: '',
              comments: ''
            }
            this.updatedParentQuestionsData[ifExistingKey].value.push(updatedParentCheckListObjext)
            console.log('updated parent checklist array', this.updatedParentQuestionsData);
            const updatedJsonObj = {
              data: this.updatedParentQuestionsData,
              checkListQuestionsId: this.checkListId,
              technologiesId: this.technologyId
            }
            this.codeService.updateCheckListQuestions(updatedJsonObj, headers).subscribe((res: any) => {
              console.log(res);
              this.getTabCheckListData(this.sideNavHeading)
            })
          }
          else {
            const parentCheckListObjext = {
              key: this.addMainQuestion,
              options: '',
              rating: '',
              achievedRating: '',
              comments: ''
            }
            this.parentQuestionsData.push(parentCheckListObjext)
            const parentWithKey = {
              key: this.sideNavHeading,
              value: this.parentQuestionsData
            }
            this.updatedParentQuestionsData.push(parentWithKey)
            const updatedJsonObj = {
              data: this.updatedParentQuestionsData,
              checkListQuestionsId: this.checkListId,
              technologiesId: this.technologyId
            }
            console.log(updatedJsonObj);

            this.codeService.updateCheckListQuestions(updatedJsonObj, headers).subscribe((res: any) => {
              if (res.success == true) {
                this.parentQuestionsData = []
                console.log(res);
                this.getTabCheckListData(this.sideNavHeading)
              }
            })
          }
        }
      }
    })

  }

  editQuestionPopup(index: number, tabkey: string, parentTab: string, childIndex?: number) {
    console.log(childIndex);

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.auth_token}`
    });
    console.log('index', index, 'tabkey', tabkey, 'parent tab', parentTab);
    console.log(this.sideNavHeading);

    const sampleData: ModalData = {
      popupHeaderTitle: 'Edit Main question',
      popupOkBtn: 'Add',
      popupCancelBtn: 'Cancel',
      popupEditMainQuestionBool: true,
      popupTabKey: tabkey
    }
    const dialogRef = this.dialog.open(AddCommentsComponent, {
      data: sampleData
    })
    dialogRef.afterClosed().subscribe((val: any) => {
      if (val.value.btnValue == 'edit') {
        if (childIndex == undefined) {
          console.log(val)
          this.tabCheckListData[index].key = val.value.key
          console.log('updated checklist data', this.tabCheckListData);

          const ifExistingKey = this.findIndexOfExistingKey(this.updatedParentQuestionsData, this.sideNavHeading)
          if (ifExistingKey != -1) {
            this.updatedParentQuestionsData[ifExistingKey].value = this.tabCheckListData
            const updatedJsonObj = {
              data: this.updatedParentQuestionsData,
              checkListQuestionsId: this.checkListId,
              technologiesId: this.technologyId
            }
            this.codeService.updateCheckListQuestions(updatedJsonObj, headers).subscribe((res: any) => {
              console.log(res);
              this.getCompleteChecklist()
              this.getTabCheckListData(this.sideNavHeading)
            })
          }
        }
        else {
          this.tabCheckListData[index].value[childIndex].key = val.value.key
          console.log('updated tab checklist data', this.tabCheckListData);
          const ifExistingKey = this.findIndexOfExistingKey(this.updatedParentQuestionsData, this.sideNavHeading)
          if (ifExistingKey != -1) {
            this.updatedParentQuestionsData[ifExistingKey].value = this.tabCheckListData
            const updatedJsonObj = {
              data: this.updatedParentQuestionsData,
              checkListQuestionsId: this.checkListId,
              technologiesId: this.technologyId
            }
            this.codeService.updateCheckListQuestions(updatedJsonObj, headers).subscribe((res: any) => {
              console.log(res);
              this.getCompleteChecklist()
              this.getTabCheckListData(this.sideNavHeading)
            })
          }

        }
      }
      else {
        console.log('cancelled');
      }
    })
  }

  addSubQuestionPopup(i?: any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.auth_token}`
    });
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
      this.addSubQuestion = val.value.key

      console.log(this.addSubQuestion);
      if (val.value.btnValue == 'ok') {
        console.log('parent key', this.tabCheckListData[i].key);
        let parentKey = this.tabCheckListData[i].key
        //creation of subchild object
        let subChildJson = {
          key: this.addSubQuestion,
          options: '',
          rating: '',
          achievedRating: '',
          comments: ''
        }

        if (this.tabCheckListData[i].value) {
          this.tabCheckListData[i].value.push(subChildJson)
        }
        else {
          this.childQuestionsData.push(subChildJson)

          let subChildCheckList = {
            key: parentKey,
            value: this.childQuestionsData
          }
          this.tabCheckListData[i] = subChildCheckList

        }

        console.log('parent with child object', this.tabCheckListData);

        const ifExistingKey = this.findIndexOfExistingKey(this.updatedParentQuestionsData, this.sideNavHeading)
        if (ifExistingKey != -1) {
          this.updatedParentQuestionsData[ifExistingKey].value = this.tabCheckListData
          console.log('final updated checklist data', this.updatedParentQuestionsData);
          const updatedJsonObj = {
            data: this.updatedParentQuestionsData,
            checkListQuestionsId: this.checkListId,
            technologiesId: this.technologyId
          }
          console.log(this.updatedParentQuestionsData);

          this.codeService.updateCheckListQuestions(updatedJsonObj, headers).subscribe((res: any) => {
            if (res.success == true) {
              console.log(res);
              this.getCompleteChecklist()
              this.getTabCheckListData(this.sideNavHeading)
              this.childQuestionsData = []
            }


          })

        }

      }
      else {
        console.log('Cancelled sub question addition');

      }
    })
  }

}
