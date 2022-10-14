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
document.querySelector('.html-box').innerText = document.querySelector('.container').innerHTML;
document.querySelector('.css-box').innerText = document.querySelector('#effect-css').innerHTML;
document.querySelector('.javascript-box').innerText = document.querySelector('#effect-js').innerHTML;
document.querySelectorAll('div.code').forEach(el => {
    hljs.highlightElement(el);
});
for (const copyBtn of document.querySelectorAll('.title span')) {
    copyBtn.addEventListener('click', (e) => {
        const c = e.currentTarget.previousSibling.textContent.toLowerCase();
        const s = `.${c}-box`;
        window.getSelection().selectAllChildren(document.querySelector(s));
        if(document.execCommand('copy')){
            const copiedDiv = document.querySelector('.copied');
            copiedDiv.innerText = `${c} 代码复制成功！`;
            copiedDiv.style.top = '20px';
            setTimeout(() =>{
                copiedDiv.style.top = '';
                copiedDiv.innerText = '';
            }, 1500);
        }
        window.getSelection().empty();
    })
}
window.addEventListener('load', () => {
    document.querySelector('.loading').style.display = 'none';
});