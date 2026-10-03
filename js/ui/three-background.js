/* MODERN 3D THREE.JS BACKGROUND SCENE ENGINE (PERFORMANCE OPTIMIZED) */

(function scheduleThreeJSBackground() {
    // Skip 3D WebGL Background on Mobile Devices to ensure 0ms TBT & 100 Mobile Performance Score
    if (window.innerWidth < 768 || window.matchMedia('(max-width: 768px)').matches) return;

    const startThree = () => {
        if (typeof THREE === 'undefined') return;

        let canvas = document.getElementById('three-bg-canvas');
        if (!canvas) {
            canvas = document.createElement('canvas');
            canvas.id = 'three-bg-canvas';
            canvas.className = 'fixed inset-0 w-full h-full pointer-events-none z-[-1] transition-opacity duration-700 opacity-60 dark:opacity-25';
            document.body.appendChild(canvas);
        }

        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0xf8fafc, 0.015);

        const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 35;

        const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: false });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(1);

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
        scene.add(ambientLight);

        const mainLight = new THREE.DirectionalLight(0x6366f1, 1.2);
        mainLight.position.set(20, 30, 20);
        scene.add(mainLight);

        const meshes = [];
        const createMaterial = (color, wireframe = false) => new THREE.MeshStandardMaterial({
            color: color,
            roughness: 0.3,
            metalness: 0.1,
            wireframe: wireframe,
            transparent: true,
            opacity: 0.7
        });

        // Hero TorusKnot
        const torusKnotGeo = new THREE.TorusKnotGeometry(4.5, 1.2, 64, 16);
        const torusKnotMat = createMaterial(0x6366f1, true);
        const torusKnot = new THREE.Mesh(torusKnotGeo, torusKnotMat);
        torusKnot.position.set(15, 8, -10);
        scene.add(torusKnot);
        meshes.push({ mesh: torusKnot, rx: 0.002, ry: 0.003, rz: 0.001 });

        // Floating Icosahedrons
        const icoGeo = new THREE.IcosahedronGeometry(3, 1);
        const icoMat1 = createMaterial(0xf43f5e, true);
        const ico1 = new THREE.Mesh(icoGeo, icoMat1);
        ico1.position.set(-18, -6, -5);
        scene.add(ico1);
        meshes.push({ mesh: ico1, rx: 0.003, ry: 0.002, rz: 0.002 });

        let mouseX = 0, mouseY = 0, targetX = 0, targetY = 0, scrollY = 0;

        window.addEventListener('mousemove', (e) => {
            mouseX = (e.clientX - window.innerWidth / 2) * 0.0005;
            mouseY = (e.clientY - window.innerHeight / 2) * 0.0005;
        }, { passive: true });

        window.addEventListener('scroll', () => {
            scrollY = window.scrollY * 0.003;
        }, { passive: true });

        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }, { passive: true });

        function animate() {
            requestAnimationFrame(animate);
            targetX += (mouseX - targetX) * 0.05;
            targetY += (mouseY - targetY) * 0.05;

            camera.position.x = targetX * 10;
            camera.position.y = -targetY * 10 - scrollY;
            camera.lookAt(scene.position);

            meshes.forEach(item => {
                item.mesh.rotation.x += item.rx;
                item.mesh.rotation.y += item.ry;
            });

            renderer.render(scene, camera);
        }

        animate();
    };

    if ('requestIdleCallback' in window) {
        requestIdleCallback(startThree, { timeout: 2000 });
    } else {
        setTimeout(startThree, 1500);
    }
})();
