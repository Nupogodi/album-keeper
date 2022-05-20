import React from 'react';

export const secondsToTimestamp = (seconds) => {
  if (!seconds) return '';

  let duration = seconds;
  const hours = duration / 3600;
  duration %= 3600;

  let min = parseInt(duration / 60, 10);
  duration %= 60;

  let sec = parseInt(duration, 10);

  if (sec < 10) {
    sec = `0${sec}`;
  }
  if (min < 10) {
    min = `0${min}`;
  }

  if (parseInt(hours, 10) > 0) {
    return `${parseInt(hours, 10)}:${min}:${sec}`;
  }
  if (min === 0) {
    return `${sec}`;
  }
  return `${min}:${sec}`;
};

export const AlbumLength = ({ songsArr }) => {
  let albumLength = 0;

  // eslint-disable-next-line no-return-assign
  songsArr.map((song) => (albumLength += parseInt(song.song_duration, 10)));

  albumLength = secondsToTimestamp(albumLength);

  return <>{`${songsArr.length} songs • ${albumLength}`}</>;
};

export const calculateSeconds = (min, sec) => {
  const seconds = parseInt(min, 10) * 60 + parseInt(sec, 10);

  return seconds;
};
