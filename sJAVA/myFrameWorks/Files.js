
function Files (extension = '.chem', myThis = null){
    this.myThis = myThis;
    this.fileTxt = "temp";
    this.callback = null;
    this.accept = extension;
    this.fileExtension = extension;

}
Files.prototype.setAccept = function(accept){
    this.accept = accept;
    return this;
}
Files.prototype.setFileExtension = function(fileExtension){
    this.fileExtension = fileExtension;
    return this;
}
Files.prototype.setCallback = function(callback){
    this.callback = callback;
    console.log(this.callback)
    return this;
}
Files.prototype.saveFileAs = function(textToSave,x,y){
    var fileInput = document.createElement("input");
    fileInput.id              = "inputFileNameToSaveAs";
    fileInput.style.position  = "absolute";
    fileInput.style.top       =  y+"px";
    fileInput.style.left      =  x+"px";
    fileInput.style.width     = "100px";
    fileInput.onkeydown       = () => event.stopPropagation();
    fileInput.onchange        = () => this.saveFileAndDestroyInput(event, textToSave);
    document.body.appendChild(fileInput);

};
Files.prototype.saveFileAndDestroyInput = function(event,textToSave){
    var textToSaveAsBlob = new Blob([textToSave], {type:"text/plain"});
    var textToSaveAsURL = window.URL.createObjectURL(textToSaveAsBlob);
    var fileNameToSaveAs = document.getElementById("inputFileNameToSaveAs").value+this.fileExtension;
    document.body.removeChild(event.target);
    var downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "Download File";
    downloadLink.href = textToSaveAsURL;
    downloadLink.onclick = this.destroyClickedElement;
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
    downloadLink.click();
}
Files.prototype.saveFile = function(textToSave, fileName = "new"+this.accept){
    console.log("Files.saveFile()");
    var textToSaveAsBlob = new Blob([textToSave], {type:"text/plain"});
    var textToSaveAsURL = window.URL.createObjectURL(textToSaveAsBlob);
    var fileNameToSaveAs = fileName;
    var downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "Download File";
    downloadLink.href = textToSaveAsURL;
    downloadLink.onclick = this.destroyClickedElement;
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
    downloadLink.click();
};
Files.prototype.saveFileName = function(textToSave, fileName){
    console.log("Files.saveFileName("+fileName+")");
    var textToSaveAsBlob = new Blob([textToSave], {type:"text/plain"});
    var textToSaveAsURL = window.URL.createObjectURL(textToSaveAsBlob);
    var fileNameToSaveAs = fileName+this.fileExtension;
    var downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "Download File";
    downloadLink.href = textToSaveAsURL;
    downloadLink.onclick = this.destroyClickedElement;
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
    downloadLink.click();
};
Files.prototype.destroyClickedElement =function(event)
{
    document.body.removeChild(event.target);
};
Files.prototype.loadFile = function(results = null)
{
    console.log('loadFile');
    var filex = document.createElement("INPUT");
    filex.setAttribute("type", "file" );
    filex.multiple = true; 
    filex.id="myInputID";
//    filex.style= "position: absolute; top: "+y+"px; left: "+x+"px;";
    filex.accept = this.accept;
    filex.style.display = "none";
    filex.click();
    filex.onchange = () => this.loadFileAsText(filex, results);
    document.body.appendChild(filex);
//    var event = new Event('change');

// Dispatch it.
//    filex.dispatchEvent(event);
};
/*
Files.prototype.loadFileAsText =function(files, results)
{
    console.log('loadFileAsText');
    let i = 0;
    var fileReader = new FileReader();
    var that = this;
    fileReader.onload = function (fileLoadedEvent)
    {
        let fileTxt = fileLoadedEvent.target.result;
        results.txt = fileTxt;
//        console.log("Files.loadFileAsTxt:Files.fileTxt:\n" + that.fileTxt);
        that.myThis.myThis.myThis.createFromChemStr(fileTxt);
        return fileTxt;
    };

    console.log(file);
    let fileRead = new Promise( () => 
                        { console.log(file);
                            if(file[i]){
                                console.log(file[i].name);
                                fileReader.readAsText(file[i++], "UTF-8");
                            }
                        }).then( console.log(response));
let file = files.files;
var count = 0;
var promiseWhile = new Promise(function() {
    return count < file.length;
}, function() {
    return new Promise(function(resolve, reject) {
        fileReader.readAsText(file[count], "UTF-8")
          .then(function(res) { 
              logger.log(res); 
              count++;
              resolve();
          });
    }); 
})().then(function() {
    console.log('all done');
}); 
    document.body.removeChild(event.target);
};*/

Files.prototype.loadFileAsText =function(files, results = null)
{
    console.log('loadFileAsText');
    var i = 0;
    var fileReader = new FileReader();
    var that = this;
    fileReader.onload = function(fileLoadedEvent) 
    {
        let fileTxt = fileLoadedEvent.target.result;
        console.log('loadFile', fileTxt, results)
        if(results !== null){
          if( typeof results === 'function'){
            results(fileTxt);
          } else {
            results = fileTxt;
            console.log('Result-loadFile', fileTxt, results)
          }
        }
        else if( typeof that.callback === 'function'){
            that.callback(fileTxt);
        }
        else if( that.callback !== null ){
            console.log(that.callback);
            console.log(fileLoadedEvent.target);
            that.myThis[that.callback](fileTxt);
        }
        else{
          console.log('Error Fix This Now!!!')
            //that.myThis.myThis.myThis.createFromChemStr(fileTxt);
        }

    };
    let file = files.files;
    let interval = setInterval(( () =>   {
                            if(file[i]){
                                console.log(file[i].name);
                                fileReader.readAsText(file[i++], "UTF-8");
                            }
                            else{
                                clearInterval(interval);
                            }
                        }), 100);
    document.body.removeChild(event.target);
};

