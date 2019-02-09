class jRips {
  constructor() {
  }
  appendTagHTML(match, text){
    let matchM  = docuement.getElementsByTagName(match);
    _.map( matchM, (x) => {  
      if(x)
        if( x.id === this.Id ){
          x.innerHTML += text; 
        }
    });
  }
  appendNameHTML(match, text){
    let matchM  = document.body.getElementsByName(match);
    _.map( matchM, (x) => {  
      if(x)
        if( x.id === this.Id ){
          x.innerHTML += text; 
        }
    });
  }
  appendClassHTML(match, text){
    let matchM  = document.body.getElementsByClassName(match);
    _.map( matchM, (x) => {  
      if(x)
        if( x.id === this.Id ){
          x.innerHTML += text; 
        }
    });
  }
  modifyPropertyByTag(match, prop, how){
    let matchM  = document.getElementsByTagName(match);
    _.map( matchM, (x) => {  
      if(x)
        if( x.id === this.Id ){
          [prop] = how; 
        }
    });
  }
  modifyPropertyByName(match, prop, how){
    let matchM  = document.getElementsByName(match);
    _.map( matchM, (x) => {  
      if(x)
        if( x.id === this.Id ){
          [prop] = how; 
        }
    });
  }
  modifyPropertyByClass(match, prop, how){
    let matchM  = document.getElementsByClassName(match);
    _.map( matchM, (x) => {  
      if(x)
        if( x.id === this.Id ){
          [prop] = how; 
        }
    });
  }
  modifyCssByTag(match, prop, how){
    let matchM  = document.getElementsByTagName(match);
    _.map( matchM, (x) => {  
      if(x)
        if( x.id === this.Id ){
          [prop] = how; 
        }
    });
  }
  modifyCssByName(match, prop, how){
    let matchM  = document.getElementsByName(match);
    _.map( matchM, (x) => {  
      if(x)
        if( x.id === this.Id ){
          [prop] = how; 
        }
    });
  }
  modifyCssByClass(match, prop, how){
    let matchM  = document.getElementsByClassName(match);
    _.map( matchM, (x) => {  
      if(x)
        if( x.id === this.Id ){
          [prop] = how; 
        }
    });
  }
  removeByTag(match){
    let matchM  = document.getElementsByTagName(match);
    _.map( matchM, (x) => {  
      if(x)
        if( x.id === this.Id ){
          document.body.removeChild(x); 
        }
    });
  }
  removeByName(match){
    let matchM  = document.getElementsByName(match);
    _.map( matchM, (x) => {  
      if(x)
        if( x.id === this.Id ){
          document.body.removeChild(x); 
        }
    });
  }
  removeByClass(match){
    let matchM  = document.getElementsByClassName(match);
    _.map( matchM, (x) => {  
      if(x)
        if( x.id === this.Id ){
          document.body.removeChild(x); 
        }
    });
  }
}