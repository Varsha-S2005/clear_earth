document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('projects-container');

  fetch('assets/projects.json')
    .then(res => {
      if (!res.ok) throw new Error(`Failed to fetch JSON: ${res.status}`);
      return res.json();
    })
    .then(projects => {
      container.innerHTML = ''; // Clear loading text

      projects.forEach(project => {
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
          <div class="card-details">
            <p>${project.summary}</p>
            <p>💬 Users can post comments and feedback about the project.</p>
            <p>🔔 If interested, users can follow the project for updates.</p>
          </div>
        `;

        const title = card.querySelector('.project-title');
        const details = card.querySelector('.card-details');

        // Toggle summary/details on title click
        title.addEventListener('click', () => {
          if (details.style.display === 'block') {
            details.style.display = 'none';
          } else {
            details.style.display = 'block';
          }
        });

        container.appendChild(card);
      });
    })
    .catch(err => {
      console.error('Error loading projects:', err);
      container.textContent = 'Failed to load projects.';
    });
});
