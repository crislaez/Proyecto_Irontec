import { Component, OnInit } from '@angular/core';
import {getGitData} from '../../Services/Services';
import {enviroment} from '../../../../enviroment.prod';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.css']
})
export class ComentariosComponent implements OnInit {  

  public nombreUsuario:string; //nombre dle usuario del repo
  public nombreRepo:string; //nombre del repo
  public numeroIssues:string; //numero de issue del repo

  public datosUsuarioIssue:any; //guardaremos los datos del usuario que escribio
  public datosComentarios:any; //guardaremos los comentarios realizados

  public cargado:boolean;

  constructor() {

   }

  ngOnInit(): void {
    this.cargado = false;
    //cogemos los 3 ultimos parametros que vienen en la url de esta pagina y lo guardamos en 3 varaibles para hacer las peticiones
    this.nombreUsuario = window.location.href.split('/')[window.location.href.split('/').length-3];
    this.nombreRepo = window.location.href.split('/')[window.location.href.split('/').length-2];
    this.numeroIssues = window.location.href.split('/')[window.location.href.split('/').length-1];

    this.obtenerDatosFetch(enviroment.rutarepos+this.nombreUsuario+'/'+this.nombreRepo+'/issues/'+this.numeroIssues,true);
    this.obtenerDatosFetch(enviroment.rutarepos+this.nombreUsuario+'/'+this.nombreRepo+'/issues/'+this.numeroIssues+'/comments',false);
  };

  //funcion que realiza el fetch
  obtenerDatosFetch(data:string,bool:boolean){
    getGitData(data)
    .then((response:any) => {
      if(bool){
        this.datosUsuarioIssue = response;
        console.log(this.datosUsuarioIssue)
      }else{
        this.datosComentarios = response;
        console.log(this.datosComentarios);
      }
      this.cargado = true;
    })
    .catch(err => console.log(err))
  };

}
// http://localhost:4200/comentarios/microsoft/0xDeCA10B/93
// <!-- https://api.github.com/repos/microsoft/0xDeCA10B/issues/93 -->
// <!-- https://api.github.com/repos/microsoft/0xDeCA10B/issues/93/comments -->
// <!-- {path:'comentarios/:name/:repo/:number', component:ComentariosComponent}, -->