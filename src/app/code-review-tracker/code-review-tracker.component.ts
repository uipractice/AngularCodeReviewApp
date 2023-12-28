import { Component, OnInit } from '@angular/core';
import { CodeReviewService } from '../code-review.service';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-code-review-tracker',
  templateUrl: './code-review-tracker.component.html',
  styleUrls: ['./code-review-tracker.component.css'],
})

export class CodeReviewTrackerComponent implements OnInit {
  detailsId: any;
  selectOptions: any;
  reviewDetailsHeader = 'Functional';
  selectelTabCheckList: any
  sideNavDetails: any;
  reviewTrackerForm: any = FormGroup;
  auth_token = '';
  isDisableSubmit: boolean = false;
  isActiveChildCOmments: boolean[] = [false];
  isActiveComments: boolean[] = [false, false];

  completeCheckList = 'Save';
  disableSave: boolean = false;
  showSummary: boolean = false;
  summaryArray: any[] = [];
  summaryPercentage: any;
  status: any;
  projectDetails: any;
  completedStatusValue: boolean = false;
  commentsData: any;
  ratingValue: boolean = false;
  achievedRatingValue: boolean = false;
  isLoaderActive: boolean = false;
  isDataAvailable: boolean = false;
  updateCommentsData: any;
  updateSummaryPercentage: any;

  constructor(private codeService: CodeReviewService, private formBuilder: FormBuilder, public dialog: MatDialog,
    private activatedRoute: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.auth_token = JSON.parse(localStorage.getItem('auth_token') ?? '{}');
    this.projectDetails = JSON.parse(localStorage.getItem('projectDetails') ?? '{}');
    this.activatedRoute.paramMap.subscribe((res: any) => {
      this.status = res.params['status'];
      this.detailsId = res.params['id'];
      console.log(this.status, this.detailsId);
    });
    if (this.status == 'completed') {
      this.showSummary = true;
    }
    this.buildReactiveForm();
    this.getSideNavData(
      this.projectDetails.technicalStackId,
      this.projectDetails.technologiesId
    );
    this.getOptions();
  }

  buildReactiveForm() {
    this.reviewTrackerForm = this.formBuilder.group({
      key: new FormControl(this.reviewDetailsHeader, Validators.required),
      value: new FormArray([]),
    });
  }

  getReviewDetails() {
    this.isLoaderActive = true;

    this.buildReactiveForm();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.auth_token}`,
    });
    //checklist questions with saved data
    this.codeService.getSavedCheckListData(headers, this.detailsId, this.reviewDetailsHeader).subscribe((res: any) => {
      if (res.success  && res.data.length != 0) {
        this.isDataAvailable = true;
        this.isLoaderActive = false;
        this.selectelTabCheckList = res.data[0].data[0];
        for(let i=0;i<this.selectelTabCheckList.value.length;i++){
          if(this.selectelTabCheckList.value[i].value ){
           if(this.status=='completed'){
            let key='selected'
            let statusKey='isCompleted'
            this.selectelTabCheckList.value[i].value.forEach(element => {
              element[key]=false
              element[statusKey]=true
              
            });
           }
           else{
            let key='selected'
            let statusKey='isCompleted'
            this.selectelTabCheckList.value[i].value.forEach(element => {
              element[key]=false
              element[statusKey]=true
              
            });

           }

          }
     

        }
        (this.commentsData = res.data[0].comments),
          (this.summaryPercentage = res.data[0].percentage);
        console.log('comments', this.commentsData, 'percentage', this.summaryPercentage);
        this.getSavedCheckListQuestions();
        console.log('form status', this.reviewTrackerForm);
        console.log('saved checked list data', res.data[0].data[0]);
      } else {
        this.codeService.getReviewTrackerDetails(headers, this.projectDetails.technicalStackId, this.projectDetails.technologiesId, this.reviewDetailsHeader).subscribe((response: any) => {
          if (response.success == true) {
            this.isDataAvailable = false;
            this.isLoaderActive = false;
            console.log(response.data[0].data[0].value);
            this.selectelTabCheckList = response.data[0].data[0];
            console.log('complete response', this.selectelTabCheckList);
            for(let i=0;i<this.selectelTabCheckList.value.length;i++){
              if(this.selectelTabCheckList.value[i].value){
                let key='selected'
                let statusKey='isCompleted'
                this.selectelTabCheckList.value[i].value.forEach(element => {
                  element[key]=false
                  element[statusKey]=true
                  
                });

              }
         

            }
            console.log('updated selected tab checklist',this.selectelTabCheckList);
            
           
            this.getCheckListQuestions();
          }
        });
      }
    });
  }

  OnSelectTab(value:any){
    let rating=0
    let achievedRating=0
    let labelValue=value.tab.textLabel
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.auth_token}`,
    });
    console.log(value.tab.textLabel);
    if(labelValue=='Summary'){
      this.showSummary=false
      this.codeService.getCompleteSavedCheckListData(headers, this.detailsId).subscribe((res:any)=>{
        console.log(res);
        
        console.log(res.data[0].data);
        let checkList=res.data[0].data
        for(let i=0;i<checkList.length;i++){
          console.log(checkList[i].value.length);
          for(let j=0;j<checkList[i].value.length;j++){
            if(checkList[i].value[j].value){
              for(let z=0;z<checkList[i].value[j].value.length;z++){
                 rating=rating+checkList[i].value[j].value[z].rating
              achievedRating=achievedRating+checkList[i].value[j].value[z].achievedRating
              }
              
            }else{
              rating=rating+checkList[i].value[j].rating
              achievedRating=achievedRating+checkList[i].value[j].achievedRating

            }

           

          }
        
          
          
        }
        console.log(rating,achievedRating);
           let totalAchievedRating = achievedRating * 100;
           let totalRating = totalAchievedRating / rating;
           let totalPercentage = totalRating;
           console.log('summary percentage', totalPercentage);
           this.summaryPercentage = totalPercentage.toFixed(2);
           console.log((rating/achievedRating)*100);
           



        
      })
    }
    else if(labelValue=='Code Review'){
      this.getReviewDetails()
    }
    

  }

  getCheckListQuestions() {
    const checkListChildGroupData = this.reviewTrackerForm.get('value') as FormArray;
    for (let child of this.selectelTabCheckList.value) {
      if (child.options == '' && child.rating == '' && child.achievedRating == '' && child.comments == '') {
        const checkListChildGroup = new FormGroup({
          key: new FormControl(child.key),
          options: new FormControl(child.options),
          rating: new FormControl(child.rating),
          achievedRating: new FormControl(child.achievedRating,),
          comments: new FormControl(child.comments),
        });
        checkListChildGroupData.push(checkListChildGroup);
      } else if (child.value) {
        const checkListChildGroup = new FormGroup({
          key: new FormControl(child.key, Validators.required),
          value: new FormArray([]),
        });
        const checkListsubChildGroupData = checkListChildGroup.get('value') as FormArray;
        for (let subChild of child.value) {
          const checkListsubChildGroup = new FormGroup({
            key: new FormControl(subChild.key),
            options: new FormControl(subChild.options),
            rating: new FormControl(subChild.rating),
            achievedRating: new FormControl(subChild.achievedRating),
            comments: new FormControl(subChild.comments),
          });
          checkListsubChildGroupData.push(checkListsubChildGroup);
        }
        checkListChildGroupData.push(checkListChildGroup);
      }
    }
  }

  getSavedCheckListQuestions() {
    const checkListChildGroupData = this.reviewTrackerForm.get('value') as FormArray;
    for (let child of this.selectelTabCheckList.value) {
      if (child.options != null) {
        if (child.achievedRating == '') {
          console.log('saved data');
          const checkListChildGroup = new FormGroup({
            key: new FormControl(child.key),
            options: new FormControl(child.options),
            rating: new FormControl(child.rating),
            achievedRating: new FormControl(child.achievedRating),
            comments: new FormControl(child.comments),
          });
          checkListChildGroupData.push(checkListChildGroup);
        } else {
          console.log('saved data');

          const checkListChildGroup = new FormGroup({
            key: new FormControl(child.key),
            options: new FormControl(child.options),
            rating: new FormControl(child.rating),
            achievedRating: new FormControl(child.achievedRating, [Validators.required, this.validateNumberRange,Validators.pattern('^[0-5]$'),]),
            comments: new FormControl(child.comments),
          });
          checkListChildGroupData.push(checkListChildGroup);
        }
      } else if (child.value) {
        const checkListChildGroup = new FormGroup({
          key: new FormControl(child.key, Validators.required),
          value: new FormArray([]),
        });
        const checkListsubChildGroupData = checkListChildGroup.get('value') as FormArray;
        for (let subChild of child.value) {
          if (subChild.achievedRating == '') {
            const checkListsubChildGroup = new FormGroup({
              key: new FormControl(subChild.key),
              options: new FormControl(subChild.options),
              rating: new FormControl(subChild.rating),
              achievedRating: new FormControl(subChild.achievedRating),
              comments: new FormControl(subChild.comments),
            });
            checkListsubChildGroupData.push(checkListsubChildGroup);
          } else {
            const checkListsubChildGroup = new FormGroup({
              key: new FormControl(subChild.key),
              options: new FormControl(subChild.options),
              rating: new FormControl(subChild.rating),
              achievedRating: new FormControl(subChild.achievedRating, [Validators.required, this.validateNumberRange, Validators.pattern('^[0-5]$'),]),
              comments: new FormControl(subChild.comments),
            });
            checkListsubChildGroupData.push(checkListsubChildGroup);
          }
        }
        checkListChildGroupData.push(checkListChildGroup);
      }
    }
  }

  onvalue(number: any) {
    const control = this.formData.at(number).get('achievedRating')?.value;
    if (control <= 5 && control != null) {
      this.isDisableSubmit = false;
    } else {
      this.isDisableSubmit = true;
    }
  }

  saveCheckListData(valid: any) {
   
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.auth_token}`,
    });
    console.log(this.reviewDetailsHeader);
    let saveJson = {
      data: [this.reviewTrackerForm.value],
      detailsId: this.detailsId,
      
    };
    if (this.isDataAvailable) {
      this.codeService
        .updateCheckListData(saveJson, headers).subscribe((res: any) => {
          if(res.success){
            this.isLoaderActive=true
          console.log('submitted', res);
          setTimeout(()=>{
            this.isLoaderActive=false
          },3000)
          this.getReviewDetails()

          }
        });
    } else {
      this.codeService
        .saveCheckListData(saveJson, headers)
        .subscribe((res: any) => {
          if(res.success){
            this.isLoaderActive=true
            console.log('submitted', res);
            setTimeout(()=>{
              this.isLoaderActive=false
            },1000)
            this.getReviewDetails()
  
            }
        });
    }
  }

  getStatusValue(value: any) {
    console.log('checkbox value', value.target.checked);
    this.completedStatusValue = value.target.checked;
    if (this.completedStatusValue) {
      this.completeCheckList = 'Submit';
    } else {
      this.completeCheckList = 'Save';
    }
  }

  submitReport() {
    if (this.completedStatusValue) {
      let data = {
        _id: this.projectDetails._id,
        account: this.projectDetails.account,
        project: this.projectDetails.project,
        storyId: this.projectDetails.storyId,
        developers: this.projectDetails.developers,
        projectLead: this.projectDetails.projectLead,
        reviewPackagesandFiles: this.projectDetails.reviewPackagesandFiles,
        reviewersName: this.projectDetails.reviewersName,
        codeReviewComments: this.projectDetails.codeReviewComments,
        status: 'completed',
        technologiesId: this.projectDetails.technologiesId,
      };

      const headers = new HttpHeaders({
        Authorization: `Bearer ${this.auth_token}`,
      });
      this.codeService
        .updateReviewDetails(data, headers)
        .subscribe((res: any) => {
          console.log('updated review details', res);
        });
    } else {
      let data = {
        _id: this.projectDetails._id,
        account: this.projectDetails.account,
        project: this.projectDetails.project,
        storyId: this.projectDetails.storyId,
        developers: this.projectDetails.developers,
        projectLead: this.projectDetails.projectLead,
        reviewPackagesandFiles: this.projectDetails.reviewPackagesandFiles,
        reviewersName: this.projectDetails.reviewersName,
        codeReviewComments: this.projectDetails.codeReviewComments,
        status: 'submitted',
        technologiesId: this.projectDetails.technologiesId,
      };

      const headers = new HttpHeaders({
        Authorization: `Bearer ${this.auth_token}`,
      });
      this.codeService
        .updateReviewDetails(data, headers)
        .subscribe((res: any) => {
          console.log('updated review details', res);
        });
    }

    this.router.navigate(['header/user/startCodeReviewTracker']);
  }

  get formData(): FormArray {
    return this.reviewTrackerForm.get('value') as FormArray;
  }

  getSubChildSelection(rating: any, name: any, index: number, parentIndex: number) {
    console.log(index);
    console.log(parentIndex);

    const parentControl = this.formData.at(parentIndex).get('value') as FormArray;
    const childRatingControl = parentControl.at(index).get('rating') as FormControl;
    const childAchievedControl = parentControl.at(index).get('achievedRating') as FormControl;

    console.log(childRatingControl.patchValue(0));
    if (rating.value == 'Yes') {
      childRatingControl.setValidators([Validators.required]);
      childAchievedControl.setValidators([Validators.required,
      
        this.validateNumberRange,
        Validators.pattern('^[0-5]$'),
      ]);
      childRatingControl.patchValue(5);
      childAchievedControl.patchValue(null);
    } else if (rating.value == 'No') {
      childRatingControl.setValidators([Validators.required]);
      childAchievedControl.setValidators([
        Validators.required,
      
        this.validateNumberRange,
        Validators.pattern('^[0-5]$'),
      ]);
      childRatingControl.patchValue(5);
      childAchievedControl.patchValue(null);
    } else if (rating.value == 'NA') {
      childRatingControl.setValidators([Validators.required]);
      childAchievedControl.setValidators([
        Validators.required,
       
        this.validateNumberRange,
        Validators.pattern('^[0-5]$'),
      ]);
      childRatingControl.patchValue(0);
      childAchievedControl.patchValue(0);
    } else {
      childRatingControl.clearValidators();
      childAchievedControl.clearValidators();
    }
  }

  validateNumberRange(control: AbstractControl) {
    const inputValue = control.value;

    if (inputValue === '' || (inputValue >= 0 && inputValue <= 5)) {
      return null; // Valid input
    } else {
      control.setValue(''); // Clear the input field
      return { invalidNumber: true };
    }
  }

  isSubChildReadOnly(index: number, parentIndex: number) {
    const parentControl = this.formData
      .at(parentIndex)
      .get('value') as FormArray;
    if (parentControl) {
      if (parentControl.at(index).get('options')?.value == 'Yes') {
        return false;
      } else if (parentControl.at(index).get('options')?.value == 'No') {
        return false;
      } else if (parentControl.at(index).get('options')?.value == 'NA') {
        return true;
      }
    }

    return true;
  }

  getChildSelectedOption(rating: any, name: any, index: number) {
    console.log('child');
    
    if (this.formData.at(index).get('options')?.value == ('Yes' || 'No' || 'NA') && this.formData.at(index).get('achievedRating')?.value == '') {
      this.isDisableSubmit = true;
    } else {
      this.isDisableSubmit = false;
    }

    if (this.formData.at(index).get('rating')?.valid && this.formData.at(index).get('achievedRating')?.valid) {
      this.ratingValue = false;
      this.achievedRatingValue = false;
    } else {
      this.ratingValue = true;
      this.achievedRatingValue = true;
    }

    console.log('rating', rating);

    console.log('parent data', this.formData);
    this.formData.at(index).get('rating')?.valid;

    console.log(rating.value);
    if (rating.value == 'Yes') {
      this.formData.at(index).get('rating')?.setValidators([Validators.required]);
      this.formData.at(index).get('achievedRating')?.setValidators([
        Validators.required,
        
        this.validateNumberRange,
        Validators.pattern('^[0-5]$'),
      ]);
      this.formData.at(index).get('rating')?.markAsDirty();
      this.formData.at(index).get('rating')?.updateValueAndValidity();
      this.formData.at(index).get('rating')?.patchValue(5);
      this.formData.at(index).get('achievedRating')?.patchValue(null);
    } else if (rating.value == 'No') {
      this.formData.at(index).get('rating')?.setValidators([Validators.required]);
      this.formData.at(index).get('achievedRating')?.setValidators([
        Validators.required,
      
        this.validateNumberRange,
        Validators.pattern('^[0-5]$'),
      ]);
      this.formData.at(index).get('rating')?.markAsDirty();
      this.formData.at(index).get('rating')?.updateValueAndValidity();

      this.formData.at(index).get('rating')?.patchValue(5);
      this.formData.at(index).get('achievedRating')?.patchValue(null);
      this.formData.at(index).get('rating')?.setValidators([Validators.required]);
      this.formData.at(index).get('achievedRating')?.setValidators([
        Validators.required,
        
        this.validateNumberRange,
        Validators.pattern(/^\d*\.?\d*$/),
      ]);
      this.formData.at(index).get('rating')?.markAsDirty();
      this.formData.at(index).get('rating')?.updateValueAndValidity();
    } else if (rating.value == 'NA') {
      this.formData.at(index).get('rating')?.setValidators([Validators.required]);
      this.formData.at(index).get('achievedRating')?.setValidators([
        Validators.required,
       
        this.validateNumberRange,
        Validators.pattern('^[0-5]$'),
      ]);
      this.formData.at(index).get('rating')?.markAsDirty();
      this.formData.at(index).get('rating')?.updateValueAndValidity();
      this.formData.at(index).get('rating')?.patchValue(0);
      this.formData.at(index).get('achievedRating')?.patchValue(0);
      this.formData.at(index).get('rating')?.setValidators([Validators.required]);
      this.formData.at(index).get('achievedRating')?.setValidators([Validators.required, Validators.pattern('^[0-5]$')]);
      this.formData.at(index).get('rating')?.markAsDirty();
      this.formData.at(index).get('rating')?.updateValueAndValidity();
    } else {
      this.formData.at(index).get('rating')?.clearValidators();
      this.formData.at(index).get('achievedRating')?.clearValidators();
    }
  }

  isChildReadOnly(index: number) {
    const control = this.formData.at(index).get('achievedRating');
    if (control) {
      if (this.formData.at(index).get('options')?.value == 'NA') {
        return true;
      } else if (this.formData.at(index).get('options')?.value == 'Yes') {
        return false;
      } else if (this.formData.at(index).get('options')?.value == 'No') {
        return false;
      }
    }

    return true;
  }

  saveComments() {
    console.log('project details', this.projectDetails);

    let data = {
      _id: this.projectDetails._id,
      account: this.projectDetails.account,
      project: this.projectDetails.project,
      storyId: this.projectDetails.storyId,
      developers: this.projectDetails.developers,
      projectLead: this.projectDetails.projectLead,
      reviewPackagesandFiles: this.projectDetails.reviewPackagesandFiles,
      reviewersName: this.projectDetails.reviewersName,
      codeReviewComments: this.projectDetails.codeReviewComments,
      status: 'submitted',
      technologiesId: this.projectDetails.technologiesId,
    };
    console.log('data', data);
    console.log('tech Id', this.projectDetails.technologiesId);

    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.auth_token}`,
    });
    this.codeService.updateReviewDetails(data, headers).subscribe((res: any) => {
      console.log('updated review details', res);
    });

    this.showSummary = true;
  

    let finalSubmit = {
      detailsId: this.detailsId,
      data: [this.reviewTrackerForm.value],
      comments: this.commentsData,
      percentage: this.summaryPercentage,
    };
    console.log('updated percentage and comments', finalSubmit);

    this.codeService
      .updateCheckListData(finalSubmit, headers)
      .subscribe((res: any) => {
        console.log(res);
      });
  }

  getOptions() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.auth_token}`,
    });
    this.codeService.getOptions(headers).subscribe((res: any) => {
      this.selectOptions = res.data[0].options;
    });
  }

  getSideNavData(stackId?: any, techId?: any) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.auth_token}`,
    });
    console.log(stackId, techId, headers);

    this.codeService.getSideNav(techId, headers).subscribe((res: any) => {
      console.log(res);

      this.sideNavDetails = res.data[0].leftNav;
    });
  }

  openChildComments(i: number) {
    this.isActiveChildCOmments[i] = !this.isActiveChildCOmments[i];
    console.log('child boolean value', this.isActiveChildCOmments);
  }

  openSubChildComments(j: number, i: number) {
    

    this.selectelTabCheckList.value[i].value[j].selected=!this.selectelTabCheckList.value[i].value[j].selected
  }

  

  // (Total marks obtained / Total marks possible) x 100
  // (350/500)*100
  onGetSideSelectedValue(value?: any) {
    console.log('selected value', value);

    this.isActiveChildCOmments = [false];
    console.log('child comments', this.isActiveChildCOmments);

    // this.isDisableSubmit=false
    this.reviewDetailsHeader = value.tab.textLabel;
    this.getReviewDetails();
  }
}
