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
    { key: 'metrics', label: 'Constraints', text: () => 'Are there any explicit site parameters, grading issues, material choices, or specific inventory notes we should audit?', type: 'text', placeholder: 'E.g., Western Red Cedar, Tennessee Fieldstone...' },
    { key: 'discovery', label: 'Origin', text: () => 'Finally, how did you interface with the Bearded Man Services collective?', type: 'options', options: ['Exclusive Smart Card Scan', 'Active Local Project Site', 'Direct Peer Referral', 'Digital Registry Platform'] }
  ];

  function processChat(choice = null) {
    if (choice) { answers[steps[currentStep].key] = choice; } 
    else { if (!currentInput.trim()) return; answers[steps[currentStep].key] = currentInput.trim(); }
    currentInput = ''; currentStep++;
  }

  $: mailtoLink = () => {
    const subject = encodeURIComponent(`BMS Private Registry Manifest: ${answers.name}`);
    const body = encodeURIComponent(`CLIENT PROFILE: ${answers.name}\nPHONE: ${answers.phone}\nEMAIL: ${answers.email}\nCOMMISSION: ${answers.type}\nSCALE: ${answers.scale}\nTIMELINE: ${answers.window}\nSTYLE: ${answers.style}\nMETRICS: ${answers.metrics}\nSOURCE: ${answers.discovery}`);
    return `mailto:Beardtobias@gmail.com?subject=${subject}&body=${body}`;
  };

  onMount(async () => {
    if (data.isHubHomepage) return;
    const THREE = await import('three');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    const geometry = new THREE.BufferGeometry();
    const count = 100;
    const positions = new Float32Array(count * 3);
    for(let i=0; i<count*3; i++) { positions[i] = (Math.random() - 0.5) * 10; }
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({ size: 0.15, color: 0xe6c687, transparent: true });
    const points = new THREE.Points(geometry, material);
    scene.add(points); camera.position.z = 5;
    const animate = () => { points.rotation.y += 0.002; renderer.render(scene, camera); requestAnimationFrame(animate); };
    animate();
    window.addEventListener('resize', () => { camera.aspect = window.innerWidth / window.innerHeight; camera.updateProjectionMatrix(); renderer.setSize(window.innerWidth, window.innerHeight); });
  });
</script>

{#if data.isHubHomepage}
  <main class="min-h-screen bg-[#030303] text-zinc-100 flex flex-col items-center justify-center p-6 font-sans text-center">
    <span class="text-[10px] uppercase font-semibold tracking-[0.3em] text-[#E6C687] bg-[#E6C687]/5 px-3 py-1 border border-[#E6C687]/10 rounded-full">Sovereign Engine v4</span>
    <h1 class="text-4xl font-light tracking-tight font-serif italic mt-4 text-white">Moving With Clarity</h1>
    <p class="text-zinc-500 text-xs font-light max-w-sm mx-auto my-4 leading-relaxed">High-fidelity automation hub architecture.</p>
    <div class="h-[1px] w-48 bg-zinc-800 my-4 mx-auto"></div>
    <div class="flex flex-col gap-2 w-64 mx-auto">
      <a href="/admin/create" class="bg-white text-black text-xs font-medium uppercase tracking-widest py-4 hover:bg-[#E6C687] transition duration-300">Provision Center</a>
    </div>
  </main>
{:else}
  <main class="relative min-h-screen bg-[#030303] text-zinc-300 p-6 font-sans">
    <canvas bind:canvas class="fixed top-0 left-0 w-full h-full pointer-events-none z-0"></canvas>
    <div class="relative z-10 max-w-md mx-auto space-y-8 flex flex-col justify-between min-h-screen">
      {#if !chatbotOpen}
        <div class="text-center space-y-4 pt-8">
          <div class="w-32 h-32 mx-auto bg-zinc-900 border border-white/10 rounded-full flex items-center justify-center overflow-hidden">
            <img src={data.business.logo} alt="Brand Identity" class="w-full h-full object-cover" on:error={(e) => e.target.style.display='none'} />
          </div>
          <div>
            <h1 class="text-3xl font-light text-white font-serif">{data.business.name}</h1>
            <p class="text-[#E6C687] text-[10px] uppercase tracking-widest font-medium mt-1">{data.business.company}</p>
            <p class="text-zinc-500 text-xs italic font-light mt-1">{data.business.specialties}</p>
          </div>
        </div>
        <div class="space-y-3">
          <button on:click={() => chatbotOpen = true} class="w-full bg-[#E6C687] hover:bg-white text-black text-xs uppercase tracking-widest font-semibold py-4 transition duration-300">Initiate Project Concierge</button>
          <a href="tel:{data.business.phone}" class="block text-center w-full bg-white/5 border border-white/10 text-white text-xs uppercase tracking-widest font-medium py-4 transition duration-300">Direct Voice Line</a>
        </div>
        <div class="space-y-4">
          <h2 class="text-[10px] uppercase tracking-widest text-zinc-500 font-bold border-b border-zinc-800 pb-2">Verified Ecosystem Portfolio</h2>
          <div class="grid grid-cols-1 gap-4">
            {#each data.business.projects as project}
              <div class="bg-zinc-900/40 border border-white/5 overflow-hidden">
                <div class="h-40 bg-zinc-800"><img src={project.img} alt={project.title} class="w-full h-full object-cover opacity-80" on:error={(e) => e.target.style.display='none'} /></div>
                <div class="p-4"><h3 class="text-white text-xs font-semibold">{project.title}</h3><p class="text-zinc-400 text-[11px] font-light mt-1">{project.desc}</p></div>
              </div>
            {/each}
          </div>
        </div>
      {:else}
        <div class="bg-zinc-900/90 border border-white/10 p-6 backdrop-blur-md min-h-[60vh] flex flex-col justify-between mt-8">
          <div class="flex justify-between items-center border-b border-white/10 pb-3">
            <div><span class="text-[9px] uppercase font-bold text-[#E6C687]">BMS Digital Assistant</span></div>
            <button on:click={() => { chatbotOpen = false; currentStep = 0; }} class="text-zinc-500 hover:text-white text-sm">&times; Exit</button>
          </div>
          <div class="flex-grow flex flex-col justify-center py-6 space-y-4">
            {#if currentStep < steps.length}
              <p class="text-white text-sm font-light leading-relaxed">{typeof steps[currentStep].text === 'function' ? steps[currentStep].text() : steps[currentStep].text}</p>
              {#if steps[currentStep].type === 'options'}
                <div class="flex flex-col gap-2 mt-2">
                  {#each steps[currentStep].options as option}
                    <button on:click={() => processChat(option)} class="w-full text-left text-xs bg-white/5 hover:bg-[#E6C687] border border-white/10 text-zinc-300 hover:text-black p-3 transition">{option}</button>
                  {/each}
                </div>
              {:else}
                <div class="flex items-center border-b border-white/20 py-1">
                  <input type={steps[currentStep].type} bind:value={currentInput} placeholder={steps[currentStep].placeholder} on:keydown={(e) => e.key === 'Enter' && processChat()} class="w-full bg-transparent text-sm text-white focus:outline-none py-1" />
                  <button on:click={() => processChat()} class="text-[#E6C687] text-xs font-bold uppercase ml-2">Next</button>
                </div>
              {/if}
            {:else}
              <div class="text-center space-y-4">
                <span class="text-[9px] uppercase font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 border border-emerald-500/20 rounded-full">Manifest Compiled</span>
                <a href={mailtoLink()} class="block text-center w-full bg-[#E6C687] text-black font-semibold text-xs uppercase tracking-widest py-4 transition hover:bg-white">Transmit Registry Manifest</a>
              </div>
            {/if}
          </div>
        </div>
      {/if}
      <footer class="text-center text-[9px] text-zinc-600 uppercase tracking-widest pt-8 border-t border-zinc-900 pb-2">&copy; {new Date().getFullYear()} {data.business.company}</footer>
    </div>
  </main>
{/if}
