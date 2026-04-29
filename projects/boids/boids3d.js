// Import necessary three.js modules
import { BoxGeometry, Scene, PerspectiveCamera, WebGLRenderer, MeshBasicMaterial, Mesh, Color, AmbientLight } from "three";

// Create a scene
const scene = new Scene();

// Add light
const light = new AmbientLight(0x404040); // soft white light
scene.add(light);

// Set up a camera
const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 20;

// Create a renderer with a white background
const renderer = new WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(new Color(1, 1, 1)); // white background

// Create a box geometry with dimensions 10x5x5
const geometry = new BoxGeometry(10, 5, 5);

// Create a wireframe material
const material = new MeshBasicMaterial({ color: 0x000000, wireframe: true });

// Create a mesh with the geometry and material
const box = new Mesh(geometry, material);

// Add the mesh to the scene
scene.add(box);

// Create an animation loop that renders the scene
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

// Append the renderer's DOM element to the document body
document.body.appendChild(renderer.domElement);
