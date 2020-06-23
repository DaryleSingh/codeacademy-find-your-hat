class Field {

constructor (numberofholes,height,width,hardmode) {
this.prompt = require('prompt-sync')({sigint: true});
this.hat = '^';
this.hole = 'O';
this.fieldCharacter = '░';
this.pathCharacter = '*';
this.height=height;
this.width=width;
this.current_i=0;
this.current_j=0;
this.hatfound = false;
this.holefound = false
this.outofbounds = false;
this.fld = new Array(this.height); 
this.numberofslotsavailable=this.height * this.width;
this.numberofholes=(numberofholes/100) * this.numberofslotsavailable;
this.hardmode=hardmode;

}

  

setupfield() 
{

for (var i = 0; i < this.fld.length; i++) { 
    this.fld[i] = new Array(this.height); 
} 

var h = 0; 
for (var i = 0; i < this.height; i++) { 
    for (var j = 0; j < this.width; j++) {  
        this.fld[i][j] = this.fieldCharacter ;
    } 
} 

}  //end setupfield


set_extra_holes_after_certain_turns(turn)
{

if (this.hardmode==='easymode') {return;}
if (turn==='d') {this.setholes(2)};
if (turn==='u') {this.setholes(2)};

}



setfieldpoint_me_origin()
{

var i=0;
var j=0;
var hole=0;
var hatset=false;
var blankindex=0;
var listofblanks=[];

listofblanks=this.getblanks();
blankindex= Math.floor(Math.random() * listofblanks.length);
i=listofblanks[blankindex].i;
j=listofblanks[blankindex].j;
this.fld[i][j]=this.pathCharacter;
this.current_i=i;
this.current_j=j;


}  




field_is_0(i,j)

{

if (this.fld[i][j] === this.hole) 
{
  this.holefound=true;
  return true
}
return false;

}

field_is_hat(i,j)

{

if (this.fld[i][j] === this.hat)
 {
  this.hatfound = true;
  return true
  }

return false;

}

setfieldpoint_me(direction)
{

  var ii=this.current_i;
  var jj=this.current_j;

  if (direction==="d")
  {
    ii=ii + 1;
    if (ii > (this.height-1)) {this.outofbounds=true;return};
    if (this.field_is_0(ii,jj)) {return}
    this.field_is_hat(ii,jj)
    this.current_i=ii;
  }

  if (direction==="u")
  {
    ii=ii - 1;
    if (ii < 0) {this.outofbounds=true;return};
    if (this.field_is_0(ii,jj)) {return}
    this.field_is_hat(ii,jj)
    this.current_i=ii;
  }

  if (direction==="l")
  {
    jj=jj - 1;
    if (jj < 0) {this.outofbounds=true;return};
    if (this.field_is_0(ii,jj)) {return}
    this.field_is_hat(ii,jj)
    this.current_j=jj;
  }

  if (direction==="r")
  {
    jj=jj + 1;
    if (jj > (this.width-1)) {this.outofbounds=true;return};
    if (this.field_is_0(ii,jj)) {return}
    this.field_is_hat(ii,jj)
    this.current_j=jj;
  }


  this.fld[this.current_i][this.current_j] = this.pathCharacter;
  this.set_extra_holes_after_certain_turns(direction);
  
}


setfieldpoint(i,j,char)
{
  this.fld[i][j] = char
}

printwhitespace ()
{

for (var p = 0; p < 30; p++)    { 
        console.log("");
    } 

}

printfield()
{
this.printwhitespace();
if (this.hatfound) {process.stdout.write('hat found' + '\n');}
if (this.holefound) {process.stdout.write('you fell down a hole' + '\n');}
if (this.outofbounds) {process.stdout.write('out of bounds' + '\n');}

process.stdout.write('__________' + '\n');

var line=""
for (var i = 0; i < this.height; i++) { 
    line="";
    for (var j = 0; j < this.width; j++)    { 
        line=line + (this.fld[i][j]);
    } 
     process.stdout.write(line + '\n');
}  

 process.stdout.write('__________' + '\n');
}  //end printfield


getblanks()

{

var listofblanks=[];


for (var i = 0; i < this.height; i++) 
{ 
    for (var j = 0; j < this.width; j++) 
    {  
        if (this.fld[i][j] === this.fieldCharacter) 
        {
          listofblanks.push({i,j});
        } 
    } 
} 

return listofblanks;


}


setholes(numberofholes)
{

var i=0;
var j=0;
var blankindex=0;
var holesset=0;
var listofblanks=[];



while (holesset < numberofholes)
{

listofblanks=this.getblanks();
if (listofblanks.length===0) {return;}//no blanks left
blankindex= Math.floor(Math.random() * listofblanks.length);
i=listofblanks[blankindex].i;
j=listofblanks[blankindex].j;
this.fld[i][j]=this.hole; holesset++;

} //while

} //setholes



sethat()
{

var i=0;
var j=0;
var hole=0;
var hatset=false;
var blankindex=0;
var listofblanks=[];

listofblanks=this.getblanks();
blankindex= Math.floor(Math.random() * listofblanks.length);
i=listofblanks[blankindex].i;
j=listofblanks[blankindex].j;
this.fld[i][j]=this.hat;
hatset=true;


}  //hatset



start()
{


this.setupfield();
this.setfieldpoint_me_origin();
this.sethat();
this.setholes(this.numberofholes);
this.printfield();


while (!this.hatfound && !this.holefound && !this.outofbounds)
{

let direction = this.prompt('which way?');

if (direction==="x") {break;}

this.setfieldpoint_me(direction);

this.printfield();

}


}




} //end field


//1 number of holes %
//field height
//field width
//'hardmode' (2 extra holes added on up or down) or 'easymode'
var newgame=new Field(98,10,30,"hardmode");
newgame.start();
