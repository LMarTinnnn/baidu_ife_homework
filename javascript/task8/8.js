var root = document.getElementById('root')
var index = 1
var found = false

var time1 = 500
var time2 = 1000

function choose(node){
/*
choose a node
*/
    node.classList.add("chose")
}
    
function unchoose(node) {
    node.classList.remove("chose")
}

function cleanStyle(startNode) {
    if(!startNode) return;
    startNode.classList.remove("chose")
    if(startNode.children.length){
        for(let i=0;i<startNode.children.length;i++){
            cleanStyle(startNode.children[i])
        }
    } else {
        return
    }
}

function preOrder(startNode) {
    if(!startNode) return;
    //如果startNode为undefined 就不再继续了
    var children = startNode.children
    setTimeout(choose, time1, startNode)
    setTimeout(unchoose, time2, startNode)
    time1+=500
    time2+=500
    for(let i=0;i<children.length;i++) {
        preOrder(children[i])
    }
}


function search(startNode, value) {
    if(!startNode) return; 
    if(startNode.title === value) {
        startNode.classList.add("chose")
        found = true
    }
    if(startNode.children.length){
        for(let i=0;i<startNode.children.length;i++){
            search(startNode.children[i], value)
        }
    } else {
        return
    }
}

var preOrderBtn = document.getElementById("preOrder")
var searchBtn = document.getElementById("search")

preOrderBtn.onclick = () => {
    cleanStyle(root)
    preOrder(root)
}
searchBtn.onclick = () => {
    cleanStyle(root)
    const value = document.getElementById("search-value").value
    search(root, value) 
    if(!found) alert("没找到") 
    found = false
}

function addText(startNode) {
    if(!startNode) return;
    startNode.appendChild(document.createTextNode(index))
    startNode.setAttribute("title", index)
    index += 1
    if(startNode.children.length){
        for(let i=0;i<startNode.children.length;i++){
            addText(startNode.children[i])
        }
    } else {
        return
    }
}

addText(root)

