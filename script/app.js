const nav_drawer = document.querySelector("#nav-drawer");
const li = nav_drawer.lastElementChild.firstElementChild.querySelectorAll("li");
var cours = {};

li.forEach(element => {
    let chaine = element.firstElementChild.getAttribute("href");
    if (chaine != null) {
        if(chaine.includes("course")){
            if (!chaine.includes("calendar") && !chaine.includes("#section")) {
                cours[element.firstElementChild.firstElementChild.firstElementChild.lastElementChild.textContent] = true;
            }
        }
    }
});

chrome.runtime.sendMessage({type: "define", cours: cours}, function(response) {});

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.type === "reload") {
            chrome.runtime.sendMessage({type: "get"}, function(response) {
                li.forEach(element => {
                    let chaine = element.firstElementChild.getAttribute("href");
                    if (chaine != null) {
                        if(chaine.includes("course")){
                            if (!chaine.includes("calendar") && !chaine.includes("#section")) {
                                if (!response.cours[element.firstElementChild.firstElementChild.firstElementChild.lastElementChild.textContent]) {
                                    element.style.display = "none";
                                }else{
                                    element.style.display = "block";
                                }
                            }
                        }
                    }
                });
            });
        }
        sendResponse({success: true});
    }
);






