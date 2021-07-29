let font,
        
fontsize = 100;
let img;
let img2;

function preload() {
// Ensure the .ttf or .otf font stored in the assets directory
// is loaded before setup() and draw() are called
font = loadFont('fonts/Cinzel-VariableFont_wght.ttf');
img = loadImage('imgs/self_img.png');
img2 = document.getElementById("hands");
}



// this class describes the properties of a single particle.
class Particle {
// setting the co-ordinates, radius and the
// speed of a particle in both the co-ordinates axes.
constructor(){
    this.x = random(0,width);
    this.y = random(0,height);
    this.r = random(1,3);
    this.xSpeed = random(-2,2);
    this.ySpeed = random(-1,1.5);
}

// creation of a particle.
createParticle1() {
    noStroke();
    fill('#b9b7bb');
    circle(this.x,this.y,this.r);
}

createParticle2() {
    noStroke();
    fill('#70706f');
    circle(this.x,this.y,this.r);
}

// setting the particle in motion.
moveParticle() {
    if(this.x < 0 || this.x > width)
    this.xSpeed*=-1;
    if(this.y < 0 || this.y > height)
    this.ySpeed*=-1;
    this.x+=this.xSpeed/2*speedfactor;
    this.y+=this.ySpeed/2*speedfactor;
}

// this function creates the connections(lines)
// between particles which are less than a certain distance apart
joinParticles(particles) {
    particles.forEach(element =>{
    let dis = dist(this.x,this.y,element.x,element.y);
    if(dis<85) {
        stroke('rgba(255,255,255,0.04)');
        // line(this.x,this.y,element.x,element.y);
    }
    });
}
}

// an array to add multiple particles
let particles = [];
let particles2 = [];

function setup() {

    var c=createCanvas(window.innerWidth, window.innerHeight*3.2);
    
    c.parent('p5Div');
    textFont(font);
    textSize(fontsize);
    textAlign(CENTER,window.innerHeight/2);
    for(let i = 0;i<width/10;i++){
        particles.push(new Particle());
        particles2.push(new Particle());
    }
}


function draw() {
    // background('#0f0f0f');
    clear();
    // textAlign(RIGHT);
    // drawWords(width * 0.25);

    // Align the text in the center
    // and run drawWords() in the middle of the canvas
    textAlign(CENTER);
    drawWords(width * 0.5);
    // image(img, width-img.width, window.innerHeight/3, img.width , img.height );
    // image(img2, width-img2.width*1.5-20, window.innerHeight-100, img2.width*1.5 , img2.height*1.5 );

    // Align the text to the left
    // and run drawWords() in the right third of the canvas
    // textAlign(LEFT);
    // drawWords(width * 0.75);
    for(let i = 0;i<particles.length;i++) {
        particles[i].createParticle1();
        particles2[i].createParticle2();
        
        particles[i].moveParticle();
        particles[i].joinParticles(particles.slice(i));
        particles2[i].moveParticle();
        particles2[i].joinParticles(particles.slice(i));
    }
    // translate(width/2, 0);
    // push();
    // // rotateZ(frameCount * 0.01);
    // // rotateX(frameCount * 0.01);
    // // rotateY(frameCount * 0.01);
    // torus(70, 20);
    // pop();
}

function drawWords(x) {



    fill(255);
    // text('ISHIKA JOSHI', x, 290);
}




let scene, camera, cloudParticles = [],composer;

function init() {
scene = new THREE.Scene();
// scene.translateX(100);
camera = new THREE.PerspectiveCamera(60,window.innerWidth / window.innerHeight,1,900);
// var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.z = 1;
camera.position.y = -10;
camera.rotation.x = 1.16;
camera.rotation.y = -0.12;
camera.rotation.z = 0.27;

let ambient = new THREE.AmbientLight('grey');
scene.add(ambient);

// let directionalLight = new THREE.DirectionalLight("black");
// directionalLight.position.set(0,0,1);
// scene.add(directionalLight);

let orangeLight = new THREE.PointLight('grey',50,450,1.7);
orangeLight.position.set(200,300,100);
scene.add(orangeLight);
// let redLight = new THREE.PointLight(0xd8547e,50,450,1.7);
// redLight.position.set(100,300,100);
// scene.add(redLight);
// let blueLight = new THREE.PointLight(0x3677ac,50,450,1.7);
// blueLight.position.set(300,300,200);
// scene.add(blueLight);
const canvas = document.querySelector('#threejsDiv');
renderer = new THREE.WebGLRenderer({canvas, alpha: true});
// renderer.position.x=5;
renderer.setSize(window.innerWidth,window.innerHeight);
// renderer2.setClearColor("#000000", 0);
scene.fog = new THREE.FogExp2('black', 0.001);
renderer.setClearColor(scene.fog.color);
document.body.appendChild(renderer.domElement);
        var geometry = new THREE.SphereGeometry(1, 0,0);
var material = new THREE.MeshBasicMaterial(
    // { map: texture }
    {color: "#797c79"}
);
var cube = new THREE.Mesh(geometry, material);
// cube.position.y=8;
// cube.scale.set(3,3)


// scene.add(cube); 

let loader = new THREE.TextureLoader();
loader.load("imgs/cloud1.png", function(texture){
  cloudGeo = new THREE.PlaneBufferGeometry(500,500);
  cloudMaterial = new THREE.MeshLambertMaterial({
    map:texture,
    transparent: true
  });

  for(let p=0; p<50; p++) {
    let cloud = new THREE.Mesh(cloudGeo, cloudMaterial);
    cloud.position.set(
      Math.random()*800 -400,
      500,
      Math.random()*500-500
    );
    cloud.rotation.x = 1.16;
    cloud.rotation.y = -0.12;
    cloud.rotation.z = Math.random()*2*Math.PI;
    // cloud.rotation.z = Math.random()*2*Math.PI;
    cloud.material.opacity = 0.18;
    cloudParticles.push(cloud);
    scene.add(cloud);
  }
});
loader.load("imgs/stars.jpg", function(texture){

  const textureEffect = new POSTPROCESSING.TextureEffect({
    blendFunction: POSTPROCESSING.BlendFunction.COLOR_DODGE,
    texture: texture
  });
  textureEffect.blendMode.opacity.value = 0;

  const bloomEffect = new POSTPROCESSING.BloomEffect({
        blendFunction: POSTPROCESSING.BlendFunction.COLOR_DODGE,
        kernelSize: POSTPROCESSING.KernelSize.SMALL,
        useLuminanceFilter: true,
        luminanceThreshold: 0.3,
        luminanceSmoothing: 0.75
      });
  bloomEffect.blendMode.opacity.value = 1.5;

  let effectPass = new POSTPROCESSING.EffectPass(
    camera,
    bloomEffect,
    textureEffect
  );
  effectPass.renderToScreen = true;

  composer = new POSTPROCESSING.EffectComposer(renderer);
  composer.addPass(new POSTPROCESSING.RenderPass(scene, camera));
  composer.addPass(effectPass);
  
  window.addEventListener("resize", onWindowResize, false);
  render();
});
}
function onWindowResize() {
camera.aspect = window.innerWidth / window.innerHeight;
camera.updateProjectionMatrix();
renderer.setSize(window.innerWidth, window.innerHeight);
}
function render() {

// cube.rotation.x += 0.01;
// cube.rotation.y += 0.01;    
cloudParticles.forEach(p => {
  p.rotation.z -=0.003;
  // p.position.x= Math.random()/10;
});
composer.render(0.1);
requestAnimationFrame(render);
}
init();




