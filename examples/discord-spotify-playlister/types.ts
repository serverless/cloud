export type GuildPlaylist = {
  playlistId: string
  added: string
  channelId: string
  guildId: string
  member: string
}

export type Track = {
  trackId: string
  guildId: string
  member: string
  added: string
  channelId: string
  artistName?: string
  trackName?: string
}
