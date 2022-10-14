const brPlugin = {
    "before:highlightBlock": ({ block }) => {
        block.innerHTML = block.innerHTML.replace(/\n/g, '').replace(/<br[ /]*>/g, '\n');
    },
    "after:highlightBlock": ({ result }) => {
        result.value = result.value.replace(/\n/g, "<br>");
    }
};
hljs.addPlugin(brPlugin);
document.querySelector('.container').style.width = window.self === window.top ? '62.5vw' : '100%';
document.querySelector('.container').style.height = window.self === window.top ? '60%' : '100%';
document.querySelector('.code-box').style.display = window.self === window.top ? 'flex' : 'none';
document.querySelector('.html-box').innerText = document.querySelector('.container').innerHTML.slice(1).replace(/ {4}(?=\S)/g, '');
document.querySelector('.css-box').innerText = document.querySelector('#effect-css').innerHTML.slice(1).replace(/ {4}(?=\S)/g, '');
document.querySelector('.javascript-box').innerText = document.querySelector('#effect-js').innerHTML.slice(1);
document.querySelectorAll('div.code').forEach(el => {
    hljs.highlightElement(el);
});
for (const copyBtn of document.querySelectorAll('.title span')) {
    copyBtn.addEventListener('click', (e) => {
        const c = e.currentTarget.previousSibling.textContent.toLowerCase();
        const s = `.${c}-box`;
        const copiedDiv = document.querySelector('.copied');
        if (document.querySelector(s).innerText !== '') {
            window.getSelection().selectAllChildren(document.querySelector(s));
            if (document.execCommand('copy')) {
                copiedDiv.innerText = `${c} 代码复制成功！`;
                copiedDiv.style.top = '20px';
                setTimeout(() => {
                    copiedDiv.style.top = '';
                    copiedDiv.innerText = '';
                }, 1500);
            }
            window.getSelection().empty();
        }
        else{
            copiedDiv.innerText = '无内容，无法复制！'
            copiedDiv.style.top = '20px';
            setTimeout(() => {
                copiedDiv.style.top = '';
                copiedDiv.innerText = '';
            }, 1500);
        }
    })
}

window.addEventListener('load', () => {
    document.querySelector('.loading').style.display = 'none';
})

window.addEventListener('keyup', (e) => {
    console.log(e.keyCode);
    const copyBtns = document.querySelectorAll('.title span');
    const codeBox = document.querySelector('.code-box');
    if (e.keyCode === 37) {
        codeBox.style.display = 'flex';
        setTimeout(() => {
            codeBox.style.opacity = '1';
        }, 100)
    }
    else if (e.keyCode === 39) {
        codeBox.style.opacity = '0';
        setTimeout(() => {
            codeBox.style.display = 'none';
        }, 200)
    }
    else if (e.keyCode === 72 && e.shiftKey) {
        copyBtns[0].click();
    }
    else if (e.keyCode === 67 && e.shiftKey) {
        copyBtns[1].click();
    }
    else if (e.keyCode === 74 && e.shiftKey) {
        copyBtns[2].click();
    }
})