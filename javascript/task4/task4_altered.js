var data = []

let leftInsertBtn = document.getElementById('left-insert')
let rightInsertBtn = document.getElementById('right-insert')
let leftDeletetBtn = document.getElementById('left-delete')
let rightDeleteBtn = document.getElementById('right-delete')
let buttons  = [leftInsertBtn,rightInsertBtn,leftDeletetBtn, rightDeleteBtn]

function leftInsert() {
    let input = document.getElementById('input-data')
    data.unshift(input.value)
    render()
}
function rightInsert() {
    let input = document.getElementById('input-data')
    data.push(input.value)
    render()
}
function leftDelete() {
    data.shift()
    render()
}
function rightDelete() {
    data.pop()
    render()
}
let funcs = [leftInsert, rightInsert, leftDelete, rightDelete]

function render() {
    let queue = document.getElementById('queue')
    //先清空ul
    queue.innerHTML = ''
    //re-render
    data.forEach((dataItem) => {
        let newLi = document.createElement('li')
        newLi.innerHTML = dataItem
        queue.appendChild(newLi)
    })
}

for(let i=0;i<funcs.length;i++) {
    buttons[i].onclick = funcs[i]
}