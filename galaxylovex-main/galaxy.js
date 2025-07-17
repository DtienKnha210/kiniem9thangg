// galaxy.js - đã chỉnh sửa để chèn ảnh trực tiếp không cần input.html
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

// Tạo scene, camera, renderer
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x000000, 0.0015);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 20, 30);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("container").appendChild(renderer.domElement);

// Thêm điều khiển xoay
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.autoRotate = true;
controls.autoRotateSpeed = 0.5;
controls.enablePan = false;
controls.minDistance = 10;
controls.maxDistance = 300;

// Ánh sáng
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

// Tinh cầu trung tâm (central glow)
const glowGeometry = new THREE.SphereGeometry(5, 32, 32);
const glowMaterial = new THREE.MeshBasicMaterial({ color: 0xff00ff });
const centralGlow = new THREE.Mesh(glowGeometry, glowMaterial);
scene.add(centralGlow);

// DANH SÁCH ẢNH CHÈN THẲNG
const imageLinks = [
  "https://i.ibb.co/PZNP7BBP/iuem.jpg",
];

// HÀM CHÈN ẢNH DƯỚI DẠNG SPRITE
function addImagesToScene(links) {
  const loader = new THREE.TextureLoader();

  links.forEach((url) => {
    loader.load(url, (texture) => {
      const material = new THREE.SpriteMaterial({ map: texture });
      const sprite = new THREE.Sprite(material);

      // Vị trí ngẫu nhiên quanh tinh cầu
      sprite.position.set(
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 100
      );

      sprite.scale.set(10, 10, 1); // Kích thước ảnh
      scene.add(sprite);
    });
  });
}

// GỌI HÀM CHÈN ẢNH
addImagesToScene(imageLinks);

// Render loop
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

// Resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
