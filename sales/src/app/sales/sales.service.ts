import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalesService {
  filters!: {};

  constructor(
    private http: HttpClient
  ) { }

  getSales(dateIni:string, filter?:any): Observable<any[]> {
    
    this.filters = filter.map((fc: any) => (fc === 'stems' ? `value=${fc}` : `columns[]=${fc}`)).join('&');
    const endpointUrl = this.buildEndpointUrl(`https://apitest.ikbo.co/sales?dateini=${dateIni}&datefin=2023-10-02&value=stems`);
    
    return this.http.get<any[]>(endpointUrl);
  }

  buildEndpointUrl(baseUrl: string): string {
    return `${baseUrl}&${this.filters}`;
  }

}
