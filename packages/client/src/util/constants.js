import {
  MdOutlineEdit,
  MdDeleteOutline,
  MdPersonAdd,
  MdOutlineCancel,
} from 'react-icons/md';
import { RiMusicLine, RiAlbumLine } from 'react-icons/ri';
import { BsMusicNoteList, BsPersonCircle } from 'react-icons/bs';
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai';
import { HiDotsVertical } from 'react-icons/hi';

export const API_URL = 'http://localhost:5000/api/';

// TODO: move to .env file to secure further
export const API_ROUTES = {
  auth: {
    signIn: '/auth/signin',
    register: '/auth/signup',
  },
  artists: {
    getArtists: '/artist',
    getArtist: '/artist',
    post: '/artist',
    update: '/artist',
    delete: '/artist',
  },
  albums: {
    getAlbums: '/album',
    getAlbum: '/album',
    post: '/album',
    update: '/album',
    delete: '/album',
  },
  songs: {
    getSongs: '/song',
    getSong: '/song',
    post: '/song',
    update: '/song',
    delete: '/song',
  },
};

export const ROUTES = {
  home: {
    url: '/',
    title: 'Home',
  },
  library: {
    url: '/library',
    title: 'Library',
    private: true,
  },
};

export const AUTH_ROUTES = {
  register: { url: '/signup', title: 'Register', private: false },
  signIn: { url: '/signin', title: 'Sign in', private: false },
  signOut: { url: '/signout', title: 'Sign out', private: true },
};

export const LIBRARY_ROUTES = {
  artists: {
    url: '/artists',
    title: 'Artists',
    artistDetails: {
      url: '/details',
    },
  },
  albums: {
    url: '/albums',
    title: 'Albums',
    albumDetails: {
      url: '/album-details',
    },
  },
  songs: {
    url: '/songs',
    title: 'Songs',
    component: 'SongsGrid',
  },
};

export const SETTINGS_MENU_OPTIONS = {
  edit: {
    action: 'edit',
    label: 'Edit',
    icon: 'edit',
  },
  remove: {
    action: 'remove',
    label: 'Delete',
    icon: 'remove',
  },
  addSong: { action: 'addSong', label: 'Add Song', icon: 'addSong' },
  addArtist: { action: 'addArtist', label: 'Add Artist', icon: 'addArtist' },
  addAlbum: { action: 'addAlbum', label: 'Add Album', icon: 'addAlbum' },
  addPlaylist: {
    action: 'addPlaylist',
    label: 'New Playlist',
    icon: 'addPlaylist',
  },
};

export const SONG_GRID_VIEWS = {
  generalView: 'generalView',
  albumView: 'albumView',
  songsPageView: 'SongsPageView',
};

export const ICONS = {
  edit: MdOutlineEdit,
  remove: MdDeleteOutline,
  addSong: RiMusicLine,
  addAlbum: RiAlbumLine,
  addArtist: MdPersonAdd,
  addPlaylist: BsMusicNoteList,
  threeDots: HiDotsVertical,
  plus: AiOutlinePlusCircle,
  minus: AiOutlineMinusCircle,
  cancel: MdOutlineCancel,
  user: BsPersonCircle,
};

export const ICON_TYPES = {
  edit: 'edit',
  remove: 'delete',
  addSong: 'addSong',
  addAlbum: 'addAlbum',
  addArtist: 'addArtist',
  addPlaylist: 'addPlaylist',
  threeDots: 'threeDots',
  plus: 'plus',
  minus: 'minus',
  cancel: 'cancel',
  user: 'user',
};

export const BTN_STYLES = {
  outline: 'outline',
  fill: 'fill',
};

export const BTN_TYPES = {
  submit: 'submit',
  button: 'button',
};

export const SORT_TYPES = {
  album: 'album_title',
  artist: 'artist_name',
  year: 'release_year',
};
