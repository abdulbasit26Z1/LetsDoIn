/* CISCO PACKET TRACER ONLINE 3D - COMPLETE CISCO DEVICE CATALOG & REAL 3D WEBGL EMULATOR */

let packetTracerState = {
    nodes: [],
    connections: [],
    notes: [],
    selectedNodeId: null,
    activeTool: 'select', // 'select', 'cable', 'simple_pdu', 'note', 'delete'
    cableType: 'straight', // 'straight', 'crossover', 'fiber', 'serial'
    pendingCableStart: null, // { nodeId }
    simulationLogs: [],
    isFullScreen: false,
    activeCategory: 'network_devices',
    activeSubCategory: 'routers',
    activeModalTab: 'cli',
    activeDesktopApp: 'ipconfig',
    browserUrl: '',
    browserOutput: '',
    portMenuNodeId: null
};

// THREE.JS 3D ENGINE GLOBALS
let pt3d = {
    scene: null,
    camera: null,
    renderer: null,
    controls: null,
    raycaster: null,
    mouse: null,
    deviceMeshes: {}, // nodeId -> THREE.Group
    cableMeshes: {},  // connId -> THREE.Mesh
    labelSprites: {}, // nodeId -> THREE.Sprite
    draggedMesh: null,
    plane: null,
    planeIntersect: null,
    animFrameId: null,
    pduAnims: []
};

const PT_CATALOG = {
    // --- ROUTERS ---
    'r_2911': { id: 'r_2911', category: 'network_devices', sub: 'routers', name: 'Cisco 2911 Router', model: 'ISR 2911', icon: 'fa-solid fa-network-wired text-indigo-600', bg: 'bg-indigo-50 border-indigo-200', ports: ['GigabitEthernet0/0', 'GigabitEthernet0/1', 'GigabitEthernet0/2', 'Serial0/0/0'], color: 0x3730a3, shape: 'router' },
    'r_1941': { id: 'r_1941', category: 'network_devices', sub: 'routers', name: 'Cisco 1941 Router', model: 'ISR 1941', icon: 'fa-solid fa-network-wired text-blue-600', bg: 'bg-blue-50 border-blue-200', ports: ['GigabitEthernet0/0', 'GigabitEthernet0/1', 'Serial0/0/0'], color: 0x1d4ed8, shape: 'router' },
    'r_1841': { id: 'r_1841', category: 'network_devices', sub: 'routers', name: 'Cisco 1841 Router', model: 'ISR 1841', icon: 'fa-solid fa-network-wired text-sky-600', bg: 'bg-sky-50 border-sky-200', ports: ['FastEthernet0/0', 'FastEthernet0/1', 'Serial0/0/0'], color: 0x0284c7, shape: 'router' },
    'r_4331': { id: 'r_4331', category: 'network_devices', sub: 'routers', name: 'Cisco 4331 ISR', model: 'ISR 4331', icon: 'fa-solid fa-network-wired text-purple-600', bg: 'bg-purple-50 border-purple-200', ports: ['GigabitEthernet0/0/0', 'GigabitEthernet0/0/1', 'GigabitEthernet0/0/2'], color: 0x6b21a8, shape: 'router' },
    'r_4321': { id: 'r_4321', category: 'network_devices', sub: 'routers', name: 'Cisco 4321 ISR', model: 'ISR 4321', icon: 'fa-solid fa-network-wired text-violet-600', bg: 'bg-violet-50 border-violet-200', ports: ['GigabitEthernet0/0/0', 'GigabitEthernet0/0/1'], color: 0x5b21b6, shape: 'router' },
    'r_829':  { id: 'r_829',  category: 'network_devices', sub: 'routers', name: 'Cisco 829 Industrial', model: 'IR 829', icon: 'fa-solid fa-network-wired text-amber-600', bg: 'bg-amber-50 border-amber-200', ports: ['GigabitEthernet0', 'GigabitEthernet1', 'FastEthernet0'], color: 0xb45309, shape: 'router' },

    // --- SWITCHES & HUBS ---
    'sw_2960': { id: 'sw_2960', category: 'network_devices', sub: 'switches', name: 'Catalyst 2960 Switch', model: 'WS-C2960-24TT', icon: 'fa-solid fa-server text-emerald-600', bg: 'bg-emerald-50 border-emerald-200', ports: ['FastEthernet0/1', 'FastEthernet0/2', 'FastEthernet0/3', 'FastEthernet0/4', 'FastEthernet0/5', 'GigabitEthernet0/1'], color: 0x047857, shape: 'switch' },
    'sw_3560': { id: 'sw_3560', category: 'network_devices', sub: 'switches', name: 'Cisco 3560 L3 Switch', model: 'WS-C3560-24PS', icon: 'fa-solid fa-layer-group text-teal-600', bg: 'bg-teal-50 border-teal-200', ports: ['FastEthernet0/1', 'FastEthernet0/2', 'FastEthernet0/3', 'GigabitEthernet0/1'], color: 0x0f766e, shape: 'switch' },
    'sw_3650': { id: 'sw_3650', category: 'network_devices', sub: 'switches', name: 'Cisco 3650 L3 Switch', model: 'WS-C3650-24TS', icon: 'fa-solid fa-layer-group text-cyan-600', bg: 'bg-cyan-50 border-cyan-200', ports: ['GigabitEthernet1/0/1', 'GigabitEthernet1/0/2', 'GigabitEthernet1/0/3'], color: 0x0891b2, shape: 'switch' },
    'hub_pt':  { id: 'hub_pt',  category: 'network_devices', sub: 'switches', name: 'Ethernet Hub-PT', model: 'Hub-PT', icon: 'fa-solid fa-circle-nodes text-slate-600', bg: 'bg-slate-100 border-slate-300', ports: ['FastEthernet0', 'FastEthernet1', 'FastEthernet2', 'FastEthernet3'], color: 0x475569, shape: 'switch' },

    // --- SECURITY & FIREWALLS ---
    'fw_asa':  { id: 'fw_asa',  category: 'network_devices', sub: 'security', name: 'Cisco ASA 5505 Firewall', model: 'ASA 5505', icon: 'fa-solid fa-shield-halved text-red-600', bg: 'bg-red-50 border-red-200', ports: ['Ethernet0/0', 'Ethernet0/1', 'Management0/0'], color: 0xb91c1c, shape: 'firewall' },
    'fw_5506': { id: 'fw_5506', category: 'network_devices', sub: 'security', name: 'Cisco ASA 5506-X', model: 'ASA 5506-X', icon: 'fa-solid fa-shield-halved text-rose-600', bg: 'bg-rose-50 border-rose-200', ports: ['GigabitEthernet1/1', 'GigabitEthernet1/2', 'Management1/1'], color: 0xbe123c, shape: 'firewall' },

    // --- WIRELESS & WLC ---
    'wlc_2504': { id: 'wlc_2504', category: 'network_devices', sub: 'wireless', name: 'Cisco WLC 2504 Controller', model: 'WLC 2504', icon: 'fa-solid fa-tower-broadcast text-yellow-600', bg: 'bg-yellow-50 border-yellow-200', ports: ['GigabitEthernet0/1', 'GigabitEthernet0/2'], color: 0xa16207, shape: 'wlc' },
    'ap_lap':   { id: 'ap_lap',   category: 'network_devices', sub: 'wireless', name: 'Lightweight AP LAP', model: 'LAP-1130AG', icon: 'fa-solid fa-wifi text-amber-600', bg: 'bg-amber-50 border-amber-200', ports: ['GigabitEthernet0', 'Wireless0'], color: 0xd97706, shape: 'ap' },
    'ap_home':  { id: 'ap_home',  category: 'network_devices', sub: 'wireless', name: 'Wireless Home Router', model: 'WRT300N', icon: 'fa-solid fa-wifi text-amber-600', bg: 'bg-amber-50 border-amber-200', ports: ['Internet0', 'Ethernet0', 'Ethernet1', 'Wireless0'], color: 0xd97706, shape: 'ap' },

    // --- WAN & MODEMS ---
    'cloud_pt': { id: 'cloud_pt', category: 'network_devices', sub: 'wan', name: 'WAN Emulation Cloud', model: 'Cloud-PT', icon: 'fa-solid fa-cloud text-sky-600', bg: 'bg-sky-50 border-sky-200', ports: ['Serial0', 'Ethernet0', 'Coaxial0'], color: 0x0284c7, shape: 'cloud' },
    'modem_dsl':{ id: 'modem_dsl',category: 'network_devices', sub: 'wan', name: 'DSL Modem-PT', model: 'Modem-DSL', icon: 'fa-solid fa-box text-blue-600', bg: 'bg-blue-50 border-blue-200', ports: ['Port0', 'Ethernet0'], color: 0x1d4ed8, shape: 'modem' },

    // --- END DEVICES & WORKSTATIONS ---
    'dev_pc':     { id: 'dev_pc',     category: 'end_devices', sub: 'pc', name: 'PC Workstation', model: 'PC-PT', icon: 'fa-solid fa-desktop text-sky-600', bg: 'bg-sky-50 border-sky-200', ports: ['FastEthernet0'], color: 0x0369a1, shape: 'pc' },
    'dev_laptop': { id: 'dev_laptop', category: 'end_devices', sub: 'laptop', name: 'Laptop Computer', model: 'Laptop-PT', icon: 'fa-solid fa-laptop text-cyan-600', bg: 'bg-cyan-50 border-cyan-200', ports: ['FastEthernet0', 'Wireless0'], color: 0x0e7490, shape: 'laptop' },
    'dev_server': { id: 'dev_server', category: 'end_devices', sub: 'server', name: 'Web / DHCP Server', model: 'Server-PT', icon: 'fa-solid fa-database text-purple-600', bg: 'bg-purple-50 border-purple-200', ports: ['FastEthernet0'], color: 0x6b21a8, shape: 'server' },
    'dev_printer':{ id: 'dev_printer',category: 'end_devices', sub: 'printer', name: 'Network Printer', model: 'Printer-PT', icon: 'fa-solid fa-print text-pink-600', bg: 'bg-pink-50 border-pink-200', ports: ['FastEthernet0'], color: 0xbe185d, shape: 'printer' },
    'dev_phone':  { id: 'dev_phone',  category: 'end_devices', sub: 'phone', name: 'IP Phone 7960', model: 'VoIP-7960', icon: 'fa-solid fa-phone text-emerald-600', bg: 'bg-emerald-50 border-emerald-200', ports: ['FastEthernet0', 'PC0'], color: 0x047857, shape: 'phone' }
};

function initPacketTracer() {
    packetTracerState = {
        nodes: [],
        connections: [],
        notes: [],
        selectedNodeId: null,
        activeTool: 'select',
        cableType: 'straight',
        pendingCableStart: null,
        simulationLogs: [],
        isFullScreen: false,
        activeCategory: 'network_devices',
        activeSubCategory: 'routers',
        activeModalTab: 'cli',
        activeDesktopApp: 'ipconfig',
        browserUrl: '',
        browserOutput: '',
        portMenuNodeId: null
    };

    ensureThreeJsLoaded(() => {
        initThreeJsScene();
        loadPacketTracerPreset('soho');
    });
}

function ensureThreeJsLoaded(callback) {
    if (window.THREE && window.THREE.OrbitControls) {
        callback();
        return;
    }

    const loadScript = (src, cb) => {
        const s = document.createElement('script');
        s.src = src;
        s.onload = cb;
        document.head.appendChild(s);
    };

    if (!window.THREE) {
        loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js', () => {
            loadScript('https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js', () => {
                callback();
            });
        });
    } else if (!window.THREE.OrbitControls) {
        loadScript('https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js', () => {
            callback();
        });
    }
}

/* INITIALISE THREE.JS 3D VIEWPORT - LIGHT THEME CANVAS */
function initThreeJsScene() {
    const container = document.getElementById('pt-canvas-workspace');
    if (!container) return;

    container.innerHTML = `<canvas id="pt-3d-canvas" class="w-full h-full block outline-none cursor-grab active:cursor-grabbing"></canvas>`;
    const canvas = document.getElementById('pt-3d-canvas');

    const width = container.clientWidth || 1000;
    const height = container.clientHeight || 520;

    // Scene
    pt3d.scene = new THREE.Scene();
    pt3d.scene.background = new THREE.Color(0xf8fafc); // Clean Light Canvas
    pt3d.scene.fog = new THREE.FogExp2(0xf8fafc, 0.012);

    // Camera
    pt3d.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    pt3d.camera.position.set(0, 18, 22);

    // Renderer
    pt3d.renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
    pt3d.renderer.setSize(width, height);
    pt3d.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    pt3d.renderer.shadowMap.enabled = true;
    pt3d.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Orbit Controls
    pt3d.controls = new THREE.OrbitControls(pt3d.camera, pt3d.renderer.domElement);
    pt3d.controls.enableDamping = true;
    pt3d.controls.dampingFactor = 0.05;
    pt3d.controls.maxPolarAngle = Math.PI / 2 - 0.05;
    pt3d.controls.target.set(0, 0, 0);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.1);
    pt3d.scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0x2563eb, 0.8);
    dirLight.position.set(15, 30, 20);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    pt3d.scene.add(dirLight);

    // 3D Lab Light Grid
    const grid = new THREE.GridHelper(50, 25, 0x2563eb, 0xcbd5e1);
    grid.position.y = -0.01;
    pt3d.scene.add(grid);

    // Invisible Floor Drag Plane
    pt3d.plane = new THREE.Mesh(
        new THREE.PlaneGeometry(100, 100),
        new THREE.MeshBasicMaterial({ visible: false })
    );
    pt3d.plane.rotation.x = -Math.PI / 2;
    pt3d.scene.add(pt3d.plane);

    // Raycaster
    pt3d.raycaster = new THREE.Raycaster();
    pt3d.mouse = new THREE.Vector2();
    pt3d.planeIntersect = new THREE.Vector3();

    // Event Listeners for 3D Interactions
    canvas.addEventListener('mousedown', on3dMouseDown);
    canvas.addEventListener('mousemove', on3dMouseMove);
    canvas.addEventListener('mouseup', on3dMouseUp);
    canvas.addEventListener('dblclick', on3dDoubleClick);

    window.addEventListener('resize', on3dWindowResize);

    // Start 3D Render Animation Loop
    if (pt3d.animFrameId) cancelAnimationFrame(pt3d.animFrameId);
    animate3d();
}

function animate3d() {
    pt3d.animFrameId = requestAnimationFrame(animate3d);

    if (pt3d.controls) pt3d.controls.update();

    // Update PDU Packet Animations
    for (let i = pt3d.pduAnims.length - 1; i >= 0; i--) {
        const anim = pt3d.pduAnims[i];
        anim.progress += 0.02;
        if (anim.progress >= 1.0) {
            pt3d.scene.remove(anim.mesh);
            pt3d.pduAnims.splice(i, 1);
        } else {
            const pos = anim.curve.getPoint(anim.progress);
            anim.mesh.position.copy(pos);
        }
    }

    if (pt3d.renderer && pt3d.scene && pt3d.camera) {
        pt3d.renderer.render(pt3d.scene, pt3d.camera);
    }
}

function on3dWindowResize() {
    const container = document.getElementById('pt-canvas-workspace');
    if (!container || !pt3d.camera || !pt3d.renderer) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    pt3d.camera.aspect = width / height;
    pt3d.camera.updateProjectionMatrix();
    pt3d.renderer.setSize(width, height);
}

/* PROCEDURAL 3D MESH GENERATOR FOR CISCO DEVICES */
function create3dDeviceMesh(node) {
    const group = new THREE.Group();
    const catalog = PT_CATALOG[node.catKey] || PT_CATALOG.dev_pc;

    if (catalog.shape === 'pc') {
        const screenGeom = new THREE.BoxGeometry(2.2, 1.4, 0.2);
        const screenMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.2, metalness: 0.8 });
        const screen = new THREE.Mesh(screenGeom, screenMat);
        screen.position.set(0, 1.4, 0);

        const standGeom = new THREE.CylinderGeometry(0.1, 0.1, 0.6);
        const standMat = new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.9 });
        const stand = new THREE.Mesh(standGeom, standMat);
        stand.position.set(0, 0.5, 0);

        const towerGeom = new THREE.BoxGeometry(0.8, 1.6, 1.8);
        const towerMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.8, roughness: 0.3 });
        const tower = new THREE.Mesh(towerGeom, towerMat);
        tower.position.set(1.6, 0.8, 0);

        group.add(screen, stand, tower);

    } else if (catalog.shape === 'laptop') {
        const baseGeom = new THREE.BoxGeometry(2.2, 0.15, 1.6);
        const baseMat = new THREE.MeshStandardMaterial({ color: 0x0891b2, metalness: 0.8 });
        const base = new THREE.Mesh(baseGeom, baseMat);
        base.position.set(0, 0.08, 0);

        const screenGeom = new THREE.BoxGeometry(2.2, 1.3, 0.1);
        const screenMat = new THREE.MeshStandardMaterial({ color: 0x0e7490, metalness: 0.9 });
        const screen = new THREE.Mesh(screenGeom, screenMat);
        screen.position.set(0, 0.7, -0.7);
        screen.rotation.x = -Math.PI / 8;

        group.add(base, screen);

    } else if (catalog.shape === 'server') {
        const serverGeom = new THREE.BoxGeometry(2.4, 3.2, 1.8);
        const serverMat = new THREE.MeshStandardMaterial({ color: 0x312e81, roughness: 0.3, metalness: 0.9 });
        const server = new THREE.Mesh(serverGeom, serverMat);
        server.position.set(0, 1.6, 0);

        const bayGeom = new THREE.BoxGeometry(2.2, 2.8, 0.05);
        const bayMat = new THREE.MeshStandardMaterial({ color: 0x4338ca, metalness: 0.9 });
        const bays = new THREE.Mesh(bayGeom, bayMat);
        bays.position.set(0, 1.6, 0.92);

        group.add(server, bays);

    } else if (catalog.shape === 'phone') {
        const phoneGeom = new THREE.BoxGeometry(1.4, 0.4, 1.6);
        const phoneMat = new THREE.MeshStandardMaterial({ color: 0x047857, metalness: 0.8 });
        const phone = new THREE.Mesh(phoneGeom, phoneMat);
        phone.position.set(0, 0.2, 0);
        group.add(phone);

    } else if (catalog.shape === 'ap' || catalog.shape === 'wlc') {
        const domeGeom = new THREE.CylinderGeometry(1.4, 1.6, 0.5, 32);
        const domeMat = new THREE.MeshStandardMaterial({ color: catalog.color, metalness: 0.8, roughness: 0.2 });
        const dome = new THREE.Mesh(domeGeom, domeMat);
        dome.position.set(0, 0.25, 0);
        group.add(dome);

    } else if (catalog.shape === 'cloud') {
        const cloudGeom = new THREE.DodecahedronGeometry(1.6, 1);
        const cloudMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.4, metalness: 0.6 });
        const cloud = new THREE.Mesh(cloudGeom, cloudMat);
        cloud.position.set(0, 1.2, 0);
        group.add(cloud);

    } else {
        // Cisco Router / Switch Chassis
        const chassisWidth = catalog.shape === 'switch' ? 4.2 : 3.8;
        const chassisHeight = catalog.shape === 'switch' ? 0.7 : 1.1;
        const chassisDepth = 2.4;

        const bodyGeom = new THREE.BoxGeometry(chassisWidth, chassisHeight, chassisDepth);
        const bodyMat = new THREE.MeshStandardMaterial({ color: catalog.color, roughness: 0.3, metalness: 0.8 });
        const body = new THREE.Mesh(bodyGeom, bodyMat);
        body.position.set(0, chassisHeight / 2, 0);
        body.castShadow = true;

        const panelGeom = new THREE.BoxGeometry(chassisWidth - 0.2, chassisHeight - 0.1, 0.05);
        const panelMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.9, roughness: 0.2 });
        const panel = new THREE.Mesh(panelGeom, panelMat);
        panel.position.set(0, chassisHeight / 2, chassisDepth / 2 + 0.02);

        const ledGeom = new THREE.SphereGeometry(0.08, 16, 16);
        const ledMat = new THREE.MeshBasicMaterial({ color: node.power ? 0x10b981 : 0xef4444 });
        const led = new THREE.Mesh(ledGeom, ledMat);
        led.position.set(-chassisWidth / 2 + 0.3, chassisHeight / 2, chassisDepth / 2 + 0.06);

        group.add(body, panel, led);
    }

    // 3D Canvas Light Label Overhead
    const labelSprite = create3dTextSprite(node.name, node.ip || getPTNodePrimaryIP(node) || node.model);
    labelSprite.position.set(0, 3.2, 0);
    group.add(labelSprite);

    group.position.set(node.x, 0, node.y);
    group.userData = { nodeId: node.id };

    return group;
}

function create3dTextSprite(title, sub) {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');

    // Light Theme Label Box
    ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
    ctx.strokeStyle = 'rgba(37, 99, 235, 0.9)';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.roundRect(8, 8, 240, 112, 16);
    ctx.fill();
    ctx.stroke();

    // Title & Subtitle
    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 22px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(title, 128, 52);

    ctx.fillStyle = '#2563eb';
    ctx.font = 'bold 16px monospace';
    ctx.fillText(sub, 128, 88);

    const texture = new THREE.CanvasTexture(canvas);
    const spriteMat = new THREE.SpriteMaterial({ map: texture, transparent: true });
    const sprite = new THREE.Sprite(spriteMat);
    sprite.scale.set(3.5, 1.75, 1);
    return sprite;
}

/* 3D INTERACTION & CABLE CONNECTING HANDLERS */
function on3dMouseDown(e) {
    if (!pt3d.renderer) return;

    const rect = pt3d.renderer.domElement.getBoundingClientRect();
    pt3d.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    pt3d.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    pt3d.raycaster.setFromCamera(pt3d.mouse, pt3d.camera);
    const intersects = pt3d.raycaster.intersectObjects(Object.values(pt3d.deviceMeshes), true);

    if (intersects.length > 0) {
        let obj = intersects[0].object;
        while (obj.parent && !obj.userData.nodeId) {
            obj = obj.parent;
        }

        if (obj && obj.userData.nodeId) {
            const nodeId = obj.userData.nodeId;

            if (packetTracerState.activeTool === 'delete') {
                deletePTNode(nodeId);
                return;
            }

            if (packetTracerState.activeTool === 'cable') {
                if (!packetTracerState.pendingCableStart) {
                    packetTracerState.pendingCableStart = { nodeId: nodeId };
                    const startNode = packetTracerState.nodes.find(n => n.id === nodeId);
                    showToast(`🔌 Cable Start: ${startNode ? startNode.name : nodeId}. Click target device to connect cable.`);
                } else {
                    const fromId = packetTracerState.pendingCableStart.nodeId;
                    if (fromId !== nodeId) {
                        connectPTPortsAuto(fromId, nodeId, packetTracerState.cableType);
                    }
                    packetTracerState.pendingCableStart = null;
                }
                return;
            }

            if (packetTracerState.activeTool === 'simple_pdu') {
                if (!packetTracerState.selectedNodeId) {
                    packetTracerState.selectedNodeId = nodeId;
                    showToast(`Source selected: ${nodeId}. Now click target 3D device to Ping.`);
                } else {
                    executePTPing(packetTracerState.selectedNodeId, nodeId);
                    packetTracerState.selectedNodeId = null;
                }
                return;
            }

            // Start Dragging Mesh in 3D Space
            pt3d.draggedMesh = obj;
            pt3d.controls.enabled = false;
            packetTracerState.selectedNodeId = nodeId;
            openPTDeviceWorkbench(nodeId);
        }
    }
}

function connectPTPortsAuto(fromNodeId, toNodeId, cableType = 'straight') {
    const n1 = packetTracerState.nodes.find(n => n.id === fromNodeId);
    const n2 = packetTracerState.nodes.find(n => n.id === toNodeId);

    if (!n1 || !n2 || fromNodeId === toNodeId) return false;

    // Check if already connected
    const existing = packetTracerState.connections.find(
        c => (c.fromNodeId === fromNodeId && c.toNodeId === toNodeId) ||
             (c.fromNodeId === toNodeId && c.toNodeId === fromNodeId)
    );
    if (existing) {
        showToast(`Devices ${n1.name} and ${n2.name} are already connected!`);
        return false;
    }

    // Find first unconnected port on n1
    let p1 = n1.ports.find(p => !p.connectedTo);
    if (!p1) {
        const nextIdx = n1.ports.length + 1;
        const pName = `FastEthernet0/${nextIdx}`;
        p1 = { id: pName, shortId: `fa0/${nextIdx}`, ip: '', mask: '255.255.255.0', status: 'up', connectedTo: null };
        n1.ports.push(p1);
    }

    // Find first unconnected port on n2
    let p2 = n2.ports.find(p => !p.connectedTo);
    if (!p2) {
        const nextIdx = n2.ports.length + 1;
        const pName = `FastEthernet0/${nextIdx}`;
        p2 = { id: pName, shortId: `fa0/${nextIdx}`, ip: '', mask: '255.255.255.0', status: 'up', connectedTo: null };
        n2.ports.push(p2);
    }

    p1.connectedTo = { nodeId: toNodeId, portId: p2.id };
    p2.connectedTo = { nodeId: fromNodeId, portId: p1.id };
    p1.status = 'up';
    p2.status = 'up';

    const connId = `conn_${fromNodeId}_${p1.id}_${toNodeId}_${p2.id}`;
    packetTracerState.connections.push({
        id: connId,
        fromNodeId: fromNodeId,
        fromPort: p1.id,
        toNodeId: toNodeId,
        toPort: p2.id,
        cableType: cableType,
        status: 'up'
    });

    const cableName = cableType === 'fiber' ? 'Fiber Optic Cable' : cableType === 'crossover' ? 'Copper Cross-Over' : cableType === 'serial' ? 'Serial DCE' : 'Copper Straight-Through';
    addPTSimLog(n1.name, n2.name, `Cable Link Established: ${n1.name} (${p1.id}) <---> ${n2.name} (${p2.id}) via ${cableName}`, 'SUCCESS');
    showToast(`🔌 Cable Connected: ${n1.name} (${p1.id}) <---> ${n2.name} (${p2.id})`);

    renderPacketTracerCanvas();
    return true;
}

function on3dMouseMove(e) {
    if (!pt3d.renderer) return;

    const rect = pt3d.renderer.domElement.getBoundingClientRect();
    pt3d.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    pt3d.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    if (pt3d.draggedMesh) {
        pt3d.raycaster.setFromCamera(pt3d.mouse, pt3d.camera);
        const intersects = pt3d.raycaster.intersectObject(pt3d.plane);

        if (intersects.length > 0) {
            const point = intersects[0].point;
            pt3d.draggedMesh.position.x = Math.max(-20, Math.min(20, point.x));
            pt3d.draggedMesh.position.z = Math.max(-20, Math.min(20, point.z));

            const node = packetTracerState.nodes.find(n => n.id === pt3d.draggedMesh.userData.nodeId);
            if (node) {
                node.x = pt3d.draggedMesh.position.x;
                node.y = pt3d.draggedMesh.position.z;
            }

            update3dCables();
        }
    }
}

function on3dMouseUp() {
    if (pt3d.draggedMesh) {
        pt3d.draggedMesh = null;
        if (pt3d.controls) pt3d.controls.enabled = true;
    }
}

function on3dDoubleClick(e) {
    if (!pt3d.renderer) return;

    const rect = pt3d.renderer.domElement.getBoundingClientRect();
    pt3d.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    pt3d.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    pt3d.raycaster.setFromCamera(pt3d.mouse, pt3d.camera);
    const intersects = pt3d.raycaster.intersectObjects(Object.values(pt3d.deviceMeshes), true);

    if (intersects.length > 0) {
        let obj = intersects[0].object;
        while (obj.parent && !obj.userData.nodeId) {
            obj = obj.parent;
        }

        if (obj && obj.userData.nodeId) {
            openPTDeviceWorkbench(obj.userData.nodeId);
        }
    }
}

/* RENDER & UPDATE 3D CANVAS TOPOLOGY */
function renderPacketTracerCanvas() {
    if (!pt3d.scene) return;

    // Clear existing 3D Meshes
    Object.values(pt3d.deviceMeshes).forEach(m => pt3d.scene.remove(m));
    Object.values(pt3d.cableMeshes).forEach(c => pt3d.scene.remove(c));

    pt3d.deviceMeshes = {};
    pt3d.cableMeshes = {};

    // Re-create 3D Devices
    packetTracerState.nodes.forEach(node => {
        const meshGroup = create3dDeviceMesh(node);
        pt3d.scene.add(meshGroup);
        pt3d.deviceMeshes[node.id] = meshGroup;
    });

    update3dCables();
    renderPTSimulationLogs();
}

function update3dCables() {
    // Clear old cables
    Object.values(pt3d.cableMeshes).forEach(c => pt3d.scene.remove(c));
    pt3d.cableMeshes = {};

    packetTracerState.connections.forEach(conn => {
        const m1 = pt3d.deviceMeshes[conn.fromNodeId];
        const m2 = pt3d.deviceMeshes[conn.toNodeId];

        if (m1 && m2) {
            const p1 = m1.position.clone().add(new THREE.Vector3(0, 0.5, 0));
            const p2 = m2.position.clone().add(new THREE.Vector3(0, 0.5, 0));

            // Cable Dip
            const mid = p1.clone().add(p2).multiplyScalar(0.5);
            mid.y -= 1.2;

            const curve = new THREE.CatmullRomCurve3([p1, mid, p2]);
            const tubeGeom = new THREE.TubeGeometry(curve, 32, 0.12, 8, false);

            const cableColor = conn.cableType === 'fiber' ? 0x0284c7 : conn.cableType === 'crossover' ? 0xd97706 : conn.cableType === 'serial' ? 0xdc2626 : 0x2563eb;
            const tubeMat = new THREE.MeshStandardMaterial({ color: cableColor, roughness: 0.3, metalness: 0.8 });

            const cableMesh = new THREE.Mesh(tubeGeom, tubeMat);
            pt3d.scene.add(cableMesh);
            pt3d.cableMeshes[conn.id] = cableMesh;
        }
    });
}

function loadPacketTracerPreset(presetType) {
    packetTracerState.nodes = [];
    packetTracerState.connections = [];
    packetTracerState.simulationLogs = [];
    packetTracerState.notes = [];

    if (presetType === 'soho') {
        const router = createPTNode('r_2911', 'Router-Main', 0, -6);
        const switch1 = createPTNode('sw_2960', 'Switch-Core', 0, 0);
        const pc1 = createPTNode('dev_pc', 'PC-Sales', -8, 6, '192.168.1.10', '255.255.255.0', '192.168.1.1');
        const pc2 = createPTNode('dev_pc', 'PC-Finance', 0, 6, '192.168.1.11', '255.255.255.0', '192.168.1.1');
        const server = createPTNode('dev_server', 'Web-Server', 8, 6, '192.168.1.100', '255.255.255.0', '192.168.1.1');

        const g0 = router.ports.find(p => p.id === 'GigabitEthernet0/0');
        if (g0) { g0.ip = '192.168.1.1'; g0.mask = '255.255.255.0'; g0.status = 'up'; }
        router.ip = '192.168.1.1';

        server.htmlContent = `
            <!DOCTYPE html>
            <html>
            <body style="background:#f8fafc; color:#0f172a; font-family:sans-serif; text-align:center; padding:25px;">
                <h1 style="color:#2563eb; font-size:22px; margin-bottom:10px;">LetsDoIn 3D Enterprise Server</h1>
                <p style="color:#475569; font-size:13px;">Hosted on Cisco Packet Tracer WebGL 3D Simulator</p>
                <div style="margin-top:18px; padding:12px 20px; background:#e0effe; border-radius:8px; display:inline-block; border:1px solid #93c5fd;">
                    <strong style="color:#1d4ed8;">HTTP/1.1 Status 200 OK</strong> | Host: 192.168.1.100
                </div>
            </body>
            </html>
        `;

        packetTracerState.nodes.push(router, switch1, pc1, pc2, server);

        connectPTPorts(router.id, 'GigabitEthernet0/0', switch1.id, 'GigabitEthernet0/1');
        connectPTPorts(pc1.id, 'FastEthernet0', switch1.id, 'FastEthernet0/1');
        connectPTPorts(pc2.id, 'FastEthernet0', switch1.id, 'FastEthernet0/2');
        connectPTPorts(server.id, 'FastEthernet0', switch1.id, 'FastEthernet0/3');

        addPTSimLog('System', 'Topology Presets', 'Loaded 3D SOHO Network preset (192.168.1.0/24)', 'SUCCESS');
    } else if (presetType === 'wan') {
        const r1 = createPTNode('r_2911', 'Router-London', -8, -6);
        const r2 = createPTNode('r_2911', 'Router-Manchester', 8, -6);

        const s1 = createPTNode('sw_2960', 'Switch-London', -8, 0);
        const s2 = createPTNode('sw_2960', 'Switch-Manchester', 8, 0);

        const pc1 = createPTNode('dev_pc', 'PC-London', -8, 6, '192.168.10.5', '255.255.255.0', '192.168.10.1');
        const pc2 = createPTNode('dev_pc', 'PC-Manchester', 8, 6, '192.168.20.5', '255.255.255.0', '192.168.20.1');

        const r1g0 = r1.ports.find(p => p.id === 'GigabitEthernet0/0');
        if (r1g0) { r1g0.ip = '192.168.10.1'; r1g0.mask = '255.255.255.0'; r1g0.status = 'up'; }
        const r1s0 = r1.ports.find(p => p.id === 'Serial0/0/0');
        if (r1s0) { r1s0.ip = '10.0.0.1'; r1s0.mask = '255.255.255.252'; r1s0.status = 'up'; }
        r1.routes.push({ prefix: '192.168.20.0', mask: '255.255.255.0', nextHop: '10.0.0.2', type: 'S' });

        const r2g0 = r2.ports.find(p => p.id === 'GigabitEthernet0/0');
        if (r2g0) { r2g0.ip = '192.168.20.1'; r2g0.mask = '255.255.255.0'; r2g0.status = 'up'; }
        const r2s0 = r2.ports.find(p => p.id === 'Serial0/0/0');
        if (r2s0) { r2s0.ip = '10.0.0.2'; r2s0.mask = '255.255.255.252'; r2s0.status = 'up'; }
        r2.routes.push({ prefix: '192.168.10.0', mask: '255.255.255.0', nextHop: '10.0.0.1', type: 'S' });

        packetTracerState.nodes.push(r1, r2, s1, s2, pc1, pc2);

        connectPTPorts(r1.id, 'Serial0/0/0', r2.id, 'Serial0/0/0', 'serial');
        connectPTPorts(r1.id, 'GigabitEthernet0/0', s1.id, 'GigabitEthernet0/1');
        connectPTPorts(r2.id, 'GigabitEthernet0/0', s2.id, 'GigabitEthernet0/1');
        connectPTPorts(pc1.id, 'FastEthernet0', s1.id, 'FastEthernet0/1');
        connectPTPorts(pc2.id, 'FastEthernet0', s2.id, 'FastEthernet0/1');

        addPTSimLog('System', 'Topology Presets', 'Loaded 3D Enterprise Dual Router WAN Link preset', 'SUCCESS');
    } else {
        addPTSimLog('System', 'Topology Presets', 'Cleared 3D canvas for blank custom topology', 'INFO');
    }

    renderPacketTracerCanvas();
    renderPTPaletteSubCategories();
}

function createPTNode(catKey, name, x, y, ip = '', mask = '255.255.255.0', gateway = '') {
    const catalog = PT_CATALOG[catKey] || PT_CATALOG.dev_pc;
    const nodeId = `${catKey}_${Math.floor(Math.random() * 8999 + 1000)}`;

    const ports = catalog.ports.map(pName => {
        const short = pName.replace('GigabitEthernet', 'g').replace('FastEthernet', 'fa').replace('Serial', 's').replace('Ethernet', 'e');
        return {
            id: pName,
            shortId: short,
            ip: '',
            mask: '255.255.255.0',
            status: 'up',
            connectedTo: null
        };
    });

    return {
        id: nodeId,
        catKey: catKey,
        type: catalog.category,
        name: name || catalog.name,
        model: catalog.model,
        x: x,
        y: y,
        ip: ip,
        mask: mask,
        gateway: gateway,
        ports: ports,
        power: true,
        hostname: name || catalog.name,
        vlanId: 1,
        htmlContent: '',
        routes: [],
        activeInterface: null,
        cliHistory: [
            `Cisco IOS Software, ${catalog.name} (${catalog.model}), Version 15.2(4)M6`,
            `Technical Support: https://www.cisco.com/techsupport`,
            `Press RETURN to get started!`,
            ``
        ],
        iosMode: 'user'
    };
}

function connectPTPorts(node1Id, port1Name, node2Id, port2Name, cableType = 'straight') {
    const n1 = packetTracerState.nodes.find(n => n.id === node1Id);
    const n2 = packetTracerState.nodes.find(n => n.id === node2Id);

    if (!n1 || !n2) return false;

    const p1 = n1.ports.find(p => p.id === port1Name);
    const p2 = n2.ports.find(p => p.id === port2Name);

    if (!p1 || !p2) return false;

    p1.connectedTo = { nodeId: node2Id, portId: port2Name };
    p2.connectedTo = { nodeId: node1Id, portId: port1Name };

    const connId = `conn_${node1Id}_${port1Name}_${node2Id}_${port2Name}`;
    packetTracerState.connections.push({
        id: connId,
        fromNodeId: node1Id,
        fromPort: port1Name,
        toNodeId: node2Id,
        toPort: port2Name,
        cableType: cableType,
        status: 'up'
    });

    return true;
}

function setPTTool(toolKey) {
    packetTracerState.activeTool = toolKey;
    packetTracerState.pendingCableStart = null;

    const tools = ['select', 'cable', 'simple_pdu', 'note', 'delete'];
    tools.forEach(t => {
        const btn = document.getElementById(`pt-tool-${t}`);
        if (btn) {
            btn.className = 'p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition text-sm font-semibold';
        }
    });

    const activeBtn = document.getElementById(`pt-tool-${toolKey}`);
    if (activeBtn) {
        activeBtn.className = 'p-2 rounded-lg bg-indigo-600 text-white font-bold transition text-sm shadow-md';
    }

    if (toolKey === 'note') {
        const noteText = prompt('Enter 3D canvas note:', 'Corporate Subnet 192.168.1.0/24');
        if (noteText) {
            packetTracerState.notes.push({ x: 0, y: 0, text: noteText });
            renderPacketTracerCanvas();
        }
        setPTTool('select');
    }
}

function selectPTCategory(catKey) {
    packetTracerState.activeCategory = catKey;

    if (catKey === 'network_devices') packetTracerState.activeSubCategory = 'routers';
    else if (catKey === 'end_devices') packetTracerState.activeSubCategory = 'pc';
    else if (catKey === 'cables') packetTracerState.activeSubCategory = 'copper';

    renderPTPaletteSubCategories();
}

function selectPTSubCategory(subKey) {
    packetTracerState.activeSubCategory = subKey;
    renderPTPaletteSubCategories();
}

function renderPTPaletteSubCategories() {
    const subNav = document.getElementById('pt-palette-subnav');
    const devGrid = document.getElementById('pt-palette-devgrid');

    if (!subNav || !devGrid) return;

    if (packetTracerState.activeCategory === 'network_devices') {
        subNav.innerHTML = `
            <button onclick="selectPTSubCategory('routers')" class="px-2.5 py-1 rounded-md text-[11px] font-bold ${packetTracerState.activeSubCategory === 'routers' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:text-slate-900'}">Routers</button>
            <button onclick="selectPTSubCategory('switches')" class="px-2.5 py-1 rounded-md text-[11px] font-bold ${packetTracerState.activeSubCategory === 'switches' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:text-slate-900'}">Switches</button>
            <button onclick="selectPTSubCategory('security')" class="px-2.5 py-1 rounded-md text-[11px] font-bold ${packetTracerState.activeSubCategory === 'security' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:text-slate-900'}">Security</button>
            <button onclick="selectPTSubCategory('wireless')" class="px-2.5 py-1 rounded-md text-[11px] font-bold ${packetTracerState.activeSubCategory === 'wireless' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:text-slate-900'}">Wireless</button>
            <button onclick="selectPTSubCategory('wan')" class="px-2.5 py-1 rounded-md text-[11px] font-bold ${packetTracerState.activeSubCategory === 'wan' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:text-slate-900'}">WAN & Cloud</button>
        `;
    } else if (packetTracerState.activeCategory === 'end_devices') {
        subNav.innerHTML = `
            <button onclick="selectPTSubCategory('pc')" class="px-2.5 py-1 rounded-md text-[11px] font-bold ${packetTracerState.activeSubCategory === 'pc' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:text-slate-900'}">Computers</button>
            <button onclick="selectPTSubCategory('server')" class="px-2.5 py-1 rounded-md text-[11px] font-bold ${packetTracerState.activeSubCategory === 'server' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:text-slate-900'}">Servers</button>
            <button onclick="selectPTSubCategory('laptop')" class="px-2.5 py-1 rounded-md text-[11px] font-bold ${packetTracerState.activeSubCategory === 'laptop' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:text-slate-900'}">Laptops</button>
            <button onclick="selectPTSubCategory('printer')" class="px-2.5 py-1 rounded-md text-[11px] font-bold ${packetTracerState.activeSubCategory === 'printer' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:text-slate-900'}">Printers</button>
            <button onclick="selectPTSubCategory('phone')" class="px-2.5 py-1 rounded-md text-[11px] font-bold ${packetTracerState.activeSubCategory === 'phone' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:text-slate-900'}">VoIP Phone</button>
        `;
    } else {
        subNav.innerHTML = `
            <button onclick="packetTracerState.cableType='straight'; setPTTool('cable');" class="px-2.5 py-1 rounded-md text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200">Straight Copper</button>
            <button onclick="packetTracerState.cableType='crossover'; setPTTool('cable');" class="px-2.5 py-1 rounded-md text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200">Cross-Over</button>
            <button onclick="packetTracerState.cableType='serial'; setPTTool('cable');" class="px-2.5 py-1 rounded-md text-[11px] font-bold bg-red-50 text-red-700 border border-red-200">Serial DCE</button>
        `;
    }

    const matchingKeys = Object.keys(PT_CATALOG).filter(k => {
        const item = PT_CATALOG[k];
        return item.category === packetTracerState.activeCategory && (item.sub === packetTracerState.activeSubCategory || packetTracerState.activeCategory === 'cables');
    });

    devGrid.innerHTML = matchingKeys.map(k => {
        const dev = PT_CATALOG[k];
        return `
            <button onclick="addDeviceToCanvas('${k}')" class="p-2.5 rounded-xl bg-slate-50 hover:bg-indigo-50/60 border border-slate-200 transition text-left flex items-center space-x-2.5 group shadow-sm">
                <div class="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-base shadow-inner">
                    <i class="${dev.icon}"></i>
                </div>
                <div>
                    <div class="text-[11px] font-bold text-slate-800">${dev.name}</div>
                    <div class="text-[9px] text-slate-500 font-mono">${dev.model}</div>
                </div>
            </button>
        `;
    }).join('');
}

function addDeviceToCanvas(catKey) {
    const catalog = PT_CATALOG[catKey];
    if (!catalog) return;

    const nodeName = `${catalog.model.split(' ')[0]}-${packetTracerState.nodes.length + 1}`;
    const x = (Math.random() - 0.5) * 12;
    const y = (Math.random() - 0.5) * 12;

    const newNode = createPTNode(catKey, nodeName, x, y);
    packetTracerState.nodes.push(newNode);

    addPTSimLog('Canvas', '3D Device Added', `Added ${newNode.name} (${newNode.model}) to 3D Space`, 'SUCCESS');
    renderPacketTracerCanvas();
}

function deletePTNode(nodeId) {
    packetTracerState.connections = packetTracerState.connections.filter(c => c.fromNodeId !== nodeId && c.toNodeId !== nodeId);

    packetTracerState.nodes.forEach(n => {
        n.ports.forEach(p => {
            if (p.connectedTo && p.connectedTo.nodeId === nodeId) {
                p.connectedTo = null;
            }
        });
    });

    packetTracerState.nodes = packetTracerState.nodes.filter(n => n.id !== nodeId);

    addPTSimLog('Canvas', 'Device Deleted', `Removed 3D device ${nodeId}`, 'INFO');
    renderPacketTracerCanvas();
}

function addPTSimLog(src, dst, detail, status) {
    const timeStr = new Date().toLocaleTimeString();
    packetTracerState.simulationLogs.unshift({
        time: timeStr,
        source: src,
        destination: dst,
        detail: detail,
        status: status
    });

    if (packetTracerState.simulationLogs.length > 40) {
        packetTracerState.simulationLogs.pop();
    }

    renderPTSimulationLogs();
}

function renderPTSimulationLogs() {
    const container = document.getElementById('pt-simulation-logs-body');
    if (!container) return;

    if (packetTracerState.simulationLogs.length === 0) {
        container.innerHTML = `<tr><td colspan="5" class="p-2.5 text-center text-slate-400 italic text-xs">No network event simulation logs recorded yet.</td></tr>`;
        return;
    }

    container.innerHTML = packetTracerState.simulationLogs.map((log) => `
        <tr class="hover:bg-slate-50 transition border-b border-slate-100 text-xs">
            <td class="p-2 font-mono text-slate-500">${log.time}</td>
            <td class="p-2 font-bold text-slate-800">${escapeHtml(log.source)}</td>
            <td class="p-2 font-bold text-slate-700">${escapeHtml(log.destination)}</td>
            <td class="p-2 text-slate-700">${escapeHtml(log.detail)}</td>
            <td class="p-2">
                <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    log.status === 'SUCCESS' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                    log.status === 'FAILED' ? 'bg-red-50 text-red-700 border border-red-200' :
                    'bg-blue-50 text-blue-700 border border-blue-200'
                }">${log.status}</span>
            </td>
        </tr>
    `).join('');
}

function executePTPing(srcNodeId, dstNodeId) {
    const srcNode = packetTracerState.nodes.find(n => n.id === srcNodeId);
    const dstNode = packetTracerState.nodes.find(n => n.id === dstNodeId);

    if (!srcNode || !dstNode) {
        showToast('Ping failed: Target device not found');
        return;
    }

    if (!srcNode.power || !dstNode.power) {
        showToast('Ping failed: Device power is OFF');
        addPTSimLog(srcNode.name, dstNode.name, 'ICMP Ping Failed: Device Powered Off', 'FAILED');
        return;
    }

    const srcIp = getPTNodePrimaryIP(srcNode);
    const dstIp = getPTNodePrimaryIP(dstNode);

    if (!srcIp || !dstIp) {
        addPTSimLog(srcNode.name, dstNode.name, 'ICMP Ping Failed: Unconfigured IP Address', 'FAILED');
        showToast('Ping Failed: IP address not configured on interface');
        return;
    }

    const isConnected = checkPTReachability(srcNode.id, dstNode.id);

    if (isConnected) {
        const rtt = Math.floor(Math.random() * 8 + 2);
        addPTSimLog(srcNode.name, dstNode.name, `ICMP Echo Request/Reply -> ${dstIp} (${rtt}ms)`, 'SUCCESS');
        showToast(`Ping SUCCESS: ${srcNode.name} -> ${dstNode.name} (${dstIp}) in ${rtt}ms`);
        animate3dPduPacket(srcNode.id, dstNode.id);
    } else {
        addPTSimLog(srcNode.name, dstNode.name, `ICMP Echo Request -> ${dstIp} (Host Unreachable)`, 'FAILED');
        showToast(`Ping FAILED: Request timed out to ${dstIp}`);
    }
}

function animate3dPduPacket(srcNodeId, dstNodeId) {
    const m1 = pt3d.deviceMeshes[srcNodeId];
    const m2 = pt3d.deviceMeshes[dstNodeId];

    if (!m1 || !m2 || !pt3d.scene) return;

    const p1 = m1.position.clone().add(new THREE.Vector3(0, 0.8, 0));
    const p2 = m2.position.clone().add(new THREE.Vector3(0, 0.8, 0));
    const mid = p1.clone().add(p2).multiplyScalar(0.5);
    mid.y -= 1.2;

    const curve = new THREE.CatmullRomCurve3([p1, mid, p2]);

    const pduGeom = new THREE.BoxGeometry(0.5, 0.3, 0.4);
    const pduMat = new THREE.MeshBasicMaterial({ color: 0xd97706 });
    const pduMesh = new THREE.Mesh(pduGeom, pduMat);
    pduMesh.position.copy(p1);

    pt3d.scene.add(pduMesh);
    pt3d.pduAnims.push({ mesh: pduMesh, curve: curve, progress: 0 });
}

function getPTNodePrimaryIP(node) {
    if (node.ip) return node.ip;
    const upPort = node.ports.find(p => p.ip && p.status === 'up');
    return upPort ? upPort.ip : '';
}

function checkPTReachability(startNodeId, targetNodeId) {
    const visited = new Set();
    const queue = [startNodeId];

    while (queue.length > 0) {
        const curr = queue.shift();
        if (curr === targetNodeId) return true;
        visited.add(curr);

        const node = packetTracerState.nodes.find(n => n.id === curr);
        if (node && node.power) {
            node.ports.forEach(p => {
                if (p.connectedTo && p.status === 'up' && !visited.has(p.connectedTo.nodeId)) {
                    queue.push(p.connectedTo.nodeId);
                }
            });
        }
    }

    return false;
}

function togglePacketTracerFullScreen(forceState) {
    const container = document.getElementById('packet-tracer-container');
    const icon = document.getElementById('pt-fullscreen-icon');
    const text = document.getElementById('pt-fullscreen-text');

    if (!container) return;

    if (typeof forceState === 'boolean') {
        packetTracerState.isFullScreen = forceState;
    } else {
        packetTracerState.isFullScreen = !packetTracerState.isFullScreen;
    }

    if (packetTracerState.isFullScreen) {
        container.classList.add('fixed', 'inset-0', 'z-50', 'bg-slate-50', 'p-2', 'overflow-hidden', 'flex', 'flex-col', 'h-screen');
        document.body.classList.add('overflow-hidden');
        if (icon) icon.className = 'fa-solid fa-compress';
        if (text) text.innerText = 'Exit Fullscreen';
    } else {
        container.classList.remove('fixed', 'inset-0', 'z-50', 'bg-slate-50', 'p-2', 'overflow-hidden', 'flex', 'flex-col', 'h-screen');
        document.body.classList.remove('overflow-hidden');
        if (icon) icon.className = 'fa-solid fa-expand';
        if (text) text.innerText = 'Fullscreen';
    }

    setTimeout(on3dWindowResize, 100);
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && packetTracerState.isFullScreen) {
        togglePacketTracerFullScreen(false);
    }
});

function openPTDeviceWorkbench(nodeId) {
    packetTracerState.selectedNodeId = nodeId;
    const node = packetTracerState.nodes.find(n => n.id === nodeId);
    if (!node) return;

    const catalog = PT_CATALOG[node.catKey] || PT_CATALOG.dev_pc;

    if (catalog.category === 'end_devices') {
        packetTracerState.activeModalTab = 'desktop';
    } else {
        packetTracerState.activeModalTab = 'cli';
    }

    const modal = document.getElementById('pt-device-modal');
    if (modal) {
        modal.classList.remove('hidden');
        renderPTModalContent();
    }
}

function closePTDeviceWorkbench() {
    const modal = document.getElementById('pt-device-modal');
    if (modal) modal.classList.add('hidden');
}

function toggleNodePower(nodeId) {
    const node = packetTracerState.nodes.find(n => n.id === nodeId);
    if (!node) return;

    node.power = !node.power;
    showToast(`${node.name} Power ${node.power ? 'TURNED ON' : 'POWERED OFF'}`);
    renderPTModalContent();
    renderPacketTracerCanvas();
}

function switchPTModalTab(tabKey) {
    packetTracerState.activeModalTab = tabKey;
    renderPTModalContent();
}

function renderPTModalContent() {
    const node = packetTracerState.nodes.find(n => n.id === packetTracerState.selectedNodeId);
    if (!node) return;

    const catalog = PT_CATALOG[node.catKey] || PT_CATALOG.dev_pc;

    const titleElem = document.getElementById('pt-modal-title');
    if (titleElem) {
        titleElem.innerHTML = `<i class="${catalog.icon} mr-2"></i> ${escapeHtml(node.name)} (${catalog.model})`;
    }

    const tabPhysical = document.getElementById('pt-modal-tab-physical');
    const tabConfig = document.getElementById('pt-modal-tab-config');
    const tabCli = document.getElementById('pt-modal-tab-cli');
    const tabDesktop = document.getElementById('pt-modal-tab-desktop');

    const bodyPhysical = document.getElementById('pt-modal-body-physical');
    const bodyConfig = document.getElementById('pt-modal-body-config');
    const bodyCli = document.getElementById('pt-modal-body-cli');
    const bodyDesktop = document.getElementById('pt-modal-body-desktop');

    const activeStyle = 'px-3 py-1.5 rounded-lg bg-indigo-600 text-white font-bold text-xs shadow-sm';
    const inactiveStyle = 'px-3 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 font-bold text-xs';

    if (tabPhysical) tabPhysical.className = inactiveStyle;
    if (tabConfig) tabConfig.className = inactiveStyle;
    if (tabCli) tabCli.className = inactiveStyle;
    if (tabDesktop) tabDesktop.className = inactiveStyle;

    if (bodyPhysical) bodyPhysical.classList.add('hidden');
    if (bodyConfig) bodyConfig.classList.add('hidden');
    if (bodyCli) bodyCli.classList.add('hidden');
    if (bodyDesktop) bodyDesktop.classList.add('hidden');

    if (packetTracerState.activeModalTab === 'physical') {
        if (tabPhysical) tabPhysical.className = activeStyle;
        if (bodyPhysical) {
            bodyPhysical.classList.remove('hidden');
            bodyPhysical.innerHTML = `
                <div class="space-y-4 font-mono text-xs text-slate-700">
                    <div class="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                        <div>
                            <div class="font-bold text-slate-900 text-sm">${escapeHtml(node.name)} 3D Hardware Chassis</div>
                            <div class="text-slate-500">Model: ${catalog.model} | Power Status: <span class="${node.power ? 'text-emerald-600' : 'text-red-600'} font-bold">${node.power ? 'ONLINE' : 'OFF'}</span></div>
                        </div>
                        <button onclick="toggleNodePower('${node.id}')" class="px-4 py-2 rounded-xl font-bold text-xs transition shadow-md flex items-center gap-2 ${node.power ? 'bg-red-600 hover:bg-red-500 text-white' : 'bg-emerald-600 hover:bg-emerald-500 text-white'}">
                            <i class="fa-solid fa-power-off"></i> ${node.power ? 'Power Off' : 'Power On'}
                        </button>
                    </div>

                    <div class="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                        <div class="font-bold text-slate-800 uppercase tracking-wider text-[11px] text-indigo-600">Interface Ports & Status LEDs</div>
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            ${node.ports.map(p => `
                                <div class="p-2.5 rounded-lg bg-white border border-slate-200 flex items-center justify-between">
                                    <span class="font-bold text-slate-800"><i class="fa-solid fa-plug text-indigo-600 mr-1.5"></i> ${p.id}</span>
                                    <span class="flex items-center gap-1.5">
                                        <span class="w-2.5 h-2.5 rounded-full ${p.status === 'up' && node.power ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}"></span>
                                        <span class="text-[10px] uppercase font-bold text-slate-600">${p.status === 'up' && node.power ? 'UP' : 'DOWN'}</span>
                                    </span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            `;
        }
    } else if (packetTracerState.activeModalTab === 'config') {
        if (tabConfig) tabConfig.className = activeStyle;
        if (bodyConfig) {
            bodyConfig.classList.remove('hidden');
            bodyConfig.innerHTML = `
                <div class="space-y-4 font-mono text-xs">
                    <div class="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                        <div class="font-bold text-slate-800 uppercase tracking-wider text-[11px] text-indigo-600">Global Device Settings</div>
                        <div>
                            <label class="block text-slate-600 mb-1">Hostname / Label</label>
                            <input type="text" id="pt-cfg-hostname" value="${escapeHtml(node.name)}" class="w-full p-2.5 rounded-lg bg-white border border-slate-200 text-slate-800 outline-none">
                        </div>
                    </div>

                    <div class="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                        <div class="font-bold text-slate-800 uppercase tracking-wider text-[11px] text-emerald-600">IPv4 Configuration</div>
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                                <label class="block text-slate-600 mb-1">IP Address</label>
                                <input type="text" id="pt-cfg-ip" value="${escapeHtml(node.ip)}" placeholder="e.g. 192.168.1.10" class="w-full p-2.5 rounded-lg bg-white border border-slate-200 text-slate-800 outline-none">
                            </div>
                            <div>
                                <label class="block text-slate-600 mb-1">Subnet Mask</label>
                                <input type="text" id="pt-cfg-mask" value="${escapeHtml(node.mask)}" placeholder="255.255.255.0" class="w-full p-2.5 rounded-lg bg-white border border-slate-200 text-slate-800 outline-none">
                            </div>
                        </div>
                        <div>
                            <label class="block text-slate-600 mb-1">Default Gateway</label>
                            <input type="text" id="pt-cfg-gateway" value="${escapeHtml(node.gateway)}" placeholder="e.g. 192.168.1.1" class="w-full p-2.5 rounded-lg bg-white border border-slate-200 text-slate-800 outline-none">
                        </div>
                    </div>

                    <button onclick="savePTDeviceConfig()" class="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition shadow-md">
                        <i class="fa-solid fa-floppy-disk mr-1.5"></i> Save Device Configuration
                    </button>
                </div>
            `;
        }
    } else if (packetTracerState.activeModalTab === 'desktop') {
        if (tabDesktop) tabDesktop.className = activeStyle;
        if (bodyDesktop) {
            bodyDesktop.classList.remove('hidden');
            bodyDesktop.innerHTML = `
                <div class="space-y-4 font-mono text-xs">
                    <!-- App Icons Grid -->
                    <div class="flex items-center space-x-2 border-b border-slate-200 pb-3">
                        <button onclick="packetTracerState.activeDesktopApp='ipconfig'; renderPTModalContent();" class="px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800 font-bold flex items-center gap-1.5">
                            <i class="fa-solid fa-sliders text-indigo-600"></i> IP Config
                        </button>
                        <button onclick="packetTracerState.activeDesktopApp='prompt'; renderPTModalContent();" class="px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800 font-bold flex items-center gap-1.5">
                            <i class="fa-solid fa-terminal text-emerald-600"></i> Command Prompt
                        </button>
                        <button onclick="packetTracerState.activeDesktopApp='browser'; renderPTModalContent();" class="px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800 font-bold flex items-center gap-1.5">
                            <i class="fa-solid fa-globe text-blue-600"></i> Web Browser
                        </button>
                    </div>

                    ${packetTracerState.activeDesktopApp === 'ipconfig' ? `
                        <div class="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                            <div class="font-bold text-slate-800 uppercase tracking-wider text-[11px] text-sky-600">Desktop IP Configuration Application</div>
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                    <label class="block text-slate-600 mb-1">IPv4 Address</label>
                                    <input type="text" id="pt-desktop-ip" value="${escapeHtml(node.ip)}" class="w-full p-2 rounded-lg bg-white border border-slate-200 text-slate-800 outline-none">
                                </div>
                                <div>
                                    <label class="block text-slate-600 mb-1">Subnet Mask</label>
                                    <input type="text" id="pt-desktop-mask" value="${escapeHtml(node.mask)}" class="w-full p-2 rounded-lg bg-white border border-slate-200 text-slate-800 outline-none">
                                </div>
                            </div>
                            <div>
                                <label class="block text-slate-600 mb-1">Default Gateway</label>
                                <input type="text" id="pt-desktop-gw" value="${escapeHtml(node.gateway)}" class="w-full p-2 rounded-lg bg-white border border-slate-200 text-slate-800 outline-none">
                            </div>
                            <button onclick="savePTDesktopIP()" class="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs transition">Apply Settings</button>
                        </div>
                    ` : packetTracerState.activeDesktopApp === 'browser' ? `
                        <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                            <div class="flex items-center space-x-2">
                                <span class="font-bold text-slate-600 text-xs">URL:</span>
                                <input type="text" id="pt-browser-url-input" value="${escapeHtml(packetTracerState.browserUrl || 'http://192.168.1.100')}" placeholder="http://192.168.1.100" class="flex-1 p-2 rounded-lg bg-white border border-slate-200 text-slate-800 text-xs outline-none">
                                <button onclick="executePTBrowserGo()" class="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs">Go</button>
                            </div>
                            <div id="pt-browser-output-frame" class="h-56 rounded-xl bg-white p-3 overflow-y-auto text-slate-900 font-sans border border-slate-200">
                                ${packetTracerState.browserOutput || '<div class="text-slate-400 text-center py-10 font-sans italic">Enter HTTP Web Server URL (e.g. http://192.168.1.100) and click Go</div>'}
                            </div>
                        </div>
                    ` : `
                        <div class="flex flex-col h-[280px] rounded-xl bg-slate-900 border border-slate-800 p-3 font-mono text-xs text-emerald-400">
                            <div id="pt-prompt-logs" class="flex-1 overflow-y-auto whitespace-pre-wrap leading-relaxed space-y-1">
                                <div>Cisco Packet Tracer Command Prompt [Version 10.0.19045]</div>
                                <div>(c) Cisco Systems. All rights reserved.</div>
                                <div>Type "ipconfig" or "ping <ip>" to begin...</div>
                            </div>
                            <div class="pt-2 border-t border-slate-800 flex items-center space-x-2">
                                <span class="font-bold text-slate-300">C:\\></span>
                                <input type="text" id="pt-prompt-input" onkeydown="handlePTPromptKeyDown(event)" class="flex-1 bg-transparent text-emerald-300 outline-none font-mono text-xs">
                            </div>
                        </div>
                    `}
                </div>
            `;
        }
    } else {
        if (tabCli) tabCli.className = activeStyle;
        if (bodyCli) {
            bodyCli.classList.remove('hidden');
            let promptSymbol = `${node.hostname}>`;
            if (node.iosMode === 'enable') promptSymbol = `${node.hostname}#`;
            else if (node.iosMode === 'config') promptSymbol = `${node.hostname}(config)#`;
            else if (node.iosMode === 'config-if') promptSymbol = `${node.hostname}(config-if)#`;

            bodyCli.innerHTML = `
                <div class="flex flex-col h-[340px] rounded-xl bg-slate-950 border border-slate-800 p-3 font-mono text-xs text-emerald-400 overflow-hidden">
                    <div id="pt-cli-terminal-logs" class="flex-1 overflow-y-auto whitespace-pre-wrap leading-relaxed space-y-1">
                        ${node.cliHistory.map(line => `<div>${escapeHtml(line)}</div>`).join('')}
                    </div>
                    <div class="pt-2 border-t border-slate-900 flex items-center space-x-2">
                        <span class="font-bold text-slate-300 text-xs">${escapeHtml(promptSymbol)}</span>
                        <input type="text" id="pt-cli-input" onkeydown="handlePTCliKeyDown(event)" placeholder="Type Cisco command (enable, conf t, interface g0/0, ip address ..., no shut, show ip int br)..." class="flex-1 bg-transparent text-emerald-300 outline-none font-mono text-xs">
                    </div>
                </div>
            `;

            setTimeout(() => {
                const logsDiv = document.getElementById('pt-cli-terminal-logs');
                if (logsDiv) logsDiv.scrollTop = logsDiv.scrollHeight;
                const input = document.getElementById('pt-cli-input');
                if (input) input.focus();
            }, 50);
        }
    }
}

function savePTDesktopIP() {
    const node = packetTracerState.nodes.find(n => n.id === packetTracerState.selectedNodeId);
    if (!node) return;

    node.ip = document.getElementById('pt-desktop-ip').value.trim();
    node.mask = document.getElementById('pt-desktop-mask').value.trim();
    node.gateway = document.getElementById('pt-desktop-gw').value.trim();

    const fa0 = node.ports.find(p => p.id === 'FastEthernet0');
    if (fa0) {
        fa0.ip = node.ip;
        fa0.mask = node.mask;
    }

    showToast('Desktop IP Settings Saved!');
    renderPacketTracerCanvas();
}

function executePTBrowserGo() {
    const node = packetTracerState.nodes.find(n => n.id === packetTracerState.selectedNodeId);
    const urlInput = document.getElementById('pt-browser-url-input');
    if (!node || !urlInput) return;

    let targetUrl = urlInput.value.trim().replace('https://', '').replace('http://', '').replace('/', '');
    packetTracerState.browserUrl = `https://${targetUrl}`;

    const targetServer = packetTracerState.nodes.find(n => n.ip === targetUrl || n.ports.some(p => p.ip === targetUrl));

    if (targetServer && checkPTReachability(node.id, targetServer.id)) {
        packetTracerState.browserOutput = targetServer.htmlContent || `<h2 style="color:#10b981;">Cisco Simulated Web Server</h2><p>Response 200 OK from ${targetServer.ip}</p>`;
        addPTSimLog(node.name, targetServer.name, `HTTPS GET -> https://${targetUrl} (200 OK)`, 'SUCCESS');
        showToast('HTTPS 200 OK Response Received!');
    } else {
        packetTracerState.browserOutput = `<div style="color:#ef4444; font-weight:bold; text-align:center; padding:20px;">Request Timeout (404 / 504 Host Unreachable)</div>`;
        addPTSimLog(node.name, targetUrl, `HTTPS GET Failed -> https://${targetUrl}`, 'FAILED');
        showToast('HTTPS Request Timed Out!');
    }

    renderPTModalContent();
}

function handlePTPromptKeyDown(e) {
    if (e.key === 'Enter') {
        const inputElem = document.getElementById('pt-prompt-input');
        if (!inputElem) return;
        const cmd = inputElem.value.trim();
        inputElem.value = '';

        const logsDiv = document.getElementById('pt-prompt-logs');
        if (!logsDiv) return;

        logsDiv.innerHTML += `<div>C:\\> ${escapeHtml(cmd)}</div>`;

        const node = packetTracerState.nodes.find(n => n.id === packetTracerState.selectedNodeId);
        const lower = cmd.toLowerCase();

        if (lower === 'ipconfig') {
            logsDiv.innerHTML += `<div>FastEthernet0 IPv4 Address . . . . . : ${node.ip || '0.0.0.0'}</div>`;
            logsDiv.innerHTML += `<div>Subnet Mask . . . . . . . . . . . : ${node.mask || '0.0.0.0'}</div>`;
            logsDiv.innerHTML += `<div>Default Gateway . . . . . . . . . : ${node.gateway || '0.0.0.0'}</div>`;
        } else if (lower.startsWith('ping ')) {
            const targetIp = cmd.split(' ')[1];
            logsDiv.innerHTML += `<div>Pinging ${targetIp} with 32 bytes of data:</div>`;

            const targetNode = packetTracerState.nodes.find(n => n.ip === targetIp || n.ports.some(p => p.ip === targetIp));
            if (targetNode && checkPTReachability(node.id, targetNode.id)) {
                logsDiv.innerHTML += `<div>Reply from ${targetIp}: bytes=32 time=4ms TTL=128</div>`;
                logsDiv.innerHTML += `<div>Reply from ${targetIp}: bytes=32 time=3ms TTL=128</div>`;
                addPTSimLog(node.name, targetNode.name, `CMD Ping -> ${targetIp}`, 'SUCCESS');
            } else {
                logsDiv.innerHTML += `<div>Request timed out.</div>`;
                logsDiv.innerHTML += `<div>Request timed out.</div>`;
                addPTSimLog(node.name, targetIp, `CMD Ping Failed -> ${targetIp}`, 'FAILED');
            }
        }

        logsDiv.scrollTop = logsDiv.scrollHeight;
    }
}

function savePTDeviceConfig() {
    const node = packetTracerState.nodes.find(n => n.id === packetTracerState.selectedNodeId);
    if (!node) return;

    const newHost = document.getElementById('pt-cfg-hostname')?.value.trim();
    const newIp = document.getElementById('pt-cfg-ip')?.value.trim();
    const newMask = document.getElementById('pt-cfg-mask')?.value.trim() || '255.255.255.0';
    const newGw = document.getElementById('pt-cfg-gateway')?.value.trim();

    if (newHost) {
        node.name = newHost;
        node.hostname = newHost;
    }
    node.ip = newIp;
    node.mask = newMask;
    node.gateway = newGw;

    const primaryPort = node.ports.find(p => p.id.includes('0/0') || p.id.includes('FastEthernet0') || p.id.includes('GigabitEthernet0')) || node.ports[0];
    if (primaryPort && newIp) {
        primaryPort.ip = newIp;
        primaryPort.mask = newMask;
        primaryPort.status = 'up';
    }

    addPTSimLog(node.name, 'Config', `Updated IP: ${node.ip || 'Unset'}, GW: ${node.gateway}`, 'SUCCESS');
    showToast(`Device ${node.name} Configuration Saved!`);
    renderPacketTracerCanvas();
    closePTDeviceWorkbench();
}

function handlePTCliKeyDown(e) {
    if (e.key === 'Enter') {
        const inputElem = document.getElementById('pt-cli-input');
        if (!inputElem) return;
        const cmd = inputElem.value.trim();
        inputElem.value = '';
        executePTCliCommand(cmd);
    }
}

function executePTCliCommand(cmd) {
    const node = packetTracerState.nodes.find(n => n.id === packetTracerState.selectedNodeId);
    if (!node) return;

    let promptSymbol = `${node.hostname}>`;
    if (node.iosMode === 'enable') promptSymbol = `${node.hostname}#`;
    else if (node.iosMode === 'config') promptSymbol = `${node.hostname}(config)#`;
    else if (node.iosMode === 'config-if') promptSymbol = `${node.hostname}(config-if)#`;

    node.cliHistory.push(`${promptSymbol} ${cmd}`);

    const lower = cmd.toLowerCase().trim();

    if (!cmd) {
        renderPTModalContent();
        return;
    }

    if (lower === 'enable' || lower === 'en') {
        node.iosMode = 'enable';
    } else if (lower === 'configure terminal' || lower === 'conf t') {
        node.iosMode = 'config';
    } else if (lower.startsWith('interface ') || lower.startsWith('int ')) {
        const portNamePart = cmd.replace('interface ', '').replace('int ', '').trim();
        const matchedPort = node.ports.find(p => p.id.toLowerCase().includes(portNamePart.toLowerCase()) || p.shortId.toLowerCase().includes(portNamePart.toLowerCase()));
        if (matchedPort) {
            node.activeInterface = matchedPort.id;
            node.iosMode = 'config-if';
            node.cliHistory.push(`% Configured interface ${matchedPort.id}`);
        } else {
            node.cliHistory.push(`% Invalid interface name '${portNamePart}'`);
        }
    } else if (node.iosMode === 'config-if' && lower.startsWith('ip address ')) {
        const parts = cmd.split(' ');
        if (parts.length >= 4) {
            const ip = parts[2];
            const mask = parts[3];
            const port = node.ports.find(p => p.id === node.activeInterface);
            if (port) {
                port.ip = ip;
                port.mask = mask;
                if (!node.ip) node.ip = ip;
                node.cliHistory.push(`% Configured IP ${ip} ${mask} on ${port.id}`);
            }
        } else {
            node.cliHistory.push(`% Incomplete command: usage 'ip address <ip> <mask>'`);
        }
    } else if (node.iosMode === 'config-if' && (lower === 'no shutdown' || lower === 'no shut')) {
        const port = node.ports.find(p => p.id === node.activeInterface);
        if (port) {
            port.status = 'up';
            node.cliHistory.push(`% Interface ${port.id}, changed state to UP`);
            addPTSimLog(node.name, port.id, 'Interface Line Protocol Changed to UP', 'SUCCESS');
        }
    } else if (node.iosMode === 'config-if' && lower === 'shutdown') {
        const port = node.ports.find(p => p.id === node.activeInterface);
        if (port) {
            port.status = 'down';
            node.cliHistory.push(`% Interface ${port.id}, changed state to DOWN`);
            addPTSimLog(node.name, port.id, 'Interface Line Protocol Changed to DOWN', 'INFO');
        }
    } else if (lower.startsWith('hostname ')) {
        const newHost = cmd.split(' ')[1];
        if (newHost) {
            node.hostname = newHost;
            node.name = newHost;
        }
    } else if (node.iosMode === 'config' && lower.startsWith('ip route ')) {
        const parts = cmd.split(' ');
        if (parts.length >= 5) {
            const prefix = parts[2];
            const mask = parts[3];
            const nextHop = parts[4];
            node.routes.push({ prefix: prefix, mask: mask, nextHop: nextHop, type: 'S' });
            node.cliHistory.push(`% Static Route added: ${prefix}/${mask} via ${nextHop}`);
            addPTSimLog(node.name, 'Routing Table', `Added Static Route ${prefix} via ${nextHop}`, 'SUCCESS');
        }
    } else if (lower === 'exit' || lower === 'end') {
        if (node.iosMode === 'config-if') node.iosMode = 'config';
        else if (node.iosMode === 'config') node.iosMode = 'enable';
        else if (node.iosMode === 'enable') node.iosMode = 'user';
    } else if (lower === 'show ip interface brief' || lower === 'sh ip int br') {
        node.cliHistory.push(`Interface              IP-Address      OK? Method Status                Protocol`);
        node.ports.forEach(p => {
            node.cliHistory.push(`${p.id.padEnd(22, ' ')} ${(p.ip || 'unassigned').padEnd(15, ' ')} YES manual ${(p.status === 'up' ? 'up' : 'administratively down').padEnd(21, ' ')} ${p.status === 'up' ? 'up' : 'down'}`);
        });
    } else if (lower === 'show ip route' || lower === 'sh ip route') {
        node.cliHistory.push(`Codes: C - connected, S - static, R - RIP, M - mobile, B - BGP`);
        node.cliHistory.push(`Gateway of last resort is not set`);
        node.ports.forEach(p => {
            if (p.ip && p.status === 'up') {
                node.cliHistory.push(`C    ${p.ip}/${p.mask} is directly connected, ${p.id}`);
            }
        });
        node.routes.forEach(r => {
            node.cliHistory.push(`S    ${r.prefix}/${r.mask} [1/0] via ${r.nextHop}`);
        });
    } else if (lower === 'show running-config' || lower === 'sh run') {
        node.cliHistory.push(`Building configuration...`);
        node.cliHistory.push(`Current configuration : 1024 bytes`);
        node.cliHistory.push(`!`);
        node.cliHistory.push(`version 15.2`);
        node.cliHistory.push(`hostname ${node.hostname}`);
        node.cliHistory.push(`!`);
        node.ports.forEach(p => {
            node.cliHistory.push(`interface ${p.id}`);
            if (p.ip) node.cliHistory.push(` ip address ${p.ip} ${p.mask}`);
            if (p.status === 'down') node.cliHistory.push(` shutdown`);
            node.cliHistory.push(`!`);
        });
        node.routes.forEach(r => {
            node.cliHistory.push(`ip route ${r.prefix} ${r.mask} ${r.nextHop}`);
        });
        node.cliHistory.push(`end`);
    } else if (lower.startsWith('ping ')) {
        const targetIp = cmd.split(' ')[1];
        node.cliHistory.push(`Type escape sequence to abort.`);
        node.cliHistory.push(`Sending 5, 100-byte ICMP Echos to ${targetIp}, timeout is 2 seconds:`);

        const targetNode = packetTracerState.nodes.find(n => n.ip === targetIp || n.ports.some(p => p.ip === targetIp));
        if (targetNode && checkPTReachability(node.id, targetNode.id)) {
            node.cliHistory.push(`!!!!!`);
            node.cliHistory.push(`Success rate is 100 percent (5/5), round-trip min/avg/max = 1/4/12 ms`);
            addPTSimLog(node.name, targetNode.name, `CLI Ping -> ${targetIp}`, 'SUCCESS');
        } else {
            node.cliHistory.push(`. . . . .`);
            node.cliHistory.push(`Success rate is 0 percent (0/5)`);
            addPTSimLog(node.name, targetIp, `CLI Ping Failed -> ${targetIp}`, 'FAILED');
        }
    } else if (lower === 'help' || lower === '?') {
        node.cliHistory.push(`Available Cisco IOS commands:`);
        node.cliHistory.push(`  enable / en               Enter Privileged EXEC mode`);
        node.cliHistory.push(`  configure terminal       Enter Global Configuration mode`);
        node.cliHistory.push(`  interface <name>         Select interface (e.g. int g0/0)`);
        node.cliHistory.push(`  ip address <ip> <mask>   Assign IP address to interface`);
        node.cliHistory.push(`  no shutdown              Enable interface line protocol`);
        node.cliHistory.push(`  ip route <net> <mask> <gw> Add static route`);
        node.cliHistory.push(`  show ip interface brief  Show port status and IP addresses`);
        node.cliHistory.push(`  show ip route            Display IP routing table`);
        node.cliHistory.push(`  show running-config      Display active device configuration`);
        node.cliHistory.push(`  ping <ip_address>        Execute ICMP Ping test`);
        node.cliHistory.push(`  exit                     Exit current configuration mode`);
    } else {
        node.cliHistory.push(`% Invalid command or syntax error at '^' marker.`);
    }

    renderPTModalContent();
    renderPacketTracerCanvas();
}

const TOOL_PACKET_TRACER = {
    id: 'cisco-packet-tracer',
    name: 'Cisco Packet Tracer Online 3D Simulator',
    category: 'Developer & Text',
    icon: 'fa-network-wired',
    color: 'text-indigo-600 bg-indigo-50 border border-indigo-200',
    shortDesc: 'Professional 3D WebGL Cisco Packet Tracer network topology simulator powered by Three.js with 3D routers, switches, PCs, Cisco IOS CLI terminal, 3D cables, and live ICMP packet simulation.',
    seoDesc: 'Free online 3D WebGL Cisco Packet Tracer network simulator. Build interactive 3D network topologies with 3D Cisco 2911 routers, Catalyst switches, 3D cables, Cisco IOS CLI command terminal, IP routing, and live ICMP ping packet simulation.',
    render: () => `
        <div id="packet-tracer-container" class="space-y-3 select-none flex-1 flex flex-col h-full min-h-[680px]">
            <!-- Cisco Top Action Ribbon -->
            <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 p-3 rounded-2xl bg-white border border-slate-200 text-slate-800 shadow-sm">
                <div class="flex items-center space-x-3">
                    <div class="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-600 flex items-center justify-center font-black text-lg shadow-inner">
                        <i class="fa-solid fa-cube"></i>
                    </div>
                    <div>
                        <div class="font-black text-slate-900 text-xs sm:text-sm flex items-center gap-1.5">
                            Cisco Packet Tracer 3D WebGL <span class="px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 text-[10px] font-extrabold border border-indigo-200">Three.js Light Mode</span>
                        </div>
                        <div class="text-[10px] text-slate-500 font-mono">Real 3D Mesh Topology, OrbitControls & Cisco IOS Command Engine</div>
                    </div>
                </div>

                <!-- Action Ribbon Tools -->
                <div class="flex flex-wrap items-center gap-1.5 justify-end">
                    <select onchange="loadPacketTracerPreset(this.value)" class="px-2.5 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-xs font-bold outline-none cursor-pointer">
                        <option value="soho">3D Preset: SOHO Office Network</option>
                        <option value="wan">3D Preset: Enterprise Dual Router WAN</option>
                        <option value="blank">3D Preset: Custom Blank Canvas</option>
                    </select>

                    <div class="h-6 w-px bg-slate-200 mx-1"></div>

                    <button id="pt-tool-select" onclick="setPTTool('select')" class="p-2 rounded-lg bg-indigo-600 text-white font-bold transition text-sm shadow-md" title="Orbit / Move 3D Devices"><i class="fa-solid fa-hand"></i></button>
                    <button id="pt-tool-cable" onclick="setPTTool('cable')" class="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition text-sm font-semibold" title="Cable Wire Tool"><i class="fa-solid fa-plug"></i></button>
                    <button id="pt-tool-simple_pdu" onclick="setPTTool('simple_pdu')" class="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition text-sm font-semibold" title="Send 3D ICMP PDU Ping"><i class="fa-solid fa-envelope"></i></button>
                    <button id="pt-tool-note" onclick="setPTTool('note')" class="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition text-sm font-semibold" title="Place 3D Sticky Note"><i class="fa-solid fa-sticky-note"></i></button>
                    <button id="pt-tool-delete" onclick="setPTTool('delete')" class="p-2 rounded-lg text-slate-600 hover:text-red-600 hover:bg-slate-100 transition text-sm text-red-500 font-semibold" title="Delete 3D Device"><i class="fa-solid fa-trash-can"></i></button>

                    <div class="h-6 w-px bg-slate-200 mx-1"></div>

                    <button onclick="togglePacketTracerFullScreen()" class="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition flex items-center gap-1.5 border border-slate-200">
                        <i id="pt-fullscreen-icon" class="fa-solid fa-expand"></i>
                        <span id="pt-fullscreen-text">Fullscreen</span>
                    </button>
                </div>
            </div>

            <!-- Main Interactive 3D WebGL Canvas Workspace -->
            <div class="relative w-full h-[520px] rounded-3xl bg-slate-100 border border-slate-200/80 shadow-md overflow-hidden">
                <div id="pt-canvas-workspace" class="w-full h-full relative overflow-hidden">
                    <!-- Three.js 3D Canvas rendered via JS -->
                </div>
            </div>

            <!-- Device Palette Footer Navigation -->
            <div class="p-3.5 rounded-2xl bg-white border border-slate-200 text-slate-800 shadow-sm space-y-2.5">
                <!-- Device Categories Tabs -->
                <div class="flex items-center space-x-2 border-b border-slate-200 pb-2">
                    <button onclick="selectPTCategory('network_devices')" class="px-3 py-1 rounded-lg text-xs font-bold bg-indigo-50 border border-indigo-200 text-indigo-700 flex items-center gap-1.5"><i class="fa-solid fa-cube"></i> 3D Network Devices</button>
                    <button onclick="selectPTCategory('end_devices')" class="px-3 py-1 rounded-lg text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1.5"><i class="fa-solid fa-desktop"></i> 3D End Devices</button>
                    <button onclick="selectPTCategory('cables')" class="px-3 py-1 rounded-lg text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1.5"><i class="fa-solid fa-plug"></i> 3D Cables & Media</button>
                </div>

                <!-- Subcategories and Item Grid -->
                <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2">
                    <div id="pt-palette-subnav" class="flex items-center space-x-1 shrink-0">
                        <!-- Sub-nav rendered dynamically -->
                    </div>
                    <div id="pt-palette-devgrid" class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 flex-1">
                        <!-- Devices rendered dynamically -->
                    </div>
                </div>
            </div>

            <!-- Simulation Logs Bar -->
            <div class="p-3.5 rounded-2xl bg-white border border-slate-200 text-slate-800 shadow-sm space-y-2">
                <div class="flex items-center justify-between">
                    <span class="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5"><i class="fa-solid fa-list-check text-indigo-600"></i> Live Network 3D ICMP & Event Simulation Log</span>
                    <button onclick="packetTracerState.simulationLogs=[]; renderPTSimulationLogs();" class="text-[11px] text-slate-500 hover:text-red-600 font-bold transition">Clear Logs</button>
                </div>
                <div class="max-h-36 overflow-y-auto rounded-xl bg-slate-50 border border-slate-200">
                    <table class="w-full text-left border-collapse">
                        <thead class="bg-slate-100 text-[10px] uppercase font-bold text-slate-500 sticky top-0 border-b border-slate-200">
                            <tr>
                                <th class="p-2">Time</th>
                                <th class="p-2">Source</th>
                                <th class="p-2">Destination</th>
                                <th class="p-2">Details</th>
                                <th class="p-2">Status</th>
                            </tr>
                        </thead>
                        <tbody id="pt-simulation-logs-body">
                            <!-- Logs injected dynamically -->
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Device Workbench Modal -->
            <div id="pt-device-modal" class="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm hidden flex items-center justify-center p-4">
                <div class="bg-white rounded-3xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
                    <div class="p-4 border-b border-slate-200 flex items-center justify-between">
                        <div id="pt-modal-title" class="font-bold text-sm text-slate-900">3D Device Workbench</div>
                        <button onclick="closePTDeviceWorkbench()" class="text-slate-400 hover:text-slate-800 text-lg"><i class="fa-solid fa-xmark"></i></button>
                    </div>

                    <!-- Modal Navigation Tabs -->
                    <div class="flex items-center space-x-2 p-3 bg-slate-50 border-b border-slate-200">
                        <button id="pt-modal-tab-cli" onclick="switchPTModalTab('cli')" class="px-3 py-1.5 rounded-lg text-slate-600 font-bold text-xs"><i class="fa-solid fa-terminal mr-1"></i> Cisco IOS CLI</button>
                        <button id="pt-modal-tab-config" onclick="switchPTModalTab('config')" class="px-3 py-1.5 rounded-lg text-slate-600 font-bold text-xs"><i class="fa-solid fa-sliders mr-1"></i> Config Settings</button>
                        <button id="pt-modal-tab-physical" onclick="switchPTModalTab('physical')" class="px-3 py-1.5 rounded-lg text-slate-600 font-bold text-xs"><i class="fa-solid fa-microchip mr-1"></i> Hardware Ports</button>
                        <button id="pt-modal-tab-desktop" onclick="switchPTModalTab('desktop')" class="px-3 py-1.5 rounded-lg text-slate-600 font-bold text-xs"><i class="fa-solid fa-desktop mr-1"></i> Desktop Apps</button>
                    </div>

                    <div class="p-4 overflow-y-auto flex-1 space-y-4">
                        <div id="pt-modal-body-cli"></div>
                        <div id="pt-modal-body-config" class="hidden"></div>
                        <div id="pt-modal-body-physical" class="hidden"></div>
                        <div id="pt-modal-body-desktop" class="hidden"></div>
                    </div>
                </div>
            </div>
        </div>
    `
};
