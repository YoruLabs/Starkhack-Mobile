const STRAVA_CLIENT_ID = '[CLIEND-ID]'
export const REDIRECT_URI = 'zap-mobile://zap-mobile/callback'
export const STRAVA_AUTH_URL = `https://www.strava.com/oauth/authorize?client_id=${STRAVA_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=activity:read_all`
