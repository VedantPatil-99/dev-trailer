# Google OAuth Setup with Supabase

## 1. Supabase Configuration

### Enable Google Provider

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Navigate to **Authentication** → **Providers**
4. Enable **Google** provider
5. Save configuration (Client ID and Secret will be added below)

## 2. Google Cloud Console Setup

### Create OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project or create new one
3. Navigate to **APIs & Services** → **Credentials**
4. Click **+ CREATE CREDENTIALS** → **OAuth client ID**
5. Select **Web application**
6. Add authorized redirect URIs:
   ```
   https://[YOUR_SUPABASE_PROJECT_ID].supabase.co/auth/v1/callback
   ```
7. Copy **Client ID** and **Client Secret**

### Enable Required APIs

1. Go to **APIs & Services** → **Library**
2. Enable:
   - Google+ API
   - Google Identity Services API

## 3. Update Supabase Provider Settings

In Supabase Dashboard → Authentication → Providers → Google:

- **Client ID**: Paste from Google Cloud Console
- **Client Secret**: Paste from Google Cloud Console
- **Save** configuration

## 4. Environment Variables

Update your `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=your-anon-key
```

## 5. Testing

1. Clear browser cookies/localStorage
2. Visit `/auth/login`
3. Click "Continue with Google"
4. Complete Google OAuth flow
5. Should redirect to `/dashboard`

## Troubleshooting

### Common Issues

- **Invalid redirect URI**: Ensure exact match in Google Cloud Console
- **CORS errors**: Check Supabase project settings
- **Missing APIs**: Enable Google+ API and Google Identity Services API

### Debug Mode

Add to `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_DEBUG=true
```
