document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('projects-container');
  const searchInput = document.getElementById('search-input');
  let projects = [];

  function slideToggle(element) {
    if (element.style.maxHeight) {
      // Close
      element.style.maxHeight = null;
      element.style.paddingTop = null;
      element.style.paddingBottom = null;
      element.style.marginTop = null;
      element.style.marginBottom = null;
      element.style.overflow = null;
    } else {
      // Open
      element.style.maxHeight = element.scrollHeight + "px";
      element.style.paddingTop = "0.5rem";
      element.style.paddingBottom = "0.5rem";
      element.style.marginTop = "0.5rem";
      element.style.marginBottom = "0.5rem";
      element.style.overflow = "hidden";
    }
  }

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
          <h2 class="project-title" tabindex="0" role="button" aria-expanded="false">${project.name}</h2>
          <div class="icons" style="display:flex; gap:30px; align-items:center;">
            <a href="${project.pdf}" target="_blank" title="View PDF" rel="noopener noreferrer">
              <div style="font-size:24px;">📄</div>
              <div style="font-weight:bold;">PDF</div>
            </a>
            <a href="${project.link}" target="_blank" title="Official Link" rel="noopener noreferrer">
              <div style="font-size:24px;">🔗</div>
              <div style="font-weight:bold;">Link</div>
            </a>
          </div>
        </div>
        <div class="card-details" style="max-height:0; overflow:hidden; transition: max-height 0.3s ease, padding 0.3s ease, margin 0.3s ease;">
          <p>${project.summary}</p>
          <p>💬 Users can post comments and feedback about the project.</p>
          <p>🔔 If interested, users can follow the project for updates.</p>
        </div>
      `;

      const title = card.querySelector('.project-title');
      const details = card.querySelector('.card-details');

      // Toggle summary with smooth animation
      function toggleDetails() {
        const expanded = title.getAttribute('aria-expanded') === 'true';
        title.setAttribute('aria-expanded', String(!expanded));
        slideToggle(details);
      }

      title.addEventListener('click', toggleDetails);

      // Keyboard accessible toggle (Enter and Space keys)
      title.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleDetails();
        }
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
    const query = e.target.value.toLowerCase().trim();
    const filtered = projects.filter(p =>
      p.name.toLowerCase().includes(query) ||
      p.summary.toLowerCase().includes(query)
    );
    renderProjects(filtered);
  });
});
