import { Component, OnInit } from '@angular/core';
import { UserService } from './service/user.service';
import { User } from './interface/user';
import { HttpEventType } from '@angular/common/http';
import { tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'dailyart';

  users:User[];



  private user: User=   {
    'id': 2,
    'name': 'Aljosa Graham',
    'username': 'Aljosa',
    'email': 'Sincere@april.biz',
    'address': {
      'street': 'Kulas Light',
      'suite': 'Apt. 556',
      'city': 'Gwenborough',
      'zipcode': '92998-3874',
      'geo': {
        'lat': '-37.3159',
        'lng': '81.1496'
      }
    },
    'phone': '1-770-736-8031 x56442',
    'website': 'hildegard.org',
    'company': {
      'name': 'Romaguera-Crona',
      'catchPhrase': 'Multi-layered client-server neural-net',
      'bs': 'harness real-time e-markets'
    }
  }


  private user2: any =   {
    'id': 2,
    'name': 'Aljosa Graham',
    'username': 'Aljosa',
    'email': 'Sincere@april.biz',
    'company': {
      'name': 'IBM',
    }
  }

  fileStatus =  {
      status: '',
      percentage: 0
    }

  constructor(private userService:UserService){}

  ngOnInit(){
    this.onGetUsers();
  }


  onGetUsers():void{
    this.userService.getUsers().subscribe(
      (response) => {
        this.users = response
        console.log(response)
      },
      (error) => console.log(error),
      () => console.log('Done getting users')
    )
  }


  onGetUser():void{
    this.userService.getUser().subscribe(
      (response) =>{
        console.log(response),
        this.users.push(response)
      },
      (error) => console.log(error),
      () => console.log('Done getting user')
    )

  }


  onCreateUser(){

    this.userService.createUser(this.user).subscribe(
      (response) => console.log(response),
      (error) => console.log(error),
      () => console.log('User was created')
    )
  }

  onUpdateUser(){
    this.userService.updateUser(this.user).subscribe(
      (response) => console.log(response),
      (error) => console.log(error),
      () => console.log('User was updated')
    )
  }

  onPatchUser(){
    this.userService.patchUser(this.user2).subscribe(
      (response) => console.log(response),
      (error) => console.log(error),
      () => 'User was patched'
    )
  }

  onDeleteUser(){
    this.userService.deleteUser(5).subscribe(
      (response) => console.log(response),
      (error) => console.log(error),
      () => console.log('Deleting was done')
    )
  }




// Following the progress of the request
onUploadFile(files: any): void {
    console.log(files);
    const formData = new FormData();
    for (const file of files.target.files) {
     formData.append('files', file, file.name);
    }
    this.userService.uploadFiles(formData).subscribe(
      (event) => {
        switch(event.type){
          case HttpEventType.UploadProgress || HttpEventType.DownloadProgress:
            this.fileStatus.percentage = Math.round(100 * event.loaded / event.total);
            this.fileStatus.status = 'progress';
            console.log(this.fileStatus);
            break
          case HttpEventType.Response:
            if(event.status === 200){
              this.fileStatus.percentage = 0;
              this.fileStatus.status = 'done';
              console.log(event);
              console.log(this.fileStatus);
              break;
            }
            break;
        }
      },
      (error) => console.log(error),
      () => console.log('Done getting user')
    )
  }

}
