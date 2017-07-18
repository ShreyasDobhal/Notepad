var canvas;
var thumb;
var info;
var data=[];
data[0]="This is a simple Text Editor Application,which helps in creating Notes easily.<br> This project was created as a part of MNNIT's tech fest AVISHKAR Under the event Cyber Quest";
data[1]="Like any other text editor, it can be used to create any text/ data file. <br>That can be .html Webpage, .c .cpp .java .js or other program files or may be a simple .txt text file.";
data[2]="By default an untitled window opens.<br>You can edit it and Save it, or you can also open a previously saved file or other text file.";
data[3]="For parallel working and multi tasking, you can even create a new window";
data[4]="You can CUT COPY PASTE matter as usual";
data[5]="Find and Replace option helps in replacing a specified word by a desired one.";
data[6]="Current time and date can be appended to the file";
data[7]="font type, font color and size can be changed as desired";
data[8]="made by Shreyas Dobhal<br>ECE 2nd Year";
var timer=50;
var count=0;
var index=0;
var bubbles=[];

function windowResized() {
    for (var i=0;i<bubbles.length;i++) {
        bubbles[i].x=map(bubbles[i].x,0,width,0,windowWidth);
        bubbles[i].y=map(bubbles[i].y,0,height,0,windowHeight);
    }
    resizeCanvas(windowWidth,windowHeight);
}

function setup() {
    canvas=createCanvas(windowWidth,windowHeight);
    canvas.parent("#document");
    thumb=createImg("Thumbnail.png");
    thumb.style("width","250");
    thumb.style("height","350");
    thumb.position(50,120);
    info=createP(data[index]);
    info.position(350,120);
    info.mouseOver(textRead);
    info.mouseOut(textRun);
    info.mousePressed(textChange);
    for (var i=0;i<100;i++) {
        bubbles[i]=new Bubble();
    }
}

function draw(){
    background(250);
    if (count>=timer) {
        index++;
        if (index>=data.length) {
            index=0;
        }
        info.html(data[index]);
        count=0;
    }
    if (count!=-1) {
        count++;
    }
    drawBackground();
}

function textRead() {
    count=-1;
}

function textRun() {
    count=0;
}

function textChange() {
    index++;
    if (index>=data.length) {
        index=0;
    }
    info.html(data[index]);
    count=-1;
}


function drawBackground() {
    for (var i=0;i<bubbles.length;i++) {
        bubbles[i].show();
        bubbles[i].repel();
        bubbles[i].drag();
    }
}

function Bubble() {
    this.x=random(width);
    this.y=random(height);
    this.rad=random(10,40);
    this.speed=p5.Vector.random2D();
    this.speedStore=createVector(this.speed.x,this.speed.y);
    this.acc=createVector(0,0);
    this.repelling=false;
    this.show = function() {
        this.x+=this.speed.x;
        this.y+=this.speed.y;
        if (this.x<0) {
            this.x=1;
            this.speed.x*=-1;
        }
        if (this.x>width) {
            this.x=width-1;
            this.speed.x*=-1;
        }
        if (this.y<0) {
            this.y=1;
            this.speed.y*=-1;
        }
        if (this.y>height) {
            this.y=height-1;
            this.speed.y*=-1;
        }
        fill(50,100,200,100);
        ellipse(this.x,this.y,2*this.rad,2*this.rad);
    }
    this.repel = function() {
        if (dist(this.x,this.y,mouseX,mouseY)<this.rad+50) {
            this.acc.x=-(mouseX-this.x);
            this.acc.y=-(mouseY-this.y);
            var mod = this.acc.x*this.acc.x + this.acc.y*this.acc.y;
            mod=sqrt(mod);
            this.acc.x/=mod;
            this.acc.y/=mod;
            this.speed.x+=this.acc.x;
            this.speed.y+=this.acc.y;
            this.repelling=true;
        }
    }
    this.drag = function() {
        var mod = this.speed.x*this.speed.x + this.speed.y*this.speed.y;
        mod=sqrt(mod);
        this.speed.x=lerp(this.speed.x,this.speed.x/mod,0.05);
        this.speed.y=lerp(this.speed.y,this.speed.y/mod,0.05);
    }
}