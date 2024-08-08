import isGmail from "./isGmail.js";
import is_number from "./is_number.js";
import letras from "./letras.js";
import remover from "./remover.js";
import is_valid from "./is_valid.js";
import solicitud from "./ajax.js";

const $formulario = document.querySelector("form");
const nombre = document.querySelector("#nombre");
const apellidos = document.querySelector("#apellidos");
const telefono = document.querySelector("#telefono");
const direccion = document.querySelector("#direccion");
const documento = document.querySelector("#documento");
const tipo = document.querySelector("#tipo");
const politicas = document.querySelector("#politicas");
const correo = document.querySelector(  "#email");
const boton = document.querySelector("#boton");
const tbUsers = document.querySelector("#tp_users")
const fragmento = document.createDocumentFragment()
const tbody = document.querySelector("tbody")

const listar = async () => {
  const data = await solicitud("users");
  
  data.forEach(element => {
    tbUsers.querySelector(".nombre").textContent = element.first_name
    tbUsers.querySelector(".apellido").textContent = element.last_name
    tbUsers.querySelector(".email").textContent = element.email
    tbUsers.querySelector(".telefono").textContent = element.phone
    tbUsers.querySelector(".direccion").textContent = element.address
    tbUsers.querySelector(".tipo").textContent = element.type_id
    tbUsers.querySelector(".documento").textContent = element.document


    const clone = document.importNode(tbUsers, true)
    fragmento.appendChild(clone)
  })
  tbody.appendChild(fragmento)
}

const cantidad = (elemento) => {
    let valor = elemento.value.length === 10;
    if (valor) {
        alert("correcto")
        elemento.classList.add("correcto")
    }
}




const documentos = () =>{
    const fragmento = document.createDocumentFragment();
    fetch('http://localhost:3000/documents')
    .then((response) => response.json())
    .then((data) => {
        let option = document.createElement("option");
        option.textContent = "Seleccione...";
        fragmento.appendChild(option);
        option.value = ""
        data.forEach(element => {
            let option = document.createElement("option");
            option.value = element.id;
            option.textContent = element.name;
            fragmento.appendChild(option)
        });
        tipo.appendChild(fragmento)
    });
}

const createRow = (data) => {
    const tr = body.instertRow(-1);

    const tdNombre = tr.innerCell(0)
    const tdApellido = tr.innerCell(1)
    const tdTelefono = tr.innerCell(2)
    const tdEmail = tr.innerCell(3)
    const tdDocumento = tr.innerCell(4)
    const tdtipodocumento = tr.innerCell(5)
    const tdDireccion= tr.innerCell(6)


    tdNombre.textContent = data.first_name
    tdApellido.textContent = data.last_name
    tdTelefono.textContent = data.phone
    tdEmail.textContent = data.email
    tdDocumento.textContent = data.document
    tdtipodocumento = data.type_id
    tdDireccion = data.address
}



addEventListener("DOMContentLoaded", (event)=>{
    documentos()
    listar()
    if (!politicas.checked) {
        boton.setAttribute("disabled","");
    }
});

politicas.addEventListener("change", function(e){
    console.log(e.target.checked);
    if (e.target.checked) {
        boton.removeAttribute("disabled")
    }
});

$formulario.addEventListener("submit", (event)=>{
    let response = is_valid(event, "form [required]");
    if (response) {
        const data ={
            first_name: nombre.value,
            last_name: tipo.value,
            address: direccion.value,
            type_id: tipo.value,
            email: correo.value,
            phone: telefono.value,
            document: documento.value,
        }        
        fetch('http://localhost:3000/users',{
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then((response) => response.json())
        .then((json) =>{
            nombre.value="";
            apellidos.value="";
            direccion.value="";
            telefono.value="";
            tipo.value="";
            documento.value="";
            correo.value="";
            politicas.checked = false;
        })
    }else{
        alert("Rellena Los Campos")
    }
});




nombre.addEventListener("keypress", (event) => {
    remover(event, nombre);
});
apellidos.addEventListener("blur", (event) => {
    remover(event, apellidos);
});
tipo.addEventListener("change", (event) => {
    remover(event, tipo);
});
telefono.addEventListener("blur", (event) => {
    remover(event, telefono);
});

documento.addEventListener("keypress", is_number);
telefono.addEventListener("keypress", is_number);

nombre.addEventList

nombre.addEventListener("keypress", letras );
apellidos.addEventListener("keypress", (event) => {
    letras(event, apellidos);
});
correo.addEventListener("blur", (event) => {
    isGmail(event, correo);
});
direccion.addEventListener("blur", (event) => {
    remover(event, direccion);
});
documento.addEventListener("blur", (event)=> {
    remover(event, documento);
});

tipo.addEventListener("blur", (event) => {
    remover(event, tipo);
});

