function Colors (mythis, x = 100, y = 100){
   this.myThis = mythis;
   this.x = x;
   this.y = y;
   this.colors = [  "olive",
                    "darkGreen","green","forestGreen","lime",
                    "silver",
                    "darkSeaGreen","teal","darkCyan",
                    "darkSlateBlue","navy","blue",
                    "aquamarine","cyan",             
                    "white",
                    "#CADF3E","tan","yellow",
                    "gold","orange","coral",
                    "sienna","brown",
                    "darkRed","red","indianRed",
                    "pink","violet",
                    "magenta","darkViolet","purple"];
}
Colors.prototype.menuLong = function(callback){
       const colorsMenu = new MenuThis(this.myThis, 'colorsMenu')
        .setBGcolor('white')
        .btn( "M" , this.x-40 , this.y-20  , () => colorsMenu.move(), 16, 16, "CrS2TC")
        .btnR("X" , this.x-20 , this.y-20 , [''] , 16, 16, "S2CrTC");
        if( typeof callback === 'function'){
            console.log("Callback is of type ", typeof callback)
            for(let i = 0; this.colors[i] ; i++){
                tx = this.x + Math.floor(((i)/this.colors.length)*300);
                colorsMenu.setBGcolor( this.colors[i] )
                .btnR('',tx, this.y-25, () => callback(this.colors[i]), 8, 18);
            }
        }
        else{
            for(let i = 0; this.colors[i] ; i++){
                tx = this.x + Math.floor(((i)/this.colors.length)*300);
                colorsMenu.setBGcolor( this.colors[i] )
                        .btnR('',tx, this.y-25, [callback,this.colors[i]], 8, 18);
            }
        }
};
Colors.prototype.menuSquares = function(callback, x = this.x, y = this.y){
   const colorsMenu = new MenuThis(this.myThis, 'colorsMenu');
   this.x = x;
   this.y = y;
   var tx = x;
   var ty = y;
   colorsMenu.setTxtColor("blue").setBGcolor('white').clear()
   .textXY(callback, x+50  , y-20)
   .btn( "M" , x    , y-20 , () => colorsMenu.move(), 16, 16, "CrS2TC")
   .btnR("X" , x+25 , y-20 , [''                  ] , 16, 16, "S2CrTC")
   for( i = 0; this.colors[i] ; i++){
      tx = x + ((i)%6)*22;
      ty = y + Math.floor(((i)/6))*22;
      colorsMenu.setBGcolor( this.colors[i] )
          .btnR('', tx , ty,[callback,this.colors[i]],18,18);
    }

   return "done:";
};
Colors.prototype.menu = function(callback, x = this.x, y = this.y){
   const colorsMenu = new MenuThis(this.myThis, 'colorsMenu');
   this.x = x;
   this.y = y;
   var tx = x;
   var ty = y;
   colorsMenu.setTxtColor("blue").setBorderColor("#C0ADF3E").clear()
   .textXY(callback, x+50  , y-20)
   .btn( "M" , x    , y-20 , () => colorsMenu.move(), 16, 16, "CrS2TC")
   .btnR("X" , x+25 , y-20 , [''                  ] , 16, 16, "S2CrTC")
   for( i = 0; this.colors[i] ; i++){
      ty = y + ((i)%8)*22;
      tx = x + Math.floor(((i)/8))*50;
      colorsMenu.setBGcolor( this.colors[i] )
          .btnR(this.colors[i], tx , ty,[callback,this.colors[i]],48,18);
    }

   return "done:";
};

