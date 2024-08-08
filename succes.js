// Agrega una clase "succes" cuando el usuario ingresa datos en un campo
const agregarSucces = (elemento) => {
    elemento.addEventListener("input", function() {
      if (elemento.value !== '') {
        elemento.classList.add("succes");
        elemento.classList.remove("error");
      }
    });
  };

export default agregarSucces 