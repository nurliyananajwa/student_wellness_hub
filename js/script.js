    const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.getElementById('toggleSidebar');
    const darkModeToggle = document.getElementById('darkModeToggle');

    // Sidebar collapse
    toggleBtn.addEventListener('click', () => {
      sidebar.classList.toggle('collapsed');
    });

    // Dark mode toggle
    darkModeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      const icon = darkModeToggle.querySelector('i');
      const text = darkModeToggle.querySelector('.menu-text');
      if (document.body.classList.contains('dark-mode')) {
        icon.classList.replace('bi-moon', 'bi-sun');
        text.textContent = 'Light Mode';
      } else {
        icon.classList.replace('bi-sun', 'bi-moon');
        text.textContent = 'Dark Mode';
      }
    });

      /* ===== LOGIN STATE HANDLING ===== */
    const headerAuth = document.getElementById("headerAuth");
    const loggedInUser = localStorage.getItem("loggedInUser");

    if (loggedInUser) {
      headerAuth.innerHTML = `
        <span class="me-3">Hi, ${loggedInUser}</span>
        <button id="logoutBtn" class="btn btn-sm btn-outline-danger">Logout</button>
      `;

      document.getElementById("logoutBtn").addEventListener("click", () => {
        localStorage.removeItem("loggedInUser");
        window.location.href = "index.html";
      });
    } else {
      headerAuth.innerHTML = `
        <a href="index.html" class="btn btn-sm btn-primary">Login</a>
      `;
    }

    const activitiesData = [
      { name:"Semester Kickoff Yoga & Mindfulness", category:"Physical", status:"Completed" },
      { name:"Mental Health Awareness Talk", category:"Mental", status:"Open" },
      { name:"Art Therapy & Creative Expression", category:"Social", status:"Open" },
      { name:"Stress Management Workshop", category:"Mental", status:"Completed" },
      { name:"Academic Coaching & Study Planning", category:"Academic", status:"Open" },
      { name:"Fitness Blitz (HIIT Training)", category:"Physical", status:"Open" },
      { name:"Peer Support Circle: Sharing & Listening", category:"Social", status:"Open" },
      { name:"Nutrition & Energy Management for Students", category:"Physical", status:"Open" },
      { name:"Time Management Bootcamp for Assessments", category:"Academic", status:"Open" },
      { name:"Exam Readiness & Burnout Prevention Session", category:"Mental", status:"Open" }
    ];

    const resourcesData = [
      { title:"Kurangkan Gula", category:"Physical Health", date:"Nov 2024" },
      { title:"Microsleep Awareness", category:"Mental Health", date:"Dec 2024" },
      { title:"Stretching at Desk", category:"Physical Health", date:"Jan 2025" },
      { title:"Meal Prep Bajet", category:"Lifestyle", date:"Oct 2024" },
      { title:"Kesan Tidak Tidur", category:"Mental Health", date:"Nov 2024" },
      { title:"Stress Exam", category:"Academic", date:"Jan 2025" },
      { title:"Meditasi 5 Minit", category:"Mental Health", date:"Dec 2024" },
      { title:"Tips Larian 2.4km", category:"Physical Health", date:"Sep 2024" },
      { title:"Minum Air Cukup", category:"Lifestyle", date:"Aug 2024" }
    ];
