document.getElementById('menu-toggle').addEventListener('click', function() {
  const sidebar = document.getElementById('sidebar');
  const content = document.querySelector('.content');
  
  // Toggle sidebar collapse
  sidebar.classList.toggle('collapsed');
  
  // Adjust content width
  if (sidebar.classList.contains('collapsed')) {
    content.classList.add('expanded');
    content.classList.remove('collapsed');
  } else {
    content.classList.add('collapsed');
    content.classList.remove('expanded');
  }
});
