
const email = (elemento) => {
let expresion = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+(\.[a-zA-Z]{2,}){1,2}$/
let resultado = expresion.test(elemento.value)
console.log("Resultado de la validacion", resultado);
    if(expresion.test(elemento.value)){
      elemento.classList.remove("error")
      elemento.classList.classList("succes")
    }
    else{
      elemento.classList.add("error")
      elemento.classList.remove("correcto")
    }

  }

    export default email