var root = document.getElementById('root')

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

// function cleanStyle(startNode) {
//     if(!startNode) return;
//     startNode.classList.remove("chose")
//     if(startNode.children.length){
//         for(let i=0;i<startNode.children.length;i++){
//             cleanStyle(startNode.children[i])
//         }
//     } else {
//         return
//     }
// }

function preOrder(startNode) {
    if(!startNode) return;
    //如果startNode为undefined 就不再继续了
    var children = startNode.children
    setTimeout(choose, time1, startNode)
    setTimeout(unchoose, time2, startNode)
    time1+=500
    time2+=500
    preOrder(children[0])
    preOrder(children[1])
}

function inOrder(startNode) {
    //如果startNode为undefined 就不再继续了
    if(!startNode) return;
    var children = startNode.children
    inOrder(children[0])
    setTimeout(choose, time1, startNode)
    setTimeout(unchoose, time2, startNode)
    time1+=500
    time2+=500
    inOrder(children[1])
}

function postOrder(startNode) {
    //如果startNode为undefined 就不再继续了
    if(!startNode) return;
    var children = startNode.children
    postOrder(children[0])
    postOrder(children[1])
    setTimeout(choose, time1, startNode)
    setTimeout(unchoose, time2, startNode)
    time1+=500
    time2+=500
}

//————————————————————————————————————————————————————————————————
//add event
var preOrderBtn = document.getElementById('preOrder')
var inOrderBtn = document.getElementById('inOrder')
var postOrderBtn = document.getElementById('postOrder')
var resetBtn = document.getElementById('reset')

preOrderBtn.onclick = function() {
    preOrder(root)
}

inOrderBtn.onclick = function() {
    inOrder(root)
}

postOrderBtn.onclick = function() {
    postOrder(root)
}

resetBtn.onclick = function() {
    time1 = 500
    time2 = 1000
}