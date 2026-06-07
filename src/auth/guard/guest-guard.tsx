import { useEffect, useCallback } from 'react';

import { paths } from 'src/routes/paths';
import { useRouter, useSearchParams } from 'src/routes/hooks';

import { getUserProfileData } from 'src/auth/context/jwt/utils';

import { SplashScreen } from 'src/components/loading-screen';

import { useAuthContext } from '../hooks';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function GuestGuard({ children }: Props) {
  const { loading } = useAuthContext();

  return <>{loading ? <SplashScreen /> : <Container>{children}</Container>}</>;
}

// ----------------------------------------------------------------------

function Container({ children }: Props) {
  const router = useRouter();

  const searchParams = useSearchParams();

  const returnTo = searchParams.get('returnTo') || paths.dashboard.root;

  const { authenticated } = useAuthContext();

  const check = useCallback(() => {
    if (authenticated) {
      console.log("authenticated-guest-guard", authenticated);

      const user_profile = getUserProfileData();
      // console.log('user_profile-oauth', user_profile)
      if (user_profile?.terms) {
        router.replace(returnTo);
      } else {
        router.replace(paths.dashboard.user.profileSetup);
      }
    }
  }, [authenticated, returnTo, router]);

  useEffect(() => {
    check();
  }, [check]);

  return <>{children}</>;
}
