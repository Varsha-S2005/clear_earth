fetch('assets/projects.json')
  .then(response => response.json())
  .then(projects => {
    const container = document.getElementById('projects-container');
    container.innerHTML = ''; // Clear "Loading..."

    projects.forEach((project, index) => {
      const card = document.createElement('div');
      card.className = 'project-card';

      const header = document.createElement('div');
      header.className = 'card-header';

      const title = document.createElement('h2');
      title.className = 'project-title';
      title.textContent = project.name;
      title.style.cursor = 'pointer';
      title.onclick = () => {
        const details = document.getElementById(`details-${index}`);
        details.style.display = details.style.display === 'none' ? 'block' : 'none';
      };

      const icons = document.createElement('div');
      icons.className = 'icons';

      const pdfIcon = document.createElement('a');
      pdfIcon.href = project.pdf;
      pdfIcon.target = '_blank';
      pdfIcon.title = 'View PDF';
      pdfIcon.innerHTML = '📄';

      const linkIcon = document.createElement('a');
      linkIcon.href = project.link;
      linkIcon.target = '_blank';
      linkIcon.title = 'Official Link';
      linkIcon.innerHTML = '🔗';

      icons.appendChild(pdfIcon);
      icons.appendChild(linkIcon);

      header.appendChild(title);
      header.appendChild(icons);

      const details = document.createElement('div');
      details.className = 'card-details';
      details.id = `details-${index}`;
      details.style.display = 'none';
      details.innerHTML = `<p>${project.summary}</p>`;

      card.appendChild(header);
      card.appendChild(details);
      container.appendChild(card);
    });
  })
  .catch(error => {
    document.getElementById('projects-container').textContent = 'Failed to load projects.';
    console.error(error);
  });
