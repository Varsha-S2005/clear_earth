document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('projects-container');
  const searchInput = document.getElementById('search-input');
  let projects = [];

  function renderProjects(list) {
    container.innerHTML = '';
    if (list.length === 0) {
      container.textContent = 'No projects found.';
      return;
    }

    list.forEach(project => {
      const card = document.createElement('div');
      card.className = 'project-card';

      card.innerHTML = `
        <div class="card-header">
          <h2 class="project-title">${project.name}</h2>
          <div class="icons" style="display:flex; gap:30px; align-items:center;">
            <a href="${project.pdf}" target="_blank" title="View PDF">
              <div>📄</div>
              <div style="font-weight:bold;">PDF</div>
            </a>
            <a href="${project.link}" target="_blank" title="Official Link">
              <div>🔗</div>
              <div style="font-weight:bold;">Link</div>
            </a>
          </div>
        </div>
        <div class="card-details" style="display:none;">
          <p>${project.summary}</p>
          <p>💬 Users can post comments and feedback about the project.</p>
          <p>🔔 If interested, users can follow the project for updates.</p>
        </div>
      `;

      const title = card.querySelector('.project-title');
      const details = card.querySelector('.card-details');

      title.addEventListener('click', () => {
        details.style.display = details.style.display === 'block' ? 'none' : 'block';
      });

      container.appendChild(card);
    });
  }

  fetch('assets/projects.json')
    .then(res => {
      if (!res.ok) throw new Error(`Failed to fetch JSON: ${res.status}`);
      return res.json();
    })
    .then(data => {
      projects = data;
      renderProjects(projects);
    })
    .catch(err => {
      console.error('Error loading projects:', err);
      container.textContent = 'Failed to load projects.';
    });

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = projects.filter(p =>
      p.name.toLowerCase().includes(query) ||
      p.summary.toLowerCase().includes(query)
    );
    renderProjects(filtered);
  });
});
