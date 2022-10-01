// 制作组件标签
class EffectWidget extends HTMLElement {
    constructor() {
        // Always call super first in constructor
        super();
        // write element functionality in here
        const shadow = this.attachShadow({mode: "open"});

        const style = document.createElement('style')
        style.innerHTML = `
.effect-wrapper{
    position: relative;
    width: 300px;
    height: 240px;
    background-color: #1e1f26;
    margin-top: 80px;
    margin-left: 100px;
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

.thumbnail{
    width: calc(100% - 30px);
    height: calc(100% - 60px);
    border-radius: 8px;
    background-color: #fff;
}

.effect-title{
    font-weight: bold;
    color: white;
    margin-top: 10px;
}

.fullscreen{
    position: absolute;
    right: 6px;
    bottom: 6px;
    cursor: pointer;
}
        `
        const wrapper = document.createElement('div')
        const container = document.createElement('div')
        const thumbnail = document.createElement('div')
        const title = document.createElement('div')
        const fullscreen = document.createElement('div')
        const img = document.createElement('img')
        wrapper.setAttribute('class', 'effect-wrapper')
        container.setAttribute('class', 'effect-container')
        thumbnail.setAttribute('class', 'thumbnail')
        title.setAttribute('class', 'effect-title')
        title.innerText = '特效标题'
        fullscreen.setAttribute('class', 'fullscreen')
        img.setAttribute('src', './img/fullscreen-dark.png')
        img.setAttribute('width', '28px')
        img.setAttribute('height', '28px')
        fullscreen.appendChild(img)
        container.appendChild(thumbnail)
        container.appendChild(title)
        container.appendChild(fullscreen)
        wrapper.appendChild(container)
        shadow.appendChild(wrapper)
        shadow.appendChild(style)
    }
}

// Define the new element
customElements.define('effect-widget', EffectWidget);
