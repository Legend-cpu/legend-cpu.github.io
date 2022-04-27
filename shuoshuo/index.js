function changeTitle(leaveTitle, backTitle) {
    let originTitle = document.title;
    let titleTime;
    document.addEventListener('visibilitychange', function() {

        let isHidden = document.hidden;
        if (isHidden) {
            document.title = leaveTitle;
            clearTimeout(titleTime);
        } else {
            document.title = backTitle;
            titleTime = setTimeout(function() {
                document.title = originTitle;
            }, 3000);
        }

    })
}

function $(selector) {
    let nodeList = document.querySelectorAll(selector)
    let result = (selector.startsWith("#")) ? nodeList[0] : ((nodeList.length === 1) ? nodeList[
        0] : nodeList)
    return result
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

changeTitle('A, TNND, 为什么要走！(╯▔皿▔)╯', '啊哈哈哈哈，你回来喽o(*￣▽￣*)ブ');
let bgStarsky = $('.bg-starsky')
for (let i = 0; i < 300; i++) {
    let div = document.createElement('div')
    div.className = `star`
    div.style.top = `${random(1, 100)}vh`
    div.style.left = `${random(1, 100)}vw`
    div.style.animationDuration = `${random(20, 40)/10}s`
    div.style.animationDelay = `${random(-200, 0)/100}s`
    bgStarsky.appendChild(div)
}
for (let i = 0; i < 6; i++) {
    let div = document.createElement('div')
    div.className = `shooting-star`
    div.style.top = `${random(1, 60)}vh`
    div.style.animationDuration = `${random(10,15)}s` //流星飞过时间+在终点停止一段时间，飞过时间很快，占10%
    div.style.animationDelay = `${random(2, 10)}s` //第一次出现流星所需要的时间
    bgStarsky.appendChild(div)
}
