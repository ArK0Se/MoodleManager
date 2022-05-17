var cours = {};
var id = undefined;


chrome.storage.sync.get(['cours'], function(result) {
    cours = result.cours
});

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (sender.tab != undefined){
            id = sender.tab.id;
        }
        if (request.type === "define") {
            if (cours == undefined){
                cours = request.cours;
                chrome.storage.sync.set({"cours": cours}, function() {});
            }
        }
        if (request.type === "update"){
            console.log(sender);
            cours[request.key] = request.value;
            chrome.storage.sync.set({"cours": cours}, function() {});
            chrome.tabs.sendMessage(id, {type: "reload"}, function() {});

        }
        if (request.type === "get"){
            sendResponse({cours: cours});
            return;
        }
        sendResponse({success: true});
    }
);