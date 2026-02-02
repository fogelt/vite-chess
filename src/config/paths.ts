export const paths = {
  home: { path: '/' },
  game: { path: '/game/:gameId?' } // The '?' makes :gameId optional
} as const;