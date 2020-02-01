import {ROUTES} from '../../routes';

export const menuItems = [
  {
    href: ROUTES.MAIN,
    title: 'Главная страница',
    icon: 'Home',
    label: 'Главная'
  },
  {
    href: ROUTES.BORMO,
    title: 'Бормотание (Alt-M) - Mumble',
    icon: 'Bormo',
    label: 'Бормотание'
  },
  {
    href: ROUTES.CONTROL,
    title: 'Контроль (Alt-C) - Control',
    icon: 'Control',
    label: 'Контроль'
  },
  {
    href: ROUTES.REVERSE,
    title: 'Контроль наоборот (Alt-I) - Inverse (reverse) control',
    icon: 'Reverse',
    label: 'Реверс'
  },
  {
    href: ROUTES.SPELLING,
    title: 'Правописание (Alt-O) - Orthography',
    icon: 'Spelling',
    label: 'Правописание'
  },
  {
    href: ROUTES.CHECK,
    title: 'Проверка (Alt-V) - Validation',
    icon: 'Check',
    label: 'Проверка'
  }
];
