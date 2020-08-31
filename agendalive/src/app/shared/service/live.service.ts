import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ResponsePageable } from '../model/responsePageable.model';
import { Observable } from 'rxjs';
import { Live } from '../model/live.model';

@Injectable({
  providedIn: 'root'
})
export class LiveService {

  apiUrl = 'http://localhost:3333/lives';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private httpClient: HttpClient
  ) { }

  public getLivesWithFlag(flag: string): Observable<ResponsePageable> {
    console.log(this.apiUrl + '/' + flag);
    return this.httpClient.get<ResponsePageable>(this.apiUrl + '/' + flag);
  }

  public postLives(live: any): Observable<Live>{
    return this.httpClient.post<any>(this.apiUrl, live, this.httpOptions);
  }
}
