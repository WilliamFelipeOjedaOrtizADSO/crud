import is_valid from "./is_valid.js";
import letras from "./letras.js";
import remover from "./remover.js";

const $formulario = document.querySelector("form");
const nombre = document.querySelector("#nombre");
const button = document.querySelector("button");

nombre.addEventListener("keypress", letras);

$formulario.addEventListener("submit" , (event)=>{
    let response = is_valid(event, "form [required]");
    const data ={
            name: nombre.value,
        }
    if (response) {
        button.setAttribute("disabled", "")
        fetch('http://localhost:3000/documents',{
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then(response => response.json())
        .then((json) => {
            nombre.value="";
            button.removeAttribute("disabled");
        })
    }
});

nombre.addEventListener("keypress", (event) => {
    remover(event, nombre);
});