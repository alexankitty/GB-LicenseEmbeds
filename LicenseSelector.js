var directoryOutput;
var dirObj = new Object();
var root = 'https://api.github.com/repos/alexankitty/GB-LicenseEmbeds/contents/'
(async () => {
    const response = await fetch('https://api.github.com/repos/alexankitty/GB-LicenseEmbeds/contents/');
    const data = await response.json();
    directoryOutput = data;
    for (let file of data) {//directory walking
    }
})()

function directoryWalk(url){
    
    const response = 
}