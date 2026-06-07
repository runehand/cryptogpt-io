import { paths } from 'src/routes/paths';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export const navConfig = [
  {
    title: 'Home',
    icon: <Iconify icon="solar:home-2-bold-duotone" />,
    path: '/',
  },
  {
    title: 'Components',
    icon: <Iconify icon="solar:atom-bold-duotone" />,
    path: paths.dashboard.root,
  },
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: <Iconify icon="solar:file-bold-duotone" />,
    children: [
      {
        subheader: 'Other',
        items: [
          { title: 'About us', path: paths.dashboard.root },
          { title: 'Contact us', path: paths.dashboard.root },
        ],
      },
    ],
  },
];
