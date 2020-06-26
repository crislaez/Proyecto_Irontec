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

  public nombre:String; //variable para buscar todos los repositorios por usuario
  public mostrarDatos:Boolean; //variable para mostra los divs escondidos
  public mostrarTodosRepos:Boolean;//variable qeu cargara el div que SI tiene el ngfor
  public mostrarUnRepo:Boolean; //variable que cargara el div que No tiene ngFor
  public nombreRepo:String; //varaible del formulario para buscar pro repositorio
  public datosUsuarios:any;
  public imagenUsuario:String; //imagen del usuario del git
  public nombreUsuario:String //nombre del usuario git
  public contadorPagina:number; //para el paginado
  public ruta:String; //ruta para el paginado

  constructor() { 

  }

  ngOnInit(): void {
    this.mostrarDatos = false;
    this.mostrarUnRepo = false;
    this.contadorPagina = 1;
  };

  ngDoCheck():void{

  };
  
  //buscar repositorios por usuarios
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

  //buscar por repositorio
  handleSubmitBuscarRepo(){
    event.preventDefault();  
    if(!this.nombreRepo){
      alert('Rellene el nombre del repo')
    }else{
      // enviroment.rutarepos+this.usuarioGit+'/'+this.repoGit
      getGitData(enviroment.rutarepos+this.nombreUsuario+'/'+this.nombreRepo)
      .then((response:any) => {
        //si la respuesta tiene mensaje signuifica que no hay datos
        if(!response.message){
          //hacemos que el div que tiene el ngFor sea false para que no se cargue
          this.mostrarTodosRepos = false;
          //y el div que no tiene, se carge
          this.mostrarUnRepo = true;
          this.datosUsuarios = response
          console.log('aqui')
          console.log(this.datosUsuarios.name)         
        }else{
          alert('No existe ese repositorio')
        }        
      })
      .catch(err => console.log(err))
    }
    //limpiamos el campo de texto
    this.nombreRepo = ''
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
    //si la longitud del array es mebnos de 30 significa que no hay mas proeyctos, por lo tanto no podra dar siguiente    
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
      //hacemos que el div que tiene el ngFor sea false para que se cargue
       this.mostrarTodosRepos = true;
       //y el div que no lo tiene no se cargue
       this.mostrarUnRepo = false;
       this.datosUsuarios = response
    })
    .catch(err => console.log(err))
  }
}
