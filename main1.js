// npm install pathfinding
// npm install colors


class Field {

constructor (numberofholes,height,width,hardmode) {
this.prompt = require('prompt-sync')({sigint: true});
this.hat = '^';
this.hole = 'O';
this.fieldCharacter = '░';
this.pathCharacter = '*';
this.helproute = '.';
this.height=height;
this.width=width;
this.current_i=0;
this.current_j=0;
this.hat_i=0;
this.hat_j=0;
this.hatfound = false;
this.holefound = false
this.outofbounds = false;
this.fld = new Array(this.height); 
this.sag="none"; 

this.numberofslotsavailable=this.height * this.width;
this.numberofholes=(numberofholes/100) * this.numberofslotsavailable;
this.hardmode=hardmode;

}

  

setupfield() 
{

for (var i = 0; i < this.fld.length; i++) { 
    this.fld[i] = new Array(this.width); 
} 

var h = 0; 
for (var i = 0; i < this.height; i++) { 
    for (var j = 0; j < this.width; j++) {  
        this.fld[i][j] = this.fieldCharacter ;
    } 
} 

}  //end setupfield





matrix_mapsearch(help)
{
  if(help==='help') return 'AStarFinder';
  if(help==='help1') return 'AStarFinder';
  if(help==='help2') return 'BestFirstFinder'
  if(help==='help3') return 'BreadthFirstFinder'
  if(help==='help4') return 'DijkstraFinder'
  if(help==='help5') return 'IDAStarFinder'
  if(help==='help6') return 'JumpPointFinder'
  if(help==='help7') return 'BiAStarFinder'
  if(help==='help8') return 'BiBestFirstFinder'
  if(help==='help9') return 'BiBreadthFirstFinder'
  if(help==='help10') return 'BiDijkstraFinder'

}

matrix_findroute(searchalgorithim)
{

var PF = require('pathfinding');


var grid = new PF.Grid(this.width,this.height); 
for (var i = 0; i < this.height; i++) 
{ 
    for (var j = 0; j < this.width; j++) 
    {  
        if (this.fld[i][j] === this.helproute) {this.fld[i][j]=this.fieldCharacter};

        if (this.fld[i][j] === this.hole) 
        {
           grid.setWalkableAt(j, i, false);
        } else {
           grid.setWalkableAt(j, i, true);
        }
    } 
}

this.sag=this.matrix_mapsearch(searchalgorithim);
var finder;

if(this.sag==="AStarFinder") {finder = new PF.AStarFinder();}
if(this.sag==="BestFirstFinder") {finder = new PF.BestFirstFinder();}
if(this.sag==="BreadthFirstFinder") {finder = new PF.BreadthFirstFinder();}
if(this.sag==="DijkstraFinder") {finder = new PF.DijkstraFinder();}
if(this.sag==="IDAStarFinder") {finder = new PF.IDAStarFinder();}
if(this.sag==="JumpPointFinder") {finder = new PF.JumpPointFinder();}
if(this.sag==="BiAStarFinder") {finder = new PF.BiAStarFinder();}
if(this.sag==="BiBestFirstFinder") {finder = new PF.BiBestFirstFinder();}
if(this.sag==="BiBreadthFirstFinder") {finder = new PF.BiBreadthFirstFinder();}
if(this.sag==="BiDijkstraFinder") {finder = new PF.BiDijkstraFinder();}



var path = finder.findPath(this.current_j, this.current_i, this.hat_j, this.hat_i,grid);
//console.log(path);
if( path.length===0){this.println("no route available")};

var xx;
var yy;
for (var i = 1; i < (path.length-1); i++) { 
    xx=path[i][1];
    yy=path[i][0];
    this.fld[xx][yy]=this.helproute; 
} 


}



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

  if (direction.includes('help')) {this.matrix_findroute(direction);return;}


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

println(note)
{
  process.stdout.write(note + '\n');

}

c(input) {

var colors = require('colors/safe');

if (input===this.hat) {process.stdout.write(colors.green(input));return}
if (input===this.hole) {process.stdout.write(colors.red(input));return}
if (input===this.fieldCharacter) {process.stdout.write(colors.blue(input));return}
if (input===this.pathCharacter) {process.stdout.write(colors.cyan(input));return}
if (input===this.helproute) {process.stdout.write(colors.brightYellow(input));return}

process.stdout.write(input)

}


printfield()
{
this.printwhitespace();
if (this.hatfound) {process.stdout.write('hat found' + '\n');}
if (this.holefound) {process.stdout.write('you fell down a hole' + '\n');}
if (this.outofbounds) {process.stdout.write('out of bounds' + '\n');}

process.stdout.write('search algorithim used : ' + this.sag  + '\n');


      
var line=""
for (var i = 0; i < this.height; i++) { 
    line="";
    for (var j = 0; j < this.width; j++)    { 
        //line=line + (this.fld[i][j]);
        this.c(this.fld[i][j]);
    } 
     //process.stdout.write(line + '\n');
     process.stdout.write('\n');
}  

 
 process.stdout.write('_'.repeat(this.width) + '\n');


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
this.hat_i=i;
this.hat_j=j;
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

}//end start



} //end field


//1 number of holes %  
//2 field height
//3 field width
//4 'hardmode' (2 extra holes added on up or down) or 'easymode'

 //usage : l= left, u=up, d=down,r=right  and 'help' shows possible route
//search algorithim help
//help : AStarFinder 
//help1 : AStarFinder 
//help2 : BestFirstFinder 
//help3 : BreadthFirstFinder 
//help4 : DijkstraFinder 
//help5 : IDAStarFinder 
//help6 : JumpPointFinder 
//help7 : BiAStarFinder 
//help8 : BiBestFirstFinder 
//help9 : BiBreadthFirstFinder 
//help10 : BiDijkstraFinder 


var newgame=new Field(20,10,20,"hardmode");
newgame.start();
