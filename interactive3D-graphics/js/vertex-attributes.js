var camera, scene, renderer;
var cameraControls;

var clock = new THREE.Clock();


function fillScene() {
    scene = new THREE.Scene();

    // Triangle mesh
    var material, geometry, mesh;
    material = new THREE.MeshBasicMaterial({
        vertexColors: THREE.VertexColors,
        side: THREE.DoubleSide 
    });
    geometry = new THREE.Geometry();

    // Add vertices for the triangle
    geometry.vertices.push(new THREE.Vector3(100, 0, 0));
    geometry.vertices.push(new THREE.Vector3(0, 100, 0));
    geometry.vertices.push(new THREE.Vector3(0, 0, 100));
    
    // Add a face comprising of the vertices
    geometry.faces.push(new THREE.Face3(0, 1, 2));
    
    // set vertex colours
    geometry.faces[0].vertexColors = [
        new THREE.Color(1.0, 0, 0),
        new THREE.Color(0, 1.0, 0),
        new THREE.Color(0, 0, 1.0)
    ];

    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
}

function init() {
    var canvasWidth = 846;
    var canvasHeight = 494;
    var canvasRatio = canvasWidth / canvasHeight;
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.gammaInput = true;
    renderer.gammaOutput = true;
    renderer.setSize(canvasWidth, canvasHeight);
    renderer.setClearColor(new THREE.Color(0xAAAAAA, 1.0));

    // Camera
    camera = new THREE.PerspectiveCamera( 55, canvasRatio, 1, 4000);
    camera.position.set(100, 150, 130);
    
    // Controls
    cameraControls = new THREE.OrbitAndPanControls(camera, renderer.domElement);
    cameraControls.target.set(0, 0, 0);
}

function addToDOM() {
    var container = document.getElementById('container');
    var canvas = container.getElementsByTagName('canvas');
    while (canvas.length > 0) {
        container.removeChild(canvas[0]);
        canvas = container.getElementsByTagName('canvas');
    }
    container.appendChild(renderer.domElement);
}

function animate() {
    window.requestAnimationFrame(animate);
    render();
}

function render () {
    var delta = clock.getDelta();
    cameraControls.update(delta);
    renderer.render(scene, camera);
}

try {
    init();
    fillScene();
    addToDOM();
    animate();
} catch(e) {
    var errorReport = "Unable to draw on canvas. Error: " + e;
    document.getElementById('container').innerHTML = errorReport;
}
    
