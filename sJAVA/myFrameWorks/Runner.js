class Runner {
    constructor(){
    }
    inPre(callback, x, y, myId = 'myPre'){
        console.log("textArea"+callback)
        let HTMLtext = document.getElementById("textArea"+callback).value;
        new MenuThis(null, myId)
            .createTag('pre',HTMLtext, x, y)
            .css('textAlign','left')
       //document.getElementById(myPre).innerHTML = HTMLtext;
        if( false ){
            document.getElementById(myDiv).innerHTML = HTMLtext;
        }
        else if(false){
            document.body.innerHTML = this.txtArea.value;
        }
        return this;
    }
    html(html, myDiv = 'myDiv'){
        document.getElementById(myDiv).innerHTML = html;
    }
    text(text, myDiv = 'myDiv'){
        document.getElementById(myDiv).innerText = text;
    }
    addToHTML(html, myDiv = 'myDiv'){
        document.getElementById(myDiv).innerHTML += html;
    }
    clearHTML(myDiv = 'myDiv'){
        document.getElementById(myDiv).innerHTML = null;
    }
    evalAsHTML(callback, myDiv = 'myDiv'){
        console.log("textArea"+callback)
        let HTMLtext = document.getElementById("textArea"+callback).value;
        document.getElementById(myDiv).innerHTML = HTMLtext;
        if( false ){
            document.getElementById(myDiv).innerHTML = HTMLtext;
        }
        else if(false){
            document.body.innerHTML = this.txtArea.value;
        }
        return this;
    }
    returnValue(callback){
        console.log("returnValue")
        return document.getElementById("textArea"+callback).value;
    }
    value(callback) {
      console.log("value");
      try {
        return  document.getElementById("textArea"+callback).value;
      }
      catch (error) {
        console.log(error);
        return null;
      }
    }
    evalTAcallback(callback){
        console.log("TAcallback")
        eval( document.getElementById("textArea"+callback).value );
    }
    jsMany(callbacks, runFirst = ''){
        //let allText = callbacks.reduce((a, x) => a + document.getElementById("textArea"+x).value, '' );
        let allText = callbacks.reduce((a, x) => a + document.getElementById("textArea"+x).value +'\n', '' );
        eval(runFirst +'\n' + allText);
    }
    returnMany(callbacks){
        return callbacks.reduce((a, x) => a + document.getElementById("textArea"+x).value +'\n', '' );
    }
    pack(callbacks){
        let allText = callbacks.reduce((a, x) => a + document.getElementById("textArea"+x).value +'\n', '' );
        return allText;
    }
    jsManyLogLineNo(callbacks, line, back = 6){
        //let allText = callbacks.reduce((a, x) => a + document.getElementById("textArea"+x).value, '' );
        let allText = callbacks.reduce((a, x) => a + document.getElementById("textArea"+x).value +'\n', '' );
        allText=allText.split('\n');
        for(let i = -(back); i < 3; i++){
            console.log(i, allText[line+i]);
        }
    }
    js_$(callback, obj = null){
        let _$ = obj;
        let returnValue = eval( '_$ '+ document.getElementById("textArea"+callback).value );
        //console.log(returnValue)
        return returnValue;
    }
    js(callback, argF = ''){
        let returnValue = eval( argF+document.getElementById("textArea"+callback).value );
        //console.log(returnValue)
        return returnValue;
    }
    flowToJS(callback){
        let typescriptToJS = Babel.transform(document.getElementById("textArea"+callback).value, {
          "presets": ["es2017"],
          "plugins": ["transform-flow-strip-types"] }).code;
        console.log('TypeScriptToJS:', typescriptToJS)
        return typescriptToJS; // Not Really
    }
    jsxToReactJS(callback){
        const reactJS= Babel.transform(document.getElementById("textArea"+callback).value, {
          "presets": ["es2017"],
          "plugins": ["transform-react-jsx"] 
        }).code;
        return reactJS;
    }
    /*
	  jsxToVue(callback){
        let jsxToReactJS = Babel.transform(document.getElementById("textArea"+callback).value, 
				  {  
            "presets": ["es2017"],
						"plugins": [
              "transform-vue-jsx",            
              "transform-decorators-legacy",
              "transform-class-properties",
            ] }).code;
        return jsxToReactJS; // This does not work;
    }*/
    jsxTextToReactJS(codeText){
        let jsxToReactJS = Babel.transform(codeText, {
          "presets": ["es2017"],
          "plugins": ["transform-react-jsx"] 
        }).code;
        return jsxToReactJS;
    }
    packToBabel(callbacks) {
      const codeToRun = this.pack(callbacks);
      const returnValue = this.evalTextAsBabel(codeToRun);
      return returnValue;
    }
    evalTextAsBabel(codeText, as = 'es2017'){ //es2105
        let babelToJS = Babel.transform(codeText, {  
          "presets": [as],
		      "plugins": [
            "transform-react-jsx",
            // "transform-decorators",
            "transform-decorators-legacy",
            "transform-class-properties",
          ]}).code;
        const returnValue = eval(babelToJS);
        return returnValue;

    }
    evalAsES(callback){
        let jsxToBabel = document.getElementById("textArea"+callback).value;
        let babelToJS = Babel.transform(jsxToBabel, {  
          "presets": ["es2017"],
		      "plugins": [
            "transform-decorators-legacy",
            "transform-class-properties",
          ]}).code;
        const returnValue = eval(babelToJS);
        return {code: babelToJS, value: returnValue};
    } 
    evalAsBabel(callback){
        let jsxToBabel = document.getElementById("textArea"+callback).value;
        let babelToJS = Babel.transform(jsxToBabel, {  
          "presets": ["es2017"],
		      "plugins": [
            "transform-react-jsx",
            "transform-decorators-legacy",
            "transform-class-properties",
          ]}).code;
        const returnValue = eval(babelToJS);
        return returnValue;
    }  
    evalAsJS(callback, argF = ''){
        let returnValue = eval( argF+document.getElementById("textArea"+callback).value );
        //console.log(returnValue)
        return returnValue;
    }    
    evalAsCSS(callback){
        let style = document.createElement("STYLE");
        let styleId = "CSS_" + document.getElementById("textArea"+callback).id.slice('textArea'.length); 
        if( document.getElementById(styleId) !== null){
            document.body.removeChild(document.getElementById(styleId))
        }
        style.id = styleId;
        style.setAttribute('type',"text/css");
        style.innerHTML = document.getElementById("textArea"+callback).value ;
        document.body.appendChild(style);
    }
    injectScript(callback, scriptType = "text/javascript"){
        let scrpt = document.createElement("SCRIPT");
        //scrpt.id = document.getElementById("textArea"+callback).id;
        let scrId = "SCR_" + document.getElementById("textArea"+callback).id.slice('textArea'.length); 
        if( document.getElementById(scrId) !== null){
            document.body.removeChild(document.getElementById(scrId))
        }
        scrpt.id = scrId;
        scrpt.type="module";
        scrpt.innerHTML = document.getElementById("textArea"+callback).value ;
        document.body.appendChild(scrpt);
    }
    deleteTA(callback){
        let x = document.getElementById("textArea"+callback);
        if( x !== null){
            document.body.removeChild(x); 
        }
    }
}

const run = new Runner();