class Loader{
    constructor( myDoc = document ){
      this.myDoc = myDoc;
    }
    setMyDoc( newDoc = document ) {
      this.myDoc = newDoc;
    }
    listOptions() {
      console.log(this);
    }
    loadTA(textArea = null){
      let taText = new Runner().returnValue(textArea)
      let myScr = this.myDoc.createElement('script')
      myScr.type = 'text/javascript'
      myScr.innerHTML = taText
      this.myDoc.body.appendChild(myScr)  
    }
    loadHTML(textArea = null){
      let htmlText =  new Runner().returnValue(textArea)
      this.myDoc.body.innerHTML = htmlText 
    }
    addHTML(textArea = null){
      let htmlText =  new Runner().returnValue(textArea)
      this.myDoc.body.innerHTML += htmlText 
    }
    loadStyle(textArea = null){
      let styleText =  new Runner().returnValue(textArea)
      let myStyle = this.myDoc.createElement('style')
      myStyle.setAttribute('type', "text/css")
      myStyle.innerHTML = styleText
      this.myDoc.body.appendChild(myStyle) 
    }
    //https://maxcdn.bootstrapcdn.com/bootswatch/3.3.6/cosmo/bootstrap.min.css
    loadFakeBARS(){   
      this.loadScript('sJAVA/myFrameWorks/FakeBARS.js')
    }
    loadFakeBARSobj(){   
      this.loadScript('sJAVA/myFrameWorks/FakeBARSobj.js')
    }
    loadDataBARS(){   
      this.loadScript('sJAVA/myFrameWorks/DataBARS.js')
    }
    loadAframe() {
      // https://aframe.io/releases/0.5.0/aframe.min.js
      this.loadScript("https://aframe.io/releases/0.8.0/aframe.min.js");
      // this.loadScript("//cdn.rawgit.com/donmccurdy/aframe-extras/v4.1.2/dist/aframe-extras.min.js");
      setTimeout(() => console.log('Aframe Loaded-', window), 200)
    }
    loadSass(){   
      //this.loadScript('http://cdn.foundation5.zurb.com/foundation.js')
      this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/sass.js/0.10.6/sass.min.js')
    }
    loadSass6_3(){   
      //this.loadScript('http://cdn.foundation5.zurb.com/foundation.js')
      this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/sass.js/0.6.3/sass.min.js')
    }
    loadMustache(){   
      this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/mustache.js/2.3.0/mustache.js')
    }
    loadLodash() {
      this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.4/lodash.min.js')
    }
    loadJquery(){
      this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.js')
    }
    loadPopper(){
      this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js')
    }
	  loadHighlight(){
			let myStyle = this.myDoc.createElement('link')
      myStyle.setAttribute('rel', "stylesheet")
      myStyle.href = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/default.min.css';
      this.myDoc.body.appendChild(myStyle) 
      this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/highlight.min.js');
			console.log('HighlightLoaded')
    }
    loadBootstraps(){
      this.loadScript('https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/js/bootstrap.min.js')
    }
    loadBootstrapsCSS(){
      let myStyle = this.myDoc.createElement('link')
      myStyle.setAttribute('rel', "stylesheet")
      myStyle.href = 'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0/css/bootstrap.css'
      //myStyle.href = 'sJAVA/frameWorks/bootstrap/css/bootstrap.css';
      this.myDoc.body.appendChild(myStyle) 
    }
    loadGoogleIconsCSS(){
      let myStyle = this.myDoc.createElement('link')
      myStyle.setAttribute('rel', "stylesheet")
      myStyle.href = 'https://fonts.googleapis.com/icon?family=Material+Icons';
      this.myDoc.body.appendChild(myStyle) 
      console.log(myStyle)
    }
    loadBootstrapsRCSS(){
      let myStyle = this.myDoc.createElement('link')
      myStyle.setAttribute('rel', "stylesheet")
      myStyle.href = 'sJAVA/frameWorks/bootstrap/css/bootstrap-responsive.css';
      this.myDoc.body.appendChild(myStyle) 
    }
    loadMobX(){    
			this.loadScript('./sJAVA/frameWorks/mobx5.0.3.js')
      // this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/mobx/5.0.3/mobx.js')
    }
    loadMobX_React(){    
			this.loadScript('./sJAVA/frameWorks/MobX_React5.2.5.js')
      //this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/mobx/3.2.0/mobx.js')
    }
    loadKnockout(){
      this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/knockout/3.4.2/knockout-min.js');
    }
    loadAngular(type = '1.6.5'){https://ajax.googleapis.com/ajax/libs/angularjs/1.4.0/angular.min.js
      //this.loadScript('https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular.min.js');   
      switch(type) {
        case '1.6.5':
			    this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.6.5/angular.js');
          break;
        case 'dev':
          this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/angular.js/2.0.0-alpha.33/angular2.dev.js');
          break;
      }
    }
    loadBacon(){
      this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/bacon.js/2.0.5/Bacon.min.js');
      //this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/bacon.js/0.7.95/Bacon.js');
    }
    loadBackbone(){
      this.loadScript('http://backbonejs.org/backbone.js');
    }
	  loadBackboneLocalStorage(){
      this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/backbone-localstorage.js/1.1.16/backbone.localStorage.js');
    }
    loadD3() {
      this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/d3/4.13.0/d3.js')
      setTimeout( _ => console.log(`D3-loaded\n`, {d3: d3}), 300);
    }
    loadHandlebars(){
      this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.0.10/handlebars.js');
    }
    loadWebComponents () {
      this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/1.1.1/custom-elements-es5-adapter.js');
      //this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/0.7.21/webcomponents.js');
      setTimeout ( () =>
        console.log("WebComponents Loaded", WebComponents),
        200
      );
    }
	  loadVue(){
      this.loadScript('https://unpkg.com/vue');
    }
    loadVueRouter(){
      this.loadScript('https://unpkg.com/vue-router/dist/vue-router.js');
    }
	  loadRiot() {
			this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/riot/3.7.4/riot+compiler.min.js');
			console.log("Riot Loaded");
    }
		loadRiotRouter() {
			this.loadScript('https://cdn.jsdelivr.net/npm/riot-route@x.x.x/dist/route.min.js');
			console.log("Riot Router Loaded");
    }
    loadUnderscore(){
      this.loadScript('http://underscorejs.org/underscore.js');
    }
    loadImmutable(){   
      this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/immutable/3.8.2/immutable.js');
    }
    loadRxJS(){   //https://cdnjs.cloudflare.com/ajax/libs/rxjs/5.4.3/Rx.js
      //this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/rxjs/5.5.5/Rx.js');
      this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/rxjs/5.5.8/Rx.js');
      setTimeout( _ => console.log(`RxJS-loaded\n`, {Rx: Rx}), 300);
    }
    loadRxJSmap(){
      this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/rxjs/5.4.3/Rx.js.map');
      setTimeout( _ => console.log(`RxJS-loaded\n`, {RxJSmap: window}), 300);
    }
    loadRxJScomplete(){
      this.loadScript("http://cdnjs.cloudflare.com/ajax/libs/rxjs/2.2.26/rx.js");
      this.loadScript("http://cdnjs.cloudflare.com/ajax/libs/rxjs/2.2.26/rx.async.js");
      this.loadScript("http://cdnjs.cloudflare.com/ajax/libs/rxjs/2.2.26/rx.coincidence.js");
      this.loadScript("http://cdnjs.cloudflare.com/ajax/libs/rxjs/2.2.26/rx.binding.js");
      this.loadScript("http://cdnjs.cloudflare.com/ajax/libs/rxjs/2.2.26/rx.time.js");
      this.loadScript("http://cdnjs.cloudflare.com/ajax/libs/rxjs-dom/2.0.7/rx.dom.js")
    }
    loadRedux(){
      this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/redux/3.7.2/redux.js')
    }
    loadReactJest(){
      console.log('no jest')
    }
    loadReactRedux(){
      this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/react-redux/5.0.6/react-redux.js')
    }
    loadReduxRouter(){
      this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/redux-router/2.1.2/redux-router.js')
    }
    loadReactRouterRedux(){
      this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/react-router-redux/4.0.8/ReactRouterRedux.js')
    }
    loadReactWithAddons(){
      this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/react/15.6.1/react-with-addons.js')
    }
    loadReactServer(){
      this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/react/15.6.1/react-dom-server.js')
    }
    loadReact( type = 'dev'){
			switch ( type ) {
			  case 'myFile' :
		    	this.loadScript("sJAVA/frameWorks/react.js")
          this.loadScript("sJAVA/frameWorks/react-dom.js")
					break;
				case 'dev-myFile' :
					this.loadScript("sJAVA/frameWorks/react.development.js")
          this.loadScript("sJAVA/frameWorks/react-dom.development.js")
					break;
		  	case 'dev' :
			    this.loadScript('https://unpkg.com/react@latest/umd/react.development.js')
          setTimeout( () =>
            this.loadScript('https://unpkg.com/react-dom@latest/umd/react-dom.development.js'), 
          300);
				  break;
        case 'dev-16' :
          this.loadScript('https://unpkg.com/react@16/umd/react.development.js');
          setTimeout( () =>
            this.loadScript('https://unpkg.com/react-dom@16/umd/react-dom.development.js'), 
          300);
          break;
        case 'dev-next' :
          this.loadScript('https://unpkg.com/react@next/umd/react.development.js');
          setTimeout( () =>
            this.loadScript('https://unpkg.com/react-dom@next/umd/react-dom.development.js'), 
          300);
          break;
				case '16.2.0' :
			    this.loadScript('https://unpkg.com/react@16.2.0/dist/react.js');
          setTimeout( () =>
            this.loadScript('https://unpkg.com/react-dom@16.2.0/dist/react-dom.js'), 
          300);
				  break;
        case '16.3.0' :
			    this.loadScript('https://unpkg.com/react@16.3.0/dist/react.js');
          setTimeout( () =>
            this.loadScript('https://unpkg.com/react-dom@16.3.0/dist/react-dom.js'), 
          300);
				  break;
		  	case '15.6.1' :
          this.loadScript('https://unpkg.com/react@15.5.1/dist/react.js');
          setTimeout( () =>
            this.loadScript('https://unpkg.com/react-dom@15.6.1/dist/react-dom.js'), 
          300);
			    break;
			}
      setTimeout( _ => console.log(`React-${type}-loaded\n`, {React: React}, {ReactDOM: ReactDOM}), 700);
      this.loadBabel();
    }
	  loadXTag( type = 'core'){
			      //this.loadScript("sJAVA/frameWorks/babel.js")
			    this.loadScript('https://unpkg.com/babel-standalone@latest/babel.min.js')
			switch ( type ) {
			  case 'core' :
		    	this.loadScript("https://cdnjs.cloudflare.com/ajax/libs/x-tag/1.5.11/x-tag-core.js")
					break;
				case 'no-poly' :
					this.loadScript("https://cdnjs.cloudflare.com/ajax/libs/x-tag/1.5.11/x-tag-no-polyfills.js")
					break;
		  	case 'core-poly' :
			    this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/x-tag/1.5.11/x-tag-core-with-shadowdom.js')
				  break;
			}
      setTimeout( _ => console.log('XTag-${type}-Loaded:', xtag), 500);
    }
    loadBabel(){
      //this.loadScript('https://unpkg.com/babel-standalone@latest/babel.min.js')
      //this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.26.0/babel.min.js')
      //this.loadScript('https://unpkg.com/babel-standalone@6/babel.min.js')
			this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.26.0/babel.js');
      setTimeout( _ => {
        console.log(`Babel-loaded\n`, {Babel: Babel})
      }, 1500);
    }
    loadScript(scrpt){
      let myScr = this.myDoc.createElement('script')
      myScr.type = 'text/javascript'
      myScr.src = scrpt
      this.myDoc.body.appendChild(myScr)
    }
}
