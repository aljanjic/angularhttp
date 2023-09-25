import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpParams, HttpParamsOptions } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators'
import { User } from '../interface/user';
import { environment } from 'src/enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = environment.apiUrl;

  //  moreParams = ['string'];
  readonly moreParamms = ['Aljosa', 'Sofija']
  prezime = 'prezume=janjic';

  readonly defaultImage = 'https://robohash.org';

  constructor(private http: HttpClient) { }







  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(`${this.apiUrl}/users`).pipe(
      tap( (users) => console.log(users)),
      map((users) => users.map((user) => ({
        image: `${this.defaultImage}/${user.username.toLowerCase()}`,
        name: user.name.toUpperCase(),
        username: user.username,
        email: user.email,
        phone: user.phone,
        role: user.id === 5 ? 'Admin' : 'User'
      })))
    )
  }

  getUser(): Observable<User>{
    return this.http.get<User>(`${this.apiUrl}/users/1`).pipe(
      map((user) => ({
        image: `${this.defaultImage}/${user.username.toLowerCase()}`,
        name: user.name.toUpperCase(),
        username: user.username,
        email: user.email,
        phone: user.phone,
        role: user.id === 5 ? 'Admin' : 'User'
      })))
  }

  createUser(user: User): Observable<User>{
    return this.http.post<User>(`${this.apiUrl}/users`, user)
  }

  updateUser(user:User): Observable<User>{
    return this.http.put<User>(`${this.apiUrl}/users/${user.id}`, user)
  }

  patchUser(user:User): Observable<User>{
    return this.http.patch<User>(`${this.apiUrl}/users/${user.id}`, user)
  }

  deleteUser(id: number): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/users/${id}`)
  }

  uploadFiles(formData: FormData):Observable<HttpEvent<string[]>> {
    return this.http.post<string[]>(`http://localhost:4200/assets/data`, formData, 
    {observe: 'events', reportProgress: true  });
  }







  


//   getUsers(): Observable<User[]>{

//     let myHeader = new HttpHeaders({'id': ['123', '123']});
//     let myHeaders = new HttpHeaders({'myHeader': ['Header value', 'Header value 123']});
//     myHeaders = myHeaders.set('id', '123');
//     myHeaders = myHeaders.append('id', '2312');

//     return this.http.get<User[]>(`${this.apiUrl}/users`, {headers: myHeader})
//   }

//   getUser(): Observable<HttpEvent<User>>{

// // Params 
//         // let myParams = new HttpParams().set('id', 3).set('page', 2); 
//         // myParams = myParams.append('name', 'Marko')
//         // return this.http.get<User>(`${this.apiUrl}/users/`, {params: myParams})

//       // fromObject
//         // const theParams = {['ime']: this.moreParamms};
//         // let myParams = new HttpParams({fromObject: theParams})

//       // fromString
//         // let myParams = new HttpParams({fromString: this.prezime}
//     return this.http.get<User>(`${this.apiUrl}/users/`, {observe:'events', reportProgress:true})
//   }

//   createUser(user: User): Observable<User>{
//     return this.http.post<User>(`${this.apiUrl}/users`, user)
//   }

//   updateUser(user:User): Observable<User>{
//     return this.http.put<User>(`${this.apiUrl}/users/${user.id}`, user)
//   }

//   patchUser(user:User): Observable<User>{
//     return this.http.patch<User>(`${this.apiUrl}/users/${user.id}`, user)
//   }

//   deleteUser(id: number): Observable<void>{
//     return this.http.delete<void>(`${this.apiUrl}/users/${id}`)
//   }

//   uploadFiles(formData: FormData):Observable<HttpEvent<string[]>> {
//     console.log('Hellloooo')
//     return this.http.post<string[]>(`http://localhost:4200/assets/data`, formData, 
//     {observe: 'events', reportProgress: true  });
//   }
  

}
