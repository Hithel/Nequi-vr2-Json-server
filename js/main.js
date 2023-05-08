let myForm = document.querySelector("#formulario");
let tbodyIngresos = document.querySelector("#tbodyIngresos")
let tbodyEgresos = document.querySelector("#tbodyEgresos")
let btnListar = document.querySelector("#btn-listar")
let mov = document.querySelector("#movimiento")
let desc = document.querySelector("#decripcion")
let valor = document.querySelector("#valor")
let btnGuardar = document.querySelector("#btnGuardar")
let btnActualizar = document.querySelector("#btnActualizar")
let idxD = document.querySelector("#id")

btnListar.addEventListener("click", async (e)=>{
    e.preventDefault();
    let accion = e.currentTarget.dataset.accion;
    if(accion === "Listar"){
        getUserAll();
    }
});

myForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    let data = Object.fromEntries(new FormData(e.target));
    opc[e.submitter.dataset.accion](data)
})

const opc = {
    "GET": () => getUserAll(),
    "PUT": (data) => putUserAll(data),
    "DELETE": (data) => deleteUser(data),
    "SEARCH": (data) => searchUser(data),
    "POST": (data) => postUser(data),
}

let config = {
    headers: new Headers({ 
        "Content-Type": "application/json"
    }),
}

const getUserAll = async() => {
    config.method = "GET";
    let data = await ( await fetch("http://localhost:3000/usuarios",config)).json();
    mostrarData(data)
    saldoDisponible(data)
}

const postUser = async(data) => {
    config.method = "POST";
    config.body = JSON.stringify(data);
    let users = await ( await fetch("http://localhost:3000/usuarios",config)).json();
}

const deleteUser = async(id)=>{
    config.method = "DELETE";
    let del = await(await fetch(`http://localhost:3000/usuarios/${id}`,config)).json();
    console.log(del)
}

const putUserAll = async(data)=>{
    config.method = "PUT";
    config.body = JSON.stringify(data);
    console.log(data);
    let act = await(await fetch(`http://localhost:3000/usuarios/${data.id}`,config)).json();
    console.log(act)
}


function mostrarData(data){

    tbodyIngresos.innerHTML = "";
    tbodyEgresos.innerHTML = "";

    data.forEach((element) => {

        if(element.movimiento === "ingreso"){
            let tr = document.createElement("tr")
            tr.id = element.id
            tr.innerHTML = `
            <td> ${element.movimiento}</td>
            <td> ${element.decripcion}</td>
            <td> ${element.valor}</td>
            <td> <input type="submit" data-accion="DELETE" value="Eliminar" class="btn-guardar bg-danger border-0 rounded bg-secondary px-2">
                 <input type="submit" data-accion="PUT" value="Actualizar" class="btn-guardar bg-danger border-0 rounded bg-secondary px-2">
            </td>
            `

            tbodyIngresos.appendChild(tr)
        }
        else if(element.movimiento === "egreso"){
            let tr = document.createElement("tr")
            tr.id = element.id
            tr.innerHTML = `
            <td> ${element.movimiento}</td>
            <td> ${element.decripcion}</td>
            <td> ${element.valor}</td>
            <td> <input type="submit" data-accion="DELETE" value="Eliminar" class="btn-guardar bg-danger border-0 rounded bg-secondary px-2">
                 <input type="submit" data-accion="PUT" value="Actualizar" class="btn-guardar bg-danger border-0 rounded bg-secondary px-2">
            </td>
            `

            tbodyEgresos.appendChild(tr)
        }
    });
}

tbodyIngresos.addEventListener("click", (e)=>{
    let id = e.target.parentElement.parentElement.id
    console.log(id);
   if (e.target.dataset.accion =="DELETE"){
    deleteUser(id);
   }
   else if (e.target.dataset.accion =="PUT"){
    let movi = e.target.parentElement.parentElement.childNodes[1].innerText
    let descrip = e.target.parentElement.parentElement.childNodes[3].innerText
    let valorMov = e.target.parentElement.parentElement.childNodes[5].innerText
    
    console.log(movi)
    console.log(descrip)
    console.log(valorMov)

    idxD.value = id
    mov.value = movi
    desc.value = descrip
    valor.value = valorMov
   }
})

tbodyEgresos.addEventListener("click", (e)=>{
    let id = e.target.parentElement.parentElement.id
    if(e.target.dataset.accion =="DELETE"){
        deleteUser(id);
    }
    else if (e.target.dataset.accion =="PUT"){
        let movi = e.target.parentElement.parentElement.childNodes[1].innerText
        let descrip = e.target.parentElement.parentElement.childNodes[3].innerText
        let valorMov = e.target.parentElement.parentElement.childNodes[5].innerText
        
        console.log(movi)
        console.log(descrip)
        console.log(valorMov)

        idxD.value = id
        mov.value = movi
        desc.value = descrip
        valor.value = valorMov
    }
});

function saldoDisponible(data) {
    let saldoDis = document.querySelector("#saldoDis")
    let saldoIng = document.querySelector("#saldoIng");
    let saldoEgre = document.querySelector("#saldoEgre");

    let valorIng = 0
    let valorEgre = 0
    let vTotal = 0

    data.forEach((element) =>{

        if(element.movimiento === 'ingreso'){

            valorIng += parseFloat(element.valor);
        }

        else if(element.movimiento === 'egreso'){

            valorEgre += parseFloat(element.valor)
        }

    })

    vTotal = valorIng - valorEgre
    saldoDis.innerHTML = vTotal
    saldoIng.innerHTML = valorIng 
    saldoEgre.innerHTML = valorEgre
}

// function actualizarData(id) {
//     id.addEventListener("click", (e) =>{

//     })
// }






