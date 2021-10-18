export const secondsToTimestamp = (seconds) => {
  if (!seconds) return '';

  let duration = seconds;
  let hours = duration / 3600;
  duration = duration % 3600;

  let min = parseInt(duration / 60);
  duration = duration % 60;

  let sec = parseInt(duration);

  if (sec < 10) {
    sec = `0${sec}`;
  }
  if (min < 10) {
    min = `0${min}`;
  }

  if (parseInt(hours, 10) > 0) {
    return `${parseInt(hours, 10)}:${min}:${sec}`;
  } else if (min === 0) {
    return `${sec}`;
  } else {
    return `${min}:${sec}`;
  }
};

export const AlbumLength = ({ songsArr }) => {
  let albumLength = 0;
  songsArr.map((song) => {
    return (albumLength += parseInt(song.song_duration));
  });

  albumLength = secondsToTimestamp(albumLength);

  return <>{`${songsArr.length} songs • ${albumLength}`}</>;
};

export const calculateSeconds = (min, sec) => {
  let seconds = parseInt(min) * 60 + parseInt(sec);

  return seconds;
};

// export const secondsToHms = (seconds) => {
//   if (!seconds) return '';

//   let duration = seconds;
//   let hours = duration / 3600;
//   duration = duration % 3600;

//   let min = parseInt(duration / 60);
//   duration = duration % 60;

//   let sec = parseInt(duration);

//   if (sec < 10) {
//     sec = `0${sec}`;
//   }
//   if (min < 10) {
//     min = `0${min}`;
//   }

//   if (parseInt(hours, 10) > 0) {
//     return `${parseInt(hours, 10)}:${min}:${sec}`;
//   } else if (min === 0) {
//     return `${sec}`;
//   } else {
//     return `${min}:${sec}`;
//   }
// };
