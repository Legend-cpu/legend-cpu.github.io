// 只允许屏宽>=1200px的Windows平台的Chrome、Edge和Firefox访问
if ((navigator.platform === 'Win32') && (navigator.userAgent.match(/Chrome|Firefox/) !== null) && (screen.width >= 1200)) {
    // 四个基本数量
    const ca = 1
    const ja = 0
    const ta = 0
    const amp = 6

    // 初始页面始终为第1页和css页
    let pi = 1;
    let pc = 'css';

    // 分页数量
    const cpa = Math.ceil(ca / amp)
    const jpa = Math.ceil(ja / amp)
    const tpa = Math.ceil(ta / amp)
    let pa = pc === 'css' ? cpa : pc === 'js' ? jpa : pc === 'tool' ? tpa : undefined
    let a = pc === 'css' ? ca : pc === 'js' ? ja : pc === 'tool' ? ta : undefined

    // 制作组件标签
    class EffectWidget extends HTMLElement {
        constructor() {
            // Always call super first in constructor
            super();
            // write element functionality in here
            const shadow = this.attachShadow({ mode: "open" });

            const style = document.createElement('style')
            style.innerHTML = `

iframe{
    width: 100%;
    height: 100%;
    background: transparent;
    border: none;
}

.effect-wrapper{
    position: relative;
    width: 300px;
    height: 240px;
    background-color: #e4e4e4;
    margin: 60px 40px 0;
    border-radius: 16px;
    box-shadow: rgba(0, 0, 0, 0.45) 0px 25px 50px -12px;
}

.effect-container{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
}
            
.iframe-box{
    width: calc(100% - 40px);
    height: calc(100% - 80px);
    border-radius: 8px;
    background-color: #fff;
}

.iframe-box::before{
    content: "";
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
}

.effect-title{
    font-weight: bold;
    color: #111;
    margin-top: 28px;
}

.fullscreen{
    position: absolute;
    right: 8px;
    bottom: 4px;
    cursor: pointer;
}

.fullscreen a{
    display: block;
    width: 100%;
    height: 100%;
}
.dark-theme {
    background-color: #454545;
}

.dark-theme .effect-title {
    color: #eee;
}

`
            const wrapper = document.createElement('div')
            const container = document.createElement('div')
            const iframeBox = document.createElement('div')
            const iframe = document.createElement('iframe')
            const title = document.createElement('div')
            const fullscreen = document.createElement('div')
            const a = document.createElement('a');
            const img = document.createElement('img')
            wrapper.setAttribute('class', 'effect-wrapper')
            container.setAttribute('class', 'effect-container')
            iframeBox.setAttribute('class', 'iframe-box')
            title.setAttribute('class', 'effect-title')
            fullscreen.setAttribute('class', 'fullscreen')
            fullscreen.setAttribute('title', '前往页面查看')
            a.setAttribute('target', '_blank')
            img.setAttribute('src', './img/fullscreen-bright.png')
            img.setAttribute('width', '28px')
            img.setAttribute('height', '28px')
            iframe.setAttribute('scrolling', 'no')
            iframeBox.appendChild(iframe)
            fullscreen.appendChild(a)
            a.appendChild(img)
            container.appendChild(iframeBox)
            container.appendChild(title)
            container.appendChild(fullscreen)
            wrapper.appendChild(container)
            shadow.appendChild(wrapper)
            shadow.appendChild(style)
        }
    }

    // Define the new element
    customElements.define('effect-widget', EffectWidget)

    // 组件宽度适配
    function adaptWidgetsWidth() {
        const widgets = document.querySelectorAll('effect-widget');
        const bodyWidth = document.body.clientWidth;
        const widthUnit = (bodyWidth - 170) / 16;
        for (const widget of widgets) {
            widget.shadowRoot.children[0].style.width = `${widthUnit * 3}px`;
            widget.shadowRoot.children[0].style.height = `${widthUnit * 2.4}px`;
            widget.shadowRoot.children[0].style.marginLeft = `${widthUnit}px`;
            widget.shadowRoot.children[0].style.marginTop = `${60 / bodyWidth * 1920}px`;
        }
    }

    // 根据数量生成当前页面组件
    function generateWidgets() {
        let loopTimes = pi < pa ? amp : (a === amp) ? a : (a % amp);
        const container = document.querySelector('.widget-container');
        container.innerHTML = '';
        for (let i = 0; i < loopTimes; i++) {
            const widget = document.createElement('effect-widget');
            const url = `./effects/${pc}/${i + 1 + (amp * (pi - 1))}.html`
            widget.shadowRoot.firstChild.firstChild.firstChild.firstChild.src = url;
            widget.shadowRoot.firstChild.firstChild.lastChild.firstChild.href = url;
            widget.shadowRoot.firstChild.firstChild.firstChild.firstChild.id = `frame${i + 1}`;
            widget.shadowRoot.firstChild.firstChild.firstChild.firstChild.addEventListener('load', (e) => {
                e.target.parentNode.nextElementSibling.innerText = e.target.contentDocument.getElementsByTagName('title')[0].innerText;
            });
            container.appendChild(widget);
        }
        adaptWidgetsWidth();

        if (pi === 1) {
            backward.classList.add('not-visible');
            if (forward.classList.contains('not-visible')) {
                forward.classList.remove('not-visible');
            }
        }
        else if (pi === pa) {
            forward.classList.add('not-visible');
            if (backward.classList.contains('not-visible')) {
                backward.classList.remove('not-visible');
            }
        }
        else {
            if (backward.classList.contains('not-visible')) {
                backward.classList.remove('not-visible');
            }
            if (forward.classList.contains('not-visible')) {
                forward.classList.remove('not-visible');
            }

        }
    }


    // 根据数量自动生成分页按钮及分页按钮逻辑
    const forward = document.querySelector('#forward');
    const backward = document.querySelector('#backward');
    backward.addEventListener('click', () => {
        if (pi > 1) {
            document.querySelector(`div[data-index="${pi}"]`).classList.remove('current');
            pi -= 1;
            document.querySelector(`div[data-index="${pi}"]`).classList.add('current');
            generateWidgets();
        }
    })
    forward.addEventListener('click', () => {
        if (pi < pa) {
            document.querySelector(`div[data-index="${pi}"]`).classList.remove('current');
            pi += 1;
            document.querySelector(`div[data-index="${pi}"]`).classList.add('current');
            generateWidgets();
        }
    })

    function generatePagination() {
        for (const btn of document.querySelectorAll('.pagination-btn')) {
            if (!btn.id) {
                btn.remove();
            }
        }
        for (let i = 0; i < pa; i++) {
            const paginationBtn = document.createElement('div');
            paginationBtn.className = 'pagination-btn';
            if (i === 0) { paginationBtn.classList.add('current'); }
            paginationBtn.dataset.index = i + 1;
            paginationBtn.innerHTML = `<span data-index="${i + 1}">${i + 1}</span>`;
            forward.before(paginationBtn);
            paginationBtn.addEventListener('click', (e) => {
                if (!e.currentTarget.classList.contains('current')) {
                    document.querySelector('.current').classList.remove('current');
                    e.currentTarget.classList.add('current');
                }
                const tgt = parseInt(e.target.dataset.index)
                if (tgt !== pi) {
                    pi = tgt;
                    generateWidgets();
                }
            })
        }
        if (pa === 1) {
            for (const btn of document.querySelectorAll('.pagination-btn')) {
                btn.classList.add('not-visible');
            }
        }
    }

    // 侧栏导航内菜单项互相切换
    for (const item of document.querySelectorAll('.nav-item')) {
        item.addEventListener('click', (e) => {
            if (!e.currentTarget.classList.contains('selected')) {
                document.querySelector('.selected').classList.remove('selected');
                e.currentTarget.classList.add('selected');
                pi = 1;
                pc = e.currentTarget.id;
                pa = pc === 'css' ? cpa : pc === 'js' ? jpa : pc === 'tool' ? tpa : undefined
                a = pc === 'css' ? ca : pc === 'js' ? ja : pc === 'tool' ? ta : undefined
                generateWidgets();
                generatePagination();
                if (pa === 1) {
                    for (const btn of document.querySelectorAll('.pagination-btn')) {
                        btn.classList.add('not-visible');
                    }
                }
            }
        })
    }

    // 浅色模式与深色模式互相切换
    document.querySelector('.dark-toggle').addEventListener('click', () => {
        const toggleImg = document.querySelector('.dark-toggle img');
        document.getElementsByTagName('html')[0].classList.toggle('dark-theme');
        if (toggleImg.src.match('darkmode.png') !== null) {
            toggleImg.src = toggleImg.src.replace('darkmode.png', 'lightmode.png');
        }
        else {
            toggleImg.src = toggleImg.src.replace('lightmode.png', 'darkmode.png');
        }
        for (const widget of document.querySelectorAll('effect-widget')) {
            let img = widget.shadowRoot.firstChild.firstChild.lastChild.firstChild.firstChild;
            widget.shadowRoot.firstChild.classList.toggle('dark-theme');
            if (img.src.match('bright') !== null) {
                img.src = img.src.replace(/bright/, 'dark');
            }
            else {
                img.src = img.src.replace(/dark/, 'bright');
            }
        }
    })



    generateWidgets();
    adaptWidgetsWidth();
    generatePagination();

    // 窗口大小调到1200px以下时不显示内容
    window.addEventListener('resize', () => {
        const modal = document.querySelector('.modal');
        const main = document.querySelector('main');
        if (document.body.clientWidth >= 1200) {
            adaptWidgetsWidth();
            if (modal.classList.contains('show')) {
                main.classList.remove('hide');
                modal.classList.remove('show');
                modal.classList.add('hide');
            }
        }
        else {
            if (modal.classList.contains('hide')) {
                modal.classList.remove('hide');
                modal.classList.add('show');
                main.classList.add('hide');
            }
        }
    })

    // 键盘浏览
    window.addEventListener('keyup', (e) => {
        console.log(e.keyCode);
        if (e.keyCode === 37) {
            backward.click();
        }
        else if (e.keyCode === 39) {
            forward.click();
        }
        else if (e.keyCode === 38) {
            if (document.querySelector('.selected').previousElementSibling !== null) {
                document.querySelector('.selected').previousElementSibling.click();
            }
            else {
                document.querySelector('.nav-list').lastElementChild.click();
            }
        }
        else if (e.keyCode === 40) {
            if (document.querySelector('.selected').nextElementSibling !== null) {
                document.querySelector('.selected').nextElementSibling.click();
            }
            else {
                document.querySelector('.nav-list').firstElementChild.click();
            }
        }
        else if (e.keyCode === 36) {
            document.querySelector('div[data-index="1"]').click();
        }
        else if (e.keyCode === 35) {
            document.querySelector(`div[data-index="${pa}"]`).click();

        }
        else if (e.keyCode === 49 || e.keyCode === 50 || e.keyCode === 51 || e.keyCode === 52 || e.keyCode === 53 || e.keyCode === 54) {
            const i = e.keyCode - 49;
            const w = document.querySelectorAll('effect-widget')[i];
            if (w) {
                w.shadowRoot.firstChild.firstChild.lastChild.firstChild.click();
            }
        }
        else if (e.keyCode === 76) {
            document.querySelector('.dark-toggle').click();;
        }
    })

    window.addEventListener('keydown', (e) => {
        console.log(e.keyCode);
        if (e.keyCode === 13 && !e.ctrlKey) {
            if (!document.querySelector('.keyboard-nav-guide').classList.contains('hide')) {
                document.querySelector('.keyboard-nav-guide').classList.add('hide');
            }
        }
        if (e.keyCode === 13 && e.ctrlKey) {
            if (document.querySelector('.keyboard-nav-guide').classList.contains('hide')) {
                document.querySelector('.keyboard-nav-guide').classList.remove('hide');
            }
        }
    })
}
else {
    document.write('');
    const reason = navigator.platform !== 'Win32' ? '您所使用的平台并非Windows平台' : (navigator.userAgent.match(/Chrome|Firefox/) === null) ? '您所使用的浏览器并非Chrome/Edge/Firefox浏览器' : screen.width < 1200 ? '您的设备屏幕宽度小于1200px' : undefined;
    alert(`为了确保您的浏览体验，请在Windows系统上使用较新版的Chrome/Edge/Firefox浏览器浏览本页面！\n（${reason}）`);
}