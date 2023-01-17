//referencias globales de elementos del DOM
const kart = document.querySelector(".listado__logo");
const btnClose = document.querySelector(".listado__close");
const listado = document.querySelector(".listado");
const cursos = document.querySelector("#cursos");
let cursoArr = [];

window.onload = () => {
  //Mostrar listado
  kart.addEventListener("click", toggleListado);
  btnClose.addEventListener("click", toggleListado);
  cursos.addEventListener("click", agregarCursos);

  //Agregando localSorage
  cursoArr = JSON.parse(window.localStorage.getItem("listado")) || [];
  agregarHTML(cursoArr);
};

//Funciones
function agregarCursos(e) {
  if (e.target.classList.contains("btn")) {
    const curso = e.target.parentElement;
    extraerDatos(curso);
  }
}

function extraerDatos(curso) {
  const cursoObj = {
    titulo: curso.querySelector(".card-title").textContent.trim(),
    precio: curso.querySelector("#precio").textContent.trim(),
    id: curso.dataset.id,
    cantidad: 1,
  };

  //Comprueba si ya existe el curso en el array para aumentar la cantidad
  if (cursoArr.some((curso) => curso.id === cursoObj.id)) {
    const ArrActualizado = cursoArr.map((curso) => {
      if (curso.id === cursoObj.id) {
        curso.cantidad++;
      }
      return curso;
    });
    cursoArr = [...ArrActualizado];
  } else {
    cursoArr = [...cursoArr, cursoObj];
  }

  //Agrega el array al localStorage cada vez que se ingrese un curso al listado
  window.localStorage.setItem("listado", JSON.stringify(cursoArr));
  agregarHTML(cursoArr);
}

function agregarHTML(arr) {
  const listadoBody = document.querySelector(".listado__body");
  //Limpiar HTML de la lista del car
  while (listadoBody.firstChild) {
    listadoBody.removeChild(listadoBody.firstChild);
  }

  arr.forEach((arr) => {
    //Destructurando y creando el scripting de la lista de cursos
    const { titulo, precio, id, cantidad } = arr;

    const row = document.createElement("DIV");
    row.className = "row text-center align-items-center mb-2";

    const col = document.createElement("DIV");
    col.className = "col-3 p-0 ";
    row.appendChild(col);

    const picture = document.createElement("PICTURE");
    col.appendChild(picture);

    const avif = document.createElement("SOURCE");
    avif.srcset = `./build/img/curso${id}.avif`;
    avif.type = "image/avif";
    picture.appendChild(avif);

    const webp = document.createElement("SOURCE");
    webp.srcset = `./build/img/curso${id}.webp`;
    webp.type = "image/webp";
    picture.appendChild(webp);

    const img = document.createElement("IMG");
    img.loading = "lazy";
    img.src = `./build/img/curso${id}.jpg`;
    img.alt = "Imagen del curso";
    img.className = "img-fluid object-fit-10";
    picture.appendChild(img);

    const tituloElement = document.createElement("P");
    tituloElement.textContent = titulo;
    tituloElement.className = "col-3 p-0 m-0";
    row.appendChild(tituloElement);

    const precioElement = document.createElement("P");
    precioElement.textContent = precio;
    precioElement.className = "col-2 p-0 fw-bold m-0";
    row.appendChild(precioElement);

    const cantidadElement = document.createElement("P");
    cantidadElement.className = "col-2 fw-bold m-0";
    cantidadElement.textContent = cantidad;
    row.appendChild(cantidadElement);

    const btnBorrar = document.createElement("BUTTON");
    btnBorrar.className = "col-2 btn btn-close";
    btnBorrar.id = id;
    btnBorrar.onclick = () => {
      borrarCurso(id);
    };

    row.appendChild(btnBorrar);

    listadoBody.appendChild(row);
  });
}

//Borra un curso del listado
function borrarCurso(id) {
  let cursosActualizado = cursoArr.filter((curso) => curso.id !== id);
  cursoArr = [...cursosActualizado];
  window.localStorage.setItem("listado", JSON.stringify(cursoArr));
  agregarHTML(cursoArr);
}

//Mostrar y quitar listado de cursos
function toggleListado() {
  if (listado.classList.contains("d-none")) {
    listado.classList.remove("d-none");
    listado.classList.add("d-block");
    return;
  }

  if (listado.classList.contains("d-block")) {
    listado.classList.remove("d-block");
    listado.classList.add("d-none");
    return;
  }
}
