//importamos la variable de entorno donde esta la ruta
// import {enviroment} from '../../../enviroment.prod';

export const getGitData = (data) => {
    return fetch(data,{method:'GET'}).then(data => data.json())
}