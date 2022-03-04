import { params, data } from '@serverless/cloud'
import SpotifyWebApi from 'spotify-web-api-node'

export const parseSpotifyUrl = (url: string): string | undefined => {
  if (url.includes('open.spotify.com/track') || url.includes('open.spotify.com/playlist')) {
    const id = url.split('/')[4]
    if (id.includes('?')) {
      return id.split('?')[0]
    }
    return id
  }
  return undefined
}

export const createSpotifyAuthUrl = async (guildId: string) => {
  const scopes = ['playlist-modify-private', 'playlist-modify-public', 'playlist-read-private']
  const state = guildId
  const spotify = new SpotifyWebApi({
    clientId: params.SPOTIFY_DISCORD_CLIENT_ID,
    clientSecret: params.SPOTIFY_DISCORD_CLIENT_SECRET,
    redirectUri: params.CLOUD_URL + `/redirect`
  })
  const existingAuth = await data.get(`guild:${guildId}:spotify`)
  if (!existingAuth) {
    return spotify.createAuthorizeURL(scopes, state)
  }
  return undefined
}

export const authSpotifyForGuild = async (authCode: string, guildId: string) => {
  const spotify = new SpotifyWebApi({
    clientId: params.SPOTIFY_DISCORD_CLIENT_ID,
    clientSecret: params.SPOTIFY_DISCORD_CLIENT_SECRET,
    redirectUri: params.CLOUD_URL + `/redirect`
  })
  const { body } = await spotify.authorizationCodeGrant(authCode)
  await data.set(`guild:${guildId}:spotify`, { refreshToken: body.refresh_token })
}

export const refreshGuildSpotifySession = async (guildId: string): Promise<SpotifyWebApi> => {
  const spotify = new SpotifyWebApi({
    clientId: params.SPOTIFY_DISCORD_CLIENT_ID,
    clientSecret: params.SPOTIFY_DISCORD_CLIENT_SECRET,
    redirectUri: params.CLOUD_URL + `/redirect`
  })
  const refreshTokenData = await data.get<any>(`guild:${guildId}:spotify`)
  if (!refreshTokenData) {
    throw new Error('Missing Refresh Token')
  }
  spotify.setRefreshToken(refreshTokenData.refreshToken)
  const refreshData = await spotify.refreshAccessToken()
  spotify.setAccessToken(refreshData.body.access_token)
  return spotify
}
