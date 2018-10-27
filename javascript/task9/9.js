var root = document.getElementById('root')
var index = 1
var found = false
var elementChosed = []

var time1 = 500
var time2 = 1000

function choose(node){
/*
choose a node
*/
    node.classList.add("chose")
}
    
function unchoose(node) {
/*
unchoose a node
*/
    node.classList.remove("chose")
}

function cleanStyle(startNode) {
    //remove style for every node in a tree whose root is startNode
    if(!startNode) return;
    unchoose(startNode)
    if(startNode.children.length){
        for(let i=0;i<startNode.children.length;i++){
            cleanStyle(startNode.children[i])
        }
    } else {
        return
    }
}

function preOrder(startNode) {
    //写作前序遍历 在多叉树下是深度优先遍历
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
    //通过title递归查找
    if(!startNode) return; 
    if(startNode.title === value) {
        choose(startNode)
        //found是个全局变量 用于标记
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

function deleteChosedElement() {
    elementChosed.forEach((element) => {
        let parent = element.parentNode
        element.innerHTML = ""
        parent.removeChild(element)
    })
    elementChosed = []
}

function addChildForChoosedElement(nodeText) {
    //一个元素只能属于一个父元素
    //所以必须创建多个 而不能用一个元素添加给多个父节点
    elementChosed.forEach((element)=> {
        var div = document.createElement('div')
        //添加title便于搜索
        div.title = nodeText
        div.innerHTML = nodeText
        element.appendChild(div)
    })
}

var preOrderBtn = document.getElementById("preOrder")
var searchBtn = document.getElementById("search")
var delBtn = document.getElementById('delete')
var addBtn = document.getElementById('add')

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

delBtn.onclick = () => {
    deleteChosedElement()
}

addBtn.onclick = () => {
    var text = document.getElementById("search-value").value
    //添加title用于搜索
    addChildForChoosedElement(text)
    
    index=1
    //添加元素之后重新编排z-index
    reAddZIndexToElement(root)
    //重新添加点击事件
    addChooseEvent(root)
    //解除选中
    elementChosed.forEach((element) => {
        unchoose(element)
    })
    elementChosed = []
}

function reAddZIndexToElement(startNode) {
    if(!startNode) return;
    startNode.style.zIndex = index
    index += 1
    if(startNode.children.length){
        for(let i=0;i<startNode.children.length;i++){
            reAddZIndexToElement(startNode.children[i])
        }
    } else {
        return
    }
}

function addDetails(startNode) {
    //给div增加title方便查询时候遍历
    //设置z-index方便后续监听点击事件
    if(!startNode) return;
    startNode.style.zIndex = index
    index += 1
    if(startNode.children.length){
        for(let i=0;i<startNode.children.length;i++){
            addDetails(startNode.children[i])
        }
    } else {
        return
    }
}


//=============================================//render部分
function addDetails(startNode) {
    //给div增加title方便查询时候遍历
    //设置z-index方便后续监听点击事件
    if(!startNode) return;
    startNode.appendChild(document.createTextNode(index))
    startNode.setAttribute("title", index)
    startNode.style.zIndex = index
    index += 1
    if(startNode.children.length){
        for(let i=0;i<startNode.children.length;i++){
            addDetails(startNode.children[i])
        }
    } else {
        return
    }
}

function addChooseEvent(startNode) {
    //给每个div增加点击变色事件
    if(!startNode) return;
    startNode.onclick = function(event){
        //阻止事件冒泡 防止把父元素染色
        event.stopPropagation()

        //如果已经选中 那么 反选
        if(this.classList.contains("chose")) {
            //javascript 没有从数组中删除指定元素的函数.... 只能用splice迂回
            elementChosed.splice(elementChosed.indexOf(this),1)
            unchoose(this)
        } else {
            choose(this)
            elementChosed.push(this)
        }
    }
    if(startNode.children.length){
        for(let i=0;i<startNode.children.length;i++){
            addChooseEvent(startNode.children[i])
        }
    } else {
        return
    }
}
addDetails(root)
addChooseEvent(root)

