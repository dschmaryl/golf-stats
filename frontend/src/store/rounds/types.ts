interface Hole {
	[key: string]: null | boolean | string | number;
	hole_number: number;
	round_id: number;
	id: number;

	// player data
	strokes: number;
	putts: number;
	adjusted_strokes: null | number;
	fairway_hit: boolean;
	gir: boolean;
	sand_save: boolean;

	// hole info
	par: number;
	yardage: number;
	handicap: number;
}

interface HolesType {
	[hole_number: number]: Hole;
}

export interface RoundData {
	[key: string]: string | number | HolesType;
	date: string;
	id: number;
	user_id: number;
	course: string;
	course_name: string;
	tee_color: string;
	tee_id: number;
	notes: string;
	handicap_index: number;
	total_gir: number;
	total_par: number;
	total_putts: number;
	total_strokes: number;
	front_9_gir: number;
	front_9_par: number;
	front_9_putts: number;
	front_9_strokes: number;
	back_9_gir: number;
	back_9_par: number;
	back_9_putts: number;
	back_9_strokes: number;
	par_3_avg: number;
	par_4_avg: number;
	par_5_avg: number;
	holes: HolesType;
}

export interface Round {
	[key: string]: string | number | RoundData;
	date: string;
	id: number;
	course: string;
	tee_color: string;
	handicap_index: number;
	total_strokes: number;
	total_putts: number;
	total_gir: number;
	front_9_strokes: number;
	back_9_strokes: number;
	roundData: RoundData;
}

export interface RoundsType {
	[index: number]: Round;
}

export interface RoundsStateType {
	roundsLoaded: boolean;
	sortKey: string;
	reverseSort: boolean;
	selectedRoundIndex: number;
	selectedRoundIsLoaded: boolean;
	showRoundDialog: boolean;
	data: RoundsType;
}
