import { Component, OnInit, DoCheck } from '@angular/core';
//importamos el archivo services
import {getGitData} from '../../Services/Services';
//importamos las variables de entorno
import {enviroment} from '../../../../enviroment.prod'

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit,DoCheck {

  public nombre:String;
  public mostrarDatos:Boolean; //variable para mostra los divs escondidos
  // public datosUsuarios: Array<Object>;
  public datosUsuarios:any[];
  public imagenUsuario:String; //imagen del usuario del git
  public nombreUsuario:String //nombre del usuario git
  public contadorPagina:number; //para el paginado
  public ruta:String; //ruta para el paginado

  constructor() { 

  }

  ngOnInit(): void {
    this.mostrarDatos = false;
    this.contadorPagina = 1;
  };

  ngDoCheck():void{

  };
  
  //funcion para el formulñario
  handleSubmit(){
    event.preventDefault();
    
    //si la variable esta vacia, retorna
    if(!this.nombre){
      alert('Rellene el campo de texto');
      return false
    };   

    //llamamos a la funcion que esta en services que hace la peticion a git
    getGitData(enviroment.ruta+this.nombre)
    .then((response:any) => {
      if(response.message){
        alert('No se ha encontraod usuario');
      }else{
        this.mostrarDatos = true; 
        console.log(response)
        this.imagenUsuario = response.avatar_url
        this.nombreUsuario = response.login
        this.ruta = response.repos_url;
        //llamamos ma la funcion qwue esta abajo
        this.funcionFetch(this.contadorPagina)
      }      
    })
    .catch(err => console.log(err));

    //vacaimos el input
    this.nombre = ''
  };

  //funcion para el boton atras
  handleCLickAtras(){
    this.contadorPagina--;

    if(this.contadorPagina < 1){           
      alert('No puyedes ir mas atras');
      this.contadorPagina = 1 
    }else{      
      console.log(this.contadorPagina)
      this.funcionFetch(this.contadorPagina)
    }    
  };

  //funcion para el boton siguiente
  handleCLickSiguientes(){
    
    if(this.datosUsuarios.length < 30){
      alert('No hay mas repositorios')
    }else{
      this.contadorPagina++;
      console.log(this.contadorPagina);
      this.funcionFetch(this.contadorPagina);
    }    

  };

  //funcion fetch
  funcionFetch(pagina){
    getGitData(this.ruta +`?page=${this.contadorPagina}&per_page=30`)
    .then((response:any) => {
       this.datosUsuarios = [];
       this.datosUsuarios = response
      //  console.log(this.datosUsuarios)
    })
    .catch(err => console.log(err))
  }
}
