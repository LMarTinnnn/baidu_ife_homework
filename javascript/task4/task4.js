//也可以把data单独组织出来 每个按钮都只操作data 然后操作万之后重新渲染
//代码会少很多 也整洁

function leftInsert() {
    let queue = document.getElementById('queue')
    let newLi = document.createElement('li')
    let input = document.getElementById('input-data')
    newLi.innerHTML = input.value

    if(queue.children) {
        let firstChild = queue.firstChild
        queue.insertBefore(newLi, firstChild)
    } else {
        queue.appendChild(newLi)
    }
}

function rightInsert() {
    let queue = document.getElementById('queue')
    let newLi = document.createElement('li')
    let input = document.getElementById('input-data')
    newLi.innerHTML = input.value
    queue.append(newLi)
}

function leftDelete() {
    let queue = document.getElementById('queue')
    let leftMostElement = queue.firstChild
    queue.removeChild(leftMostElement)
}

function rightDelete() {
    let queue = document.getElementById('queue')
    let leftMostElement = queue.lastChild
    queue.removeChild(leftMostElement)
}

let funcs = [leftInsert, rightInsert, leftDelete, rightDelete]

let leftInsertBtn = document.getElementById('left-insert')
let rightInsertBtn = document.getElementById('right-insert')
let leftDeletetBtn = document.getElementById('left-delete')
let rightDeleteBtn = document.getElementById('right-delete')
let buttoons  = [leftInsertBtn,rightInsertBtn,leftDeletetBtn, rightDeleteBtn]


for(let i=0; i<funcs.length; i++) {
    buttoons[i].onclick = funcs[i]
}