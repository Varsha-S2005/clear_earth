document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('projects-container');
  container.textContent = 'Loading projects...';

  fetch('projects.json')
    .then((response) => {
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    })
    .then((projects) => {
      container.innerHTML = '';
      projects.forEach((project) => {
        const card = document.createElement('div');
        card.className = 'project-card';

        const header = document.createElement('div');
        header.className = 'card-header';

        const title = document.createElement('h2');
        title.className = 'project-title';
        title.textContent = project.name;
        title.addEventListener('click', () => {
          details.style.display = details.style.display === 'none' ? 'block' : 'none';
        });

        const icons = document.createElement('div');
        icons.className = 'icons';
        icons.innerHTML = `
          <a href="${project.pdf}" title="PDF" target="_blank">📄</a>
          <a href="${project.link}" title="Link" target="_blank">🔗</a>
        `;

        header.appendChild(title);
        header.appendChild(icons);

        const details = document.createElement('div');
        details.className = 'card-details';
        details.innerHTML = `<p>${project.summary}</p>`;

        card.appendChild(header);
        card.appendChild(details);
        container.appendChild(card);
      });
    })
    .catch((error) => {
      console.error('Failed to load projects:', error);
      container.textContent = 'Failed to load projects.';
    });
});
