codeInput.registerTemplate("syntax-highlighted", codeInput.templates.hljs(hljs, []));
var directoryOutput;
var dirObj = new Object();
var fileExtRegEx = /(?:\.([^.]+))?$/;
var codeBlock = document.getElementById('codeBlock')
var codeBlockText = codeBlock.firstChild;
var preview = document.getElementById("previewArea");
var licRoot = 'https://api.github.com/repos/alexankitty/GB-LicenseEmbeds/contents/Licenses';
var timeout = null;

(async () => {
    if(inIframe()) {
        document.body.classList.remove("background");
    }
    try{
        let getcommit = await fetch("https://api.github.com/repos/alexankitty/GB-LicenseEmbeds/commits/main")
        let commit = await getcommit.json();
        let commitCheck = localStorage.getItem("commitSha")
        if(commit.sha == commitCheck) {
            dirObj = localStorage.getItem("dirObj");
            if(!dirObj){
                await directoryWalk(licRoot);
                localStorage.setItem("dirObj", JSON.stringify(dirObj));
            }
            else{
                dirObj = JSON.parse(dirObj);
                console.log("Cache checked passed, loading data.");
            }
        } 
        else {
            await directoryWalk(licRoot);
            localStorage.setItem("dirObj", JSON.stringify(dirObj));
            localStorage.setItem("commitSha", commit.sha)
        }
        
    }
    catch(e){
        let error = document.getElementById("error");
        error.innerText = `An error has occurred, please try again later. (In an hour) ${e}`
    }
    await buildSelect();
    codeBlockText.addEventListener('keyup', function (e) {
        clearTimeout(timeout);
        timeout = setTimeout(function () {
            preview.innerHTML = codeBlockText.value;
        }, 1000);
    });
})()

async function directoryWalk(url){
    const response = await fetch(url);
    const data = await response.json();
    directoryOutput = data;
    for(let file of data){
        if(file.type === "dir"){
            await directoryWalk(`${url}/${file.name}`)
        }
        if(file.type === "file"){
            if(fileExtRegEx.exec(file.name)){
                let dirPath = file.path.replace("Licenses/", "")
                dirObj[dirPath] = file;
            }
        }
    }
}

async function buildSelect(){
    selection = document.getElementById("selection")
    let array = new Array();
    for(let key in dirObj){
        array.push(key);
    }
    array.sort();
    for(let i = 0; i < array.length; i++){
        let parentFolder = array[i].replace(dirObj[array[i]].name, "")
        parentFolder = parentFolder.substring(0, parentFolder.length - 1)
        let optGroup = document.getElementById(parentFolder);
          if(!optGroup){
          optGroup = document.createElement("optgroup");
              optGroup.id = parentFolder;
              optGroup.label = parentFolder;
              selection.appendChild(optGroup)
        }
        let option = document.createElement("option");
        option.value = array[i];
        optionName = dirObj[array[i]].name.replace(fileExtRegEx.exec(array[i])[0], "");
        option.innerText = optionName;
        optGroup.appendChild(option)
    }
    selection.onchange()
}

async function clipboardCopy(){
    navigator.clipboard.writeText(codeBlockText.value);
    showSnackBar("HTML copied.");
}

async function onSelect(value){
    try{
        url = dirObj[value].download_url;
        let data = await fetch(url);
        let htmlContent = await data.text();
        codeBlockText.value = htmlContent;
        preview.innerHTML = htmlContent;
        codeBlock.firstChild.oninput() 
    }
    catch(e){
        let error = document.getElementById("error");
        error.innerText = `An error has occurred, please try again later. (In an hour) ${e}`
    }
}

async function showSnackBar(value){
    // Get the snackbar DIV
    var x = document.getElementById("snackbar");
    x.innerText = value;
    // Add the "show" class to DIV
    x.className = "show";
    
    // After 3 seconds, remove the show class from DIV
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
} 

function inIframe () {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}