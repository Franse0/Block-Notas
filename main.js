const {log}=console;
const form = document.getElementById("form");
const titulo = document.getElementById("titulo");
const fecha = document.getElementById("fecha");
const nota = document.getElementById("nota");
const deleteBtn = document.querySelector(".delete-btn");
const vistaNotas = document.getElementById("vistas-nota");
const buscar = document.getElementById("buscar");
const search = document.getElementById("search");
const notasLink = document.getElementById("notas-link")

let notas = JSON.parse(localStorage.getItem("notas"))||[];

const saveLocalStorage =(notas)=>{
    localStorage.setItem("notas", JSON.stringify( notas));
};


const buscarNota =()=>{
    const tituloBuscar = buscar.value.toLowerCase().trim()
    let notaBuscada=[];

    notaBuscada = notas.filter(nota=>nota.notaTitulo.toLowerCase() === tituloBuscar);
    log(notaBuscada)
    mostrarNotas(notaBuscada)
    buscar.value=""
};
const agregarNota = () =>{
    const tituloNota=titulo.value.trim();
    const fechaNota=fecha.value.trim();
    const contenidoNota=nota.value.trim();


    notas = [...notas,{notaTitulo:tituloNota, notaFecha:fechaNota, notaContenido:contenidoNota,notaId:notas.length+1}];
    saveLocalStorage(notas);
    mostrarNotas(notas);
    form.reset()
};

const renderNota =(nota)=>{
    return `
    <div class="nota">
    <h3>${nota.notaTitulo}</h3>
    <span>${nota.notaFecha}</span>
    <p>${nota.notaContenido}</p>
    <i class="fa-solid fa-trash delete-btn" data-id="${nota.notaId}"></i>
</div>
    `
};


const mostrarNotas =(notas)=>{
    vistaNotas.innerHTML = notas.map(nota=>renderNota(nota)).join("");
};

const borrarNota = (e)=>{
    if(!e.target.classList.contains("delete-btn"))return;
    const filderId = Number(e.target.dataset.id);
    notas = notas.filter(nota=> nota.notaId!==filderId);
    saveLocalStorage(notas);
    mostrarNotas(notas);
};

const refresh =() =>{
    mostrarNotas(notas)
};


const init =()=>{
    mostrarNotas(notas);
    form.addEventListener("submit", (e)=>{
        e.preventDefault();
        agregarNota()
    });
    vistaNotas.addEventListener("click", borrarNota )
    search.addEventListener("click", buscarNota)
    notasLink.addEventListener("click", refresh)
};
init()