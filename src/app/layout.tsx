import 'src/styles.css';
import 'src/global.css';
import 'src/converted-styles.css';

// ----------------------------------------------------------------------

import ThemeProvider from 'src/theme';
import { LocalizationProvider } from 'src/locales';
import { AuthProvider } from 'src/auth/context/jwt';
import { TokenSection } from 'src/provider/TokenProvider';
import { MembershipPlansProvider } from 'src/provider/MembershipPlansProvider';
import { UserMembershipPlansProvider } from 'src/provider/UserMembershipPlansProvider';

import ProgressBar from 'src/components/progress-bar';
import { MotionLazy } from 'src/components/animate/motion-lazy';
import SnackbarProvider from 'src/components/snackbar/snackbar-provider';
import { SettingsDrawer, SettingsProvider } from 'src/components/settings';

import ChatbotBubble from 'src/sections/chatbot/chatbot-bubble';

// ----------------------------------------------------------------------

export const viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata = {
  title: 'CryptoGPT AI Trading',
  description:
    'Advanced AI-powered cryptocurrency trading platform. Leverage cutting-edge algorithms and machine learning for optimal trading strategies.',
  keywords: 'cryptocurrency,trading,AI,machine learning,blockchain,crypto,investment,algorithm',
  manifest: '/manifest.json',
  icons: [
    { rel: 'icon', type: 'image/png', sizes: '16x16', url: '/favicon/favicon-16x16.png' },
    { rel: 'icon', type: 'image/png', sizes: '32x32', url: '/favicon/favicon-32x32.png' },
    { rel: 'apple-touch-icon', sizes: '180x180', url: '/favicon/apple-touch-icon.png' },
  ],
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en" className="">
      <body>
        <AuthProvider>
          <LocalizationProvider>
            <SettingsProvider
              defaultSettings={{
                themeMode: 'dark', // 'light' | 'dark'
                themeDirection: 'ltr', //  'rtl' | 'ltr'
                themeContrast: 'default', // 'default' | 'bold'
                themeLayout: 'vertical', // 'vertical' | 'horizontal' | 'mini'
                themeColorPresets: 'orange', // 'default' | 'cyan' | 'purple' | 'blue' | 'orange' | 'red'
                themeStretch: false,
              }}
            >
              <ThemeProvider>
                <MembershipPlansProvider>
                  <UserMembershipPlansProvider>
                    <MotionLazy>
                      <SnackbarProvider>
                        <TokenSection>
                          <SettingsDrawer />
                          <ProgressBar />
                          {children}
                          <ChatbotBubble />
                        </TokenSection>
                      </SnackbarProvider>
                    </MotionLazy>
                  </UserMembershipPlansProvider>
                </MembershipPlansProvider>
              </ThemeProvider>
            </SettingsProvider>
          </LocalizationProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
