class MultiNote {
  constructor(textArea = 'Code', noteFamily = null ){
    this.textArea = document.getElementById('textArea' + textArea );
    this.notes = [];
    this.id = this.textArea.id;
    this.textArea.noteFamily = noteFamily !== null ? noteFamily : textArea;
    this.noteFamily = noteFamily !== null ? noteFamily : textArea; //this.textArea.noteFamily
    this.textArea.clearMultiMenus = this.clearMenus.bind(this);
    this.addNote(this.textArea);
  }
  saveProject(){
    let elementsDATA = [];
    this.notes.forEach( (note) => {
      elementsDATA.push(new Note().logDATAformTextarea(note) );
    });
    let elementsJSONtext = JSON.stringify(elementsDATA)
    console.log('JSON:', elementsJSONtext)
    //SaveToFile
    new Files(this)
      .setFileExtension('.JSONproject')
      .saveFile( elementsJSONtext, "MakeNewName.JSONproject");
  }
  moveCurrentTabUp() {
    const currentIndex = this.notes.findIndex( (n) => n.id === this.textArea.id );
    console.log(currentIndex);
    if( currentIndex > 0 ) {
      [this.notes[currentIndex - 1], this.notes[currentIndex] ]=
        [this.notes[currentIndex], this.notes[currentIndex - 1] ];
    }
    this.showAllNoteTabs();
  }
  moveCurrentTabDown() {
    const currentIndex = this.notes.findIndex( (n) => n.id === this.textArea.id );
    console.log(currentIndex);
    if( currentIndex < (this.notes.length -1) )  {
      [this.notes[currentIndex + 1], this.notes[currentIndex] ]=
        [this.notes[currentIndex], this.notes[currentIndex + 1] ];
    }
    this.showAllNoteTabs();
  }
  sortNotesByName( direction = 'up') {
    this.notes.sort( (a, b) => {
      if( a.id.slice('textArea'.length) > b.id.slice('textArea'.length)) {
        return 1;
      }
      if( a.id.slice('textArea'.length) < b.id.slice('textArea'.length)) {
        return -1;
      }
    });
    this.showAllNoteTabs();
  }
  sortNotesByNameLength( direction = 'up') {
    this.notes.sort( (a, b) => {
      if( a.id.length > b.id.length ) {
        return 1;
      }
      if( a.id.length < b.id.length ) {
        return -1;
      }
    });
    this.showAllNoteTabs();
  }
  sortNotesBySize( direction = 'up') {
    this.notes.sort( (a, b) => {
      if( a.value.length > b.value.length ) {
        return -1;
      }
      if( a.value.length < b.value.length ) {
        return 1;
      }
    });
    this.showAllNoteTabs();
  }
  clearMenus(clear = true) {
    new MenuThis(null,'AddNote'+this.noteFamily).clear()
    new MenuThis(null, 'TabsMenu'+this.noteFamily).clear()
    //  new MenuThis(null,'AddNote'+this.noteFamily).clear()
    //  new MenuThis(null, 'TabsMenu'+this.noteFamily).clear()
    if( clear ) {
      this.textArea.menuExtend = null;
      this.notes.forEach( (note) => {
        note.menuExtend = null
        note.style.visibility = null
      })
    }
  }
  addMenu(){
    let x = 55, y = 62
    if(this.textArea !== null){
      x = (parseInt(this.textArea.style.left.slice(0,-2)) - 75)
      y = (parseInt(this.textArea.style.top.slice(0,-2)) - 30)
    }
    // console.log('addMenu:noteFamily:', this.noteFamily, this.textArea.noteFamily);
    new MenuThis(null,'AddNote'+this.noteFamily) //this.textArea.noteFamily
      .clear()
      .setBGcolor('cyan')
      .btnR( 'X' , x+50, y + 5 , () => this.clearMenus(), 15, 15, "Cr,TC")
      .icon('add' , x   , y   , () => this.selectNoteToAdd(x,y+20),'navy',20)
      .icon('launch', x +300, y +5 , () => this.peelNote(20,40), 'navy',24 )
      .icon('sort', x +350, y +5 , () => this.sortNotesByName(), 'navy',24 )
      .icon('sort', x +380, y +5 , () => this.sortNotesByNameLength(), 'navy',24 )
      .icon('sort', x +410, y +5 , () => this.sortNotesBySize(), 'navy',24 )
      .icon('sort', x +440, y +5 , () => this.sortNotesByName('down'), 'navy',24 )
      .icon('save', x +350, y -24 , () => this.saveProject(), 'navy',24 )
      .icon('arrow_upward', x +470, y +5 , () => this.moveCurrentTabUp(), 'navy',24 )
      .icon('arrow_downward', x +500, y +5 , () => this.moveCurrentTabDown(), 'navy',24 )
      .icon('note_add', x + 275, y + 5, () => this.spawn(), 'navy',24)
  }
  spawn(){
    let newName = this.textArea.id.slice('textArea'.length) + '.';
    let escapeHatch = 0;
    while ( document.getElementById('textArea' + newName) && escapeHatch++ < 100) {
      newName += '.'
    }
    this.addNote(
      new Note(newName).create('').textArea
    );
  }
  selectNoteToAdd(x,y){
    let notesAvailable = document.getElementsByTagName('textarea')
    notesAvailable = Array.from(notesAvailable).filter( (note) => {
      return note.menuExtend === null
      //return ( note.style.visibility !== 'hidden' && note.id !== this.id )
    })
    let mn = new MenuThis(null, 'selectNoteToAdd')
    mn.clear()
    if( notesAvailable.length > 0 ){
      mn.setBGcolor('red')
      mn.rect(x-5,y-20,80, notesAvailable.length * 20 + 20, '#cfb')
      mn.btnR('X', x, y-15, [], 12,12)
      Array.from(notesAvailable).forEach( (note, i) => {
        mn.text(
          note.id.slice('textarea'.length), 
          x,
          y + (i * 20),
          () => {
            this.addNote(note)
            this.selectNoteToAdd(x, y)
          }
        ).css('backgroundColor','lightblue')
      })
    }
  }
  addNote(note){
    if(this.textArea === null){
      this.textArea = note
    }
    if(this.textArea !== null){
      note.style.visibility = 'hidden'
      note.style.left = this.textArea.style.left
      note.style.top  = this.textArea.style.top
      note.menuExtend = () => { 
        this.showAllNoteTabs();
        this.id = note.id;
      }
      note.clearExtend = () => { 
        this.clearMenus(false);
      }
      note.noteFamily = this.noteFamily;
    }
    note.clearMenu()
    this.notes.push(note)
    this.showAllNoteTabs()
    this.textArea.style.visibility = null
    this.id = this.textArea.id
    this.textArea.oncontextmenu()
  }
  peelNote(){
    let pealNote = this.textArea
    if( this.notes.length > 1){
      let tempNotes = this.notes.filter( (n) => {
        return n.id !== this.textArea.id
      })
      this.notes = tempNotes
      this.setNoteActive(this.notes[0])
      pealNote.menuExtend = null
      pealNote.style.top = (parseInt(this.textArea.style.top.slice(0,-2)) - 23)+'px'
      pealNote.style.left = (parseInt(this.textArea.style.left.slice(0,-2)) - 30)+'px'
      pealNote.oncontextmenu()
      pealNote.style.visibility = null
    }
  }
  setNoteActive(note){
    note.style.left = this.textArea.style.left
    note.style.top = this.textArea.style.top
    this.textArea.clearMenu()
    this.textArea.style.visibility = 'hidden'
    this.textArea = note
    this.textArea.style.visibility = null
    this.id = note.id;
    this.showAllNoteTabs()
    this.textArea.oncontextmenu()
  }
  showAllNoteTabs(){
    //let numberOfLetters = 0
    const textOptions = {
      right: false,
    }
    let xOffset = 0; //myDrawingContext.measureText(this.id.slice('textArea'.lenght)).width - 60;
    const x = parseInt(this.textArea.style.left.slice(0,-2));
    const y = parseInt(this.textArea.style.top.slice(0,-2));
    // console.log(this.id)
    // const menu = new MenuThis(this,'moreRunOptions' + this.id.slice('textArea'.length)).clear();
    let mn = new MenuThis(null, 'TabsMenu'+this.noteFamily);
    mn.clear()
      .setTextSize(12)
      .rect(x - 100, y + 30,100,20* this.notes.length+10,'#cfe')// #efc
        .css('borderRadius', '3px')
    this.notes.forEach((note, i) => {
      let textColor = 'navy';
      let bGcolor = '#cde';
      let yOffset = y + 35 + 20 * i;
      let callback = () => { this.setNoteActive(note) };
      if( note.id === this.id ) {
        // ? let myOffset = xOffset;
        textColor = 'navy';
        bGcolor = 'white';
        callback = () => note.editId(x -95, yOffset);
        mn.icon('arrow_upward', x -115, yOffset -7 , () => this.moveCurrentTabUp(), 'navy',16 )
        mn.icon('arrow_downward', x -115, yOffset +7 , () => this.moveCurrentTabDown(), 'navy',16 )
      }
      mn.text(note.id.slice('textArea'.length),
        x - 95,//x + xOffset,
        yOffset,//y - 70, 
        callback,
        textColor, 
        bGcolor,
        textOptions
     )
     // var f_text = "14px Arial"
     // myTextContext.font = f_text;
     // xOffset += (myTextContext.measureText(note.id.slice('textArea'.length)).width)+15;
  })
  this.addMenu()
  }
}
//{background:white;margin-left:16px;}
//{background-image:url("sImg/note/line-numbers.png");margin-left:32px;}
class Note {
  constructor(id = Math.round(Math.random()*10000), x = 100, y = 100 ){
    this.position = {x: x, y: y};
    this.color = {
      text:       'green',
      background: 'white',
      border:     'blue',
      radius:     0,
      width:      2
    }
    //this.text = str;
    this.history = [];
    this.Id = id;
    this.textArea = document.createElement("TEXTAREA");
    this.textArea.id = 'textArea'+this.Id;
    this.textArea.value = '';
    this.textArea.menuExtend = null;
    this.textArea.clearExtend = null;
    this.textArea.noteFamily = null;
    this.textArea.editId = (x,y) => this.enterId(x,y);
    this.textArea.clearMenu = () => this.menuClear();
  }

  menu(
    x = Number(this.textArea.style.left.slice(0,-2)),
    y = Number(this.textArea.style.top.slice(0,-2))
  ){
    const iconOpts = {
      style: {
        borderRadius: '3px',
      }
    }
    this.position.x = x;
    this.position.y = y;
    const noteMenu = new MenuThis(this, 'noteMenu'+this.Id);
    noteMenu
      .clear()
      .setBGcolor('white')
      .rectXY(x-80, y-35, 80 , 70, '#cfe')// slateGrey
      .css("borderRadius", "5px")
      .rectXY( x-5 , y-30, 230,  30, '#cfe')
      .css("borderRadius", "3px")
      .text(this.Id, x-45, y-46, () => this.enterId(x-45  , y-46), null, "white")
        .css("borderRadius", "2px")
        .css('padding', '2px 6px 0px 6px')
      .btnR( 'X'     , x-25, y-25, ['']            , 15, 15, "Cr,TC")
      .textXR('o-o'  , x-25, y-10, ['minamize'])
      .setBGcolor('yellow')
      .btn( 'M<br>V' , x-50, y-25, null           , 20, 30)
        .action('onmousedown', () => noteMenu.move( (x,y) =>
          this.moveMenu(x,y)
       ,0,0,null,true) )
      .action('ontouchstart', (e) => this.moveTouch(e) )
      .setBGcolor('navy')
      .icon( 'folder', x, y-25, () => this.filesMenu(),'#cde',24,iconOpts)
      .icon( 'settings', x+25, y-25, () => this.settingsMenu(),'#cde',24,iconOpts)
      .icon( 'store', x+50, y-25, () => this.visible(false),'#cde',24,iconOpts)
      .icon( 'chevron_left', x+75, y-25, () => this.modifyCols(-5),'#cde',24,iconOpts)
      .icon( 'chevron_right',x+100, y-25, () => this.modifyCols(5),'#cde',24,iconOpts)
      .icon( 'expand_less',x+125, y-25, () => this.modifyRows(-1),'#cde',24,iconOpts)
      .icon( 'expand_more',x+150, y-25, () => this.modifyRows(1),'#cde',24,iconOpts)
      .icon( 'aspect_ratio',x+175, y-25, () => this.bigRowsCols(),'#cde',24,iconOpts)
      //.btnR( 'J'  ,x+175, y-25, ['logJSON']        , 20)
      .icon( 'note'    ,x+200, y-25, () => this.spawn(x+50, y+70),'#cde',24,iconOpts)
      .icon( 'note'    ,x+200, y-50, () => this.showLineNumbers(),'#cde',24,iconOpts)
      .setBGcolor('#cde')
      .setTextColor('navy')
      .icon('arrow_drop_down', x-75, y+10, () => this.moreRunOptions(noteMenu, x -77,y+10),'navy',20,iconOpts)
      .btn('eval', x -50, y+10, ['eval']               , 42, 16)
      // .btn('top'    , x-77, y+14, ['bringToTop']        , 22, 18)
      .icon('undo'   , x-80, y - 13 , () => this.back(),'nvay',24,iconOpts)
        .css('background',null)
      .setAttachedMenu('moreRunOptions' + this.Id)

    if( typeof this.textArea.menuExtend == 'function'){
      //console.log(this.textArea.menuExtend)
      this.textArea.menuExtend();
    }
  }
  moreRunOptions(parentMenu,x,y) {
    const iconOpts = {
      style: {
        borderRadius: '3px',
        background: 'red',
      }
    }
    const menu = new MenuThis(this,'moreRunOptions' + this.Id);
    menu
      .clear()
      .setZindex(2)
      .icon('arrow_drop_up', x + 2, y, 
        () => {
          menu.clear();
          // parentMenu.clearAttached();
        },
        'navy',20,iconOpts)
      .rect(x+25,y+18,46,100,'#cfe')
      .setBGcolor('white')
      .btn('HTML',x+27, y+20,[ 'evalAsHTML','myDiv'] , 42, 16)
      .btn('CSS', x+27, y+40, () => this.evalAsCSS(), 42, 16)  
      .btn('babel',x+27, y+60, ['evalAsBabel']        , 42, 16)
      .btn('inJS', x+27, y+80, ['injectScript']       , 42, 16)
      .btn('DeS', x+27, y+100, ['removeScript']       , 42, 16)
    //parentMenu.setAttachedMenu(menu);
  }
  settingsMenu(x = this.position.x, y = this.position.y -25){
    const settingsMenu = new MenuThis(this, 'NotesSubMenu'+this.Id);
    settingsMenu.clear()
      .setBGcolor('red')
      .btnR('X', x+28, y+5 , [''             ] , 15)
      .setTextColor(this.color.text)
      .setBGcolor(this.color.background)
      .btn('color'  , x+25 ,  y-15, ['selectTextColor']    , 45, 18)
      .btn('colob'  , x+75 ,  y-15, ['selectBGColor']     , 45, 18)
      .btn('size'   , x+125,  y-15, ['selectTextSize',  1] , 22, 18)
      .btn(''       , x+148,  y-15, ['selectTextSize', -1] , 22, 18)
      .btn('font'   , x+175,  y-15, ['selectFont'    ]    , 45, 18)
      .btn('Spell '+this.textArea.spellcheck , x+25 ,  y-45, ['toggleSpellcheck'] , 75, 18);
    }
    postProperties(x = this.position.x, y = this.position.y){
      const propertiesMenu = new MenuThis(this, "propsNotes");
      propertiesMenu
        .clear()
        .setBGcolor('white')
        .btnR("X"               ,x-4  , y-4, [""], 9 )
        .rectXY(                 x-5  , y-5, 200, 85)
        .textXY(this.Id         ,x+150, y   , ["enterId", x, y])
        .textXY('x:'            ,x+10 , y   )
        .textXY(this.position.x ,x+30 , y   )
        .textXY('y:'            ,x+10 , y+20)
        .textXY(this.position.y ,x+30 , y+20)
        .textXY('cols:'         ,x+10 , y+40)
        .textXY(this.textArea.cols,x+50 , y+40)
        .textXY('rows'          ,x+10 , y+60)
        .textXY(this.textArea.rows,x+50 , y+60)
        //.textXY('callback:'     ,x+80 , y+40, ["selectCallback", x+130, y+40])
        //.textXY(this.callback   ,x+80 , y+60)
        .setTextColor(this.color.text)
        .textXY(this.color.text      , x+80, y,['selectTextColor'])
        .setTextColor(this.color.background)
        .textXY(this.color.background, x+80, y+20,['selectBGColor']);
      if( this.textArea.style.visibility === "hidden" ){           
        propertiesMenu
          .setTextColor("red")
          .textXY("display", x+80, y+40,['setDisplay', 'on']);
      }
      else{
        propertiesMenu
          .setTextColor("green")
          .textXY("display", x+80, y+40,['setDisplay', 'off']); 
      }
    } 
    filesMenu(x = this.position.x, y = this.position.y){
      const filesMenu = new MenuThis(this, 'NotesSubMenu'+this.Id);
      filesMenu
        .clear()
        //.setBGcolor('red')
        .setTextColor(this.color.text)
        .setBGcolor("lightblue")
        .setMouseoverIsOn(true)
        .setMouseoverCallback((e) => e.target.style.backgroundColor = 'yellow')
        .setMouseoverExitCallback((e) => e.target.style.backgroundColor = 'lightblue')
        .rectXY(                 x    ,  y-5  , 100, 183 )
        .css('border-radius', '5px')
        .textXR('open.JSON'    , x+10 ,  y+10 , ['openJSON'], 60, 15)
        .textXR('saveAsId.JSON', x+10 ,  y+30 , ['saveAsIdJSON'], 60, 15)
        .textXR('save.JSON'    , x+10 ,  y+45 , ['saveJSON'], 60, 15)

        .setTextColor("teal")
        .textXR('open.JS'      , x+10 ,  y+65 , ['openJS'], 45, 15)
        .textXR('saveAsId.JS'  , x+10 ,  y+85 , ['saveAsIdJS'], 45, 15)
        .textXR('save.JS'      , x+10 ,  y+100, ['saveJS'], 45, 15)
        .setTextColor("navy")
        .textXR('save.Project' , x+10 ,  y+120, ['saveProject'], 55, 15)
        .textXR('open.Project' , x+10 ,  y+140, ['openProject'], 55, 15)
        .textXR('add.Project' , x+10 ,  y+160, ['openProject',false], 55, 15)
        .setMouseoverIsOn(false)
        .btnR( 'X'             , x+3  ,  y-33, [], 15 , 15, "CrTC")
        .setBGcolor("yellow")
        .btnR('new'            , x    ,  y-15, () => this.spawn(100,100,"",20,62) , 22, 15)
        .btnR('delete'         , x+100,  y-15, () => { 
            new MenuThis(this, 'noteMenu'+this.Id).clear();
            this.remove() 
       }, 45, 15)
        .btnR('opions'         , x+30 ,  y-15, ['sett}ingsMenu'], 45, 15);
    }
    showLineNumbers () {
      this.textArea.style.backgroundImage = 'url("./sImg/note/line-numbers.png")';
      this.textArea.style.backgroundAttachment = 'local';
      this.textArea.style.backgroundRepeat = 'no-repeat';
      this.textArea.style.paddingLeft = '30px';
      this.textArea.style.paddingTop = '12px';
      this.textArea.style.fontSize = '14px';
    }
	  toggleSpellcheck() {
	    this.textArea.spellcheck = !this.textArea.spellcheck;
			this.settingsMenu();
		}
    selectTextColor(){
        const pickColor = new Colors(this, this.position.x, this.position.y).menuLong(['setTextColor']);    
    }
    selectBGColor(){
        const pickColor = new Colors(this, this.position.x, this.position.y).menuLong(['setBGColor']);    
    }
    setTextColor(color){
        this.color.text = color;
        this.textArea.style.color = color;
        return this;
    }
    setBGColor(color){
        this.color.background = color;
        this.textArea.style.backgroundColor = color;
        return this;
    }
    setTextAreaValue(value){
        this.text = value;
        this.textArea.value = value;
        return this;
    }
    setTextAreaFamily(newFamily = null){
        this.textArea.noteFamily = newFamily;
        return this;
    }
    enterId(x, y){
        let select = new MenuThis(this, 'noteMenuID'+this.Id)
        select.clear()
              .setBGcolor('lightblue')
              .btnR(  'X', x-20 ,y , () => this.menu() , 12 ,12)
              .input(null, x   , y, (e) => this.setId(e.target.value), this.Id);
    }  
    setId(newId){
        this.remove();
        this.Id = newId;
        this.textArea.id = "textArea"+newId;
        console.log(this.textArea.id)
        this.append();
        this.menu();
    }
    border(on_off = "on"){
        console.log(this.textArea.style.border);
        //this.remove();
        if( on_off === "on"){
             this.textArea.style.border='solid';
             console.log("on", this.textArea.style.border);
        }
        else if( on_off === "off"){
             this.textArea.style.border = "none";
                console.log("off", this.textArea.style.border);
        }
        console.log( this.textArea.style.border );
        this.postProperties(20, 420);
        return this;
    }
    setDisplay(on_off = "on"){
        console.log(this.textArea.style.visibility);
        //this.remove();
        if( on_off === "on"){
             this.textArea.style.visibility = "";
             console.log("on", this.textArea.style.visibility);
        }
        else if( on_off === "off"){
             this.textArea.style.visibility = "hidden";
                console.log("off", this.textArea.style.visibility);
        }
        console.log( this.textArea.style.visibility );
        this.postProperties(20, 420);
        return this;
        //this.append();
    }
    selectTextSize(by){
        console.log(this.textArea.style.fontSize.slice(0,-2))
        this.textArea.style.fontSize = (Number(this.textArea.style.fontSize.slice(0,-2)) + by)+"px";      
    }
    selectFont(){
        
    }
    bringToTop(){
        document.body.removeChild(this.textArea);
        document.body.appendChild(this.textArea);
    }
    injectScript(){
        let scrpt = document.createElement("SCRIPT");
        scrpt.id = this.Id;
        scrpt.type="text/javascript";
        scrpt.innerHTML = this.textArea.value;
        document.body.appendChild(scrpt);
    }
    evalAsBabel(){
      let jsxToBabel = this.textArea.value;
      let babelToJS = Babel.transform(jsxToBabel, {  
        "presets": ["es2017"],
          "plugins": [
            "transform-react-jsx",
            // "transform-decorators",
            "transform-decorators-legacy",
            "transform-class-properties",
          ]}).code;
      const returnValue = eval(babelToJS);
      return {code:babelToJS, value: returnValue};
    }
    injectBabel(){
        let scrpt = document.createElement("SCRIPT");
        scrpt.id = this.Id;
        scrpt.type="text/javascript";
        let jsxTransform = Babel.transform(this.textArea.value, {  "plugins": ["transform-react-jsx"] }).code;
        console.log(jsxTransform)
        let jsxToJS = Babel.transform(jsxTransform, {  "presets": ["es2015"] }).code;
        console.log(jsxToJS);
        scrpt.innerHTML = jsxToJS;
        document.body.appendChild(scrpt);
    }
    //this doesnot work yet waiting for Chrome 61
    injectModule(){
        let scrpt = document.createElement("SCRIPT");
        scrpt.type="module";
        scrpt.id = this.Id;
        scrpt.innerHTML = this.textArea.value;
        document.head.appendChild(scrpt);
        console.log(scrpt);
    }
    removeScript(){
        let scrpt = document.body.getElementsByTagName("SCRIPT");
        console.log(scrpt.length);
        document.body.removeChild(scrpt[scrpt.length-1]);
        console.log(scrpt.length);
    }
    evalAsCSS(){
        let style = document.createElement("STYLE");
        let styleId = "CSS_INJECTION"; 
        if( document.getElementById(styleId) !== null){
            document.body.removeChild(document.getElementById(styleId))
        }
        style.id = styleId;
        style.setAttribute('type',"text/css");
        style.innerHTML = this.textArea.value ;
        document.body.appendChild(style);
    }
    evalAsHTML( divID = null){
        if(divID !== null){
            document.getElementById(divID).innerHTML = this.textArea.value;
        }
        else{
            document.body.innerHTML = this.textArea.value;
        }
        return this;
    }
    eval(){
        eval(this.textArea.value);
    }
    moveMenu(x,y){
      this.textArea.oncontextmenu();
      this.textArea.style.top = y + 35 + "px";
      this.textArea.style.left = x + 80 +  "px";
      this.position.y = y + 35;
      this.position.x = x + 80;
      this.menu();
      /*  document.onmouseup = (event) =>{
            //this.textArea.style.top = event.clientY+"px";
            //this.textArea.style.left = event.clientX+"px";
            this.position.x = event.clientX;
            this.position.y = event.clientY;
            //console.log('moved', event.clientX, event.clientY);
            document.onmousemove = null;
            document.onmousedown = null;
            //this.menu(event.clientX, event.clientY);
        }
        document.onmousemove = (event) =>{
            this.textArea.style.top = event.clientY+"px";
            this.textArea.style.left = event.clientX+"px";
            this.menu(event.clientX, event.clientY);
        }
        console.log('move')
        */
    }
    moveTouch(ev){
        const myTarget = ev.target;
        const intx = this.position.x - ev.touches[0].clientX;
        const inty = this.position.y - ev.touches[0].clientY;
        ev.preventDefault();
        //e.stopPropagation();
        //alert("touchMove")
        /*
        document.ontouchend = (e) => {
            alert("onTouchEnd:" +  e.touches[0].clientX)
            this.position.x = e.touches[0].clientX;
            this.position.y = e.touches[0].clientY;
            //console.log('moved', event.clientX, event.clientY);
            myTarget.ontouchmove = null;
            //myTarget.= null;
            //this.menu(event.clientX, event.clientY);
        };*/
        myTarget.ontouchmove = (e) => {
            e.preventDefault();
            e.stopPropagation();
            e.target.ontouchstart = null;
            //alert("onTouchMove:" +  e.touches[0].clientX)
            this.position.x = intx + e.touches[0].clientX;
            this.position.y = inty + e.touches[0].clientY;
            this.textArea.style.top =  inty + e.touches[0].clientY+"px";
            this.textArea.style.left =  intx + e.touches[0].clientX+"px";
            this.menu();
        };
        console.log('move')
    }
    minamize(){
        //this.remove();
        this.textArea.style.visibility = "hidden";
        if( this.textArea.clearExtend !== null ){
          this.textArea.clearExtend();
        }
        new MenuThis(this, "min"+this.Id).setBGcolor(this.color.background)
        //.setMouseoverIsOn(true)
        //.setMouseoverCallback(["setVisibility"])
        //console.log(this.Id.length*5);
          .setTextSize(12)
          .clear()
          .setBGcolor('white')
          .btnR(this.Id, this.position.x, this.position.y, ["setVisibility"], this.Id.length*6.3+2, 16)
    }
    setVisibility(visibility=""){
        this.textArea.style.visibility = visibility;
        this.menu();
    }
    visible(vis){
        if(vis){
            this.textArea.style.visibility = '';
        } else {
            this.textArea.style.visibility = 'hidden';
            this.menuClear();
        }
        
    }
    menuClear(){
        //console.log('menuClear',this.Id)
        new MenuThis(null, 'noteMenu'+this.Id).clear();
        new MenuThis(this,'moreRunOptions' + this.Id).clear();
    }
    bigRowsCols(by){
        if( this.textArea.cols === 80 && this.textArea.rows === 45 ){
            this.textArea.cols = 62;
            this.textArea.rows =  20;
        }
        else{
            this.textArea.cols = 80;
            this.textArea.rows =  45;
        }

    }
    littleRowsCols(by){
        this.textArea.cols = 45;
        this.textArea.rows =  15;
    }
    modifyCols(by){
        this.textArea.cols += by;
    }
    modifyRows(by){
        this.textArea.rows += by;
    }
    logToConsole(){
        //const textArea = document.getElementById("textArea");
        console.log(this.textArea.value);
    }
    logJSONxDelete(){
        //const textArea = document.getElementById("textArea");
        this.text = this.textArea.value;
        this.textArea = {  x: textArea.style.left.slice(0,-2),
                          y: textArea.style.top.slice(0,-2),
                          cols: textArea.cols,
                          rows: textArea.rows,
                          textColor: textArea.color,
                          BGcolor: textArea.backgroundColor,
                          Id: textArea.id.slice("TEXTAREA".length),
                          value: textArea.value,    
                          noteFamily: textArea.noteFamily }
        console.log(JSON.stringify(this));
        this.textArea = null;
        this.textArea = document.getElementById("textArea"+this.Id)
    }  
    append(){
        //const textArea = document.getElementById("textArea");
        document.body.appendChild(this.textArea);
        this.menu();
    }
    remove(){
        //const textArea = document.getElementById("textArea");
        document.body.removeChild(this.textArea);
        this.menuClear();
    }
    updateOrCreate(textValue, rows = 20 , cols = 40 ){
        let x = document.getElementById("textArea"+this.Id);
        if( x !== null){
            //document.body.removeChild(this.textArea);
            x.value = textValue
        } else {
            this.create(textValue, rows, cols)
        }
    }
    create( value = this.textArea.value, rows = 20, cols = 62 ){
        //this.Id = id;
        this.textArea.id   = "textArea"+this.Id;
        this.textArea.cols = cols;
        this.textArea.rows = rows;
        this.textArea.style.position = "absolute";
        this.textArea.style.top      = this.position.y +"px";
        this.textArea.style.left     = this.position.x +"px";
        this.textArea.style.fontSize = 12+"px"
        this.textArea.style.color    = this.color.text;
        this.textArea.style.borderStyle = "solid";
        this.textArea.style.backgroundColor = this.color.background;
        this.textArea.spellcheck = false;
        this.textArea.value = value;
        this.history.push(value);

        this.textArea.onmouseover = () => {
            if( event.shiftKey){
                this.menu();
            }
            if( event.ctrlKey){
                this.textArea.style.top  = event.clientY+"px";
                this.textArea.style.left = event.clientX+"px";
                this.position.x = event.clientX;
                this.position.y = event.clientY;
                this.menu();
            }
        };
        this.textArea.onkeypress = (e) => {
            //console.log('keyup')
            //console.log(this.history.length);
            this.history.push(this.textArea.value);
            if(this.history.length > 10){
                this.history.shift();
            }
        }/*
        this.textArea.onmousedown = (event) => {
          event.stopPropagation();
          this.bringToTop();
          this.menu()
        };*/
        this.textArea.oncontextmenu = (event) => {
            if(event && event.preventDefault) {
              event.preventDefault();
            }
            this.bringToTop();
            this.menu()
        };
        document.body.appendChild(this.textArea);
        this.menu();
        return this;
    }
    logDATAformTextarea( textArea ){
        //console.log(textArea)
        let JSONtextArea = {     
                            x: textArea.style.left.slice(0,-2),
                            y: textArea.style.top.slice(0,-2),
                            cols: textArea.cols,
                            rows: textArea.rows,
                            textColor: textArea.color,
                            BGcolor: textArea.backgroundColor,
                            Id: textArea.id.slice("TEXTAREA".length),
                            value: textArea.value,    
                            noteFamily: textArea.noteFamily
                       }
        console.log("Note.logJSONfromTextarea", textArea.noteFamily, textArea.id.slice("TEXTAREA".length))
			  return JSON.stringify(JSONtextArea);
    }
    back(){
        console.log('back')
        if(this.history.length > 1){
          this.history.pop();
          this.textArea.value = this.history[this.history.length-1];
        }
    }
    logJSON( ){
        let JSONtextArea = {     
                            x: this.position.x,
                            y: this.position.y,
                            cols: this.textArea.cols,
                            rows: this.textArea.rows,
                            textColor: this.color.text,
                            BGcolor: this.color.background,
                            Id: this.textArea.id.slice("TEXTAREA".length),
                            value: this.textArea.value,
                            noteFamily: this.textArea.noteFamily
                       }
        //console.log("Notes.createFromJSON", JSON.stringify(JSONtextArea));
        //this.createFromJSON(JSON.stringify(JSONcanvas));
        return JSON.stringify(JSONtextArea);
    }
    createFromJSON(myJSON){
        let myJSONobj = JSON.parse(myJSON);
        //console.log(myJSONobj.Id);
        return new Note(myJSONobj.Id,myJSONobj.x, myJSONobj.y)       
            .create(myJSONobj.value,myJSONobj.rows, myJSONobj.cols)
            .setBGColor(myJSONobj.BGcolor)
            .setTextColor(myJSONobj.textColor)
            .setTextAreaFamily(myJSONobj.noteFamily)
            ;
    }
    openProject( clearExisting = true){
      if( clearExisting ){
        let textareas = document.getElementsByTagName('TEXTAREA')
        while( textareas[textareas.length-1] ){

            if( typeof textareas[textareas.length-1].clearMultiMenus === 'function' ) {
                console.log(textareas[textareas.length-1].noteFamily );
                textareas[textareas.length-1].clearMultiMenus();
            }
            textareas[textareas.length-1].clearMenu();
            textareas[textareas.length-1].menuExtend = null;
            document.body.removeChild( textareas[textareas.length-1] );
        }
      }
      let results = null;
      new Files(this)
      .setAccept('.JSONproject')
      .setCallback( (x) => { 
          processResults(x) 
        if( document.getElementById('textAreaOnStartup') !== null ){
            new Runner().evalAsJS('OnStartup')
        }
      })
      .loadFile( results );
      console.clear()
      function processResults( results ){
         let elementsJSON = JSON.parse( results )
         let families = []
          families = Array.from(elementsJSON).map( (x) => {
             let newNote = new Note().createFromJSON(x);
             if( newNote.textArea.noteFamily !== null){
                 console.log(newNote.textArea.noteFamily, newNote.textArea.noteFamily)
                 return newNote
             }
          })
          families = families.sort( (a, b) => {
           if(a.textArea.noteFamily > b.textArea.noteFamily){
             return -1
           }
           if(a.textArea.noteFamily < b.textArea.noteFamily){
             return 1
           }
           return 0
         })
         //console.log(families.map((note) => note.textArea.noteFamily))

         console.log(families)
         if(families.length > 0 && families[0]){
          console.log(families[0].textArea.noteFamily);
          console.log(families[0].textArea.id.slice('textArea'.length));
          //let currentFamilyName = families[0].textArea.id.slice('textArea'.length);
          let currentFamilyName = families[0].textArea.noteFamily;
          let newNote = new MultiNote(families[0].textArea.id.slice('textArea'.length));
          console.log('before:',currentFamilyName,families[0].textArea.id.slice('textArea'.length))
          for(let i=1; i < families.length; i++){
            if(families[i] && currentFamilyName !== families[i].textArea.noteFamily) {
                newNote = new MultiNote(families[i].textArea.id.slice('textArea'.length), families[i].textArea.noteFamily);
                // currentFamilyName = families[i].textArea.id.slice('textArea'.length);
                currentFamilyName = families[i].textArea.noteFamily;
                console.log('if:',currentFamilyName,families[i].textArea.id.slice('textArea'.length))
            }
            else if (families[i] ) {
                console.log('else:', currentFamilyName,families[i].textArea.id.slice('textArea'.length))
                newNote.addNote(families[i].textArea);
            } else {
              console.log('Results Error')
            }
            // newNote.addNote(families[i].textArea.id.slice('textArea'.length));
          }
        }
      }
    }
    saveProject(){
        let elements = document.getElementsByTagName("TEXTAREA")
        let elementsDATA = [];
          Array.from(elements).forEach( (x) => {
                  if( x.id.slice(0, 'textArea'.length) === 'textArea' ) {
                      elementsDATA.push(new Note().logDATAformTextarea(x) );
                  }
              });
        let elementsJSONtext = JSON.stringify(elementsDATA)
        console.log('JSON:', elementsJSONtext)
        //SaveToFile
        new Files(this)
            .setFileExtension('.JSONproject')
            .saveFile( elementsJSONtext, "MakeNewName.JSONproject");
    }
    openJSON(){
        let results = null;
        new Files('.JSONnotes', this)
            .setCallback('createFromJSON')
            //.setAccept('.JSONnotes')
            .loadFile(results);
    }
    openJS(){
        let results = null;
        new Files(this)
            .setCallback('spawnFromFile')
            .setAccept('.js')
            .loadFile(results);
    }
    saveAsIdJSON(){
        new Files(this)
            .setFileExtension(".JSONnotes")
            .saveFile(this.logJSON(), this.Id+".JSONnotes");   
    }
    saveAsIdJS(){
        new Files(this)
            .setFileExtension(".js")
            .saveFile(this.textArea.value, this.Id+".js");   
    }
    saveJS(x = this.position.x - 60, y = this.position.y){
      const saveFile = (e) => {
        new Files(this)
          .setFileExtension(".JS")
          .saveFile(this.textArea.value, e.target.value + ".js" );
      }
      new MenuThis(null, 'EnterFileName')
        .clear()
        .rect(x-10,y -28 ,205,58,'teal')
        .menuHead('FileName: ' + this.Id+'.js', x,y +10)
        .input(null, x + 25, y + 3, saveFile)
        
    }
    saveJSON(x = this.position.x - 60, y = this.position.y) {
      const saveFile = (e) => {
        new Files(this)
          .setFileExtension(".JS")
          .saveFile(this.logJSON(), e.target.value + ".JSONnotes" );
      }
      new MenuThis(null, 'EnterFileName')
        .clear()
        .rect(x-10,y -28 ,205,58,'teal')
        .menuHead('FileName: ' + this.Id+'.JSONnotes', x,y +10)
        .input(null, x + 25, y + 3, saveFile)
        
    }
    spawnFromFile(fileText){
        return new Note(this.Id+".f",this.position.x, this.position.y)
            .create(fileText,this.textArea.rows,this.textArea.cols)
            //.setTextAreaValue(fileText)
            .setTextColor(this.color.text)
            .setBGColor(this.color.background).move();
        
        
    }
    spawnToTabs(x = this.position.x, y = this.position.y, text = this.textArea.value){
        return new Note(this.Id+".x",x, y)
            .create(text,this.textArea.rows,this.textArea.cols)
            //.setTextAreaValue(text)
            .setTextColor(this.color.text)
            .setBGColor(this.color.background);//.move();
    }
    spawn(x = this.position.x, y = this.position.y, text = this.textArea.value){
        return new Note(this.Id+".x",x, y)
            .create(text,this.textArea.rows,this.textArea.cols)
            //.setTextAreaValue(text)
            .setTextColor(this.color.text)
            .setBGColor(this.color.background);//.move();
    }
}

new Note('start',710,150).create("//<pre>\n new MultiNote('start')");
