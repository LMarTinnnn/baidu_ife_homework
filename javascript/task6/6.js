var data = []

let leftInsertBtn = document.getElementById('left-insert')
let rightInsertBtn = document.getElementById('right-insert')
let leftDeletetBtn = document.getElementById('left-delete')
let rightDeleteBtn = document.getElementById('right-delete')
let searchBtn = document.getElementById('search')
let buttons  = [leftInsertBtn,rightInsertBtn,leftDeletetBtn, rightDeleteBtn]

function leftInsert() {
    let input = document.getElementById('input-data')
    data.unshift(input.value)
}
function rightInsert() {
    let input = document.getElementById('input-data')
    data.push(input.value)
}
function leftDelete() {
    data.shift()
}
function rightDelete() {
    data.pop()
}
function search() {
    var ulChildren = document.getElementById('queue').children
    var matchStr = document.getElementById('search-text').value
    for(let i=0;i<ulChildren.length;i++) {
        var li = ulChildren[i]
            li.className = ''
        if(li.innerHTML.match(matchStr)) {
            li.className = "matched"
        }
    }
    document.getElementById('queue').firstElementChild.setAttribute('style', "display: inline")
}

let funcs = [leftInsert, rightInsert, leftDelete, rightDelete]

function render() {
    let queue = document.getElementById('queue')
    //先清空ul
    queue.innerHTML = ''
    queue.nodeValue = ''
    //re-render
    data.forEach((dataItem) => {
        let newLi = document.createElement('li')
        newLi.innerHTML = dataItem
        queue.appendChild(newLi)
    })

}

for(let i=0;i<funcs.length;i++) {
    buttons[i].onclick = function() {
        //用一个匿名函数封装执行函数
        //因为onclick只会响应最后绑定的那个函数
        funcs[i]()
        render()
    }
}

searchBtn.onclick = search;