export interface Stat {
  strokes: number;
  putts: number;
  gir: number;
  handicap: number;
  par3: number;
  par4: number;
  par5: number;
}

export interface StatsType {
  [season: number]: Stat;
}

export interface StatsStateType {
  statsLoaded: boolean;
  selectedSeason: null | number;
  data: StatsType;
}
