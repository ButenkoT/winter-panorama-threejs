var app = app || {};

app.init = function(){

  // There are a couple of things that we need for any THREE.js page.
  // A camera
  // A scene
  // A renderer

  //assign width and height once, so it doesnt need to calculate it each time
  app.width = window.innerWidth;
  app.height = window.innerHeight;

  //(field of view, ration, near, far )
  //near and far is a range from how close it ll be and how far from the screen
  app.camera = new THREE.PerspectiveCamera(45, app.width/app.height, 1, 1000 );
  app.camera.position.z = 200;


  app.scene = new THREE.Scene();
  //here we associate camera with our scene, can add multiple cameras
  app.scene.add(app.camera);


  app.renderer = new THREE.WebGLRenderer();
  //setting any size we want it to be here
  app.renderer.setSize(app.width, app.height);
  app.renderer.setClearColor(0xE3F2FD, 1); //color in hex and transparency

  console.log(app.renderer);

  //orbitControl we add it before we append child, to control elements in z dimention with touchpad
  app.controls = new THREE.OrbitControls(app.camera, app.renderer.domElement);

  document.body.appendChild(app.renderer.domElement);
  // app.renderer.render(app.scene, app.camera);

  app.addSphere();
  app.animate();

};

app.addSphere = function(){

  var shape = new THREE.SphereGeometry(100, 32, 32);
  var material = new THREE.MeshBasicMaterial({
    //1600x800px image
    map: THREE.ImageUtils.loadTexture('images/bergsjostolen.jpg')
    //color: 0x1A237E
    //wireframe: true
  });

  app.sphere = new THREE.Mesh(shape, material);

  app.scene.add(app.sphere);

};

app.animate = function(){

  requestAnimationFrame(app.animate);

  app.sphere.rotation.y += 0.001;

  //pas in scene and camera, a combining step
  app.renderer.render(app.scene, app.camera);
};

window.onload = app.init;

//window.addEventListener("mousemove", function(event){
//
//  app.cube.position.x = event.clientX - (app.width/2);
//  app.cube.position.y = (app.height/2) - event.clientY;
//
//});

window.addEventListener("resize", function(){

  //if we change the window all inside will change appropriately
  app.width = window.innerWidth;
  app.height = window.innerHeight;

  app.camera.aspect = app.width / app.height;
  app.camera.updateProjectionMatrix();

  app.renderer.setSize(app.width, app.height);

});






















