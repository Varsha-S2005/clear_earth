document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('projects-container');
  container.textContent = 'Loading projects...';

  fetch('projects.json')
    .then(response => {
      if (!response.ok) throw new Error('Failed to load JSON');
      return response.json();
    })
    .then(projects => {
      container.innerHTML = ''; // Clear loading text

      projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';

        // Title
        const title = document.createElement('h2');
        title.textContent = project.name;
        title.style.cursor = 'pointer';

        // Summary (hidden by default)
        const summary = document.createElement('p');
        summary.textContent = project.summary;
        summary.style.display = 'none';

        // Toggle summary on title click
        title.addEventListener('click', () => {
          summary.style.display = summary.style.display === 'none' ? 'block' : 'none';
        });

        // Links
        const links = document.createElement('div');
        links.innerHTML = `
          <a href="${project.pdf}" target="_blank">📄 PDF</a> |
          <a href="${project.link}" target="_blank">🔗 Link</a>
        `;

        card.appendChild(title);
        card.appendChild(summary);
        card.appendChild(links);
        container.appendChild(card);
      });
    })
    .catch(error => {
      console.error('Error loading projects:', error);
      container.textContent = 'Failed to load projects.';
    });
});
