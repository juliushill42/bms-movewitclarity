<script>
  import { enhance } from '$app/forms';
  export let form;
  let loading = false;
</script>

<main class="min-h-screen bg-[#030303] text-zinc-100 font-sans p-4 flex flex-col justify-center items-center">
  <div class="w-full max-w-md bg-zinc-900/50 border border-white/5 p-6 rounded-none shadow-2xl backdrop-blur-md">
    <div class="mb-6 text-center">
      <h1 class="text-2xl font-light text-white font-['Cormorant_Garamond'] italic">Hub Provisioning</h1>
      <p class="text-[10px] text-zinc-500 uppercase tracking-widest mt-1">Deploy a new micro-tenant asset system</p>
    </div>

    {#if form?.success}
      <div class="text-center space-y-6 py-4">
        <div class="inline-flex items-center bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full">✓ Node Configured</div>
        <div>
          <h2 class="text-xl font-bold text-white">{form.company}</h2>
          <a href={form.targetUrl} target="_blank" class="text-[#E6C687] text-sm hover:underline break-all">{form.targetUrl}</a>
        </div>
        <div class="bg-black p-4 border border-white/5 inline-block mx-auto shadow-2xl">
          <img src={form.qrCodeUrl} alt="QR Target Payload Asset" class="w-48 h-48" />
        </div>
        <button on:click={() => window.location.reload()} class="w-full bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs tracking-widest uppercase font-medium py-3 px-4 transition">Provision New Node</button>
      </div>
    {:else}
      <form method="POST" use:enhance={() => { loading = true; return async ({ update }) => { loading = false; update(); }; }} class="space-y-4">
        {#if form?.error}
          <div class="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-none text-center">{form.error}</div>
        {/if}
        <div>
          <label for="subdomain" class="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">Target Subdomain Link</label>
          <div class="relative flex items-center">
            <input type="text" id="subdomain" name="subdomain" placeholder="bms" required class="w-full bg-black border border-white/10 p-3 pr-44 text-sm text-white focus:outline-none focus:border-[#E6C687]" />
            <span class="absolute right-3 text-xs font-semibold text-zinc-600">.movingwithclarity.com</span>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label for="company" class="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">Company</label>
            <input type="text" id="company" name="company" placeholder="Bearded Man Services" required class="w-full bg-black border border-white/10 p-3 text-sm text-white focus:outline-none focus:border-[#E6C687]" />
          </div>
          <div>
            <label for="name" class="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">Owner Name</label>
            <input type="text" id="name" name="name" placeholder="Tobias Beard" required class="w-full bg-black border border-white/10 p-3 text-sm text-white focus:outline-none focus:border-[#E6C687]" />
          </div>
        </div>
        <div>
          <label for="password" class="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">Hub Admin Passphrase</label>
          <input type="password" id="password" name="password" required class="w-full bg-black border border-white/10 p-3 text-sm text-white focus:outline-none focus:border-[#E6C687]" />
        </div>
        <button type="submit" disabled={loading} class="w-full bg-[#E6C687] hover:bg-white text-black font-semibold text-xs tracking-widest uppercase py-4 px-6 transition duration-500">
          {loading ? 'Compiling Node Architecture...' : 'Commit System Provisioning'}
        </button>
      </form>
    {/if}
  </div>
</main>
