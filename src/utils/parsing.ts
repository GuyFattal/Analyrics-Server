type song = {
  song_name: string;
  song_year: number;
  song_lyrics: string;
  genre: string;
  sid: string;
  artist: { aid: string; first_name: string; last_name: string };
};

export const parseTxt = (text: string) => {
  console.log(text);
};
