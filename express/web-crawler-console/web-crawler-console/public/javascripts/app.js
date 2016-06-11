var elements = document.getElementsByClassName('crawler');
Array.from(elements).forEach(function (element) {
    element.addEventListener('click', function () {
        getConfig(element.innerHTML);
    });
});

function getConfig(name) {
    var req = new XMLHttpRequest();
    req.open('GET', '/config/' + name, true);
    req.onreadystatechange = function () {
        if (req.readyState === 4 && req.status === 200) {
            bindConfig(req.responseText);
        }
    };
    req.send();
}

function bindConfig(config) {
    var configText = document.getElementById('config');
    configText.innerHTML = config;
}