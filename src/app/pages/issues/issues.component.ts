import { Component, OnInit } from '@angular/core';
//variables de entorno
import {enviroment} from '../../../../enviroment.prod';
//importamos el archivo services donde esta el fetch
import {getGitData} from '../../Services/Services';
//importamos el Store
import { Store, select} from '@ngrx/store';
//importamos el obserbable
import { Observable } from 'rxjs';
import * as action from '../../contador.action';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.css']
})
export class IssuesComponent implements OnInit {

  contador$: Observable<number>;

  public arrayIssues:any[];
  public aparecerContenedor:boolean;
  public usuarioGit:string; //variable donde guardaremos el nombre del usuario del git
  public repoGit:string; //variable donde guardaremos el nombre del projecto qeu hemos escogido para ver las issues
  public pagina:number;

  constructor(private store: Store<{contador:number}>) { }

  ngOnInit(): void {
    this.aparecerContenedor = false
    //dividimos la url para coger los aprametros del nombre del usuario y del nombre del repo para buscar las issues
    this.usuarioGit = window.location.href.split('/')[4];
    this.repoGit = window.location.href.split('/')[5];
    this.store.dispatch(action.ig());
    this.store.subscribe(s =>  this.pagina = s.contador);
    this.funcionFetch(this.pagina);

  };

  //funcion fetch
  funcionFetch(pagina){
    getGitData(enviroment.rutarepos+this.usuarioGit+'/'+this.repoGit+`/issues?page=${pagina}&per_page=30`)
    .then((response:any) => {

      if(response.toString()){
        this.aparecerContenedor = true;
        this.arrayIssues = response
      }
      else{
        alert('No hay issues')
        window.location.href = '/';
      }
    })
    .catch(err => console.log(err))
  };


  clickAtras(){
    if(this.pagina == 1){
      alert('No puedes hechar mas atras');
    }
    else{
      this.store.dispatch(action.dec());
      this.store.subscribe(s =>  this.pagina = s.contador);
      this.funcionFetch(this.pagina);
    }
  };


  clickSiguiente(){
    if(this.arrayIssues.length < 30){
      alert('No hay mas paginas')
    }
    else{
      this.store.dispatch(action.inc());
      this.store.subscribe(s =>  this.pagina = s.contador);
      this.funcionFetch(this.pagina);
    }
  };


}
