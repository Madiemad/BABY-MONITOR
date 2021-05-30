obj=[];
alarm="";
status=false;
function preload(){
    alarm=loadSound("./mixkit-sound-alert-in-hall-1006.wav");
}
function setup(){
    canvas=createCanvas(600,400);
    canvas.position(350,200);
    camcam=createCapture(VIDEO);
    camcam.hide();
    coco=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("stat").innerHTML="STATUS: IT'S YOUR PROBLEM I AM STILL LOADING";
}
function modelLoaded(){
    alert("THESE ARE DEVELOPERS EFFORTS THAT MODEL LOADED");
    status=true;
}

function gotResult(error,results){
    if(error){
        console.log("IT'S AGAIN YOUR PROBLEM THAT I HAVE AN ERROR! YOU WILL NOT REMEMBER IF I TELL YOU THE RESULT "+error);
    }else{
        obj=results;
        console.log(results);
    }
}
function draw(){
    image(camcam,0,0,600,400);
    r=random(255);
    g=random(255);
    b=random(255);
    if(status != false){
        coco.detect(camcam,gotResult);
        for(var i=0; i<obj.length;i++){
            
            fill(r,g,b);
            $("#stat").html("STATUS: DEVELOPER'S EFFORTS ONLY!");
            conf=floor(obj[i].confidence*100);
            text(obj[i].label+" "+ conf+"%",obj[i].x+15,obj[i].y+15);
            noFill();
            stroke(r,g,b);
            rect(obj[i].x,obj[i].y,obj[i].width,obj[i].height);
                    if(obj[i].label == "person"){
                $("#nob").html("BABY IS DETECTED");
                alarm.stop();
            }else if(obj[i].label != "person"){
                $("#nob").html("BABY IS NOT DETECTED");
                if(alarm.isPlaying() == false){
                    alarm.play();
                }
            }
        }

            else if(obj.length < 0 || obj.length == 0){
                $("#nob").html("BABY IS NOT DETECTED");
                if(alarm.isPlaying() == false){
                    alarm.play();
                }
            }
    }   
}
