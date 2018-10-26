var data = []

let leftInsertBtn = document.getElementById('left-insert')
let rightInsertBtn = document.getElementById('right-insert')
let leftDeletetBtn = document.getElementById('left-delete')
let rightDeleteBtn = document.getElementById('right-delete')
let sortBtn = document.getElementById('sort')
let buttons  = [leftInsertBtn,rightInsertBtn,leftDeletetBtn, rightDeleteBtn]

function leftInsert() {
    //check part
    if(!valueCheck()) return //引入了类似中间件的概念检查
    if(!queueLengthCheck()) return 
    let input = document.getElementById('input-data')
    if(!input) return

    //func part
    data.unshift(input.value)
}
function rightInsert() {
    //check part
    if(!valueCheck()) return //引入了类似中间件的概念检查
    if(!queueLengthCheck()) return 
    let input = document.getElementById('input-data')
    if(!input) return

    //func part
    data.push(input.value)
}
function leftDelete() {
    data.shift()
}
function rightDelete() {
    data.pop()
}
let funcs = [leftInsert, rightInsert, leftDelete, rightDelete]

//绑定函数和按钮
for(let i=0;i<funcs.length;i++) {
    buttons[i].onclick = function() {
        //用一个匿名函数封装两个执行函数
        //因为onclick只会响应最后绑定的那个函数
        funcs[i]()
        render()
    }
}

sortBtn.onclick = () => {
    bubbleSort()
    render()
}


//helper functions
function render() {
    //render the queue with data
    let queue = document.getElementById('queue')
    //先清空ul
    queue.innerHTML = ''
    //re-render
    data.forEach((dataItem) => {
        let newLi = document.createElement('li')
        newLi.innerHTML = dataItem
        //增加字体跟数字挂钩
        newLi.style.fontSize = String(dataItem) + "px"
        queue.appendChild(newLi)
    })
}

function valueCheck() {
    //check if input value is in range(10, 100)
    const value = document.getElementById('input-data').value
    if(!(value>=10 && value<=100)) {
        alert("请输入10-100内的数字")
        return false
    }
    return true
}

function queueLengthCheck()  {
    const children = document.getElementById('queue').children
    if(children.length > 60) {
        alert("元素数目不得超过60")
        return false
    } else {
        return true
    }
}

function sleep(d){
    //写一个休眠函数
    for(var t = Date.now();Date.now() - t <= d;);
  }

function bubbleSort() {
    const len = data.length
    let i, j 
    for(i=0;i<len;i++) {
        for(j=0;j<len-i;j++) {
            if(data[j]>data[j+1]) {
                let temp = data[j]
                data[j] = data[j+1]
                data[j+1] = temp
                //sleep(100)
                //render()
                //采用一个休眠 加 每步骤刷新的函数 但是实际效果只有最后一个处理完之后才刷新 不知道为什么
            }
        }
    }
}