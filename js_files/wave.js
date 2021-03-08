
//   var container = document.getElementById('container')

//   var vertexHeight = 15000,
//       planeDefinition = 100,
//       planeSize = 1245000,
//       totalObjects = 1,
//   background = "#002135",
//       meshColor = "#005e97"; 

//   var camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 1, 400000)
//   camera.position.z = 10000;
//   camera.position.y = 10000;

//   var scene = new THREE.Scene();
//   scene.fog = new THREE.Fog(background, 1, 300000);

// var planeGeo = new THREE.PlaneGeometry(planeSize, planeSize, planeDefinition, planeDefinition);
//   var plane = new THREE.Mesh(planeGeo, new THREE.MeshBasicMaterial({
//       color: meshColor,
//       wireframe: true
//   }));
//   plane.rotation.x -= Math.PI * .5;

//   scene.add(plane);

//   var renderer = new THREE.WebGLRenderer({alpha: false});
//   renderer.setSize(window.innerWidth, window.innerHeight);
//   renderer.setClearColor(background, 1);

// container.appendChild(renderer.domElement);

// // console.log(planeGeo.ver);
// updatePlane();

//   function updatePlane() {
//       for (var i = 0; i < planeGeo.vertices.length; i++) {
//     planeGeo.vertices[i].z += Math.random() * vertexHeight - vertexHeight;
//     planeGeo.vertices[i]._myZ = planeGeo.vertices[i].z
//       }
//   };

//   render();

// var count = 0
//   function render() {
//       requestAnimationFrame(render);
//   // camera.position.z -= 150;
//   var x = camera.position.x;
//   var z = camera.position.z;
//   camera.position.x = x * Math.cos(0.001) + z * Math.sin(0.001) - 10;
//   camera.position.z = z * Math.cos(0.001) - x * Math.sin(0.001) - 10;
//   camera.lookAt(new THREE.Vector3(0, 8000, 0))

//   for (var i = 0; i < planeGeo.vertices.length; i++) {
//     var z = +planeGeo.vertices[i].z;
//     planeGeo.vertices[i].z = Math.sin(( i + count * 0.00002)) * (planeGeo.vertices[i]._myZ - (planeGeo.vertices[i]._myZ* 0.6))
//     plane.geometry.verticesNeedUpdate = true;

//     count += 0.1
//   }

//       renderer.render(scene, camera);
//   }

//   window.addEventListener('resize', onWindowResize, false);

//   function onWindowResize() {
//       //changes the size of the canavs and updates it
//       camera.aspect = window.innerWidth / window.innerHeight;
//       camera.updateProjectionMatrix();
//       renderer.setSize(window.innerWidth, window.innerHeight);
//   }




const SEPARATION = 100, AMOUNTX = 50, AMOUNTY = 50;
let container, stats;
let camera, scene, renderer;
let particles, particle, count = 0;
let mouseX = 0, mouseY = 0;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

function init() {
  container = document.createElement( 'div' );
  document.body.appendChild(container);
  camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000 );
  camera.position.z = 1000; // Good var to change
  scene = new THREE.Scene();
  particles = new Array();
  var PI2 = Math.PI * 2;
  var geometry = new THREE.BufferGeometry();
  var material = new THREE.SpriteCanvasMaterial({
    color: 0xffffff,
    program: function ( context ) {
      context.beginPath();
      context.arc( 0, 0, 0.4, 0, PI2, true );
      context.fill();
    }
  });
  

  var i = 0;
  for ( var ix = 0; ix < AMOUNTX; ix ++ ) {
    for ( var iy = 0; iy < AMOUNTY; iy ++ ) {
      particle = particles[ i ++ ] = new THREE.Sprite( material );
      particle.position.x = ix * SEPARATION - ( ( AMOUNTX * SEPARATION ) / 2 );
      particle.position.z = iy * SEPARATION - ( ( AMOUNTY * SEPARATION ) / 2 );
      scene.add(particle);

      if (i > 0) {
        geometry.vertices.push( particle.position );
      }
    }
  }
  
  // var line = new THREE.Line(geometry, new THREE.LineBasicMaterial({
  //   color: 0xffffff,
  //   opacity: 0.5,
  //   linewidth: 4
  // }));
  // scene.add( line );

  renderer = new THREE.CanvasRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);
  stats = new Stats();
  container.appendChild( stats.dom );
  document.addEventListener( 'mousemove', onDocumentMouseMove, false );
  document.addEventListener( 'touchstart', onDocumentTouchStart, false );
  document.addEventListener( 'touchmove', onDocumentTouchMove, false );
  //
  window.addEventListener( 'resize', onWindowResize, false );
}

function onWindowResize() {
  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}

function onDocumentMouseMove(event) {
  mouseX = event.clientX - windowHalfX;
  mouseY = event.clientY - windowHalfY;
}

function onDocumentTouchStart(event) {
  if (event.touches.length === 1) {
    event.preventDefault();
    mouseX = event.touches[ 0 ].pageX - windowHalfX;
    mouseY = event.touches[ 0 ].pageY - windowHalfY;
  }
}

function onDocumentTouchMove( event ) {
  if (event.touches.length === 1) {
    event.preventDefault();
    mouseX = event.touches[ 0 ].pageX - windowHalfX;
    mouseY = event.touches[ 0 ].pageY - windowHalfY;
  }
}

function animate() {
  requestAnimationFrame( animate );
  render();
  stats.update();
}

function render() {
  renderer.setClearColor( 0x07074e, 1);
  camera.position.x += ( mouseX - camera.position.x ) * .05;
  camera.position.y += ( - mouseY - camera.position.y ) * .05;
  camera.lookAt( scene.position );
  var i = 0;
  for (var ix = 0; ix < AMOUNTX; ix++) {
    for (var iy = 0; iy < AMOUNTY; iy++) {
      particle = particles[i++];
      particle.position.y = (Math.sin((ix + count) * 0.3) * 50) + (Math.sin((iy + count) * 0.5) * 50);
      particle.scale.x = particle.scale.y = (Math.sin((ix + count) * 0.3) + 1) * 4 + (Math.sin((iy + count) * 0.5) + 1) * 4;
    }
  }
  renderer.render(scene, camera);
  count += 0.1;
}

init();
animate();