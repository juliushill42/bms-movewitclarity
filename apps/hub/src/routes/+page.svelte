<script>
  import { onMount } from 'svelte';
  export let data;
  let canvas;

  let activeModel = null;
  let chatbotOpen = false;
  let currentStep = 0;
  let currentInput = '';
  let answers = { name: '', phone: '', email: '', type: '', scale: '', window: '', style: '', metrics: '', discovery: '' };

  const steps = [
    { key: 'name', label: 'Identity', text: 'Welcome to the Private Registry. To align our craftsmanship with your asset vision, may we record your full name?', type: 'text', placeholder: 'E.g., Sterling Vance' },
    { key: 'phone', label: 'Direct Line', text: () => `Thank you, ${answers.name}. What phone number should we use for secure communications?`, type: 'tel', placeholder: 'E.g., 470-453-8358' },
    { key: 'email', label: 'Secure Email', text: () => 'And your preferred email address for design proposals and estimations?', type: 'email', placeholder: 'E.g., vance@estate.com' },
    { key: 'type', label: 'Commission', text: () => 'What architectural or operational class are you looking to commission?', type: 'options', options: ['White-Glove Relocation', 'Custom Pergolas & Gazebos', 'Artisan Pathways & Stonework', 'Elite Landscape Maintenance', 'Deck Restoration & Carpentry'] },
    { key: 'scale', label: 'Spatial Scale', text: () => 'What is the physical footprint scale of the project site environment?', type: 'options', options: ['Intimate Property (< 500 sq ft)', 'Standard Estate (500 - 2,000 sq ft)', 'Expansive Acreage (> 2,000 sq ft)', 'Not Applicable (Pure Moving / Hauling)'] },
    { key: 'window', label: 'Execution', text: () => 'What is your operational target timeline for mobilization?', type: 'options', options: ['Immediate Mobilization', 'Within 1-3 Months', 'Flexible Planning / Off-Season'] },
    { key: 'style', label: 'Aesthetic Ethos', text: () => 'Which architectural design pattern matches your property profile?', type: 'options', options: ['Modern Minimalist', 'Classic Heritage Estate', 'Contemporary Transitional', 'Natural Woodland', 'Clean Functional Maintenance'] },
    { key: 'metrics', label: 'Constraints', text: () => 'Are there any explicit site parameters, grading issues, material choices, or specific inventory notes we should audit?', type: 'text', placeholder: 'E.g., Western Red Cedar, Tennessee Fieldstone, heavy items, steep grades...' },
    { key: 'discovery', label: 'Origin', text: () => 'Finally, how did you interface with the Bearded Man Services collective?', type: 'options', options: ['Exclusive Smart Card Scan', 'Active Local Project Site', 'Direct Peer Referral', 'Digital Registry Platform'] }
  ];

  function processChat(choice = null) {
    if (choice) {
      answers[steps[currentStep].key] = choice;
    } else {
      if (!currentInput.trim()) return;
      answers[steps[currentStep].key] = currentInput.trim();
    }
    currentInput = '';
    currentStep++;
  }

  $: mailtoLink = () => {
    const subject = encodeURIComponent(`BMS Private Registry Manifest: ${answers.name}`);
    const body = encodeURIComponent(
      `BEARDED MAN SERVICES - DETAILED PROJECT MANIFEST\n` +
      `=================================================\n\n` +
      `Client Profile:   ${answers.name}\n` +
      `Voice Comms:      ${answers.phone}\n` +
      `Digital Comms:    ${answers.email}\n\n` +
      `ARCHITECTURAL CLASSIFICATION MATRIX:\n` +
      `------------------------------------\n` +
      `Commission Tier:  ${answers.type}\n` +
      `Spatial Footprint: ${answers.scale}\n` +
      `Target Execution: ${answers.window}\n` +
      `Design Profile:   ${answers.style}\n\n` +
      `SPECIFIC ARCHITECTURAL INSTRUCTIONS & CONSTRAINTS:\n` +
      `${answers.metrics}\n\n` +
      `System Onboarding Verification Source: ${answers.discovery}\n`
    );
    return `mailto:Beardtobias@gmail.com?subject=${subject}&body=${body}`;
  };

  onMount(async () => {
    if (data.isHubHomepage) return;

    const THREE = await import('three');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const count = 120;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);

    for(let i = 0; i < count * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 8;
      positions[i+1] = (Math.random() - 0.5) * 12;
      positions[i+2] = (Math.random() - 0.8) * 4;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const pCanvas = document.createElement('canvas');
    pCanvas.width = 32; pCanvas.height = 32;
    const ctx = pCanvas.getContext('2d');
    const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    gradient.addColorStop(0, 'rgba(230, 198, 135, 0.9)'); 
    gradient.addColorStop(0.2, 'rgba(230, 198, 135, 0.3)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = gradient; ctx.fillRect(0, 0, 32, 32);
    const pTexture = new THREE.CanvasTexture(pCanvas);

    const material = new THREE.PointsMaterial({
      size: 0.28, map: pTexture, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false
    });

    const particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);
    camera.position.z = 5;

    let targetX = 0, targetY = 0, currentX = 0, currentY = 0;

    const handlePointerMove = (e) => {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      targetX = (clientX / window.innerWidth - 0.5) * 1.5;
      targetY = (clientY / window.innerHeight - 0.5) * 1.5;
    };

    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('touchmove', handlePointerMove);

    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;

      particleSystem.rotation.y = elapsedTime * 0.02 + currentX;
      particleSystem.rotation.x = elapsedTime * 0.01 + currentY;

      const scale = 1 + Math.sin(elapsedTime * 0.5) * 0.04;
      particleSystem.scale.set(scale, scale, scale);

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  });
</script>

{#if data.isHubHomepage}
  <main class="min-h-screen bg-[#030303] text-zinc-100 flex flex-col items-center justify-center p-6 font-['Inter'] relative overflow-hidden">
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(230,198,135,0.03),transparent_70%)] pointer-events-none"></div>
    <div class="max-w-md w-full text-center space-y-8 relative z-10">
      <div class="space-y-3">
        <span class="text-[10px] uppercase font-semibold tracking-[0.3em] text-[#E6C687] bg-[#E6C687]/5 px-3 py-1 rounded-full border border-[#E6C687]/10">Orchestration Platform</span>
        <h1 class="text-4xl font-light text-white tracking-tight font-['Cormorant_Garamond'] italic">Moving With Clarity</h1>
        <p class="text-zinc-500 text-xs font-light max-w-sm mx-auto leading-relaxed">A high-fidelity multi-tenant engine powering architectural digital spaces for premium craft collectives.</p>
      </div>
      <div class="h-[1px] bg-gradient-to-r from-transparent via-zinc-800 to-transparent"></div>
      <div class="flex flex-col gap-2 max-w-xs mx-auto">
        <a href="/admin/create" class="block bg-white text-black text-xs font-medium uppercase tracking-[0.2em] px-8 py-4 rounded-none hover:bg-[#E6C687] transition-all duration-500 shadow-2xl">Provisioning Center</a>
        <a href="/admin/assets" class="block bg-zinc-900 border border-white/5 text-zinc-400 text-xs font-medium uppercase tracking-[0.2em] px-8 py-4 rounded-none hover:text-white transition-all duration-500">Titan Asset Pipelines</a>
      </div>
    </div>
  </main>
{:else}
  <main class="relative min-h-screen bg-[#030303] font-['Inter'] overflow-x-hidden selection:bg-[#E6C687] selection:text-black">
    <canvas bind:canvas class="fixed top-0 left-0 w-full h-full pointer-events-none z-0 opacity-80"></canvas>
    
    <div class="relative z-10 max-w-md mx-auto px-6 py-12 flex flex-col justify-between min-h-screen">
      
      {#if !chatbotOpen}
        <!-- LUXURY MAIN PROFILE VIEW LAYER -->
        <div class="w-full text-center space-y-6 mt-4">
          <div class="relative w-36 h-36 mx-auto bg-[#09090b] rounded-full p-1 border border-white/[0.06] shadow-[0_0_50px_rgba(0,0,0,0.9)] flex items-center justify-center overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent"></div>
            <img src={data.business.logo} alt="Bearded Man Services Premium Brand Identity" class="w-full h-full object-cover rounded-full" on:error={(e) => e.target.style.display='none'} />
            <span class="absolute text-[#E6C687] text-[10px] font-medium tracking-[0.25em] uppercase z-[-1]">BMS</span>
          </div>
          
          <div class="space-y-2">
            <h1 class="text-4xl font-light tracking-wide text-white font-['Cormorant_Garamond']">{data.business.name}</h1>
            <p class="text-[#E6C687] text-[10px] font-medium tracking-[0.3em] uppercase">{data.business.company}</p>
            <div class="inline-block text-[11px] font-light text-zinc-400 tracking-wide italic">{data.business.specialties}</div>
          </div>
        </div>

        <div class="w-full space-y-3 my-10">
          <button on:click={() => chatbotOpen = true}
            class="flex items-center justify-center tracking-[0.18em] uppercase text-[11px] w-full bg-[#E6C687] hover:bg-white text-black font-semibold py-4.5 px-6 rounded-none transition-all duration-500 shadow-xl"
          >
            Initiate Project Concierge
          </button>
          <a href="tel:{data.business.phone}" 
            class="flex items-center justify-center tracking-[0.18em] uppercase text-[11px] w-full bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.08] text-white font-medium py-4.5 px-6 rounded-none transition-all duration-500"
          >
            Direct Voice Line
          </a>
        </div>

        <!-- WebAR Spatial Architecture Module -->
        <div class="w-full space-y-4 mb-10">
          <div class="flex items-center justify-between px-1">
            <h2 class="text-[10px] font-semibold text-zinc-500 uppercase tracking-[0.25em]">Spatial Engine</h2>
            <span class="w-12 h-[1px] bg-zinc-800"></span>
          </div>
          
          {#if !activeModel}
            <div class="grid grid-cols-1 gap-3">
              {#each data.business.arAssets as model}
                <button on:click={() => activeModel = model}
                  class="group text-left p-5 bg-white/[0.01] border border-white/[0.04] hover:border-[#E6C687]/30 backdrop-blur-md flex justify-between items-center transition-all duration-500"
                >
                  <div class="space-y-1 pr-2">
                    <h3 class="font-medium tracking-wide text-zinc-200 text-xs group-hover:text-white">{model.name}</h3>
                    <p class="text-[10px] text-zinc-500 font-light leading-relaxed">{model.desc}</p>
                  </div>
                  <span class="text-[9px] uppercase tracking-widest font-semibold shrink-0 font-mono text-[#E6C687] border border-[#E6C687]/20 px-2 py-1 bg-[#E6C687]/5 group-hover:bg-[#E6C687] group-hover:text-black transition-all duration-500">
                    Preview AR
                  </span>
                </button>
              {/each}
            </div>
          {:else}
            <div class="relative w-full h-80 bg-[#09090b] border border-white/[0.06] shadow-2xl animate-fadeIn">
              <model-viewer 
                src={activeModel.glb}
                ios-src={activeModel.usdz}
                ar
                ar-modes="webxr scene-viewer quick-look"
                camera-controls
                shadow-intensity="1.5"
                environment-image="neutral"
                class="w-full h-full bg-transparent"
              >
                <button slot="ar-button" class="absolute bottom-4 right-4 bg-white text-black font-semibold text-[10px] tracking-[0.25em] uppercase px-5 py-2.5 shadow-2xl hover:bg-[#E6C687] transition-all duration-500">
                  ☀️ Place Spatial Model
                </button>
                <button on:click={() => activeModel = null} class="absolute top-4 left-4 text-zinc-500 hover:text-white text-[10px] tracking-wider uppercase font-light bg-black/50 backdrop-blur-md px-3 py-1.5 border border-white/5">
                  &larr; Exit Engine
                </button>
              </model-viewer>
            </div>
          {/if}
        </div>

        <!-- MAPPED VERIFIED PRIOR WORKS REGISTRY -->
        <div class="w-full space-y-4">
          <div class="flex items-center justify-between px-1">
            <h2 class="text-[10px] font-semibold text-zinc-500 uppercase tracking-[0.25em]">Ecosystem Portfolio</h2>
            <span class="w-12 h-[1px] bg-zinc-800"></span>
          </div>
          <div class="grid grid-cols-1 gap-6">
            {#each data.business.projects as project, i}
              <div class="group bg-white/[0.01] border border-white/[0.04] p-0 shadow-xl rounded-none overflow-hidden flex flex-col">
                <div class="w-full h-48 bg-zinc-900 overflow-hidden relative border-b border-white/[0.02]">
                  <img src={project.img} alt={project.title} class="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-700" on:error={(e) => e.target.style.display='none'} />
                  <span class="absolute top-4 left-4 font-mono text-[9px] text-[#E6C687] bg-black/60 px-2 py-1 border border-white/5">RECORD 0{i + 1}</span>
                </div>
                <div class="p-5 space-y-1.5 bg-[#070708]/40">
                  <h3 class="font-medium tracking-wide text-white text-sm">{project.title}</h3>
                  <p class="text-[11px] text-zinc-400 font-light leading-relaxed">{project.desc}</p>
                </div>
              </div>
            {/each}
          </div>
        </div>
      {:else}
        <!-- SYSTEM ENCAPSULATED CONCIERGE CHAT ENGINE -->
        <div class="w-full flex flex-col justify-between min-h-[75vh] bg-[#070708]/95 border border-white/[0.05] p-6 backdrop-blur-xl shadow-2xl relative animate-fadeIn">
          <div class="flex justify-between items-center pb-4 border-b border-white/[0.05]">
            <div class="space-y-0.5">
              <span class="text-[9px] uppercase font-bold tracking-[0.2em] text-[#E6C687]">BMS Registry Assistant</span>
              <h2 class="text-sm font-light text-zinc-300 font-['Cormorant_Garamond'] italic">Project Alignment Protocol</h2>
            </div>
            <button on:click={() => { chatbotOpen = false; currentStep = 0; }} class="text-zinc-500 hover:text-white text-xs uppercase font-light">&times; Exit</button>
          </div>

          <div class="flex-grow my-8 flex flex-col justify-center space-y-4">
            {#if currentStep < steps.length}
              <div class="space-y-2">
                <span class="text-[9px] font-mono uppercase tracking-widest text-zinc-600">Metric 0{currentStep + 1} / 0{steps.length}</span>
                <p class="text-white font-light text-sm leading-relaxed tracking-wide">
                  {#if typeof steps[currentStep].text === 'function'}
                    {steps[currentStep].text()}
                  {:else}
                    {steps[currentStep].text}
                  {/if}
                </p>
              </div>

              <div class="pt-4">
                {#if steps[currentStep].type === 'options'}
                  <div class="flex flex-col gap-2">
                    {#each steps[currentStep].options as option}
                      <button on:click={() => processChat(option)}
                        class="w-full text-left text-xs tracking-wide bg-white/[0.02] hover:bg-[#E6C687] border border-white/[0.06] hover:border-[#E6C687] text-zinc-300 hover:text-black transition-all duration-300 p-3.5"
                      >
                        {option}
                      </button>
                    {/each}
                  </div>
                {:else}
                  <div class="flex items-center border-b border-white/[0.1] focus-within:border-[#E6C687] transition-all duration-500 py-1">
                    <input 
                      type={steps[currentStep].type} 
                      bind:value={currentInput}
                      placeholder={steps[currentStep].placeholder}
                      on:keydown={(e) => e.key === 'Enter' && processChat()}
                      class="w-full bg-transparent text-sm text-white focus:outline-none placeholder-zinc-700 font-light py-2"
                    />
                    <button on:click={() => processChat()} class="text-zinc-400 hover:text-[#E6C687] px-2 text-xs font-semibold tracking-widest uppercase">Next</button>
                  </div>
                {/if}
              </div>
            {:else}
              <div class="space-y-6 text-center py-2">
                <div class="space-y-1">
                  <span class="inline-block text-[9px] uppercase font-bold tracking-[0.25em] text-emerald-400 bg-emerald-500/5 px-3 py-1 rounded-full border border-emerald-500/10">Manifest Evaluated</span>
                  <h3 class="text-lg font-light text-white font-['Cormorant_Garamond'] italic">Ready for Dispatch</h3>
                </div>
                
                <div class="text-left bg-black/60 border border-white/[0.03] p-4 font-mono text-[10px] text-zinc-500 leading-normal space-y-1 max-h-[180px] overflow-y-auto">
                  {#each steps as step}
                    <div class="truncate"><span class="text-zinc-600">{step.label}:</span> <span class="text-[#E6C687]">{answers[step.key]}</span></div>
                  {/each}
                </div>

                <a href={mailtoLink()}
                  class="flex items-center justify-center tracking-[0.18em] uppercase text-[11px] w-full bg-[#E6C687] hover:bg-white text-black font-semibold py-4 px-6 transition-all duration-500"
                >
                  Transmit to Tobias
                </a>
              </div>
            {/if}
          </div>

          <div class="w-full bg-zinc-900 h-[2px] relative overflow-hidden">
            <div class="bg-[#E6C687] h-full transition-all duration-500" style="width: {(currentStep / steps.length) * 100}%"></div>
          </div>
        </div>
      {/if}

      <footer class="w-full text-center pt-16 pb-2 text-[10px] font-light text-zinc-600 tracking-[0.15em] uppercase space-y-1">
        <p>&copy; {new Date().getFullYear()} {data.business.company} &bull; Private Client Registry</p>
        <p class="text-zinc-700 font-mono tracking-normal lowercase text-[9px]">{data.business.website}</p>
      </footer>

    </div>
  </main>
{/if}

<style>
  :global(.py-4\.5) { padding-top: 1.125rem; padding-bottom: 1.125rem; }
</style>
