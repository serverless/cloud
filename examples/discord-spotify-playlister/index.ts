import { api, params, data } from '@serverless/cloud'
import { InteractionResponseType, InteractionType, verifyKeyMiddleware } from 'discord-interactions'
import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/v9'
import { authSpotifyForGuild, parseSpotifyUrl, createSpotifyAuthUrl, refreshGuildSpotifySession } from './spotify'
import { GuildPlaylist, Track } from './types'

const commands = [
  {
    name: 'ping',
    description: 'Ping for testing'
  },
  {
    name: 'add',
    description: 'Add a song to the playlist',
    options: [
      {
        name: 'url',
        description: 'The URL of the track to add',
        type: 3,
        required: true
      }
    ]
  },
  {
    name: 'view',
    description: 'View the playlist URL'
  },
  {
    name: 'set',
    description: 'Set the volume of the player',
    options: [
      {
        name: 'url',
        description: 'The Spotify Playlist URL to use',
        type: 3,
        required: true
      }
    ]
  },
  {
    name: 'list',
    description: 'List the current playlist tracks'
  },
  {
    name: 'auth-spotify',
    description: 'Authenticate with Spotify'
  }
]
const rest = new REST({ version: '9' }).setToken(params.DISCORD_BOT_TOKEN)

api.get('/set-commands', async (req, res) => {
  try {
    await rest.put(Routes.applicationCommands(params.DISCORD_CLIENT_ID), {
      body: commands
    })
    return res.sendStatus(200)
  } catch (e) {
    console.error(e)
    return res.sendStatus(500)
  }
})

api.get('/redirect', async (req, res) => {
  try {
    if (req.query.code && req.query.state) {
      await authSpotifyForGuild(req.query.code, req.query.state)
      return res.sendStatus(200)
    }
  } catch (e) {
    console.error(e)
    return res.sendStatus(500)
  }
})

const sendResponse = (res: any) => (content: string) => {
  return res.send({
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content
    }
  })
}

api.post('/discord', api.rawBody, verifyKeyMiddleware(params.DISCORD_PUBLIC_KEY), async (req, res) => {
  const message = req.body
  const commandName = message.data.name ?? undefined
  if (!commandName) {
    return res.sendStatus(500)
  }
  const channelId = message.channel_id
  const guildId = message.guild_id
  const username = message.member.user.username

  const reply = sendResponse(res)

  if (message.type === InteractionType.APPLICATION_COMMAND) {
    switch (commandName) {
      case 'ping': {
        return reply('Pong')
      }
      case 'view': {
        const playlist = await data.get<any>(`guild:${guildId}:playlist`)
        return reply(`https://open.spotify.com/playlist/${playlist.playlistId}`)
      }
      case 'add': {
        if (message.data.options) {
          const url = message.data.options[0].value
          const trackId = parseSpotifyUrl(url)
          if (!trackId) {
            return reply('Invalid Spotify URL')
          } else {
            await data.set<Track>(
              `guild:${guildId}:track:${trackId}`,
              {
                trackId,
                member: username,
                added: new Date().toISOString(),
                guildId,
                channelId
              },
              {
                overwrite: true
              }
            )
            return reply(`Adding ${trackId} to playlist`)
          }
        }
      }
      case 'list': {
        const tracks = await data.get<any>(`guild:${guildId}:track:*`)
        const formatted = tracks.items
          .map((track) => {
            return `${track.value.trackName} - ${track.value.artistName} - ${track.value.member}`
          })
          .join('\n')
        return reply(formatted)
      }
      case 'auth-spotify': {
        const spotifyAuthUrl = await createSpotifyAuthUrl(guildId)
        if (!spotifyAuthUrl) {
          return reply('Already authenticated spotify')
        }
        return reply(`Please visit ${spotifyAuthUrl} to authenticate with Spotify`)
      }
      case 'set': {
        if (message.data.options) {
          const url = message.data.options[0].value
          const playlistId = parseSpotifyUrl(url)
          await data.set<GuildPlaylist>(
            `guild:${guildId}:playlist`,
            {
              guildId,
              playlistId,
              channelId,
              added: new Date().toISOString(),
              member: message.member.user.username
            },
            {
              overwrite: true
            }
          )
          return reply(`Set Guild Playlist to ${playlistId}`)
        }
      }
    }
  }

  return res.sendStatus(200)
})

data.on(['created'], async (event) => {
  const { item } = event
  if (item.key.includes('track')) {
    const { value } = item
    const { guildId, trackId, channelId, member } = value as Track
    const spotify = await refreshGuildSpotifySession(guildId)
    const guildPlaylist = await data.get<GuildPlaylist>(`guild:${guildId}:playlist`)
    if (!guildPlaylist) {
      return await rest.post(Routes.channelMessages(channelId), { body: { content: 'No playlist set' } })
    }
    const { playlistId } = guildPlaylist as GuildPlaylist
    const currentTracksOnPlaylist = await spotify.getPlaylistTracks(playlistId)
    const playlistIds = new Set(currentTracksOnPlaylist.body.items.map((item) => item.track.id))
    const trackInfo = await spotify.getTrack(trackId)
    const { body } = trackInfo
    const { name, artists } = body
    if (playlistIds.has(trackId)) {
      return await rest.post(Routes.channelMessages(channelId), {
        body: { content: `${name} by ${artists[0].name} is already on server playlist` }
      })
    }
    await data.set<Track>(
      item.key,
      {
        ...value,
        artistName: artists[0].name,
        trackName: name
      },
      { overwrite: true }
    )
    await spotify.addTracksToPlaylist(playlistId, [`spotify:track:${trackId}`])
    return await rest.post(Routes.channelMessages(channelId), {
      body: { content: `${member} added ${name} by ${artists[0].name} to server playlist` }
    })
  }
})
