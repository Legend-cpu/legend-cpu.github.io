/**
 * @param {String} selector
 */
function $(selector) {
    let nodeList = document.querySelectorAll(selector)
    let result = (selector.startsWith("#")) ? nodeList[0] : ((nodeList.length === 1) ? nodeList[
        0] : nodeList)
    return result
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
 * @description 创建主页头像框
 */
function createAvatarBox() {
    avatarContainer = document.createElement('div');
    img = document.createElement('img');
    avatarContainer.appendChild(img);
    document.getElementById("site-info").insertBefore(avatarContainer, document.getElementById("site-title"));
    img.src = '../global-img/avatar.png';
    img.style.width = '100%';
    img.style.height = '100%';
    avatarContainer.style.width = '90px';
    avatarContainer.style.height = '90px';
    avatarContainer.style.margin = '0 auto';
    avatarContainer.style.overflow = 'hidden';
    avatarContainer.style.border = '1px solid #c449f5';
    avatarContainer.style.borderRadius = '50px';
}

/**
 * @description 创建主页进入按钮
 * @param {String} top  按钮绝对定位的top属性
 * @param {String} text 按钮上的文字
 * @return {HTMLElement}
 */
function createButton(top, text) {
    btn = document.createElement('button');
    span = document.createElement('span');
    div = document.createElement('div');
    btn.appendChild(span);
    btn.appendChild(div);
    document.getElementById("page-header").insertBefore(btn, document.getElementById("scroll-down"));
    div.className = 'liquid';
    btn.className = 'enter';
    btn.style.position = 'absolute';
    btn.style.top = top;
    btn.style.left = '50%';
    btn.style.transform = 'translateX(-50%)';
    span.innerText = text;
    return btn;
}

/**
 * @description 主页进入博客按钮绑定的点击事件
 */
function enterBlog() {
    let nav = document.getElementById("nav");
    document.getElementById("page-header").removeChild(nav);
    document.getElementById("body-wrap").insertBefore(nav, document.getElementById("content-inner"));
    document.body.style.overflow = 'auto';
    document.getElementById("content-inner").style.display = 'flex';
    document.getElementById("content-inner").style.padding = '100px 15px';
    document.getElementById("rightside-config-show").style.display = 'block';
    document.getElementById("footer").style.display = 'block';
    document.getElementById("nav").style.display = 'flex';
    document.getElementById("nav").className = 'show';
    document.querySelector('#search-button a span').style.display = 'inline';
    document.getElementById("page-header").style.transition = 'all 0.5s ease-out';
    document.getElementById("page-header").style.display = 'none';
}

/**
 * @description 初始化个人主页
 */
function initHomePage() {
    script = document.createElement('script');
    document.head.appendChild(script);
    script.src = './ext-js/driftDown.js';
    script.id = 'driftDown';
    document.body.style.overflow = 'hidden';
    document.getElementById("content-inner").style.display = 'none';
    document.getElementById("rightside-config-show").style.display = 'none';
    document.getElementById('site-info').style.top = '30%';
    document.getElementById("footer").style.display = 'none';
    document.getElementById("nav").style.display = 'none';
    document.getElementById("scroll-down").style.display = 'none';
    createAvatarBox();
    let btnEnterBlog = createButton('68vh', '参观博客');
    let btnEnterLab = createButton('78vh', '参观实验室');
    btnEnterBlog.addEventListener('click', enterBlog, false);
}

// 函数调用区
changeTitle('A, TNND, 为什么要走！(╯▔皿▔)╯', '啊哈哈哈哈，你回来喽o(*￣▽￣*)ブ');

let homePageURLs = ['http://localhost:4000/', 'https://blog.elzzach.top/', 'https://legend-cpu.github.io/',
    'http://blog.elzzach.top/'
]
if (homePageURLs.includes(location.href)) { //如果是首页
    initHomePage();
    if (document.getElementById("site_social_icons")) {
        document.getElementById("site-info").removeChild(document.getElementById("site_social_icons"));
    }
} else { //如果不是首页
    if (document.getElementById("driftDown")) {
        document.head.removeChild(document.getElementById("driftDown"));
    }
    if (document.querySelector('.card-announcement')) {
        document.getElementById("aside-content").removeChild(document.querySelector('.card-announcement'));
    }
    window.onload = function() {
        // 修改评论区placeholder
        // 评论区的一些元素由于网速原因加载较慢，因此通过定时器监视，一旦出现并修改成功后清除定时器
        var id = setInterval(function () {
            if ($('#wl-edit')) {
                $('#wl-edit').placeholder =
                    "1.文明用语，友善发言:D\n2.本评论系统目前支持匿名评论，但如果你愿意，欢迎登录评论\n3.评论审核开关已开启，评论经审核通过后才会可见\n4.半小时才能发一条评论哦，三思而后言:D"
                    var flag = true;
            }
            if(flag){
                clearInterval(id);
            }
        }, 500)
    }
}
