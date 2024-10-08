export const add_activity_history = function (
  absolute_url: string,
  cover_image: string,
  title: string,
  franchise: string
) {
  const recent_activities_data = localStorage.getItem(`${franchise}-History`);

  if (recent_activities_data) {
    const recent_activities = JSON.parse(recent_activities_data) as [
      {
        title: string;
        cover: string;
        link: string;
      }
    ];

    for (let i = 0; i < recent_activities.length; i++) {
      const activity = recent_activities[i];

      if (activity.link === absolute_url) {
        recent_activities.splice(i, 1);
        break;
      }
    }

    recent_activities.unshift({
      title,
      cover: cover_image,
      link: absolute_url,
    });

    localStorage.setItem(`${franchise}-History`, JSON.stringify(recent_activities));
  }
  else
  {
    const recent_activities = [
      {
        title,
        cover: cover_image,
        link: absolute_url,
      },
    ];

    localStorage.setItem(`${franchise}-History`, JSON.stringify(recent_activities));
  }
};
