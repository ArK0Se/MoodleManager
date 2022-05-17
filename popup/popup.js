const container = document.querySelector(".container");

chrome.runtime.sendMessage({type: "get"}, function(response) {
    console.log(response);
    for (const [key, value] of Object.entries(response.cours)){
        const checked = value?"checked":"";
        const id = encodeURI(key);
        container.innerHTML +=
        `<div class="card">
        <div class="cours">${key.split("(")[0]}</div>
        <input class="checkbox" type="checkbox" id="${id}" ${checked}>
        </div>`
    }

    const checkbox = document.querySelectorAll(".checkbox");

    checkbox.forEach(element =>{

    element.onclick = () => {
        const decodedId = decodeURI(element.id);
        chrome.runtime.sendMessage({type: "update", key: decodedId, value: element.checked}, function(response) {});
    };
});

});


