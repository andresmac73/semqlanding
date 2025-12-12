"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { motion } from "framer-motion";
import { resizeRendererToDisplaySize } from "../../lib/three/sceneUtils";

const POINT_COUNT = 500;

export default function VectorTransform3D() {
  const mountRef = useRef(null);
  const [mode, setMode] = useState("fp32"); // "fp32" | "semq"

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    const camera = new THREE.PerspectiveCamera(
      60,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000,
    );
    camera.position.set(0, 0, 5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    const pointLight = new THREE.PointLight(0xffffff, 1.1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);
    scene.add(new THREE.AmbientLight(0xffffff, 0.4));

    // FP32 cloud
    const fp32Geo = new THREE.BufferGeometry();
    const fp32Positions = new Float32Array(POINT_COUNT * 3);
    const fp32Colors = new Float32Array(POINT_COUNT * 3);

    for (let i = 0; i < POINT_COUNT; i++) {
      const x = (Math.random() - 0.5) * 4;
      const y = (Math.random() - 0.5) * 4;
      const z = (Math.random() - 0.5) * 4;
      fp32Positions.set([x, y, z], i * 3);

      const color = new THREE.Color().setHSL(Math.random(), 0.6, 0.5);
      fp32Colors.set([color.r, color.g, color.b], i * 3);
    }

    fp32Geo.setAttribute(
      "position",
      new THREE.BufferAttribute(fp32Positions, 3),
    );
    fp32Geo.setAttribute("color", new THREE.BufferAttribute(fp32Colors, 3));

    const fp32Mat = new THREE.PointsMaterial({
      size: 0.04,
      vertexColors: true,
      depthWrite: false,
    });
    const fp32Points = new THREE.Points(fp32Geo, fp32Mat);
    scene.add(fp32Points);

    // SEMQ cloud
    const semqGeo = new THREE.BufferGeometry();
    const semqPositions = new Float32Array(POINT_COUNT * 3);
    const semqColors = new Float32Array(POINT_COUNT * 3);

    for (let i = 0; i < POINT_COUNT; i++) {
      const x = fp32Positions[i * 3 + 0];
      const y = fp32Positions[i * 3 + 1];
      const z = fp32Positions[i * 3 + 2];

      const v = new THREE.Vector3(x, y, z).normalize();
      semqPositions.set([v.x * 2.0, v.y * 2.0, v.z * 2.0], i * 3);

      const baseColor = new THREE.Color().setHSL(0.55, 0.45, 0.65);
      semqColors.set([baseColor.r, baseColor.g, baseColor.b], i * 3);
    }

    semqGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(semqPositions, 3),
    );
    semqGeo.setAttribute("color", new THREE.BufferAttribute(semqColors, 3));

    const semqMat = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      depthWrite: false,
    });
    const semqPoints = new THREE.Points(semqGeo, semqMat);
    semqPoints.visible = false;
    scene.add(semqPoints);

    // Hover indicator
    const highlightGeo = new THREE.SphereGeometry(0.08, 16, 16);
    const highlightMat = new THREE.MeshStandardMaterial({
      color: 0x365aa6,
      emissive: 0x123368,
      emissiveIntensity: 0.6,
    });
    const highlight = new THREE.Mesh(highlightGeo, highlightMat);
    highlight.visible = false;
    scene.add(highlight);

    const mouse = new THREE.Vector2();
    const raycaster = new THREE.Raycaster();
    raycaster.params.Points = { threshold: 0.12 };

    const handleMouseMove = (event) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };

    renderer.domElement.addEventListener("mousemove", handleMouseMove);

    const handleResize = () => {
      resizeRendererToDisplaySize(renderer, camera, mount);
    };
    window.addEventListener("resize", handleResize);

    let frameId;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      controls.update();

      const activePoints = mode === "fp32" ? fp32Points : semqPoints;
      fp32Points.visible = mode === "fp32";
      semqPoints.visible = mode === "semq";

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObject(activePoints);
      if (intersects.length > 0) {
        highlight.visible = true;
        highlight.position.copy(intersects[0].point);
      } else {
        highlight.visible = false;
      }

      resizeRendererToDisplaySize(renderer, camera, mount);
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      renderer.domElement.removeEventListener("mousemove", handleMouseMove);
      controls.dispose();
      fp32Geo.dispose();
      fp32Mat.dispose();
      semqGeo.dispose();
      semqMat.dispose();
      highlightGeo.dispose();
      highlightMat.dispose();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, [mode]);

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <div className="flex flex-wrap justify-center gap-3">
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => setMode("fp32")}
          className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
            mode === "fp32"
              ? "bg-[#365aa6] text-white shadow-md"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          FP32 Space
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => setMode("semq")}
          className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
            mode === "semq"
              ? "bg-emerald-600 text-white shadow-md"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          SEMQ Angular Domain
        </motion.button>
      </div>

      <div
        ref={mountRef}
        className="w-full max-w-5xl aspect-[3/2] rounded-2xl border border-gray-200 overflow-hidden shadow-xl bg-white"
      />
    </div>
  );
}
