/* MODERN 3D THREE.JS BACKGROUND SCENE ENGINE */

(function initThreeJSBackground() {
    if (typeof THREE === 'undefined') return;

    // Create background canvas container if not present
    let canvas = document.getElementById('three-bg-canvas');
    if (!canvas) {
        canvas = document.createElement('canvas');
        canvas.id = 'three-bg-canvas';
        canvas.className = 'fixed inset-0 w-full h-full pointer-events-none z-[-1] transition-opacity duration-700 opacity-40 sm:opacity-80 dark:opacity-20';
        document.body.appendChild(canvas);
    }

    // Scene, Camera, Renderer Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xf8fafc, 0.015);

    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 35;

    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Ambient & Point Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0x6366f1, 1.2); // Indigo
    mainLight.position.set(20, 30, 20);
    scene.add(mainLight);

    const fillLight = new THREE.PointLight(0xec4899, 1, 100); // Pink/Rose
    fillLight.position.set(-20, -10, 10);
    scene.add(fillLight);

    const cyanLight = new THREE.PointLight(0x06b6d4, 1, 100); // Cyan
    cyanLight.position.set(0, 20, -10);
    scene.add(cyanLight);

    // 3D Meshes Collection
    const meshes = [];

    // Materials
    const createMaterial = (color, wireframe = false) => new THREE.MeshStandardMaterial({
        color: color,
        roughness: 0.2,
        metalness: 0.1,
        wireframe: wireframe,
        transparent: true,
        opacity: 0.75
    });

    // 1. Central Hero TorusKnot
    const torusKnotGeo = new THREE.TorusKnotGeometry(4.5, 1.2, 128, 32);
    const torusKnotMat = createMaterial(0x6366f1, true); // Wireframe Indigo
    const torusKnot = new THREE.Mesh(torusKnotGeo, torusKnotMat);
    torusKnot.position.set(15, 8, -10);
    scene.add(torusKnot);
    meshes.push({ mesh: torusKnot, rx: 0.003, ry: 0.005, rz: 0.002 });

    // Inner Solid TorusKnot
    const innerKnotGeo = new THREE.TorusKnotGeometry(3.2, 0.8, 64, 16);
    const innerKnotMat = createMaterial(0x3b82f6, false);
    const innerKnot = new THREE.Mesh(innerKnotGeo, innerKnotMat);
    innerKnot.position.copy(torusKnot.position);
    scene.add(innerKnot);
    meshes.push({ mesh: innerKnot, rx: -0.004, ry: -0.006, rz: 0.001 });

    // 2. Floating Icosahedrons (Left & Right)
    const icoGeo = new THREE.IcosahedronGeometry(3, 1);
    const icoMat1 = createMaterial(0xf43f5e, true);
    const ico1 = new THREE.Mesh(icoGeo, icoMat1);
    ico1.position.set(-18, -6, -5);
    scene.add(ico1);
    meshes.push({ mesh: ico1, rx: 0.004, ry: 0.002, rz: 0.003 });

    const icoMat2 = createMaterial(0x10b981, false);
    const ico2 = new THREE.Mesh(icoGeo, icoMat2);
    ico2.position.set(-22, 12, -15);
    scene.add(ico2);
    meshes.push({ mesh: ico2, rx: -0.002, ry: 0.005, rz: -0.001 });

    // 3. Floating Rings
    const ringGeo = new THREE.TorusGeometry(6, 0.15, 16, 100);
    const ringMat = createMaterial(0xf59e0b, false);
    const ring1 = new THREE.Mesh(ringGeo, ringMat);
    ring1.position.set(0, -12, -8);
    ring1.rotation.x = Math.PI / 3;
    scene.add(ring1);
    meshes.push({ mesh: ring1, rx: 0.001, ry: 0.003, rz: 0.002 });

    // 4. Floating Particle Dust
    const particleCount = 450;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
        particlePositions[i] = (Math.random() - 0.5) * 100;
        particlePositions[i + 1] = (Math.random() - 0.5) * 100;
        particlePositions[i + 2] = (Math.random() - 0.5) * 80;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
        color: 0x475569,
        size: 0.35,
        transparent: true,
        opacity: 0.6
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Mouse Move Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    window.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX - window.innerWidth / 2) * 0.001;
        mouseY = (e.clientY - window.innerHeight / 2) * 0.001;
    });

    // Scroll Interaction
    let scrollY = 0;
    window.addEventListener('scroll', () => {
        scrollY = window.scrollY * 0.005;
    });

    // Resize Handler
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Animation Loop
    function animate() {
        requestAnimationFrame(animate);

        // Smooth camera movement
        targetX += (mouseX - targetX) * 0.05;
        targetY += (mouseY - targetY) * 0.05;

        camera.position.x = targetX * 15;
        camera.position.y = -targetY * 15 - scrollY;
        camera.lookAt(scene.position);

        // Rotate Meshes
        meshes.forEach(item => {
            item.mesh.rotation.x += item.rx;
            item.mesh.rotation.y += item.ry;
            item.mesh.rotation.z += item.rz;
        });

        // Rotate Particle Field
        particles.rotation.y += 0.0005;
        particles.rotation.x += 0.0002;

        renderer.render(scene, camera);
    }

    animate();
})();
