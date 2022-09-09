/**
 * @param {String} selector
 */
function $(selector) {
    let nodeList = document.querySelectorAll(selector)
    return (selector.startsWith("#")) ? nodeList[0] : ((nodeList.length === 1) ? nodeList[
        0] : nodeList)
}

/**
 * @description 标签页进入后台时改变标题，再次进入前台时再次改变标题 
 * @param {String} leaveTitle
 * @param {String} backTitle
 */
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

/**
 * @description 初始化个人主页
 */
function initHomePage() {
    const pattern = /Android|iOS|Mobile/;
    if (!pattern.test(navigator.userAgent)) {
        let script = document.createElement('script');
        script.src = "./ext-js/driftDown.js";
        script.id = "driftDown";
        document.head.append(script);
        changeTitle('A, TNND, 为什么要走！(╯▔皿▔)╯', '啊哈哈哈哈，你回来喽o(*￣▽￣*)ブ');
    }
}

// 函数调用区
let homePageURLs = ['http://localhost:4000/', 'https://blog.elzzach.top/', 'https://legend-cpu.github.io/']
if (homePageURLs.includes(location.href)) { //如果是首页
    initHomePage();
} else { //如果不是首页
    window.onload = function() {
        // 修改评论区placeholder
        // 评论区的一些元素由于网速原因加载较慢，因此通过定时器监视，一旦出现并修改成功后清除定时器
        var id1 = setInterval(function() {
            let e = $('#wl-edit');
            if (e) {
                e.placeholder =
                    "1.文明用语，友善发言:D\n2.本评论系统目前支持匿名评论，但如果你愿意，欢迎登录评论\n3.评论审核开关已开启，评论经审核通过后才会可见\n4.半小时才能发一条评论哦，三思而后言:D";
                var flag1 = true;
            }
            if (flag1) {
                clearInterval(id1);
            }
        }, 500)
    }
}
