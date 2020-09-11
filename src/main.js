//Inicio Título
let recip = JSON.parse(localStorage.getItem('recip'))

function tituloReceita(){
    let title = document.getElementById('title').value
    recip.push(title)
    const recipJson = JSON.stringify(recip)
    localStorage.setItem('recip', recipJson)
    
    window.location.reload()
}
let resultado = document.getElementById('result1')

for(let i=0; i<recip.length; i++){
    console.log(recip)
    resultado.innerHTML = `<div><h2>${recip[i]}</h2>
    <input type="button" value="REMOVER" id="removeTitle" onclick="RemoveTitle(${i})"></div>`
}

function RemoveTitle(i){
    recip.splice(i, 1)
    const recipJson = JSON.stringify(recip)
    localStorage.setItem('recip', recipJson)
    window.location.reload()
}
//Fim Título

//Inicio Ingrediente e Quantidade
let receita = JSON.parse(localStorage.getItem('receita'))
if(receita == null){
        receita =[]
}
 function cadastrarIQ(){

    let ingrediente = document.getElementById('ingrediente').value
    let quantidade = document.getElementById('quantidade').value

    receita.push({
        ingrediente: ingrediente,
        quantidade: quantidade
    })
   
    const receitaJson = JSON.stringify(receita)
    localStorage.setItem('receita', receitaJson)

    window.location.reload()
}
    let result1 = document.getElementById('result1')
        result1.innerHTML += ""
    for(let i = 0; i<receita.length; i++){
        result1.innerHTML += `<table><tr><th>Ingrediente</th><th>Quantidade</th></tr>
        <tr id="id${i}"><td>${receita[i].ingrediente}</td>
        <td>${receita[i].quantidade}</td>
        <td><input type="button" value="REMOVER" id="btnRemove" onclick="remove(${i})"></tr>`      
}
function remove(i){
    receita.splice(i, 1)
    const receitaJson = JSON.stringify(receita)
    localStorage.setItem('receita', receitaJson)
    window.location.reload()

}
//Fim Modo de Ingrediente e Quantidade

//Inicio Modo de Preparo
let receita2 = JSON.parse(localStorage.getItem('receita2'))

    if(receita2 == null){
    receita2 =[]
}
 function cadastrarPreparo(){
    let modoPreparo = document.getElementById('preparo').value

    receita2.push(modoPreparo)

    const receitJson = JSON.stringify(receita2)
    localStorage.setItem('receita2', receitJson)
    window.location.reload()
}
    let result2 = document.getElementById('result1')
   
    result2.innerHTML += ""
    
    for(let i =0; i<receita2.length; i++){
        result2.innerHTML += `<table><tr><th>Passos</th><th>Modo de Preparo</th></tr>
        <tr><td>${i + 1}</td><td>${receita2[i]}</td>
        <td><input type="button" value="Mover" id="ordena" onclick="OrdenaDir(${i}, 1)"></td>
        <td><input type="button" value="Mover" id="ordena2" onclick="OrdenaDir(${i}, 2)"></td>
        <td><input type="button" value="REMOVER" id="removeBtn" onclick="removePreparo(${i})"></td>
        </tr></table>`
    }

function removePreparo(i){
    receita2.splice(i, 1)
    const receitJson = JSON.stringify(receita2)
    localStorage.setItem('receita2', receitJson)
    window.location.reload()
}

function OrdenaDir(i, mover){
    for(let i = 0; i < receita2.length; i++){
        if(mover == 1 && typeof receita2[i-1] != "undefined"){
            let sub = receita2[i-1]
            receita2[i-1] = receita2[i]
            receita2[i] = sub
        }else if(mover == 2 && typeof receita2[i+1] != "undefined"){
            let sub = receita2[i+1]
            receita2[i+1] = receita2[i]
            receita2[i] = sub
        }   
    }   
    const receitJson = JSON.stringify(receita2)
    localStorage.setItem('receita2', receitJson)
    window.location.reload()
}
//Fim Modo de Preparo

function saveRecipe(){
    let recip = JSON.parse(localStorage.getItem('recip'))
    let recipTxt = ''
    let receita = JSON.parse(localStorage.getItem('receita'))
    let receitaTxt = ''
    let receita2 = JSON.parse(localStorage.getItem('receita2'))
    let receita2Txt = ''
    for(let i=0; i<recip.length;i++){
        recipTxt += recip[i]  + "\r\n"
    }
    for(let i=0; i<receita.length;i++){
        receitaTxt += receita[i].quantidade + " " + receita[i].ingrediente + "\r\n"
    }
    for(let i=0; i<receita2.length;i++){
        receita2Txt += (i+1) + ". " + receita2[i] + "\r\n"
    }
    let arquivoTxt = "Título da Receita" + "\r\n\r\n" + recipTxt + "\r\n" +  "Ingredientes" + "\r\n\r\n" + receitaTxt + "\r\n" + "Modo de preparo" + "\r\n\r\n" + receita2Txt;
    console.log(arquivoTxt)
    let blob = new Blob([arquivoTxt], { type: "text/plain"});
    baixarBlob(blob, recip +  ".txt");
}

function baixarBlob(blob, name) {
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = name;
  
    document.body.appendChild(link);
    link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
    document.body.removeChild(link);
}