import * as THREE from "three";

export function createRenderer(container) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  return renderer;
}

export function createCamera(container) {
  const aspect = container.clientWidth / container.clientHeight;
  const camera = new THREE.PerspectiveCamera(60, aspect, 0.1, 1000);
  camera.position.set(0, 0, 5);
  return camera;
}

export function resizeRendererToDisplaySize(renderer, camera, container) {
  const width = container.clientWidth;
  const height = container.clientHeight;
  const needsResize =
    container.clientWidth !== renderer.domElement.width ||
    container.clientHeight !== renderer.domElement.height;
  if (needsResize) {
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }
  return needsResize;
}
