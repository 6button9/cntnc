class MenuMaker extends Runner {
    constructor( Id = "Base", x = 50, y = 50, myClass = Id){
        super();
        this.Id = Id;
        this.myClass = myClass;
        this.method = myClass;
        if( this.Id === null ){
            this.Id = Math.random();
        }
        this.position = {
                            x: x,
                            y: y
                        };
        this.menuArrays = [];
        this.tempMenuArray = [];
    }
    menu(x = this.position.x, y = this.position.y){
        this.position.x = x;
        this.position.y = y;
        let mmMenu = new MenuThis(this, "MenuMaker");
        mmMenu
            .clear()
                .textXY(this.Id, x-0 , y-55, [null], "white")
                .rectXY(         x-5 , y-40, 55,  40, 'teal')
                .css("borderRadius", "5px")
                .setBGcolor('white')
                .btnR( 'X'     , x+25 , y-35, ['']            , 15, 15, "Cr,TC")
                .textXR('o-o'  , x+25 , y-20, [''])
                .setBGcolor('yellow')
                .btnR( 'M<br>V', x    , y-35, ['move']           , 20, 30)
            .setBGcolor('white')
            .rectXY(       x-3, y    , 36, 225, "slateGrey")
            .css("borderRadius", "5px")
            .btnR("Base" , x  , y    , [ "changeClass"  ,x+50 ,y] , 30, 20)
            .btnR("down" , x  , y+25 , [ "writeMenu","down" ] , 30, 20)
            .btnR("up"   , x  , y+50 , [ "writeMenu","up"   ] , 30, 20)
            .btnR("right", x  , y+75 , [ "writeMenu","right"] , 30, 20)
            .btnR("left" , x  , y+100, [ "writeMenu","left" ] , 30, 20)
            .btnR("mode" , x  , y+125, [ "mode"] , 30, 20)
            .btnR("btn"  , x  , y+150, [ "placeBtn"      ] , 30, 20)
            .btnR("input", x  , y+175, [ "placeInput"    ] , 30, 20)
            .btnR("JSON" , x  , y+200, [ "createCode"    ] , 30, 20);
        return mmMenu;
    }
    move(){
        //console.log("move")
        document.onmousemove = () => {
            //console.log(event)
            this.menu(event.clientX, event.clientY)
        };
        document.onmousedown = () => {
            this.menu(event.clientX, event.clientY)
            document.onmousedown = null;
            document.onmousemove = null;
        };
    }
   // start(x = this.position.x, y = this.position.y){
        //this.menu();
    
   // }
    editElementMenu(event, method, randomNum){
        console.log("Edit:", method, randomNum, event.target)
        let trgt = event.target;
        let x = Number(trgt.style.left.slice(0,-2));
        let y = Number(trgt.style.top.slice(0,-2));
        let editMenu = new MenuThis(this, "editMenu");
        editMenu.clear().setBGcolor('white')
            .rectXY(              x+45  , y+35  , 200, 85) 
            .rectXY(              x+45  , y+110 , 200, 25 , "teal")
            .btnR( "X"          , x+44  , y+34  , [""], 9 )
            .btnR( "Down"       , x+145 , y+118 , ["writeDrop" ,"down" , x, y, method, randomNum, trgt], 35, 12)
            .btnR( "left"       , x+60  , y+118 , ["writeDrop", "left" , x, y, method, randomNum, trgt], 35, 12)
            .btnR( "right"      , x+190 , y+118 , ["writeDrop", "right", x, y, method, randomNum, trgt], 35, 12)
            .btnR( "up"         , x+105 , y+118 , ["writeDrop", "up"   , x, y, method, randomNum, trgt], 35, 12)
            .textXR("callback"  , x+120 , y+74  , () => 
              editMenu.input('callback', x+70, y+20, (event) => 
                this.insertLinkTo(method, randomNum, trgt, 'callback', event.target.value)
              )
            )
            .textXY("evalAsHTML", x+120 , y+40 , () => 
              editMenu.input('evalAsHTML', x+70, y+20, (event) => 
                this.insertLinkTo(method, randomNum, trgt, 'HTML', event.target.value)
              )
            )
            .textXY("evalAsJS"  , x+120 , y+57 , () => 
              editMenu.input('evalAsJS', x+70, y+40, (event) => 
                this.insertLinkTo(method, randomNum, trgt, 'JS', event.target.value)
              )
            )
            .select(""          , x+200, y+40 , (e) => 
              this.addControl(e.target.value,method,randomNum,trgt),
              [    
                "checkbox",
                "textXY",
                "btn","pre","p","a","img",
                "radioButton",
                "input",
                "select" 
            ])
            .textXR("Check"  , x+120 , y+90  , ["addControl" ,'checkbox'    , method, randomNum, trgt], 50, 15)
            .textXR("Radio"  , x+160 , y+90  , ["addControl" ,"radioButton" , method, randomNum, trgt], 50, 15)
            .textXR("Imput"  , x+200 , y+90  , ["addControl" ,"input"       , method, randomNum, trgt], 50, 15)
            .textXR("CSS"  , x+280 , y+90  , ["insertCssType" , method, randomNum, trgt], 50, 15)
            //.textXR(trgt.onclick, x+70 , y+60 , null, 50, 15)
            .textXY(trgt.innerHTML   , x+45  , y+155, null, 50, 15)
            .textXY(method           , x+45  , y+140)
            .textXY(trgt.id          , x+125 , y+20)
            .textXY(this.myClass     , x+45  , y+20)
            .textXY( trgt.name ? trgt.name : "name" , x+180 , y+140)
            .action("onclick", () => editMenu.input("Name", x, y, (event) => console.log(event), 50) )
            .textXY(trgt.class ? trgt.name : "class" , x+180 , y+155)
            .action("onclick", () => editMenu.input("Class", x, y, (event) => console.log(event), 50) )
            .textXY('x:'              , x+60 , y+40)
            .textXY(trgt.style.left   , x+70 , y+40)
            .textXY('y:'              , x+60 , y+55)
            .textXY(trgt.style.top    , x+70 , y+55)
            .textXY('hieght:'         , x+60 , y+75)
            .textXY(trgt.style.height , x+80 , y+75)
            .textXY('width:'          , x+60 , y+90)
            .textXY(trgt.style.width  , x+80 , y+90)
            //.textXY('callback:'     ,x+80 , y+40, ["selectCallback", x+130, y+40])
            //.textXY(this.callback   ,x+80 , y+60)
            //.setTextColor(this.color.text)
            //.textXY(this.color.text      , x+80, y,['changeColor'])
            //.setTextColor(this.color.background)
            //.textXY(this.color.background, x+80, y+20,['selectBGColor'])
             //console.log(this.canvas.onclick)
        //if( this.canvas.onclick == "() => this.move()" ){
            //propertiesMenu.textXY( "off", x+170, y+40, ["toggleOnclick"]);
        //}
    }
    changeClass(x, y){
        let select = new MenuThis(this, "propsMenu");
        select.input(null, x, y, ["makeNewClass"]);
    }
    makeNewClass(textClass){
        this.myClass = textClass;
        this.method = textClass;
        document.onclick = () => {
            let callback = "() => m.editElementMenu(event,'"+this.method+"',"+Math.random()+")"
            this.tempMenuArray.push({method: "btnR", 
                                        args: [textClass, event.clientX, event.clientY, callback]});
            this.createCode([{method: "btnR", 
                                 args: [textClass, event.clientX, event.clientY, callback]}],
                                this.myClass, event.clientX, event.clientY
                            );
            document.onclick = null;
            //this.menu();
        }
    }
    enterLinkToTA(x = 200, y = 40){
        const select = new MenuThis(this, "propsNotes");
        select.input(null, x, y, ["createLinkToTA"]);
    }
    createLinkToTA(fname = "Base.New"){
         new Note( "fakeJSON", 500 ,50).createTextArea(fname, 15,80);
    }
    textXYCallback(text, x, y){
        new MenuThis(this, "tempBtn2112").clear().textXY(text, x, y);
        this.createFromMenuArray(this.tempMenuArray);
    }
    exitCurrentAction(text, x, y){
        let rx = Math.round(x);
        let ry = Math.round(y);
        let callback = "() => m.editElementMenu(event,'"+this.method+"',"+Math.random()+")"
        this.tempMenuArray.push({method: "textXY", args: [text, rx, ry,callback ]});
        new MenuThis(this, "tempBtn2112").clear();
        this.createFromMenuArray(this.tempMenuArray);
        document.onkeydown = null;
        document.onkeypress = null;
        this.menuArrays.push({fname: this.method, mArray: this.tempMenuArray});
        console.log(this.menuArrays)
        this.createCode();
        //this.menu();
    }
    checkUniqueName(method){
      var met = method;
      while( document.getElementById("textArea"+met) !== null){
        met = "i"+met;
        this.myClass += "i";
        console.log(met);
      }
      console.log(met);
      return met;
    }
    writeMenu(direction = "right", method = this.method){
      //this.method = method+"."+direction+".";
      this.method = this.checkUniqueName(method+"_"+direction+"_");
      console.log(this.method)
      this.tempMenuArray = [];
      new TextInput(
        myTextCanvas, 
        {
          enter: "exitCurrentAction",
          backspace: "textXYCallback",
          space: "addTextXY"+direction,
          default: "textXYCallback" 
        }, 
        this
      ).start();
    }
    returnOffset(direction){
        let offset =  { x: 0, y:0 };
        switch( direction ){
            case "up":
                offset.y = -20;
                break;
            case "down":
                offset.y = (+20);
                break;
            case "right":
                offset.x =  70;
                break;
            case "left":
                offset.x = (-70);
                break;                
        }
        return offset;
    }
    insertCssType(taName, randomNum, target) {
      const rx = Number(target.style.left.slice(0,-2));
      const ry = Number(target.style.top.slice(0,-2));
      const cssInputCallback = (e) => {
        const { codeArray, codeIndex } = this.createMenuArrayFromCode(taName, randomNum);
        const cssCode = '      ' +
          this.codeStrObjToString({
            method: 'css', 
            args: [cssType, cssData ]
          }).slice(0,-1);
        codeArray.splice(codeIndex+1, 0, cssCode);
        const codeText = codeArray.join('\n');
        if( document.getElementById("textArea"+taName) !== null){
          document.getElementById("textArea"+taName).value = codeText;
          console.log({codeIndex,codeText});
          run.js(taName);
        }
      }
    let cssType = 'color';
    let cssData = 'red';
    new MenuThis(null, 'inputCssTypes')
        .clear()
        .rect(rx-5, ry-5, 160, 95,'cyan')
        .text(taName,rx,ry)
        .input('style', rx, ry + 30, (e) => cssType = e.target.value, '',
          { deleteOnInput: false, continous: true, offset: null } ) 
        .input('att', rx, ry + 50, (e) => cssData = e.target.value, '',
          { deleteOnInput: false, continous: true } )
        .btnR('enterData',rx,ry + 70, cssInputCallback, 50,25)

    }
    insertLinkTo(method, randomNum, target, codeType = "JS", callback = this.method){
        let text       = target.innerHTML;
        let rx         = target.style.left.slice(0,-2);
        let ry         = target.style.top.slice(0,-2);
        let myCallback = "";
        if( codeType === "callback"){
          myCallback  = this.value(callback);
          console.log('myCallback:callback',myCallback, callback)
        }
        if( codeType === "JS"){
          myCallback   = "() => m.evalAsJS('"+callback+"')" ;
        }
        if( codeType === "HTML"){
          myCallback   = "() => m.evalAsHTML('"+callback+"')" ;
        }
        const { codeArray, codeIndex } = this.createMenuArrayFromCode(method, randomNum);
        this.myClass = this.menuIdFromCodeStr(codeArray);
        //find XY method
        let find ="[\}][\)][\(]";
        let testExpStr = new RegExp(find);
        const xyCodeIndex = codeArray.findIndex( (x) => testExpStr.exec(x) );
        let start = /[0-9]/.exec( codeArray[xyCodeIndex] ).index;
        let coma  = /[,]/.exec( codeArray[xyCodeIndex] ).index;
        let end   = /[0-9][)]/.exec( codeArray[xyCodeIndex] ).index;
        let taX = Number( codeArray[xyCodeIndex].slice(start, coma) );
        let taY = Number( codeArray[xyCodeIndex].slice(coma+1, end+1 ) );
        console.log( taX, taY);
        //
        //find type
        console.log(codeArray[codeIndex])
        const foundType = codeArray[codeIndex]
          .split('.')[1]
          .split('(')[0];
        const foundArgs = codeArray[codeIndex]
          .split('(')[1]
          .split(',')
          .slice(0,-1);
        const endArgs = codeArray[codeIndex]
          .split(')')[2]
          .split(',')
          .slice(1)
          .map( ar =>
            Number(ar)
              ? Number(ar)
              : ar
          )
        console.log('endArgs:', endArgs)
        const trimedArgs = foundArgs.map( ar => {
            if( ar[0] === "'")
              return ar = ar.split("'")[1];
            else return ar;
          });
        console.log('asFound:',foundType,foundArgs)
        if( foundType === 'rect') {
          const argsToUse = ['rect', ...trimedArgs, myCallback, ...endArgs];
          console.log('argsToUse:', argsToUse);
          codeArray[codeIndex] = '    ' +
            this.codeStrObjToString({
              method: foundType, 
              args: argsToUse
            }, taX, taY).slice(0, -1);
        } else {
          codeArray[codeIndex] = '    ' +
            this.codeStrObjToString({
            method: foundType, 
            args: [...trimedArgs, myCallback, ...endArgs ]
          }, taX, taY).slice(0,-1);
        }
        const codeText = codeArray.join('\n');
        if( document.getElementById("textArea"+method) !== null){
          document.getElementById("textArea"+method).value = codeText;
        }
    }
    //MenuThis.prototype.checkbox = function(text, x, y, callback, sizeX = 20, sizeY = sizeX){
    addControl(type, method, randomNum = null, target = null){//type checkBox, RodioButton, input
        if(type === 'input'){
            this.insertLinkTo(method, randomNum, target, "callback", (e) => console.log(e.target.value), type); 
        }else 
        if(type === 'radio' || 'checkbox'){
            this.insertLinkTo(method, randomNum, target, "callback", (e) => console.log(e), type);  
        }
        else{
            this.insertLinkTo(method, randomNum, target, "callback", (e) => console.log(e.target.value), type);  
        }
    }
    writeDrop(direction, x, y, method, randomNum = null, target = null){//direction up/down/left/right
        console.log(method)
        this.method = this.myClass+"_"+method+"."+direction+".";
        if( randomNum !== null){
            if( method === target.innerHTML){
                this.method = target.innerHTML+ "."+direction+".";
            }
            else{
                this.method = method+target.innerHTML+ "."+direction+".";
            }
            this.insertLinkTo(method, randomNum, target);  
        }
        this.tempMenuArray = [];
        let offset = this.returnOffset(direction);
        new TextInput(myTextCanvas, 
                      { enter:     "exitCurrentAction",
                        backspace: "textXYCallback",
                        space:     "addTextXY"+direction,
                        default:   "textXYCallback" }, this).startXY( x + offset.x, y + offset.y );
    }
    addTextXYleft(text, x, y){
        let rx = Math.round(x);
        let ry = Math.round(y);
        console.log("addTextToArray", text, rx, ry);
        new MenuThis(this, "tempBtn2112").clear();
        let width = myTextContext.measureText(text).width;
        let callback = "() => m.editElementMenu(event,'"+this.method+"',"+Math.random()+")";
        this.tempMenuArray.push({method: "textXY", args: [text, rx, ry, callback]});
        this.createFromMenuArray(this.tempMenuArray);
        new TextInput(myTextCanvas, { enter:     "exitCurrentAction",
                                     backspace: "textXYCallback",
                                     space:     "addTextXYleft",
                                     default:   "textXYCallback" }, this).startXY(rx-15-width, ry);
        
    }
    addTextXYup(text, x, y){
        let rx = Math.round(x);
        let ry = Math.round(y);
        console.log("addTextToArray", text, rx, ry);
        new MenuThis(this, "tempBtn2112").clear();
        let callback = "() => m.editElementMenu(event,'"+this.method+"',"+Math.random()+")";
        this.tempMenuArray.push({method: "textXY", args: [text, rx, ry, callback ]});
        this.createFromMenuArray(this.tempMenuArray);
        new TextInput(myTextCanvas, { enter:     "exitCurrentAction",
                                     backspace: "textXYCallback",
                                     space:     "addTextXYup",
                                     default:   "textXYCallback" }, this).startXY(rx, ry - 20);
        
    }
    addTextXYright(text, x, y){
        let rx = Math.round(x);
        let ry = Math.round(y);
        console.log("addTextToArray", text, rx, ry);
        new MenuThis(this, "tempBtn2112").clear();
        let width = myTextContext.measureText(text).width;
        let callback = "() => m.editElementMenu(event,'"+this.method+"',"+Math.random()+")";
        this.tempMenuArray.push({method: "textXY", args: [text, rx, ry, callback]});
        this.createFromMenuArray(this.tempMenuArray);
        new TextInput(myTextCanvas, { enter:     "exitCurrentAction",
                                     backspace: "textXYCallback",
                                     space:     "addTextXYright",
                                     default:   "textXYCallback" }, this).startXY(rx+15+width, ry);
        
    }
    addTextXYdown(text, x, y){
        let rx = Math.round(x);
        let ry = Math.round(y);
        console.log("addTextToArray", text, rx, ry);
        new MenuThis(this, "tempBtn2112").clear();
        let callback = "() => m.editElementMenu(event,'"+this.method+"',"+Math.random()+")";
        this.tempMenuArray.push({method: "textXY", args: [text, rx, ry, callback]});
        this.createFromMenuArray(this.tempMenuArray);
        new TextInput(myTextCanvas, { enter:     "exitCurrentAction",
                                     backspace: "textXYCallback",
                                     space:     "addTextXYdown",
                                     default:   "textXYCallback" }, this).startXY(rx, ry + 20); 
    }
    createFromMenuArray(mArray){
        //console.log(mArray)
        let createdMenu = new MenuThis( this, this.myClass );
        createdMenu.clear();
        for( let i = 0; i < mArray.length; i++){
            createdMenu[mArray[i].method]( ...mArray[i].args);
        }
        //this.menuArray.map( (x) => {
            //createdMenu[x.method](...x.args);
        //});
    
    }
    createMenuArrayFromCode(methodId = null, randomNum){
        let elem = null;
        console.log(methodId)
        if( methodId !== null){
            elem = document.getElementById("textArea"+methodId);
            if(!elem.value){
                console.log("no Method Found")
            }
            else{
                console.log("Create", elem.value); 
                console.log( typeof elem.value);
            }

        }
        else{
            console.log("no Method Given")
        }
        const codeStrArray = elem.value.split('\n');
        const regExpStr = new RegExp(randomNum.toString());
        console.log(regExpStr);
        let found = {};
        let codeIndex = codeStrArray.forEach( (line, i) => {
          if( regExpStr.test(line)  ) {
            found = {line, i}
          }
        });
        console.log('CreateCodeStringArray',codeStrArray, found);
        return {codeArray: codeStrArray, codeIndex: found.i};

    }
    menuIdFromCodeStr(codeStr = null){
            //find line to with baseName in menuID
        let regExpStr2 = new RegExp('new MenuThis');
        console.log(regExpStr2);
        let baseIndex = codeStr.findIndex( (x) => regExpStr2.test(x) );
        console.log(baseIndex, codeStr[baseIndex]);
        let qtStart  = /[\"]/.exec( codeStr[baseIndex] ).index;
        let qtEnd    = /[\"][)]/.exec( codeStr[baseIndex] ).index;
        let menuID = codeStr[baseIndex].slice(qtStart+1, qtEnd);
        this.setI
        console.log(qtStart, qtEnd, menuID)
        return menuID;
    }
    codeStrObjToString(codeStrObj, x = this.position.x, y = this.position.y){
      let fakeJSON = "";
      if( codeStrObj.method === "radioButton" ||
          codeStrObj.method === "checkbox"    ||
          codeStrObj.method === "button"      ||
          codeStrObj.method === "icon"        ||
          codeStrObj.method === "img"         ||
          codeStrObj.method === "input"       ||
          codeStrObj.method === "text"        ||
          codeStrObj.method === "textXY"      ||
          codeStrObj.method === "textXR"      ||
          codeStrObj.method === "textarea"    ||
          codeStrObj.method === "btn"         ||
          codeStrObj.method === "btnR"        ||
          codeStrObj.method === "createTag"   ||
          codeStrObj.method === "createTagR" ){
        fakeJSON += "." + codeStrObj.method + "('"
        fakeJSON += codeStrObj.args[0] + "',"
        fakeJSON += codeStrObj.args[1] + ","
        fakeJSON += codeStrObj.args[2] + ","
        fakeJSON += codeStrObj.args[3] || null;
        //JSON.stringify(codeStrObj.args).slice(1,-1)
        //fakeJSON+="', x+"+(codeStrObj.args[1]-x)
        //fakeJSON+=",  y+"+(codeStrObj.args[2]-y)+",";
        //fakeJSON+=codeStrObj.args[3] || null;
        if( codeStrObj.args.slice(4).length > 0 ){
          console.log(codeStrObj.args.slice(4))
          fakeJSON+=","+JSON.stringify(codeStrObj.args.slice(4)).slice(1,-1)
        }
        fakeJSON+=")\n" ;
      } else if ( codeStrObj.method === "rect" ) {
        fakeJSON += "." + codeStrObj.method + "("
        fakeJSON += codeStrObj.args[1] + ","
        fakeJSON += codeStrObj.args[2] + ","
        fakeJSON += codeStrObj.args[3] + ","
        fakeJSON += codeStrObj.args[4] + ",'"
        fakeJSON += codeStrObj.args[5] + "',"
        fakeJSON += codeStrObj.args[6] + ","
        fakeJSON += codeStrObj.args[7] || null;
        if( codeStrObj.args.slice(8).length > 0 ){
          console.log(codeStrObj.args.slice(8))
        fakeJSON += ","+JSON.stringify(codeStrObj.args.slice(8)).slice(1,-1);
        }
        fakeJSON+=")\n" ;  
      } else if( codeStrObj.method === "rectXY" ||
                // codeStrObj.method === "rect" ||
                 codeStrObj.method === "triangle" ){
        fakeJSON+="."+codeStrObj.method+"("
        fakeJSON+=codeStrObj.args[0]+",";;
        fakeJSON+=codeStrObj.args[1]+",";;
        fakeJSON+=codeStrObj.args[2];
        if( codeStrObj.args.slice(3).length > 0 ){
          console.log(codeStrObj.args.slice(3))
          fakeJSON+=","+JSON.stringify(codeStrObj.args.slice(3)).slice(1,-1);
        }
        fakeJSON+=")\n" ;   
      } else if ( codeStrObj.method === "action" ) {
        fakeJSON+="."+codeStrObj.method+"(";
        fakeJSON+="'" + codeStrObj.args[0] + "'";
        fakeJSON+=","+codeStrObj.args[1];
        fakeJSON+=")\n" ; 
      } else {
        console.log(codeStrObj)
        fakeJSON += "." +codeStrObj.method +"("+JSON.stringify(codeStrObj.args).slice(1,-1)+")\n" ;
      }
      return fakeJSON;
    }
    testAsDownQuoteBox(list, quoteBox, moveCallback, editItem ){
        let triangleObj = this.calculateTriangleObject(quoteBox,list.length);
        let nm = new MenuThis( this,"tempQuoteBox" )
        .clear()
        .setTextColor(quoteBox.textColor)
        .setTextSize(quoteBox.textSize)
        .rectXY(quoteBox.x-15, quoteBox.y-7  , quoteBox.width, quoteBox.height, quoteBox.bgColor )
        .css("borderRadius", "6px")
        .triangle(
          triangleObj.x + quoteBox.x, 
          triangleObj.y + quoteBox.y, 
          triangleObj.width, 
          triangleObj.height , 
          triangleObj.dir, 
          quoteBox.bgColor
        )
        .textXY( 'M', quoteBox.x + 60  ,  quoteBox.y)
        .action('onmousedown',() => nm.move(moveCallback) )
        .textXR( 'X', quoteBox.x+45,  quoteBox.y)
        list.forEach( (v, i) => {
          let x = quoteBox.x;
          let y = quoteBox.y + i * quoteBox.spacingV;
          if(  v.x  || v.x === 0 ) {
            x = v.x + quoteBox.x;
            y = v.y + quoteBox.y;
          }
          if(v.method ==='rect') {
            nm[v.method](x, y,v.width,v.height,v.color, -1, () => editItem(i,'Edit'));
          } else if (v.method ==='img') {
            nm[v.method](v.text, x, y, () => editItem(i,'Edit'),v.width,v.height);
          } else {
            nm[v.method](v.text, x, y, () => editItem(i,'Edit')) 
          }
        }
      );
    }
    createMenuBox(list, quoteBox, menuDir = 'down'){
        let createFromList = []
        this.myClass = quoteBox.myClass;
        createFromList.push({
          method: "setTextColor", 
          args: [ 
            quoteBox.textColor
          ]
        });
        createFromList.push({
          method: "setTextSize", 
          args: [ 
            quoteBox.textSize
          ]
        });
        createFromList.push({
          method: "textXY", 
          args: [ 
            quoteBox.myClass+quoteBox.name, 
            'x-5', 
            'y-20'
          ]
        });
        createFromList.push({
          method: "rectXY", 
          args: [ 
            'x-15', 
            'y-7', 
            quoteBox.width, 
            quoteBox.height, // list.length*18+20,
            quoteBox.bgColor
          ]
        });
        createFromList.push({
          method: "css", 
          args: [
            "borderRadius", 
            "6px"
          ]
        });
        if( quoteBox.trianglePos !== 'none') {
          const triangleObj = this.calculateTriangleObject(quoteBox,list.length);
          createFromList.push({
            method: "triangle", 
            args: [
              'x+'+triangleObj.x, 
              'y+'+triangleObj.y, 
              triangleObj.width, 
              triangleObj.height, 
              triangleObj.dir, 
              quoteBox.bgColor
            ]
          });
        }
        createFromList.push({
          method: "textXR", 
          args: [ 
            "X",
            'x+45', 
            'y-20', 
          ]
        });
        createFromList.push({
          method: "textXY", 
          args: [ 
            "M",
            'x+60', 
            'y-20',
          ]
        });
        createFromList.push({
          method: "action", 
          args: [ "onmousedown", "() => mn.move()"]});
        list.forEach( (v, i) => {
          let x = menuDir === 'right' ? 0 + i * quoteBox.spacingH : 0;
          let y = menuDir === 'down' ? 0 + i * quoteBox.spacingV : 0;
          if( v.x  || v.x === 0 ) {
            x = v.x;
            y = v.y;
          }
          if(v.method === 'rect') {
            createFromList.push({
            method: v.method, 
            args: [
              v.text, 
              'x+'+x, 
              'y+'+y,
              v.width,
              v.height,
              v.color,
              -1,
              "() => m.editElementMenu(event,'"+quoteBox.myClass+quoteBox.name+"',"+Math.random()+")"
            ]
            })
          } else if(v.method === 'img' ) {
            createFromList.push({
              method: v.method, 
              args: [
                v.text, 
                'x+'+x, 
                'y+'+y,
                "() => m.editElementMenu(event,'"+quoteBox.myClass+quoteBox.name+"',"+Math.random()+")",
                v.width,
                v.height
              ]
            })
          } else {
            createFromList.push({
            method: v.method, 
            args: [
              v.text, 
              'x+'+x, 
              'y+'+y,
              "() => m.editElementMenu(event,'"+quoteBox.myClass+quoteBox.name+"',"+Math.random()+")"
            ]
            })
          }
        });
        
        this.createCode(createFromList, quoteBox.myClass+quoteBox.name, quoteBox.x, quoteBox.y);
        
    }
    calculateTriangleObject(quoteBox, len){
        console.log(quoteBox, len)
        let triangleObject = {x: 0, y: 0, height:40 , width:65, dir: 'right'};
        switch (quoteBox.trianglePos){
            case 'top':
                triangleObject.dir = 'up'
                triangleObject.x = quoteBox.offset;
                triangleObject.y = -27;
                triangleObject.width = 15;
                triangleObject.height = 20;
                break;
            case 'left':
                triangleObject.dir = 'left'
                triangleObject.x = - 34;
                triangleObject.y = quoteBox.offset;
                triangleObject.width = 20;
                triangleObject.height = 15;
                break;
            case 'bottom':
                triangleObject.dir = 'down'
                triangleObject.x = quoteBox.offset;
                if(quoteBox.dir === 'down'){
                   triangleObject.y = quoteBox.height - 7;
                } else {
                   triangleObject.y = quoteBox.height - 7;
                }
                triangleObject.width = 15;
                triangleObject.height = 20;
                break;
            case 'right':
                triangleObject.dir = 'right'
                if(quoteBox.dir === 'down'){
                   triangleObject.x = quoteBox.width-15;
                }else{
                   triangleObject.x = len * quoteBox.width+13;
                }
                triangleObject.y = quoteBox.offset;
                triangleObject.width = 20;
                triangleObject.height = 15;
                break;
        }
        console.log("triangleObject: ", triangleObject)
        return triangleObject;
        
    }
    testAsRightQuoteBox(list, quoteBox, callback, editItem) {
        let triangleObj = this.calculateTriangleObject(quoteBox,list.length);
        let mn = new MenuThis( this, "tempQuoteBox" )
        .clear()
        .setTextColor(quoteBox.textColor)
        .setTextSize(quoteBox.textSize)
        .rectXY(quoteBox.x-15, quoteBox.y-7  , quoteBox.width, quoteBox.height, quoteBox.bgColor )
        .css("borderRadius", "6px")
        .textXY( 'M', quoteBox.x-35  ,  quoteBox.y-20)
        .action('onmousedown',() => mn.move(callback) )
        .textXR( 'X', quoteBox.x-10,  quoteBox.y-20)
        if( quoteBox.trianglePos !== 'none') {
          mn.triangle(
            triangleObj.x + quoteBox.x, 
            triangleObj.y + quoteBox.y, 
            triangleObj.width, triangleObj.height , 
            triangleObj.dir, quoteBox.bgColor 
        )
       }
        list.forEach( (v, i) => {
          let x = quoteBox.x + i * quoteBox.spacingH;
          let y = quoteBox.y ;
          if(  v.x  || v.x === 0 ) {
            x = v.x + quoteBox.x;
            y = v.y + quoteBox.y;
          }
          if(v.method ==='rect') {
            mn[v.method](x, y,v.width,v.height,v.color, 0, () => editItem(i,'Edit'));
          } else if (v.method ==='img') {
            mn[v.method](v.text, x, y, () => editItem(i,'Edit'),v.width,v.height);
          } else {
            mn[v.method](v.text, x, y, () => editItem(i,'Edit')) 
          }
        });
    }
    createRightQuoteBox(list, quoteBox){
        let createFromList = []
        this.myClass = quoteBox.myClass;
        createFromList.push({
          method: "setTextColor", 
          args: [ quoteBox.textColor]
        });
        createFromList.push(
          {
            method: "setTextSize", 
            args: [ quoteBox.textSize]
          });
        createFromList.push({
          method: "textXY", 
          args: [ 
            quoteBox.myClass+quoteBox.name, 
            quoteBox.x+5, 
            quoteBox.y-20
          ]
        });
        createFromList.push({
          method: "rectXY", 
          args: [
            quoteBox.x-15, 
            quoteBox.y-7  , 
            quoteBox.width, // (list.length*quoteBox.width+30), 
            quoteBox.height, 
            quoteBox.bgColor
          ]
        });
        createFromList.push({method: "css", 
                             args: ["borderRadius", "6px"]});
        //createFromList.push({method: "action", 
                             //args: ['onclick',() => m.evalAsJS('Options.Menu')]}));
        createFromList.push({method: "triangle", 
                             args: [quoteBox.x+quoteBox.offset , quoteBox.y-29 , 15 , 25 , "up", quoteBox.bgColor]});
        createFromList.push({method: "textXR", 
                             args: [ "X",quoteBox.x-10 , quoteBox.y-20 ]});
        createFromList.push({
          method: "textXY", 
          args: [ "M",quoteBox.x-45 , quoteBox.y-20]});
        createFromList.push({
          method: "action", 
          args: [ "onmousedown", "() => mn.move()"]});
        list.forEach( (v, i) => {
          let x = quoteBox.x + i * quoteBox.spacingH;
          let y = quoteBox.y;
          if(  v.x  || v.x === 0 ) {
            x = v.x + quoteBox.x;
            y = v.y + quoteBox.y;
          }
          createFromList.push({
            method: v.method, 
            args: [
              v.text, 
              x, 
              y,
              "() => m.editElementMenu(event,'"+quoteBox.myClass+quoteBox.name+"',"+Math.random()+")"
            ]
          })
        });
        this.createCode(createFromList, quoteBox.myClass+quoteBox.name, quoteBox.x, quoteBox.y);
        
    }
    createCode(codeArray = this.tempMenuArray, fname = this.method, x = null, y = null){
        //let fname = this.method;
        //let menuArrJSON = JSON.stringify( codeArray );
        let rx = x;
        let ry = y;
        if( x === null){
            rx = document.getElementById(this.myClass).style.left.slice(0,-2);
            ry = document.getElementById(this.myClass).style.top.slice(0,-2);
        }
        let fakeJSON =  "///<pre>\n";
        fakeJSON +=  "///"+fname+"\n";
        fakeJSON +=  "((x, y) => {\n";
        fakeJSON += '  let m = new MenuMaker()\n';
        fakeJSON += '  let mn = new MenuThis( m, "'+this.myClass+'")\n';
        fakeJSON += '  mn\n'
        fakeJSON += '    .clear()\n'
        for( let i = 0; codeArray[i] != null; i++){
            console.log(codeArray[i]);
            fakeJSON+='    '+this.codeStrObjToString(codeArray[i], rx, ry);
        }
        fakeJSON += "})("+rx+","+ry+");"
        new Note( fname, 100 ,100 ).create(fakeJSON, codeArray.length+12,100).visible(true);
        eval(fakeJSON);
    }
}



