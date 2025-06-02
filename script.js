fetch('assets/projects.json')
  .then(res => res.json())
  .then(projects => {
    const container = document.getElementById('projects-container');
    container.innerHTML = ''; // Clear loading text

    projects.forEach(project => {
      const card = document.createElement('div');
      card.className = 'project-card';

      card.innerHTML = `
        <div class="card-header">
          <h2 class="project-title">${project.name}</h2>
          <div class="icons" style="display:flex; gap:40px; align-items:center;">
            <a href="${project.pdf}" target="_blank" class="pdf-icon" title="View PDF" style="text-align:center; text-decoration:none; color:inherit;">
              <div style="font-size:40px;">📄</div>
              <div style="font-weight:bold;">PDF</div>
            </a>
            <a href="${project.link}" target="_blank" class="link-icon" title="Official Link" style="text-align:center; text-decoration:none; color:inherit;">
              <div style="font-size:40px;">🔗</div>
              <div style="font-weight:bold;">Link</div>
            </a>
          </div>
        </div>
        <div class="card-details">
          <p>📄 ${project.summary}</p>
          <p>💬 Users can post comments and feedback about the project.</p>
          <p>🔔 If the user is <a href="#">interested</a>, they can follow the project to get updates like hearing dates, verdicts, etc.</p>
        </div>
      `;

      container.appendChild(card);
    });
  })
  .catch(err => {
    console.error(err);
    document.getElementById('projects-container').textContent = 'Failed to load projects.';
  });
