/* CISCO PACKET TRACER ONLINE - AUTHENTIC FULL NETWORK TOPOLOGY SIMULATOR */

let packetTracerState = {
    nodes: [],
    connections: [],
    notes: [],
    selectedNodeId: null,
    activeTool: 'select', // 'select', 'inspect', 'delete', 'note', 'simple_pdu', 'cable'
    cableType: 'straight', // 'auto', 'straight', 'crossover', 'console', 'fiber', 'wireless'
    pendingCableStart: null, // { nodeId, portId }
    simulationLogs: [],
    isFullScreen: false,
    activeCategory: 'network_devices', // 'network_devices', 'end_devices', 'cables'
    activeSubCategory: 'routers',
    activeModalTab: 'cli', // 'physical', 'config', 'cli', 'desktop'
    activeDesktopApp: 'ipconfig', // 'ipconfig', 'prompt', 'browser'
    simulationMode: 'realtime', // 'realtime', 'simulation'
    isSimPlaying: false,
    simSpeed: 1,
    zoomLevel: 1.0,
    browserUrl: '',
    browserOutput: ''
};

const PT_CATALOG = {
    // Routers
    'r_2911': { id: 'r_2911', category: 'network_devices', sub: 'routers', name: 'Cisco 2911 Router', model: 'ISR 2911', icon: 'fa-solid fa-network-wired text-indigo-400', bg: 'bg-indigo-950/80 border-indigo-700', ports: ['GigabitEthernet0/0', 'GigabitEthernet0/1', 'GigabitEthernet0/2', 'Serial0/0/0'], isL3: true, power: true },
    'r_1941': { id: 'r_1941', category: 'network_devices', sub: 'routers', name: 'Cisco 1941 Router', model: 'ISR 1941', icon: 'fa-solid fa-network-wired text-blue-400', bg: 'bg-blue-950/80 border-blue-700', ports: ['GigabitEthernet0/0', 'GigabitEthernet0/1', 'Serial0/0/0'], isL3: true, power: true },

    // Switches
    'sw_2960': { id: 'sw_2960', category: 'network_devices', sub: 'switches', name: 'Catalyst 2960 Switch', model: 'WS-C2960-24TT-L', icon: 'fa-solid fa-server text-emerald-400', bg: 'bg-emerald-950/80 border-emerald-700', ports: ['FastEthernet0/1', 'FastEthernet0/2', 'FastEthernet0/3', 'FastEthernet0/4', 'GigabitEthernet0/1'], isL3: false, power: true },
    'sw_3560': { id: 'sw_3560', category: 'network_devices', sub: 'switches', name: 'Cisco 3560 L3 Switch', model: 'WS-C3560-24PS', icon: 'fa-solid fa-layer-group text-teal-400', bg: 'bg-teal-950/80 border-teal-700', ports: ['FastEthernet0/1', 'FastEthernet0/2', 'FastEthernet0/3', 'GigabitEthernet0/1'], isL3: true, power: true },

    // Wireless & Security
    'fw_asa': { id: 'fw_asa', category: 'network_devices', sub: 'security', name: 'Cisco ASA 5505 Firewall', model: 'ASA 5505', icon: 'fa-solid fa-shield-halved text-red-400', bg: 'bg-red-950/80 border-red-700', ports: ['Ethernet0/0', 'Ethernet0/1', 'Management0/0'], isL3: true, power: true },
    'ap_home': { id: 'ap_home', category: 'network_devices', sub: 'wireless', name: 'Wireless Home Router', model: 'WRT300N', icon: 'fa-solid fa-wifi text-amber-400', bg: 'bg-amber-950/80 border-amber-700', ports: ['Internet0', 'Ethernet0', 'Wireless0'], isL3: true, power: true },

    // End Devices
    'dev_pc': { id: 'dev_pc', category: 'end_devices', sub: 'pc', name: 'PC Workstation', model: 'PC-PT', icon: 'fa-solid fa-desktop text-sky-400', bg: 'bg-sky-950/80 border-sky-700', ports: ['FastEthernet0'], isL3: false, power: true },
    'dev_laptop': { id: 'dev_laptop', category: 'end_devices', sub: 'laptop', name: 'Laptop Computer', model: 'Laptop-PT', icon: 'fa-solid fa-laptop text-cyan-400', bg: 'bg-cyan-950/80 border-cyan-700', ports: ['FastEthernet0', 'Wireless0'], isL3: false, power: true },
    'dev_server': { id: 'dev_server', category: 'end_devices', sub: 'server', name: 'Server (HTTP / DHCP)', model: 'Server-PT', icon: 'fa-solid fa-database text-purple-400', bg: 'bg-purple-950/80 border-purple-700', ports: ['FastEthernet0'], isL3: false, power: true },
    'dev_phone': { id: 'dev_phone', category: 'end_devices', sub: 'mobile', name: 'Smartphone', model: 'Smart-Phone', icon: 'fa-solid fa-mobile-screen-button text-emerald-300', bg: 'bg-emerald-950/80 border-emerald-700', ports: ['Wireless0'], isL3: false, power: true },
    'dev_printer': { id: 'dev_printer', category: 'end_devices', sub: 'printer', name: 'Network Printer', model: 'Printer-PT', icon: 'fa-solid fa-print text-pink-400', bg: 'bg-pink-950/80 border-pink-700', ports: ['FastEthernet0'], isL3: false, power: true }
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
        simulationMode: 'realtime',
        isSimPlaying: false,
        simSpeed: 1,
        zoomLevel: 1.0,
        browserUrl: '',
        browserOutput: ''
    };

    loadPacketTracerPreset('soho');
    renderPacketTracerCanvas();
}

function loadPacketTracerPreset(presetType) {
    packetTracerState.nodes = [];
    packetTracerState.connections = [];
    packetTracerState.simulationLogs = [];
    packetTracerState.notes = [];

    if (presetType === 'soho') {
        const router = createPTNode('r_2911', 'Router1', 340, 80, '192.168.1.1', '255.255.255.0');
        const switch1 = createPTNode('sw_2960', 'Switch1', 340, 210, '', '');
        const pc1 = createPTNode('dev_pc', 'PC-Sales', 140, 350, '192.168.1.10', '255.255.255.0', '192.168.1.1');
        const pc2 = createPTNode('dev_pc', 'PC-Finance', 340, 350, '192.168.1.11', '255.255.255.0', '192.168.1.1');
        const server = createPTNode('dev_server', 'Web-Server', 540, 350, '192.168.1.100', '255.255.255.0', '192.168.1.1');

        server.htmlContent = `
            <!DOCTYPE html>
            <html>
            <body style="background:#0f172a; color:#38bdf8; font-family:sans-serif; text-align:center; padding:30px;">
                <h1 style="color:#22c65e;">Welcome to LetsDoIn Corporate Web Server!</h1>
                <p style="color:#e2e8f0;">Hosted on Cisco Packet Tracer Simulated Enterprise Infrastructure</p>
                <div style="margin-top:20px; padding:15px; background:#1e293b; border-radius:10px; display:inline-block; border:1px solid #334155;">
                    <strong style="color:#f59e0b;">Server Status: 200 OK</strong> | HTTP/1.1 Active
                </div>
            </body>
            </html>
        `;

        packetTracerState.nodes.push(router, switch1, pc1, pc2, server);

        connectPTPorts(router.id, 'GigabitEthernet0/0', switch1.id, 'GigabitEthernet0/1');
        connectPTPorts(pc1.id, 'FastEthernet0', switch1.id, 'FastEthernet0/1');
        connectPTPorts(pc2.id, 'FastEthernet0', switch1.id, 'FastEthernet0/2');
        connectPTPorts(server.id, 'FastEthernet0', switch1.id, 'FastEthernet0/3');

        packetTracerState.notes.push({ x: 120, y: 430, text: 'Sales LAN: 192.168.1.0/24' });

        addPTSimLog('System', 'Topology Presets', 'Loaded SOHO Office Network preset (192.168.1.0/24)', 'SUCCESS');
    } else if (presetType === 'wan') {
        const r1 = createPTNode('r_2911', 'Router-London', 200, 110, '10.0.0.1', '255.255.255.252');
        const r2 = createPTNode('r_2911', 'Router-Manchester', 500, 110, '10.0.0.2', '255.255.255.252');

        const s1 = createPTNode('sw_2960', 'Switch-London', 200, 230, '', '');
        const s2 = createPTNode('sw_2960', 'Switch-Manchester', 500, 230, '', '');

        const pc1 = createPTNode('dev_pc', 'PC-London', 200, 360, '192.168.10.5', '255.255.255.0', '192.168.10.1');
        const pc2 = createPTNode('dev_pc', 'PC-Manchester', 500, 360, '192.168.20.5', '255.255.255.0', '192.168.20.1');

        packetTracerState.nodes.push(r1, r2, s1, s2, pc1, pc2);

        connectPTPorts(r1.id, 'Serial0/0/0', r2.id, 'Serial0/0/0');
        connectPTPorts(r1.id, 'GigabitEthernet0/0', s1.id, 'GigabitEthernet0/1');
        connectPTPorts(r2.id, 'GigabitEthernet0/0', s2.id, 'GigabitEthernet0/1');
        connectPTPorts(pc1.id, 'FastEthernet0', s1.id, 'FastEthernet0/1');
        connectPTPorts(pc2.id, 'FastEthernet0', s2.id, 'FastEthernet0/1');

        addPTSimLog('System', 'Topology Presets', 'Loaded Enterprise Dual Router WAN Link preset', 'SUCCESS');
    } else {
        addPTSimLog('System', 'Topology Presets', 'Cleared canvas for blank custom topology', 'INFO');
    }

    renderPacketTracerCanvas();
}

function createPTNode(catKey, name, x, y, ip = '', mask = '255.255.255.0', gateway = '') {
    const catalog = PT_CATALOG[catKey] || PT_CATALOG.dev_pc;
    const nodeId = `${catKey}_${Math.floor(Math.random() * 8999 + 1000)}`;

    const ports = catalog.ports.map(pName => ({
        id: pName,
        status: 'up',
        connectedTo: null
    }));

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
        cliHistory: [
            `Cisco IOS Software, ${catalog.name} (${catalog.model}), Version 15.2(4)M6`,
            `Technical Support: http://www.cisco.com/techsupport`,
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

    const tools = ['select', 'inspect', 'delete', 'note', 'simple_pdu', 'cable'];
    tools.forEach(t => {
        const btn = document.getElementById(`pt-tool-${t}`);
        if (btn) {
            btn.className = 'p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition text-sm';
        }
    });

    const activeBtn = document.getElementById(`pt-tool-${toolKey}`);
    if (activeBtn) {
        activeBtn.className = 'p-2 rounded-lg bg-violet-600 text-white font-bold transition text-sm shadow-md';
    }

    if (toolKey === 'note') {
        const noteText = prompt('Enter canvas note text:', 'VLAN 10 Sales Subnet');
        if (noteText) {
            packetTracerState.notes.push({ x: 200, y: 200, text: noteText });
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
            <button onclick="selectPTSubCategory('routers')" class="px-2.5 py-1 rounded-md text-[11px] font-bold ${packetTracerState.activeSubCategory === 'routers' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}">Routers</button>
            <button onclick="selectPTSubCategory('switches')" class="px-2.5 py-1 rounded-md text-[11px] font-bold ${packetTracerState.activeSubCategory === 'switches' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}">Switches</button>
            <button onclick="selectPTSubCategory('security')" class="px-2.5 py-1 rounded-md text-[11px] font-bold ${packetTracerState.activeSubCategory === 'security' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}">Security</button>
            <button onclick="selectPTSubCategory('wireless')" class="px-2.5 py-1 rounded-md text-[11px] font-bold ${packetTracerState.activeSubCategory === 'wireless' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}">Wireless</button>
        `;
    } else if (packetTracerState.activeCategory === 'end_devices') {
        subNav.innerHTML = `
            <button onclick="selectPTSubCategory('pc')" class="px-2.5 py-1 rounded-md text-[11px] font-bold ${packetTracerState.activeSubCategory === 'pc' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}">Computers</button>
            <button onclick="selectPTSubCategory('server')" class="px-2.5 py-1 rounded-md text-[11px] font-bold ${packetTracerState.activeSubCategory === 'server' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}">Servers</button>
            <button onclick="selectPTSubCategory('mobile')" class="px-2.5 py-1 rounded-md text-[11px] font-bold ${packetTracerState.activeSubCategory === 'mobile' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}">Smart Devices</button>
        `;
    } else {
        subNav.innerHTML = `
            <button onclick="packetTracerState.cableType='straight'; setPTTool('cable');" class="px-2.5 py-1 rounded-md text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">Straight-Through Copper</button>
            <button onclick="packetTracerState.cableType='crossover'; setPTTool('cable');" class="px-2.5 py-1 rounded-md text-[11px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">Cross-Over</button>
            <button onclick="packetTracerState.cableType='fiber'; setPTTool('cable');" class="px-2.5 py-1 rounded-md text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">Fiber Cable</button>
        `;
    }

    // Filter matching catalog items
    const matchingKeys = Object.keys(PT_CATALOG).filter(k => {
        const item = PT_CATALOG[k];
        return item.category === packetTracerState.activeCategory && (item.sub === packetTracerState.activeSubCategory || packetTracerState.activeCategory === 'cables');
    });

    devGrid.innerHTML = matchingKeys.map(k => {
        const dev = PT_CATALOG[k];
        return `
            <button onclick="addDeviceToCanvas('${k}')" class="p-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 transition text-left flex items-center space-x-2 group shadow-sm">
                <div class="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-sm">
                    <i class="${dev.icon}"></i>
                </div>
                <div>
                    <div class="text-[11px] font-bold text-slate-200">${dev.name}</div>
                    <div class="text-[9px] text-slate-400 font-mono">${dev.model}</div>
                </div>
            </button>
        `;
    }).join('');
}

function addDeviceToCanvas(catKey) {
    const catalog = PT_CATALOG[catKey];
    if (!catalog) return;

    const nodeName = `${catalog.model.split(' ')[0]}-${packetTracerState.nodes.length + 1}`;
    const x = Math.floor(Math.random() * 250) + 200;
    const y = Math.floor(Math.random() * 180) + 120;

    const newNode = createPTNode(catKey, nodeName, x, y);
    packetTracerState.nodes.push(newNode);

    addPTSimLog('Canvas', 'Device Added', `Added ${newNode.name} (${newNode.model})`, 'SUCCESS');
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

    addPTSimLog('Canvas', 'Device Deleted', `Removed device ${nodeId}`, 'INFO');
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
        container.innerHTML = `<tr><td colspan="5" class="p-2.5 text-center text-slate-500 italic">No network event simulation logs recorded yet.</td></tr>`;
        return;
    }

    container.innerHTML = packetTracerState.simulationLogs.map((log) => `
        <tr class="hover:bg-slate-800/60 transition border-b border-slate-800/60">
            <td class="p-2 font-mono text-slate-400">${log.time}</td>
            <td class="p-2 font-bold text-slate-200">${escapeHtml(log.source)}</td>
            <td class="p-2 font-bold text-slate-300">${escapeHtml(log.destination)}</td>
            <td class="p-2 text-slate-300">${escapeHtml(log.detail)}</td>
            <td class="p-2">
                <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    log.status === 'SUCCESS' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                    log.status === 'FAILED' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                    'bg-blue-500/20 text-blue-400 border border-blue-500/30'
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

    if (!srcNode.ip || !dstNode.ip) {
        addPTSimLog(srcNode.name, dstNode.name, 'ICMP Ping Failed: Unconfigured IP Address', 'FAILED');
        showToast('Ping Failed: IP address not configured');
        return;
    }

    const isConnected = checkPTReachability(srcNode.id, dstNode.id);

    if (isConnected) {
        const rtt = Math.floor(Math.random() * 10 + 2);
        addPTSimLog(srcNode.name, dstNode.name, `ICMP Echo Request/Reply -> ${dstNode.ip} (${rtt}ms)`, 'SUCCESS');
        showToast(`Ping SUCCESS: ${srcNode.name} -> ${dstNode.name} (${dstNode.ip}) in ${rtt}ms`);
        animatePTPacket(srcNode.id, dstNode.id);
    } else {
        addPTSimLog(srcNode.name, dstNode.name, `ICMP Echo Request -> ${dstNode.ip} (Host Unreachable)`, 'FAILED');
        showToast(`Ping FAILED: Request timed out to ${dstNode.ip}`);
    }
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
                if (p.connectedTo && !visited.has(p.connectedTo.nodeId)) {
                    queue.push(p.connectedTo.nodeId);
                }
            });
        }
    }

    return false;
}

function animatePTPacket(srcNodeId, dstNodeId) {
    const srcNode = packetTracerState.nodes.find(n => n.id === srcNodeId);
    const dstNode = packetTracerState.nodes.find(n => n.id === dstNodeId);

    if (!srcNode || !dstNode) return;

    const overlay = document.getElementById('pt-packet-animation-overlay');
    if (!overlay) return;

    const packetElem = document.createElement('div');
    packetElem.className = 'absolute w-5 h-5 rounded-lg bg-amber-400 border-2 border-white shadow-xl z-30 transition-all duration-1000 ease-in-out flex items-center justify-center text-[10px] font-black text-slate-900';
    packetElem.innerHTML = '<i class="fa-solid fa-envelope"></i>';
    packetElem.style.left = `${srcNode.x + 24}px`;
    packetElem.style.top = `${srcNode.y + 24}px`;

    overlay.appendChild(packetElem);

    setTimeout(() => {
        packetElem.style.left = `${dstNode.x + 24}px`;
        packetElem.style.top = `${dstNode.y + 24}px`;
    }, 50);

    setTimeout(() => {
        if (overlay.contains(packetElem)) overlay.removeChild(packetElem);
    }, 1100);
}

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

    const activeStyle = 'px-3 py-1.5 rounded-lg bg-violet-600 text-white font-bold text-xs shadow-sm';
    const inactiveStyle = 'px-3 py-1.5 rounded-lg text-slate-400 hover:text-white font-bold text-xs';

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
                <div class="space-y-4 font-mono text-xs text-slate-300">
                    <div class="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                        <div>
                            <div class="font-bold text-slate-100 text-sm">${escapeHtml(node.name)} Hardware Chassis</div>
                            <div class="text-slate-400">Model: ${catalog.model} | Power Status: <span class="${node.power ? 'text-emerald-400' : 'text-red-400'} font-bold">${node.power ? 'ONLINE' : 'OFF'}</span></div>
                        </div>
                        <button onclick="toggleNodePower('${node.id}')" class="px-4 py-2 rounded-xl font-bold text-xs transition shadow-lg flex items-center gap-2 ${node.power ? 'bg-red-600 hover:bg-red-500 text-white' : 'bg-emerald-600 hover:bg-emerald-500 text-white'}">
                            <i class="fa-solid fa-power-off"></i> ${node.power ? 'Power Off' : 'Power On'}
                        </button>
                    </div>

                    <div class="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                        <div class="font-bold text-slate-200 uppercase tracking-wider text-[11px] text-indigo-400">Interface Ports & Status LEDs</div>
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            ${node.ports.map(p => `
                                <div class="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
                                    <span class="font-bold text-slate-300"><i class="fa-solid fa-plug text-indigo-400 mr-1.5"></i> ${p.id}</span>
                                    <span class="flex items-center gap-1.5">
                                        <span class="w-2.5 h-2.5 rounded-full ${p.connectedTo && node.power ? 'bg-emerald-400 animate-pulse' : 'bg-red-500'}"></span>
                                        <span class="text-[10px] uppercase font-bold text-slate-400">${p.connectedTo && node.power ? 'UP' : 'DOWN'}</span>
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
                    <div class="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                        <div class="font-bold text-slate-200 uppercase tracking-wider text-[11px] text-indigo-400">Global Device Settings</div>
                        <div>
                            <label class="block text-slate-400 mb-1">Hostname / Label</label>
                            <input type="text" id="pt-cfg-hostname" value="${escapeHtml(node.name)}" class="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white outline-none">
                        </div>
                    </div>

                    <div class="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                        <div class="font-bold text-slate-200 uppercase tracking-wider text-[11px] text-emerald-400">IPv4 Configuration</div>
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                                <label class="block text-slate-400 mb-1">IP Address</label>
                                <input type="text" id="pt-cfg-ip" value="${escapeHtml(node.ip)}" placeholder="e.g. 192.168.1.10" class="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white outline-none">
                            </div>
                            <div>
                                <label class="block text-slate-400 mb-1">Subnet Mask</label>
                                <input type="text" id="pt-cfg-mask" value="${escapeHtml(node.mask)}" placeholder="255.255.255.0" class="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white outline-none">
                            </div>
                        </div>
                        <div>
                            <label class="block text-slate-400 mb-1">Default Gateway</label>
                            <input type="text" id="pt-cfg-gateway" value="${escapeHtml(node.gateway)}" placeholder="e.g. 192.168.1.1" class="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white outline-none">
                        </div>
                    </div>

                    <button onclick="savePTDeviceConfig()" class="w-full py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs transition shadow-lg">
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
                    <div class="flex items-center space-x-2 border-b border-slate-800 pb-3">
                        <button onclick="packetTracerState.activeDesktopApp='ipconfig'; renderPTModalContent();" class="px-3 py-2 rounded-xl border border-slate-800 bg-slate-950 hover:bg-slate-800 text-slate-200 font-bold flex items-center gap-1.5">
                            <i class="fa-solid fa-sliders text-indigo-400"></i> IP Config
                        </button>
                        <button onclick="packetTracerState.activeDesktopApp='prompt'; renderPTModalContent();" class="px-3 py-2 rounded-xl border border-slate-800 bg-slate-950 hover:bg-slate-800 text-slate-200 font-bold flex items-center gap-1.5">
                            <i class="fa-solid fa-terminal text-emerald-400"></i> Command Prompt
                        </button>
                        <button onclick="packetTracerState.activeDesktopApp='browser'; renderPTModalContent();" class="px-3 py-2 rounded-xl border border-slate-800 bg-slate-950 hover:bg-slate-800 text-slate-200 font-bold flex items-center gap-1.5">
                            <i class="fa-solid fa-globe text-blue-400"></i> Web Browser
                        </button>
                    </div>

                    ${packetTracerState.activeDesktopApp === 'ipconfig' ? `
                        <div class="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                            <div class="font-bold text-slate-200 uppercase tracking-wider text-[11px] text-sky-400">Desktop IP Configuration Application</div>
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                    <label class="block text-slate-400 mb-1">IPv4 Address</label>
                                    <input type="text" id="pt-desktop-ip" value="${escapeHtml(node.ip)}" class="w-full p-2 rounded-lg bg-slate-900 border border-slate-800 text-white outline-none">
                                </div>
                                <div>
                                    <label class="block text-slate-400 mb-1">Subnet Mask</label>
                                    <input type="text" id="pt-desktop-mask" value="${escapeHtml(node.mask)}" class="w-full p-2 rounded-lg bg-slate-900 border border-slate-800 text-white outline-none">
                                </div>
                            </div>
                            <div>
                                <label class="block text-slate-400 mb-1">Default Gateway</label>
                                <input type="text" id="pt-desktop-gw" value="${escapeHtml(node.gateway)}" class="w-full p-2 rounded-lg bg-slate-900 border border-slate-800 text-white outline-none">
                            </div>
                            <button onclick="savePTDesktopIP()" class="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs transition">Apply Settings</button>
                        </div>
                    ` : packetTracerState.activeDesktopApp === 'browser' ? `
                        <div class="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                            <div class="flex items-center space-x-2">
                                <span class="font-bold text-slate-400 text-xs">URL:</span>
                                <input type="text" id="pt-browser-url-input" value="${escapeHtml(packetTracerState.browserUrl || 'http://192.168.1.100')}" placeholder="http://192.168.1.100" class="flex-1 p-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs outline-none">
                                <button onclick="executePTBrowserGo()" class="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs">Go</button>
                            </div>
                            <div id="pt-browser-output-frame" class="h-56 rounded-xl bg-white p-3 overflow-y-auto text-slate-900 font-sans border border-slate-300">
                                ${packetTracerState.browserOutput || '<div class="text-slate-400 text-center py-10 font-sans italic">Enter HTTP Web Server URL (e.g. http://192.168.1.100) and click Go</div>'}
                            </div>
                        </div>
                    ` : `
                        <div class="flex flex-col h-[280px] rounded-xl bg-slate-950 border border-slate-800 p-3 font-mono text-xs text-emerald-400">
                            <div id="pt-prompt-logs" class="flex-1 overflow-y-auto whitespace-pre-wrap leading-relaxed space-y-1">
                                <div>Cisco Packet Tracer Command Prompt [Version 10.0.19045]</div>
                                <div>(c) Cisco Systems. All rights reserved.</div>
                                <div>Type "ipconfig" or "ping <ip>" to begin...</div>
                            </div>
                            <div class="pt-2 border-t border-slate-900 flex items-center space-x-2">
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
            const promptSymbol = node.iosMode === 'config' ? `${node.hostname}(config)#` : node.iosMode === 'enable' ? `${node.hostname}#` : `${node.hostname}>`;

            bodyCli.innerHTML = `
                <div class="flex flex-col h-[340px] rounded-xl bg-slate-950 border border-slate-800 p-3 font-mono text-xs text-emerald-400 overflow-hidden">
                    <div id="pt-cli-terminal-logs" class="flex-1 overflow-y-auto whitespace-pre-wrap leading-relaxed space-y-1">
                        ${node.cliHistory.map(line => `<div>${escapeHtml(line)}</div>`).join('')}
                    </div>
                    <div class="pt-2 border-t border-slate-900 flex items-center space-x-2">
                        <span class="font-bold text-slate-300 text-xs">${escapeHtml(promptSymbol)}</span>
                        <input type="text" id="pt-cli-input" onkeydown="handlePTCliKeyDown(event)" placeholder="Type Cisco command (enable, conf t, show ip int br, ping 192.168.1.1)..." class="flex-1 bg-transparent text-emerald-300 outline-none font-mono text-xs">
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

    showToast('Desktop IP Settings Saved!');
    renderPacketTracerCanvas();
}

function executePTBrowserGo() {
    const node = packetTracerState.nodes.find(n => n.id === packetTracerState.selectedNodeId);
    const urlInput = document.getElementById('pt-browser-url-input');
    if (!node || !urlInput) return;

    let targetUrl = urlInput.value.trim().replace('http://', '').replace('/', '');
    packetTracerState.browserUrl = `http://${targetUrl}`;

    const targetServer = packetTracerState.nodes.find(n => n.ip === targetUrl);

    if (targetServer && checkPTReachability(node.id, targetServer.id)) {
        packetTracerState.browserOutput = targetServer.htmlContent || `<h2 style="color:#10b981;">Cisco Simulated Web Server</h2><p>Response 200 OK from ${targetServer.ip}</p>`;
        addPTSimLog(node.name, targetServer.name, `HTTP GET -> http://${targetUrl} (200 OK)`, 'SUCCESS');
        showToast('HTTP 200 OK Response Received!');
    } else {
        packetTracerState.browserOutput = `<div style="color:#ef4444; font-weight:bold; text-align:center; padding:20px;">Request Timeout (404 / 504 Host Unreachable)</div>`;
        addPTSimLog(node.name, targetUrl, `HTTP GET Failed -> http://${targetUrl}`, 'FAILED');
        showToast('HTTP Request Timed Out!');
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

            const targetNode = packetTracerState.nodes.find(n => n.ip === targetIp);
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

    node.name = document.getElementById('pt-cfg-hostname').value.trim() || node.name;
    node.hostname = node.name;
    node.ip = document.getElementById('pt-cfg-ip').value.trim();
    node.mask = document.getElementById('pt-cfg-mask').value.trim();
    node.gateway = document.getElementById('pt-cfg-gateway').value.trim();

    addPTSimLog(node.name, 'Config', `Updated IP: ${node.ip || 'Unset'}, GW: ${node.gateway}`, 'SUCCESS');
    showToast('Device configuration saved!');
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

    const promptSymbol = node.iosMode === 'config' ? `${node.hostname}(config)#` : node.iosMode === 'enable' ? `${node.hostname}#` : `${node.hostname}>`;
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
    } else if (lower.startsWith('hostname ')) {
        const newHost = cmd.split(' ')[1];
        if (newHost) {
            node.hostname = newHost;
            node.name = newHost;
        }
    } else if (lower === 'exit' || lower === 'end') {
        if (node.iosMode === 'config') node.iosMode = 'enable';
        else if (node.iosMode === 'enable') node.iosMode = 'user';
    } else if (lower === 'show ip interface brief' || lower === 'sh ip int br') {
        node.cliHistory.push(`Interface              IP-Address      OK? Method Status                Protocol`);
        node.ports.forEach(p => {
            node.cliHistory.push(`${p.id.padEnd(22, ' ')} ${(node.ip || 'unassigned').padEnd(15, ' ')} YES manual ${p.connectedTo ? 'up' : 'down'}                    up`);
        });
    } else if (lower === 'show running-config' || lower === 'sh run') {
        node.cliHistory.push(`Building configuration...`);
        node.cliHistory.push(`Current configuration : 1024 bytes`);
        node.cliHistory.push(`!`);
        node.cliHistory.push(`version 15.2`);
        node.cliHistory.push(`hostname ${node.hostname}`);
        node.cliHistory.push(`!`);
        node.cliHistory.push(`interface FastEthernet0/0`);
        node.cliHistory.push(` ip address ${node.ip || 'unassigned'} ${node.mask || '255.255.255.0'}`);
        node.cliHistory.push(`!`);
        node.cliHistory.push(`end`);
    } else if (lower.startsWith('ping ')) {
        const targetIp = cmd.split(' ')[1];
        node.cliHistory.push(`Type escape sequence to abort.`);
        node.cliHistory.push(`Sending 5, 100-byte ICMP Echos to ${targetIp}, timeout is 2 seconds:`);

        const targetNode = packetTracerState.nodes.find(n => n.ip === targetIp);
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
        node.cliHistory.push(`  hostname <name>          Set device hostname`);
        node.cliHistory.push(`  show ip interface brief  Show port status and IP addresses`);
        node.cliHistory.push(`  show running-config      Display active device configuration`);
        node.cliHistory.push(`  ping <ip_address>        Execute ICMP Ping test`);
        node.cliHistory.push(`  exit                     Exit current configuration mode`);
    } else {
        node.cliHistory.push(`% Invalid command or syntax error at '^' marker.`);
    }

    renderPTModalContent();
}

function handleNodeCanvasClick(nodeId) {
    if (packetTracerState.activeTool === 'delete') {
        deletePTNode(nodeId);
        return;
    }

    if (packetTracerState.activeTool === 'simple_pdu') {
        if (!packetTracerState.selectedNodeId) {
            packetTracerState.selectedNodeId = nodeId;
            showToast(`Source selected: ${nodeId}. Now click target device to Ping.`);
        } else {
            executePTPing(packetTracerState.selectedNodeId, nodeId);
            packetTracerState.selectedNodeId = null;
        }
        return;
    }

    if (packetTracerState.activeTool === 'cable') {
        const node = packetTracerState.nodes.find(n => n.id === nodeId);
        if (!node) return;

        const freePort = node.ports.find(p => !p.connectedTo);
        if (!freePort) {
            showToast(`No free interface ports available on ${node.name}!`);
            return;
        }

        if (!packetTracerState.pendingCableStart) {
            packetTracerState.pendingCableStart = { nodeId: node.id, portId: freePort.id };
            showToast(`Cable plugged into ${node.name} (${freePort.id}). Select target device.`);
        } else {
            const start = packetTracerState.pendingCableStart;
            if (start.nodeId === node.id) {
                showToast('Cannot connect cable to the same device!');
                packetTracerState.pendingCableStart = null;
                return;
            }

            connectPTPorts(start.nodeId, start.portId, node.id, freePort.id, packetTracerState.cableType);
            addPTSimLog('Cable', 'Connection Created', `Connected ${start.nodeId}:${start.portId} <-> ${node.id}:${freePort.id}`, 'SUCCESS');
            showToast(`Connected ${start.portId} to ${freePort.id}!`);
            packetTracerState.pendingCableStart = null;
            renderPacketTracerCanvas();
        }
        return;
    }

    openPTDeviceWorkbench(nodeId);
}

function renderPacketTracerCanvas() {
    const canvasContainer = document.getElementById('pt-canvas-workspace');
    if (!canvasContainer) return;

    // Render Cable Connections SVG Lines
    let svgLines = '';
    packetTracerState.connections.forEach(conn => {
        const n1 = packetTracerState.nodes.find(n => n.id === conn.fromNodeId);
        const n2 = packetTracerState.nodes.find(n => n.id === conn.toNodeId);

        if (n1 && n2) {
            const x1 = n1.x + 32;
            const y1 = n1.y + 32;
            const x2 = n2.x + 32;
            const y2 = n2.y + 32;

            const strokeColor = conn.cableType === 'fiber' ? '#38bdf8' : conn.cableType === 'crossover' ? '#f59e0b' : '#10b981';

            svgLines += `
                <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${strokeColor}" stroke-width="3" stroke-dasharray="${conn.cableType === 'crossover' ? '6,3' : 'none'}" />
                <circle cx="${x1}" cy="${y1}" r="4" fill="${n1.power ? '#34d399' : '#ef4444'}" />
                <circle cx="${x2}" cy="${y2}" r="4" fill="${n2.power ? '#34d399' : '#ef4444'}" />
            `;
        }
    });

    // Render Canvas Notes
    let notesHtml = packetTracerState.notes.map(note => `
        <div style="left: ${note.x}px; top: ${note.y}px;" class="absolute z-10 px-2 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-[11px] shadow-sm">
            <i class="fa-solid fa-sticky-note mr-1 text-amber-400"></i> ${escapeHtml(note.text)}
        </div>
    `).join('');

    // Render Nodes
    let nodesHtml = packetTracerState.nodes.map(node => {
        const catalog = PT_CATALOG[node.catKey] || PT_CATALOG.dev_pc;
        const isSelected = packetTracerState.selectedNodeId === node.id;

        return `
            <div id="pt-node-${node.id}"
                 onclick="handleNodeCanvasClick('${node.id}')"
                 style="left: ${node.x}px; top: ${node.y}px;"
                 class="absolute cursor-pointer group z-20 flex flex-col items-center select-none transition-transform hover:scale-105">
                <div class="w-16 h-16 rounded-2xl ${catalog.bg} border-2 ${isSelected ? 'ring-4 ring-amber-400' : ''} shadow-2xl flex flex-col items-center justify-center p-2 relative">
                    <i class="${catalog.icon} text-2xl"></i>
                    <span class="w-2.5 h-2.5 rounded-full ${node.power ? 'bg-emerald-400' : 'bg-red-500'} absolute top-1.5 right-1.5 border border-slate-900 shadow-md"></span>
                </div>
                <div class="mt-1 px-2 py-0.5 rounded-md bg-slate-900/90 border border-slate-800 text-[11px] font-bold text-slate-200 text-center shadow-lg font-mono">
                    ${escapeHtml(node.name)}
                    ${node.ip ? `<span class="block text-[9px] text-amber-400">${escapeHtml(node.ip)}</span>` : ''}
                </div>
            </div>
        `;
    }).join('');

    canvasContainer.innerHTML = `
        <svg class="absolute inset-0 w-full h-full pointer-events-none z-10">
            ${svgLines}
        </svg>
        <div id="pt-packet-animation-overlay" class="absolute inset-0 pointer-events-none z-30"></div>
        ${notesHtml}
        ${nodesHtml}
    `;

    renderPTSimulationLogs();
}

function togglePacketTracerFullScreen() {
    const container = document.getElementById('packet-tracer-container');
    const icon = document.getElementById('pt-fullscreen-icon');
    const text = document.getElementById('pt-fullscreen-text');

    if (!container) return;

    packetTracerState.isFullScreen = !packetTracerState.isFullScreen;

    if (packetTracerState.isFullScreen) {
        container.classList.add('fixed', 'inset-0', 'z-50', 'bg-slate-950', 'p-3', 'overflow-y-auto', 'flex', 'flex-col', 'h-screen');
        document.body.classList.add('overflow-hidden');
        if (icon) icon.className = 'fa-solid fa-compress';
        if (text) text.innerText = 'Exit Fullscreen';
        showToast('Full Screen Mode Active');
    } else {
        container.classList.remove('fixed', 'inset-0', 'z-50', 'bg-slate-950', 'p-3', 'overflow-y-auto', 'flex', 'flex-col', 'h-screen');
        document.body.classList.remove('overflow-hidden');
        if (icon) icon.className = 'fa-solid fa-expand';
        if (text) text.innerText = 'Fullscreen';
        showToast('Exited Full Screen Mode');
    }
}

const TOOL_PACKET_TRACER = {
    id: 'cisco-packet-tracer',
    name: 'Cisco Packet Tracer Online Simulator',
    category: 'Developer & Text',
    icon: 'fa-network-wired',
    color: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-950/50',
    shortDesc: 'Professional online Cisco Packet Tracer network topology simulator with routers, switches, PCs, Cisco IOS CLI terminal, cables, and live ICMP packet ping simulation.',
    seoDesc: 'Free online Cisco Packet Tracer network simulator. Build interactive network topologies with Cisco 2911 routers, Catalyst switches, Cisco IOS CLI command terminal, IP routing, and live ICMP ping packet simulation.',
    render: () => `
        <div id="packet-tracer-container" class="space-y-3 select-none">
            <!-- Cisco Top Action Ribbon -->
            <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 p-2.5 rounded-2xl bg-slate-900 border border-slate-800 text-white shadow-2xl">
                <div class="flex items-center space-x-3">
                    <div class="w-9 h-9 rounded-xl bg-indigo-600/30 border border-indigo-500/40 text-indigo-400 flex items-center justify-center font-black text-base shadow-inner">
                        <i class="fa-solid fa-network-wired"></i>
                    </div>
                    <div>
                        <div class="font-black text-white text-xs sm:text-sm flex items-center gap-1.5">
                            Cisco Packet Tracer Online <span class="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-extrabold border border-indigo-500/30">v8.2 Pro IDE</span>
                        </div>
                        <div class="text-[10px] text-slate-400 font-mono">Full Network Topology & Cisco IOS Command Line Simulator</div>
                    </div>
                </div>

                <!-- Action Ribbon Tools -->
                <div class="flex flex-wrap items-center gap-1.5 justify-end">
                    <select onchange="loadPacketTracerPreset(this.value)" class="px-2 py-1 rounded-xl border border-slate-700 bg-slate-800 text-slate-200 text-xs font-bold outline-none cursor-pointer">
                        <option value="soho">Preset: SOHO Office Network</option>
                        <option value="wan">Preset: Enterprise Dual Router WAN</option>
                        <option value="blank">Blank Canvas</option>
                    </select>

                    <div class="flex items-center space-x-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
                        <button onclick="setPTTool('select')" id="pt-tool-select" title="Select / Drag (Esc)" class="p-2 rounded-lg bg-violet-600 text-white font-bold transition text-sm shadow-md">
                            <i class="fa-solid fa-hand-pointer"></i>
                        </button>
                        <button onclick="setPTTool('inspect')" id="pt-tool-inspect" title="Inspect Port Status" class="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition text-sm">
                            <i class="fa-solid fa-magnifying-glass"></i>
                        </button>
                        <button onclick="setPTTool('delete')" id="pt-tool-delete" title="Delete Item" class="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition text-sm">
                            <i class="fa-solid fa-trash text-red-400"></i>
                        </button>
                        <button onclick="setPTTool('note')" id="pt-tool-note" title="Add Canvas Sticky Note" class="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition text-sm">
                            <i class="fa-solid fa-sticky-note text-amber-400"></i>
                        </button>
                        <button onclick="setPTTool('simple_pdu')" id="pt-tool-simple_pdu" title="Send Simple ICMP PDU Packet" class="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition text-sm">
                            <i class="fa-solid fa-envelope text-emerald-400"></i>
                        </button>
                    </div>

                    <button onclick="togglePacketTracerFullScreen()" class="px-3 py-1.5 rounded-xl border border-slate-700 bg-slate-800 text-slate-200 text-xs font-bold transition flex items-center gap-1.5">
                        <i id="pt-fullscreen-icon" class="fa-solid fa-expand text-indigo-400"></i>
                        <span id="pt-fullscreen-text" class="hidden sm:inline">Fullscreen</span>
                    </button>
                </div>
            </div>

            <!-- Workspace Canvas & Palette -->
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-3">
                <!-- Canvas Workspace -->
                <div class="lg:col-span-9 flex flex-col space-y-3">
                    <div id="pt-canvas-workspace" class="relative w-full h-[460px] rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden shadow-2xl bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px]">
                        <!-- SVG connections & Nodes rendered here -->
                    </div>

                    <!-- Bottom Category Toolbar (Authentic Cisco PT Palette) -->
                    <div class="p-2.5 rounded-2xl bg-slate-900 border border-slate-800 text-white space-y-2 shadow-xl">
                        <!-- Category Tabs -->
                        <div class="flex items-center space-x-2 border-b border-slate-800 pb-2">
                            <button onclick="selectPTCategory('network_devices')" class="px-3 py-1 rounded-lg bg-slate-800 text-indigo-400 font-bold text-xs flex items-center gap-1.5">
                                <i class="fa-solid fa-network-wired"></i> Network Devices
                            </button>
                            <button onclick="selectPTCategory('end_devices')" class="px-3 py-1 rounded-lg text-slate-400 hover:text-white font-bold text-xs flex items-center gap-1.5">
                                <i class="fa-solid fa-desktop"></i> End Devices
                            </button>
                            <button onclick="selectPTCategory('cables')" class="px-3 py-1 rounded-lg text-slate-400 hover:text-white font-bold text-xs flex items-center gap-1.5">
                                <i class="fa-solid fa-plug text-amber-400"></i> Connections / Cables
                            </button>
                        </div>

                        <!-- Sub-Category Navigation Bar -->
                        <div id="pt-palette-subnav" class="flex items-center space-x-1 text-xs"></div>

                        <!-- Device Items Grid -->
                        <div id="pt-palette-devgrid" class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-2 pt-1"></div>
                    </div>
                </div>

                <!-- Simulation Log Side Panel -->
                <div class="lg:col-span-3 flex flex-col space-y-2">
                    <div class="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-white flex-1 flex flex-col space-y-2 shadow-xl">
                        <div class="flex items-center justify-between text-xs font-bold text-slate-300 border-b border-slate-800 pb-2">
                            <span><i class="fa-solid fa-list-check text-emerald-400 mr-1"></i> Simulation Event List</span>
                            <button onclick="packetTracerState.simulationLogs = []; renderPTSimulationLogs();" class="text-[10px] text-slate-400 hover:text-white underline">Clear</button>
                        </div>
                        <div class="overflow-x-auto rounded-xl border border-slate-800 flex-1 max-h-[500px]">
                            <table class="w-full text-left font-mono text-xs border-collapse">
                                <thead class="bg-slate-950 text-slate-400 sticky top-0">
                                    <tr class="border-b border-slate-800">
                                        <th class="p-1.5">Time</th>
                                        <th class="p-1.5">Src/Dst</th>
                                        <th class="p-1.5">Event</th>
                                        <th class="p-1.5">Status</th>
                                    </tr>
                                </thead>
                                <tbody id="pt-simulation-logs-body" class="divide-y divide-slate-800 text-slate-300">
                                    <!-- Event rows -->
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Cisco Device Workbench Modal -->
            <div id="pt-device-modal" class="hidden fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
                <div class="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden text-white flex flex-col max-h-[90vh]">
                    <div class="p-3.5 border-b border-slate-800 flex items-center justify-between">
                        <div id="pt-modal-title" class="font-bold text-sm text-slate-100">Device Workbench</div>
                        <button onclick="closePTDeviceWorkbench()" class="text-slate-400 hover:text-white text-lg"><i class="fa-solid fa-xmark"></i></button>
                    </div>

                    <div class="p-2 bg-slate-950 border-b border-slate-800 flex items-center space-x-2 px-4">
                        <button id="pt-modal-tab-cli" onclick="switchPTModalTab('cli')" class="px-3 py-1.5 rounded-lg bg-violet-600 text-white font-bold text-xs"><i class="fa-solid fa-terminal mr-1"></i> Cisco CLI</button>
                        <button id="pt-modal-tab-desktop" onclick="switchPTModalTab('desktop')" class="px-3 py-1.5 rounded-lg text-slate-400 hover:text-white font-bold text-xs"><i class="fa-solid fa-desktop mr-1"></i> Desktop Apps</button>
                        <button id="pt-modal-tab-config" onclick="switchPTModalTab('config')" class="px-3 py-1.5 rounded-lg text-slate-400 hover:text-white font-bold text-xs"><i class="fa-solid fa-sliders mr-1"></i> IP Config</button>
                        <button id="pt-modal-tab-physical" onclick="switchPTModalTab('physical')" class="px-3 py-1.5 rounded-lg text-slate-400 hover:text-white font-bold text-xs"><i class="fa-solid fa-microchip mr-1"></i> Physical View</button>
                    </div>

                    <div class="p-4 flex-1 overflow-y-auto">
                        <div id="pt-modal-body-cli"></div>
                        <div id="pt-modal-body-desktop" class="hidden"></div>
                        <div id="pt-modal-body-config" class="hidden"></div>
                        <div id="pt-modal-body-physical" class="hidden"></div>
                    </div>
                </div>
            </div>
        </div>
    `,
    init: () => {
        initPacketTracer();
        renderPTPaletteSubCategories();
    }
};
