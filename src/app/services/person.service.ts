import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment.development';
import { PersonDTO } from '@models/DTOs/personDTO';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private http: HttpClient) {
    this.url = `${environment.api}Person`
  }

  private url: string;

  public addPerson(person: PersonDTO): Promise<PersonDTO> {
    return lastValueFrom(this.http.post<PersonDTO>(`${this.url}`, person));
  }

  public getPeople(): Promise<Array<PersonDTO>> {
    return lastValueFrom(this.http.get<Array<PersonDTO>>(`${this.url}`));

  }
}
