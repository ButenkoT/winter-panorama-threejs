var app = app || {};

app.init = function () {

  // There are a couple of things that we need for any THREE.js page.
  // A camera, a scene and a renderer

  app.width = window.innerWidth;
  app.height = window.innerHeight;

  //(field of view, ration, near, far )
  app.camera = new THREE.PerspectiveCamera(100, app.width / app.height, 1, 1000);
  app.camera.position.z = 200;


  app.scene = new THREE.Scene();
  //here we associate camera with our scene, can add multiple cameras
  app.scene.add(app.camera);


  //checks if webgl is not supported replaces it with canvas
  app.renderer = Detector.webgl ? new THREE.WebGLRenderer() : new THREE.CanvasRenderer();
  app.renderer.setSize(app.width, app.height);

  document.body.appendChild(app.renderer.domElement);

  app.addSphere();
  app.animate();

};

app.addSphere = function () {

  var shape = new THREE.SphereGeometry(app.height, 32, 32);
  var material = new THREE.MeshBasicMaterial({
    map: THREE.ImageUtils.loadTexture('images/bergsjostolen.jpg')
  });

  app.sphere = new THREE.Mesh(shape, material);

  //shows picture from the inside-out
  app.sphere.scale.x = -1;

  app.scene.add(app.sphere);

};

app.animate = function () {

  requestAnimationFrame(app.animate);

  app.sphere.rotation.y += 0.001;

  //a combining step
  app.renderer.render(app.scene, app.camera);
};

window.onload = app.init;


//on mouse wheel move/touchpad view is zooming in/out
onMouseWheel = function(event) {

  if (event.wheelDeltaY) {                      // WebKit
    app.camera.fov -= event.wheelDeltaY * 0.05;
  } else if (event.wheelDelta) {                // Opera / IE9
    app.camera.fov -= event.wheelDelta * 0.05;
  } else if (event.detail) {                    // Firefox
    app.camera.fov += event.detail * 1.0;
  }

  app.camera.fov = Math.max(40, Math.min(100, app.camera.fov));
  app.camera.updateProjectionMatrix();
};

window.addEventListener('mousewheel', onMouseWheel, false);
window.addEventListener('DOMMouseScroll', onMouseWheel, false);


//if we change the window all inside will change appropriately
window.addEventListener("resize", function () {

  app.width = window.innerWidth;
  app.height = window.innerHeight;

  app.camera.aspect = app.width / app.height;
  app.camera.updateProjectionMatrix();

  app.renderer.setSize(app.width, app.height);

});

