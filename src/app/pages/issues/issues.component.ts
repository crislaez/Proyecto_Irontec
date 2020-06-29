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
  public pagina:number;

  constructor() { }

  ngOnInit(): void {
    this.pagina = 1;
    this.aparecerContenedor = false
    //dividimos la url para coger los aprametros del nombre del usuario y del nombre del repo para buscar las issues
    this.usuarioGit = window.location.href.split('/')[4];
    this.repoGit = window.location.href.split('/')[5]
    console.log(this.usuarioGit);
    console.log(this.repoGit);

    this.funcionFetch(this.pagina);

  };

  //funcion fetch
  funcionFetch(pagina){
    getGitData(enviroment.rutarepos+this.usuarioGit+'/'+this.repoGit+`/issues?page=${pagina}&per_page=30`)
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


  clickAtras(){
    this.pagina --;

    if(this.pagina < 1){
      alert('No puedes hechar mas atras');
      this.pagina = 1;

    }else{
      this.funcionFetch(this.pagina);
      console.log(this.pagina);
    }
  };

  clickSiguiente(){

    if(this.arrayIssues.length < 30){
      alert('No hay mas paginas')
    }else{
      this.pagina ++;
      this.funcionFetch(this.pagina);
      console.log(this.pagina);
    }

  };

  // mostrarDatos(){
  //   getGitData(enviroment.rutarepos+this.usuarioGit+'/'+this.repoGit+'/issues?page=1&per_page=30')
  //   .then((response:any) => {
  //     console.log(response)

  //   })
  //   .catch(err => console.log(err))
  // }

}
