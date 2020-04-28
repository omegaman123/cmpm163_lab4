// setup the scene
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75,
    window.innerWidth/window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
camera.position.z = 5;

THREE.Cache.enabled = true;
var count = 0;
var loader = new THREE.FileLoader();
var fshader, vshader;

loader.load('shaders/vertShader.vert',
    // onLoad callback
    function (data) {
        console.log(data); // output the text to the console
        vshader = data;
        count += 1;
        addTextureShaderCube(); // we will write this method
    },
    // onProgress callback
    function (xhr) {
        console.log((xhr.loaded/xhr.total * 100)+ '% loaded');
    },
    // onError callback
    function (err) {
        console.error('An error happened');
    });

loader.load('shaders/fragmentShader.frag',
    // onLoad callback
    function (data) {
        console.log(data); // output the text to the console
        fshader = data;
        count += 1;
        addTextureShaderCube(); // we will write this method
    },
    // onProgress callback
    function (xhr) {
        console.log((xhr.loaded/xhr.total * 100)+ '% loaded');
    },
// onError callback
    function (err) {
        console.error('An error happened');
    });


var texture = THREE.ImageUtils.loadTexture("197.jpg");
var normMap = THREE.ImageUtils.loadTexture("197_norm.jpg");

var texture1 = THREE.ImageUtils.loadTexture("199.jpg");
var normMap1 = THREE.ImageUtils.loadTexture("199_norm.jpg");



// setup the cube
var geometry = new THREE.BoxGeometry();
var material = new THREE.MeshPhongMaterial( { map:texture } );
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);


// add the light
var light = new THREE.PointLight(0xffffff, 1, 1000);
light.position.set(10, 10, 10);
scene.add(light);


material = new THREE.MeshPhongMaterial({map: texture, normalMap: normMap});
var cube2 = new THREE.Mesh(geometry, material);
scene.add(cube2);
cube2.position.x -= 2;

material = new THREE.MeshPhongMaterial({map: texture1, normalMap: normMap1});
var cube3 = new THREE.Mesh(geometry, material);
scene.add(cube3);
cube3.position.x -= 2;
cube3.position.y = 2;



let c = 0;
let cstep = 1;

function animate() {
    if (c > 10){
        cstep = -1;
    }
    if (c < -10){
        cstep = 1;
    }
    c += cstep;
    light.position.x += cstep;
    requestAnimationFrame(animate);
    renderer.render(scene, camera);

}
animate();


var geometry2, material2, mesh2;

function addTextureShaderCube() {
    if(count == 2) {
        let uniforms = {
            colorB: {type: 'vec3', value: new THREE.Color(0xACB6E5)},
            colorA: {type: 'vec3', value: new THREE.Color(0x74ebd5)}
        };

        geometry2 = new THREE.BoxGeometry(1, 1, 1);
        material2 =  new THREE.ShaderMaterial({
            uniforms: uniforms,
            fragmentShader: fshader,
            vertexShader: vshader,
            precision: "mediump"});

        mesh2 = new THREE.Mesh(geometry2, material2);
        mesh2.position.x = 2;
        scene.add(mesh2);
    }
}
