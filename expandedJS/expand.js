//标签页进入后台时改变标题，再次进入前台时再次改变标题
let originTitle = document.title;
let titleTime;
document.addEventListener('visibilitychange', function () {

    let isHidden = document.hidden;
    if (isHidden) {
        document.title = 'A, TNND, 为什么要走！(╯▔皿▔)╯';
        clearTimeout(titleTime);
    }
    else {
        document.title = '啊哈哈哈哈，你回来喽o(*￣▽￣*)ブ';
        titleTime = setTimeout(function () {
            document.title = originTitle;
        }, 3000);
    }

})