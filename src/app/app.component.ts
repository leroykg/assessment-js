import { Component,ViewChild } from '@angular/core';
import {Employee,Skill} from './models/employee';
import { EmployeeService } from './services/employee.service';
declare var jQuery:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private employeeService: EmployeeService) { }
  
  //Default variables
  savingEmployee: boolean = false;
  showLoadingIndicator: boolean = false;
  employee: Employee | undefined;
  selectedEmployeeIndex: number = -1;
  searchKeyWord: string = "";
  employees: Employee[] = [];
  filterSkill: string = "";
  filterYear: string = "";
  totalRecords: number | undefined;

  //Bootstrap modal variable
  @ViewChild('employeeModal') employeeModal: any;

  
  //Countries List
  countries_list = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","St. Lucia","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];

  //Generate years of birth upto hundred years from now
  YearOfBirthArray() { 
    var endYear = new Date().getFullYear()-100;
    let thisYear = new Date().getFullYear();
    let yearsArray = [];
    while (thisYear >= endYear) {
      yearsArray.unshift(endYear);
      endYear++;
    }
    return yearsArray;
  }

  //add new empoyee button trigger
  addNewEmployee() {
    //set new employee defaults
    this.employee = <Employee>{
      id: 'new'
    };

    this.employee.skills = [];

    //Show modal
    jQuery(this.employeeModal.nativeElement).modal('show');
  }

  //Save employee 
  @ViewChild('firstName') firstName: any;
  @ViewChild('lastName') lastName: any;
  @ViewChild('telephone') telephone: any;
  saveEmployee(): boolean {
    if(!this.savingEmployee){
      this.savingEmployee = true;

      //Add new record id='new' else call the update request
      if(this.employee?.id=='new'){
        this.employeeService.insert(this.employee).subscribe(new_employee => {
          this.savingEmployee = false;
          if(new_employee){
            //close Modal & reset the loading indicator
            jQuery(this.employeeModal.nativeElement).modal('hide');

            //Add the new record to the list of employees
            this.employees.push(new_employee);

            //Update the total records count
            this.totalRecords = Number(this.totalRecords)+1;
          }
        });
      }else{
        if(this.employee){
          //update code comes here
        }
      }

      return true;
    }else{
      return false;
    }
  }

  //Show the results after fetching them the server
  showNewResults(response: any): void{
    this.showLoadingIndicator = false;
    this.employees = response.data;
    this.totalRecords = response.total;
  }

  //Get employees
  getEmployees(): void {
    this.showLoadingIndicator = true;
    this.employeeService.get({search: "", skill: "", yearOfBirth: ""}).subscribe(response  => {
        this.showNewResults(response);
      }
    );
  }


  ngOnInit(): void {
    this.getEmployees();
  }

}
