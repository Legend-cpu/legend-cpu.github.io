//标签页进入后台时改变标题，再次进入前台时再次改变标题
let originTitle = document.title;
let titleTime;
document.addEventListener('visibilitychange', function() {

	let isHidden = document.hidden;
	if (isHidden) {
		document.title = 'A, TNND, 为什么要走！(╯▔皿▔)╯';
		clearTimeout(titleTime);
	} else {
		document.title = '啊哈哈哈哈，你回来喽o(*￣▽￣*)ブ';
		titleTime = setTimeout(function() {
			document.title = originTitle;
		}, 3000);
	}

})

/* 将博客首页转变成单页个人主页 */
function createAvatarBox() {
	avatarContainer = document.createElement('div');
	img = document.createElement('img');
	img.style.width = '100%';
	img.style.height = '100%';
	img.src = 'https://elzzach-src.oss-cn-hangzhou.aliyuncs.com/img/20220224/avatar.png';
	avatarContainer.style.width = '90px';
	avatarContainer.style.height = '90px';
	avatarContainer.style.margin = '0 auto';
	avatarContainer.style.overflow = 'hidden';
	avatarContainer.style.border = '1px solid transparent';
	avatarContainer.style.borderRadius = '50px';
	avatarContainer.appendChild(img);
	document.getElementById("site-info").insertBefore(avatarContainer, document.getElementById("site-title"));
}

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

function enterBlog() {
	let nav = document.getElementById("nav");
	document.body.style.overflow = 'auto';
	document.getElementById("content-inner").style.display = 'flex';
	document.getElementById("content-inner").style.padding = '100px 15px';
	document.getElementById("page-header").removeChild(nav);
	document.getElementById("rightside-config-show").style.display = 'block';
	document.getElementById("footer").style.display = 'block';
	document.getElementById("body-wrap").insertBefore(nav, document.getElementById("content-inner"));
	document.getElementById("nav").style.display = 'flex';
	document.getElementById("nav").className = 'show';
	document.querySelector('#search-button a span').style.display = 'inline';
	document.getElementById("page-header").style.transition = 'all 0.5s ease-out';
	document.getElementById("page-header").style.display = 'none';
}

let homePageURLs = ['http://localhost:4000/', 'https://blog.elzzach.top/', 'https://legend-cpu.github.io/',
	'https://elzzach.gitee.io/'
]
if (homePageURLs.includes(location.href)) {
	document.body.style.overflow = 'hidden';
	document.getElementById("content-inner").style.display = 'none';
	document.getElementById("rightside-config-show").style.display = 'none';
	document.getElementById('site-info').style.top = '35%';
	document.getElementById("footer").style.display = 'none';
	document.getElementById("nav").style.display = 'none';
	document.getElementById("scroll-down").style.display = 'none';
	createAvatarBox();
	let btnEnterBlog = createButton('66vh', 'Enter my blog');
	let btnEnterLab = createButton('74vh', 'Enter my FE-lab');
	btnEnterBlog.addEventListener('click', enterBlog, false);
}
