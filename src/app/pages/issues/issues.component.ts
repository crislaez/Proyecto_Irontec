import { Component, OnInit } from '@angular/core';
//variables de entorno
import {enviroment} from '../../../../enviroment.prod';
//importamos el archivo services donde esta el fetch
import {getGitData} from '../../Services/Services';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.css']
})
export class IssuesComponent implements OnInit {

  public arrayIssues:any[];
  public aparecerContenedor:Boolean;
  public usuarioGit:String; //variable donde guardaremos el nombre del usuario del git
  public repoGit:String; //variable donde guardaremos el nombre del projecto qeu hemos escogido para ver las issues

  constructor() { }

  ngOnInit(): void {
    this.aparecerContenedor = false
    //dividimos la url para coger los aprametros del nombre del usuario y del nombre del repo para buscar las issues
    this.usuarioGit = window.location.href.split('/')[4];
    this.repoGit = window.location.href.split('/')[5]
    console.log(this.usuarioGit);
    console.log(this.repoGit);

    this.funcionFetch();
  };

  //funcion fetch
  funcionFetch(){
   
    getGitData(enviroment.rutarepos+this.usuarioGit+'/'+this.repoGit+'/issues')
    .then((response:any) => {
      console.log(response)

      if(response.toString()){
        this.aparecerContenedor = true;
        this.arrayIssues = response
      }else{
        alert('No hay issues')
        window.location.href = '/';
      }
      
    })
    .catch(err => console.log(err))
  }

}
