import {AfterViewInit, Component, ViewChild} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';


@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],

})
export class UserManagementComponent {


  displayedColumns: string[] = ['firstname', 'lastname', 'contact', 'email', 'status', 'action'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: any=MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}

export interface PeriodicElement {
  firstname: string;
  lastname: string;
  contact: number;
  email: string;
  status:string;
  action:string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {firstname: 'Jerome', lastname: 'Thomas', contact: 469-499-6871, email: 'nvt.isst.nute@gmail.com,', status:'Active', action:''},
  {firstname: 'Jerome', lastname: 'Thomas', contact: 469-499-6871, email: 'nvt.isst.nute@gmail.com,', status:'Active', action:''},
  {firstname: 'Jerome', lastname: 'Thomas', contact: 469-499-6871, email: 'nvt.isst.nute@gmail.com,', status:'Active', action:''},
  {firstname: 'Jerome', lastname: 'Thomas', contact: 469-499-6871, email: 'nvt.isst.nute@gmail.com,', status:'Active', action:''},
  {firstname: 'Jerome', lastname: 'Thomas', contact: 469-499-6871, email: 'nvt.isst.nute@gmail.com,', status:'Active', action:''},

];


