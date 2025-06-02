fetch('assets/projects.json')
  .then(response => response.json())
  .then(projects => {
    const container = document.getElementById('project-container');
    if (!container) return;

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

      const pdfLink = document.createElement('a');
      pdfLink.href = project.pdf;
      pdfLink.target = '_blank';
      pdfLink.innerHTML = '📄<br><small>PDF</small>';

      const siteLink = document.createElement('a');
      siteLink.href = project.link;
      siteLink.target = '_blank';
      siteLink.innerHTML = '🔗<br><small>Link</small>';

      icons.appendChild(pdfLink);
      icons.appendChild(siteLink);

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
    document.getElementById('project-container').textContent = 'Failed to load projects.';
    console.error(error);
  });
