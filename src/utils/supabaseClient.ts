// eslint-disable-next-line import/no-extraneous-dependencies
import { createBrowserClient } from '@supabase/ssr'

import { SUPABASE_API } from 'src/config-global';

const createSupabaseClient = () => createBrowserClient(SUPABASE_API.url, SUPABASE_API.anonKey);

export const supabase = typeof window === 'undefined' ? ({} as ReturnType<typeof createSupabaseClient>) : createSupabaseClient();
