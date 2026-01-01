
const getJoined = () =>
  JSON.parse(localStorage.getItem("joinedActivities")) || [];

const setJoined = data =>
  localStorage.setItem("joinedActivities", JSON.stringify(data));

const getPriorities = () =>
  JSON.parse(localStorage.getItem("activityPriorities")) || {};

const setPriorities = data =>
  localStorage.setItem("activityPriorities", JSON.stringify(data));

const joinedActivities = getJoined();
const priorities = getPriorities();

document.querySelectorAll('tbody tr').forEach(row => {
  const activity = row.querySelector('td strong').textContent.trim();
  const btn = row.querySelector('button');
  const sel = row.querySelector('.priority-select');

  /* Restore join state */
  if (joinedActivities.includes(activity)) {
    btn.textContent = 'Cancel Registration';
    btn.classList.remove('btn-register');
    btn.classList.add('btn-cancel');
  }

  /* Restore priority */
  if (priorities[activity]) {
    sel.value = priorities[activity];
  }

  /* Join / Cancel */
  btn.addEventListener('click', () => {
  let joined = getJoined();

  if (!joined.includes(activity)) {
    joined.push(activity);
    btn.textContent = 'Cancel Registration';
    btn.classList.remove('btn-register');
    btn.classList.add('btn-cancel');

    // ✅ SAVE PRIORITY ON JOIN (FIX)
    const p = getPriorities();
    p[activity] = sel.value;
    setPriorities(p);

  } else {
    joined = joined.filter(a => a !== activity);
    btn.textContent = 'Join Activity';
    btn.classList.remove('btn-cancel');
    btn.classList.add('btn-register');
  }

  setJoined(joined);
});

  /* Priority change */
  sel.addEventListener('change', () => {
    const p = getPriorities();
    p[activity] = sel.value;
    setPriorities(p);
  });
});

const rows = document.querySelectorAll('tbody tr');
const totalCount = rows.length;
let openCount = 0, completedCount = 0;
let nextActivity = '-';

rows.forEach(row => {
  const status = row.querySelector('.badge-status').textContent.trim();
  const dateText = row.querySelector('.date-text').textContent.trim();

  if (status === 'Open') openCount++;
  if (status === 'Completed') completedCount++;

  if (nextActivity === '-' && status === 'Open') {
    nextActivity = dateText;
  }
});

document.getElementById('total-count').textContent = totalCount;
document.getElementById('open-count').textContent = openCount;
document.getElementById('completed-count').textContent = completedCount;
document.getElementById('next-activity').textContent = nextActivity;