document.querySelector('.btn').addEventListener('click', (e) => {
    window.location.href = '/verify';
});

function show(text) {
    const cont = document.createElement('div')
    cont.setAttribute('id', 'alrtc');
    const div = document.createElement('div')
    div.setAttribute('id', 'alrt');
    const elem = document.createElement('h3')
    elem.setAttribute('id', 'msg');
    elem.innerText = text;
    div.appendChild(elem)
    cont.appendChild(div);
    document.body.appendChild(cont);
}

document.addEventListener('submit', (e) => {
    show("OTP SENT TO YOUR EMAIL");
})