export interface Score {
  _id: string
  title: string
  measures: Array<Measure>
  tempo: number
}

export interface Measure {
  beats: Array<Beat>
}

export interface Beat {
  notes: Array<Note>
  duration: number
}

export interface Subnote {
  fret: Nullable<number>
  note: Nullable<string>
  isRest: boolean
}

export interface Note {
  subnotes: Array<Subnote>
  isRest: boolean
}

export interface Cursor {
  measure: number
  beat: number
  note: number
  subnote: number
}
