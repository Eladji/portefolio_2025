(function(){
  async function loadData(){
    try{
      // Fetch data via server-side proxy so secrets remain on the server
      const res = await fetch('/api/data');
      if (!res.ok) throw new Error('Failed to load data from server');
      const data = await res.json();
      renderAbout(data.about);
      renderProjects(data.projects);
      renderSkills(data.skills);
    } catch(err){
      console.error(err);
    }
  }

  function renderAbout(about){
    const container = document.getElementById('aboutContent');
    if (!container) return;
    container.innerHTML = `
      <div class="max-w-[1000px] mx-auto flex flex-col md:flex-row items-center gap-8">
        <div class="w-full md:w-1/3">
          <img src="public/photo de profile.jpg" alt="Portrait of ${escapeHtml(about.name)}" class="w-56 h-56 rounded-full object-cover mx-auto md:mx-0 bg-[#0a0a0a]">
        </div>
        <div class="w-full md:w-2/3 text-[#d1d1d1]">
          <h2 class="text-4xl font-medium text-white mb-4">À propos</h2>
          <p class="text-lg leading-relaxed">${escapeHtml(about.bio)}</p>
          <p class="mt-4 text-[#adadad]">Technos : ${about.technos.map(escapeHtml).join(', ')}.</p>
        </div>
      </div>
    `;
  }

  function renderProjects(projects){
    const grid = document.getElementById('projectsGrid');
    if (!grid) return;
    grid.innerHTML = '';
    projects.forEach((p) => {
        const isFeatured = !!p.featured; // use data flag rather than idx
        if (!isFeatured) return; // only render featured projects 
        const el = document.createElement('div');
        // featured items are larger and span more grid cells on md+ screens
        el.className = isFeatured ? 'md:col-span-2 md:row-span-2' : '';
        const imgHeight = isFeatured ? 'h-[300px] sm:h-[425px] md:h-[517px]' : 'h-[220px] sm:h-[300px] md:h-[425px]';
        const imgMargin = isFeatured ? 'mb-6 sm:mb-8' : 'mb-4 sm:mb-5';
        el.innerHTML = `
        <div class="bg-[#181818] ${imgHeight} overflow-hidden rounded ${imgMargin}">
            <img src="${escapeHtml(p.image)}" alt="${escapeHtml(p.title)}" class="w-full h-full object-cover" loading="lazy">
        </div>
        <h3 class="text-2xl sm:text-3xl md:text-4xl font-normal leading-[1.2] text-white tracking-tight mb-2">${escapeHtml(p.title)}</h3>
        <p class="text-lg sm:text-xl font-light leading-[1.3] text-[#adadad] tracking-normal">${escapeHtml(p.type)}</p>
        `;
        grid.appendChild(el);
    });
  }

  function renderSkills(skills){
    const container = document.getElementById('skillsContainer');
    if (!container) return;
    container.innerHTML = '';
    skills.forEach(s => {
      const card = document.createElement('div');
      card.className = 'bg-[#232323] p-8 rounded-lg h-auto';
      card.innerHTML = `
        <div class="flex justify-between items-start">
          <h3 class="text-3xl font-medium leading-none text-white tracking-tight">${escapeHtml(s.category)}</h3>
        </div>
        <p class="mt-4 text-xl font-light leading-normal text-[#adadad] tracking-normal max-w-[520px]">${s.items.map(i => i.name).join(', ')}</p>
        <ul class="mt-6 space-y-2">
          ${s.items.map(i => `<li class=\"flex items-center justify-between bg-[#0f0f0f] px-4 py-2 rounded\"><span class=\"text-white\">${escapeHtml(i.name)}</span><span class=\"text-sm text-[#adadad]\">${escapeHtml(i.source)}</span></li>`).join('')}
        </ul>
      `;
      container.appendChild(card);
    });
  }

  function escapeHtml(text){
    if (!text) return '';
    return String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Init
  document.addEventListener('DOMContentLoaded', function(){
    loadData();
  });
})();
