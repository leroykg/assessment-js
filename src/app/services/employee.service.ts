import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient,HttpParams, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import {Employee,Skill} from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseUrl = 'http://127.0.0.1:8000/api';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  //Handle Error but still need to a service for error displaying
  private handleError<T>( result?: T) {
    return (response: any): Observable<T> => {
      //error handling service comes here
      return of(result as T);
    };
  }

  //Get all/Search/Filter
  get(searchArgs: {search: string, skill: string,yearOfBirth: string}): Observable<any> {
    
    let httpParams = new HttpParams();
    if(searchArgs?.search){ httpParams = httpParams.append('search', searchArgs.search); }
    if(searchArgs?.skill){ httpParams = httpParams.append('skill', searchArgs.skill); }
    if(searchArgs?.yearOfBirth){ httpParams = httpParams.append('yearOfBirth', searchArgs.yearOfBirth); }
    
    return this.http.get(this.baseUrl+"/employees/?"+httpParams.toString()).pipe(
        catchError(this.handleError<Employee[]>([]))
    );
  }

  //Update employee
  update(employee: Employee): Observable<any> {
    return this.http.put(this.baseUrl+"/employees/"+employee.id, employee, this.httpOptions).pipe(
      catchError(this.handleError<any>())
    );
  }

  //Delete employee
  delete(employee: Employee): Observable<any> {
    return this.http.delete(this.baseUrl+"/employees/"+employee.id, this.httpOptions).pipe(
      catchError(this.handleError<any>())
    );
  }

  //Add new employee
  insert(employee: Employee): Observable<any> {
    return this.http.post(this.baseUrl+"/employees/", employee, this.httpOptions).pipe(
      catchError(this.handleError<any>())
    );
  }
}