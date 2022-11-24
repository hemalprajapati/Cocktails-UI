import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { ICocktail } from '../models/cocktail';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CocktailService {

  private url: string = 'http://localhost:8082/api';
  public hasUserName = false;
  public userName = '';
  public customError = {
    status: 500,
    message: 'Sorry! Something went wrong :('
  }

  userNameChange: Subject<string> = new Subject<string>();


  constructor(private httpClient: HttpClient) {
   
    this.userNameChange.subscribe((name) => {
      this.userName = name;
    });
  }

  public getCocktailDetails = (id): Observable<ICocktail> => {
    const urlInfo=this.url+"/cocktails/"+id;
    return this.httpClient.get<ICocktail>(urlInfo).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(err || this.customError);
      })
    );
  }

 
  public getCocktails  = (): Observable<ICocktail[]> => {
    const urlInfo=this.url+"/cocktails";
    return this.httpClient.get<ICocktail[]>(urlInfo).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(err || this.customError);
      })
    );
  }

  public setUserName = (name) => {
    this.userNameChange.next(name);
  }


}
