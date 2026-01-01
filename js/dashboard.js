document.addEventListener("DOMContentLoaded", function () {
    const joinedActivities =
  JSON.parse(localStorage.getItem("joinedActivities")) || [];

const activityPriorities =
  JSON.parse(localStorage.getItem("activityPriorities")) || {};


  let joined = 0;
  let highPriority = 0;

  let activityCategory = {};
  let priorityCount = {};
  let statusCount = {};
  let resourceCategory = {};

  // -------- Activities Processing --------
  activitiesData.forEach(a => {

    // Category count
    activityCategory[a.category] =
      (activityCategory[a.category] || 0) + 1;

    // Status count
    statusCount[a.status] =
      (statusCount[a.status] || 0) + 1;

    // Joined activities (user interaction)
   if (joinedActivities.includes(a.name)) {
      joined++;

      const priority =
        activityPriorities[a.name] || "Medium";

      priorityCount[priority] =
        (priorityCount[priority] || 0) + 1;

      if (priority === "High") highPriority++;
    }
  });

  resourcesData.forEach(r => {
    resourceCategory[r.category] =
      (resourceCategory[r.category] || 0) + 1;
  });


  document.getElementById("totalActivities").textContent =
    activitiesData.length;

  document.getElementById("joinedActivities").textContent =
    joined;

  document.getElementById("highPriority").textContent =
    highPriority;

  document.getElementById("totalResources").textContent =
    resourcesData.length;


  new Chart(
    document.getElementById("activityCategoryChart"),
    {
      type: "doughnut",
      data: {
        labels: Object.keys(activityCategory),
        datasets: [{
          data: Object.values(activityCategory)
        }]
      }
    }
  );

  new Chart(
    document.getElementById("resourceCategoryChart"),
    {
      type: "pie",
      data: {
        labels: Object.keys(resourceCategory),
        datasets: [{
          data: Object.values(resourceCategory)
        }]
      }
    }
  );

  new Chart(
    document.getElementById("priorityChart"),
    {
      type: "bar",
      data: {
        labels: Object.keys(priorityCount),
        datasets: [{
          label: "Joined Activities",
          data: Object.values(priorityCount)
        }]
      }
    }
  );

  new Chart(
    document.getElementById("statusChart"),
    {
      type: "bar",
      data: {
        labels: Object.keys(statusCount),
        datasets: [{
          label: "Number of Activities",
          data: Object.values(statusCount)
        }]
      }
    }
  );

function generateWellnessInsight() {

  // Safety guard
  if (
    Object.keys(activityCategory).length === 0 ||
    Object.keys(resourceCategory).length === 0
  ) {
    return {
      title: "No Wellness Insight Available",
      explanation: "Insufficient data to generate wellness insights.",
      evidence: ""
    };
  }

  function normalizeCategory(cat) {
    return cat.replace(" Health", "").trim().toLowerCase();
  }

  const joinedCategoryCount = {};

  activitiesData.forEach(a => {
    if (joinedActivities.includes(a.name)) {
      joinedCategoryCount[a.category] =
        (joinedCategoryCount[a.category] || 0) + 1;
    }
  });

  const topActivityCategory =
    Object.keys(joinedCategoryCount).length > 0
      ? Object.keys(joinedCategoryCount)
          .reduce((a, b) =>
            joinedCategoryCount[a] >= joinedCategoryCount[b] ? a : b
          )
      : Object.keys(activityCategory)
          .reduce((a, b) =>
            activityCategory[a] >= activityCategory[b] ? a : b
          );

  const topResourceCategory =
    Object.keys(resourceCategory)
      .reduce((a, b) =>
        resourceCategory[a] >= resourceCategory[b] ? a : b
      );

  const activityCount =
    joinedCategoryCount[topActivityCategory] || activityCategory[topActivityCategory];

  const resourceCount =
    resourceCategory[topResourceCategory];

  if (
    normalizeCategory(topActivityCategory) ===
    normalizeCategory(topResourceCategory)
  ) {
    return {
      title: `${topActivityCategory} Wellness Dominates`,
      explanation:
        `Both user participation and available resources show a strong emphasis on ${topActivityCategory.toLowerCase()} wellness.`,
      evidence:
        `${activityCount} activities and ${resourceCount} resources support this focus area.`
    };
  }

  return {
    title: "Mixed Wellness Focus Detected",
    explanation:
      `User engagement is higher in ${topActivityCategory.toLowerCase()} activities, while available resources focus more on ${topResourceCategory.toLowerCase()} wellness.`,
    evidence:
      `${activityCount} activities compared with ${resourceCount} resources indicate a balanced wellness strategy.`
  };
}

const insight = generateWellnessInsight();

document.getElementById("focusTitle").textContent =
  insight.title;

document.getElementById("focusExplanation").textContent =
  insight.explanation;

document.getElementById("focusEvidence").textContent =
  insight.evidence;

});