export interface Score {
  measures: Array<Measure>
  tempo: number
}

export interface Measure {
  beats: Array<Beat>
}

export interface Beat {
  notes: Array<Note>
  isRest: boolean
}

export interface Note {
  note: Nullable<string>
  fret: Nullable<number>
  duration: number
}

export interface Cursor {
  measure: number
  beat: number
  note: number
}
