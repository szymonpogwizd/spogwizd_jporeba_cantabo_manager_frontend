// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'Strona główna',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Pieśni',
    path: '/dashboard/songs',
    icon: icon('library_music_black_24dp'),
  },
  {
    title: 'Zarządzanie pieśniami',
    path: '/dashboard/songManager',
    icon: icon('lyrics_black_24dp'),
  },
  {
    title: 'Playlisty',
    path: '/dashboard/playlist',
    icon: icon('queue_music_black_24dp'),
  },
  {
    title: 'Tworzenie playlist',
    path: '/dashboard/playlistCreate',
    icon: icon('playlist_add_black_24dp'),
  },
  {
    title: 'Kategorie',
    path: '/dashboard/categories',
    icon: icon('category_black_24dp'),
  },
  {
    title: 'Profile',
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
    title: 'Użytkownicy',
    path: '/dashboard/users',
    icon: icon('people_black_24dp'),
  },
  {
    title: 'Grupy',
    path: '/dashboard/groups',
    icon: icon('groups_black_24dp'),
  },
];

export default navConfig;
