// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'user',
    path: '/dashboard/user',
    icon: icon('ic_user'),
  },
  {
    title: 'Strona główna',
    path: '/dashboard/mainPage',
    icon: icon('insights_black_24dp'),
  },
  {
    title: 'songs',
    path: '/dashboard/songs',
    icon: icon('library_music_black_24dp'),
  },
  {
    title: 'songManager',
    path: '/dashboard/songManager',
    icon: icon('lyrics_black_24dp'),
  },
  {
    title: 'Playlisty',
    path: '/dashboard/playlists',
    icon: icon('queue_music_black_24dp'),
  },
  {
    title: 'Tworzenie playlist',
    path: '/dashboard/playlistCreate',
    icon: icon('playlist_add_black_24dp'),
  },
  {
    title: 'categories',
    path: '/dashboard/categories',
    icon: icon('category_black_24dp'),
  },
  {
    title: 'profiles',
    path: '/dashboard/profiles',
    icon: icon('portrait_black_24dp'),
  },
  {
    title: 'Ustawienia',
    path: '/dashboard/settings',
    icon: icon('settings_black_24dp'),
  },
  {
    title: 'Kontakt',
    path: '/dashboard/contact',
    icon: icon('chat_bubble_black_24dp'),
  },
  {
    title: 'users',
    path: '/dashboard/users',
    icon: icon('people_black_24dp'),
  },
  {
    title: 'Grupy',
    path: '/dashboard/groups',
    icon: icon('groups_black_24dp'),
  },
  {
    title: 'Logowanie',
    path: '/login',
    icon: icon('ic_lock'),
  },
  {
    title: 'passwordRecovery',
    path: '/passwordRecovery',
    icon: icon('ic_lock'),
    },
  {
    title: 'Error 404',
    path: '/404',
    icon: icon('ic_disabled'),
  },
];

export default navConfig;
