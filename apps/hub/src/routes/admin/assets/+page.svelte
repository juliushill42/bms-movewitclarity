<script>
  let queue = [
    { id: 'BMS-001', name: 'Belle Meade Pergola Scan', status: 'Optimizing Mesh', progress: 68 },
    { id: 'BMS-002', name: 'Franklin Stone Path Texture', status: 'Ready', progress: 100 }
  ];
  let pipelineUrl = "https://titanu-up.titanuai.com/";
</script>

<main class="min-h-screen bg-[#030303] text-zinc-100 font-['Inter'] flex flex-col md:flex-row">
  <aside class="w-full md:w-80 bg-[#070708] border-b md:border-b-0 md:border-r border-white/[0.04] p-6 flex flex-col justify-between shrink-0">
    <div class="space-y-8">
      <div class="space-y-1">
        <span class="text-[9px] uppercase font-bold tracking-[0.25em] text-[#E6C687]">Ecosystem Utility</span>
        <h1 class="text-xl font-light text-white font-['Cormorant_Garamond'] italic">Titan Asset Pipeline</h1>
      </div>
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <h2 class="text-[10px] font-semibold text-zinc-500 uppercase tracking-[0.2em]">Active Transmissions</h2>
          <span class="w-2 h-2 rounded-full bg-[#E6C687] animate-pulse"></span>
        </div>
        <div class="space-y-2">
          {#each queue as job}
            <div class="p-4 bg-white/[0.01] border border-white/[0.04] space-y-2">
              <div class="flex justify-between items-start">
                <span class="text-[10px] font-mono text-zinc-500">{job.id}</span>
                <span class="text-[10px] tracking-wide font-mono {job.progress === 100 ? 'text-emerald-400' : 'text-[#E6C687]'}">{job.status}</span>
              </div>
              <p class="text-xs text-zinc-300 truncate font-light">{job.name}</p>
              <div class="w-full bg-zinc-900 h-[1.5px] overflow-hidden">
                <div class="bg-[#E6C687] h-full transition-all duration-1000" style="width: {job.progress}%"></div>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </div>
    <div class="pt-6 border-t border-white/[0.04]">
      <a href="/admin/create" class="block text-center text-[10px] tracking-[0.2em] uppercase py-3 border border-white/[0.06] text-zinc-400 hover:text-white transition duration-300">&larr; Return to Dashboard</a>
    </div>
  </aside>

  <section class="flex-grow flex flex-col relative h-[calc(100vh-120px)] md:h-screen bg-black">
    <div class="bg-[#070708]/80 backdrop-blur-md px-6 py-4 border-b border-white/[0.04] flex justify-between items-center z-10">
      <div class="flex items-center gap-3">
        <div class="w-2 h-2 rounded-full bg-emerald-500"></div>
        <p class="text-xs font-light text-zinc-400">Secure Processing Node: <span class="text-white font-mono font-medium">titanu-up.titanuai.com</span></p>
      </div>
    </div>
    <div class="w-full flex-grow relative bg-[#030303]">
      <iframe src={pipelineUrl} title="TitanU Core" class="w-full h-full border-0 bg-transparent opacity-90 filter invert-[0.02]" allow="accelerometer; gyroscope; camera; microphone; clipboard-write"></iframe>
    </div>
  </section>
</main>
