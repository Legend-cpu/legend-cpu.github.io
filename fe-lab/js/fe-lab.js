// 只允许屏宽>=1200px的Windows平台的Chrome、Edge和Firefox访问
if ((navigator.platform === 'Win32') && (navigator.userAgent.match(/Chrome|Firefox/) !== null) && (screen.width >= 1200)) {
    // 四个基本数量
    const ca = 10
    const ja = 6
    const ta = 13
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
    background-color: #1e1f26;
    margin: 60px 40px 0;
    border-radius: 8px;
    box-shadow: 4px 4px 8px rgba(0, 0, 0, 40%);
}

.effect-container{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
}

.iframe-box{
    width: calc(100% - 30px);
    height: calc(100% - 60px);
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
    color: white;
    margin-top: 10px;
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
            title.innerText = '特效标题'
            fullscreen.setAttribute('class', 'fullscreen')
            fullscreen.setAttribute('title', '前往页面查看')
            a.setAttribute('target', '_blank')
            img.setAttribute('src', './img/fullscreen-dark.png')
            img.setAttribute('width', '28px')
            img.setAttribute('height', '28px')
            iframe.setAttribute('src', './effects/css-effects/1.html')
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

    // 根据数量自动生成当前页面组件
    function generateWidgets() {
        let loopTimes = pi < pa ? amp : (a === amp) ? a : (a % amp);
        const container = document.querySelector('.widget-container');
        container.innerHTML = '';
        for (let i = 0; i < loopTimes; i++) {
            const widget = document.createElement('effect-widget');
            const url = `./effects/${pc}/${i + 1 + (amp * (pi - 1))}.html`
            widget.shadowRoot.firstChild.firstChild.firstChild.firstChild.src = url;
            widget.shadowRoot.firstChild.firstChild.lastChild.firstChild.href = url;
            container.appendChild(widget);
        }
        adaptWidgetsWidth();
    }


    // 根据数量自动生成分页按钮及分页按钮逻辑
    const forward = document.querySelector('#forward');
    const backward = document.querySelector('#backward');
    backward.addEventListener('click', () => {
        if (pi > 1) {
            pi -= 1;
            generateWidgets();
        }
    })
    forward.addEventListener('click', () => {
        if (pi < pa) {
            pi += 1;
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
            paginationBtn.dataset.index = i + 1;
            paginationBtn.innerHTML = `<span data-index="${i + 1}">${i + 1}</span>`;
            forward.before(paginationBtn);
            paginationBtn.addEventListener('click', (e) => {
                const tgt = parseInt(e.target.dataset.index)
                if (tgt !== pi) {
                    pi = tgt;
                    generateWidgets();
                }
            })
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
            }
        })
    }

    // 浅色模式与深色模式互相切换



    generateWidgets();
    adaptWidgetsWidth();
    generatePagination();

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
}
else {
    document.write('');
    const reason = navigator.platform !== 'Win32' ? '您所使用的平台并非Windows平台' : (navigator.userAgent.match(/Chrome|Firefox/) === null) ? '您所使用的浏览器并非Chrome/Edge/Firefox浏览器' : screen.width < 1200 ? '您的设备屏幕宽度小于1200px' : undefined;
    alert(`为了确保您的浏览体验，请在Windows系统上使用较新版的Chrome/Edge/Firefox浏览器浏览本页面！\n（${reason}）`);
}