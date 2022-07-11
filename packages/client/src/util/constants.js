import {
  MdOutlineEdit,
  MdDeleteOutline,
  MdPersonAdd,
  MdOutlineCancel,
  MdOutlineNightlight,
} from 'react-icons/md';
import { RiMusicLine, RiAlbumLine } from 'react-icons/ri';
import { BsMusicNoteList, BsPersonCircle } from 'react-icons/bs';
import {
  AiOutlinePlusCircle,
  AiOutlineMinusCircle,
  AiOutlineArrowLeft,
  AiOutlineArrowDown,
} from 'react-icons/ai';
import { HiDotsVertical } from 'react-icons/hi';
import { WiDaySunny } from 'react-icons/wi';
import { FaEllipsisV, FaSpinner } from 'react-icons/fa';

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
  register: { url: '/auth', title: 'Register', private: false },
  signIn: { url: '/auth', title: 'Sign in', private: false },
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

export const EDIT_FORM_VIEWS = {
  artist: 'artists',
  albums: 'albums',
  songs: 'songs',
};

// SVG Color Scheme
export const SVG_COLOR_SCHEME = {
  light: '#FFF',
  dark: '#1A1A1A',
  accent: '#FECE2F',
};

export const ICONS = {
  edit: MdOutlineEdit,
  remove: MdDeleteOutline,
  addSong: RiMusicLine,
  addAlbum: RiAlbumLine,
  addArtist: MdPersonAdd,
  addPlaylist: BsMusicNoteList,
  threeDots: HiDotsVertical,
  backArrow: AiOutlineArrowLeft,
  downArrow: AiOutlineArrowDown,
  plus: AiOutlinePlusCircle,
  minus: AiOutlineMinusCircle,
  cancel: MdOutlineCancel,
  user: BsPersonCircle,
  moon: MdOutlineNightlight,
  sun: WiDaySunny,
  loadingSpinner: FaSpinner,
  ellipsis: FaEllipsisV,
};

export const ICON_TYPES = {
  edit: 'edit',
  remove: 'delete',
  addSong: 'addSong',
  addAlbum: 'addAlbum',
  addArtist: 'addArtist',
  addPlaylist: 'addPlaylist',
  threeDots: 'threeDots',
  backArrow: 'backArrow',
  downArrow: 'downArrow',
  loadingSpinner: 'loadingSpinner',
  plus: 'plus',
  minus: 'minus',
  cancel: 'cancel',
  user: 'user',
  moon: 'moon',
  sun: 'sun',
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

export const ADD_ITEM_CONTEXT_TYPES = {
  SET_ACTIVE_FORM: 'SET_ACTIVE_FORM',
  SET_SEARCH_INPUT: 'SET_SEARCH_INPUT',
};

export const ADD_ITEM_PATHNAME_TYPES = {
  albums: `${ROUTES.library.url}${LIBRARY_ROUTES.albums.url}`,
  artists: `${ROUTES.library.url}${LIBRARY_ROUTES.artists.url}`,
  songs: `${ROUTES.library.url}${LIBRARY_ROUTES.songs.url}`,
};

// Color Theme
export const lightTheme = {
  body: '#E2E2E2',
  text: '#363537',
  toggleBorder: '#FFF',
  gradient: 'linear-gradient(#39598A, #79D7ED)',
};

export const darkTheme = {
  body: '#363537',
  text: '#FAFAFA',
  toggleBorder: '#6B8096',
  gradient: 'linear-gradient(#091236, #1E215D)',
};
