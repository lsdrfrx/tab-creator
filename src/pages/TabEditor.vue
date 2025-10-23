<template>
  <MainLayout>
    <div v-if="scoreId" class="container">
      <div class="inner">
        <div class="controls">
          <div class="tempo">
            <template v-if="isEditTempo">
              <div class="input">
                <input v-model="tempoDraft" type="text" />
                <div v-if="wasSubmitted && hasError" class="errorLabel">
                  Введите корректный темп
                </div>
              </div>
              <button @click="handleSaveTempo">Сохранить</button>
            </template>
            <template v-else>
              BPM: {{ scoreData.tempo }}
              <button @click="handleEditTempo">edit</button>
            </template>
          </div>
          <button @click="saveScore">Сохранить партитуру</button>
        </div>
        <div class="score">
          <div v-for="(measure, i) in scoreData.measures" :key="`measure-${i}`" class="bar">
            <div class="table">
              <div class="row"></div>
              <div class="row"></div>
              <div class="row"></div>
            </div>
            <div class="grid">
              <template v-for="(beat, j) in measure.beats">
                <div
                  v-for="(note, k) in beat.notes"
                  :key="`measure-${i}_bar-${j}_note-${k}`"
                  class="noteContainer"
                >
                  <template v-for="(subnote, l) in note.subnotes">
                    <VNote
                      v-if="note"
                      ref="notes"
                      :key="`measure-${i}_bar-${j}_note-${k}_subnote-${l}`"
                      :fret="subnote.fret"
                      :class="{
                        active:
                          JSON.stringify(cursor) ===
                          JSON.stringify({ measure: i, beat: j, note: k, subnote: l }),
                        playing:
                          playbackCursor.measure === i &&
                          playbackCursor.beat === j &&
                          playbackCursor.note === k &&
                          isPlaying,
                      }"
                      @click="moveCursor(i, j, k, l)"
                    />
                  </template>
                </div>
              </template>
            </div>
          </div>
          <div class="durations"></div>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script setup lang="ts">
import type { Ref } from 'vue'
import type { Score, Cursor, Measure, Note } from '@/types'

import { ref } from 'vue'
import { onKeyStroke, useFetch } from '@vueuse/core'
import * as Tone from 'tone'
import { getDefaultMeasure } from './data'
import { VNote } from '@/components/editor'
import { useScoreStore } from '@/composables'
import { MainLayout } from '@/layouts'

const TUNE = ['E1', 'A1', 'D2', 'G2'].reverse()

const isEditTempo: Ref<boolean> = ref(false)
const tempoDraft: Ref<Nullable<string>> = ref(null)
const wasSubmitted: Ref<boolean> = ref(false)
const hasError: Ref<boolean> = ref(false)

const scoreId: Ref<Nullable<string>> = ref(null)

const handleSaveTempo = (): void => {
  wasSubmitted.value = true

  const tempo = Number(tempoDraft.value)

  if (!tempo) {
    hasError.value = true
    return
  }

  scoreData.value.tempo = tempo
  wasSubmitted.value = false
  hasError.value = false
  isEditTempo.value = false
}

const saveScore = () => {
  useFetch('http://localhost:3000/')
}

const handleEditTempo = () => {
  isEditTempo.value = true
}

const cursor: Ref<Cursor> = ref({ measure: 0, beat: 0, note: 0, subnote: 0 })
const playbackCursor: Ref<{ measure: number; beat: number; note: number }> = ref({
  measure: 0,
  beat: 0,
  note: 0,
})
const isPlaying: Ref<boolean> = ref(false)
const synth = new Tone.PolySynth().toDestination()

const scoreData: Ref<Score> = ref({
  tempo: 80,
  measures: [getDefaultMeasure()],
})

const moveCursor = (measure: number, beat: number, note: number, subnote: number) => {
  cursor.value = { measure, beat, note, subnote }
}

const getBeatDuration = (measureIndex: number, beatIndex: number): number =>
  scoreData.value.measures[measureIndex].beats[beatIndex].duration

onKeyStroke(['F1', 'F2', 'F3'], (e) => {
  const duration = Number(e.key[1])

  const { measure, beat } = cursor.value
  scoreData.value.measures[measure].beats[beat].duration = duration

  scoreData.value.measures[measure].beats[beat].notes.forEach((note) => {
    const prevNotes = note.subnotes.filter((v) => v.note !== null) ?? [
      { note: null, fret: null, isRest: false },
    ]
    note.subnotes = prevNotes
      .concat([
        { note: null, fret: null, isRest: false },
        { note: null, fret: null, isRest: false },
        { note: null, fret: null, isRest: false },
      ])
      .slice(0, duration)
  })
})

onKeyStroke('ArrowRight', () => {
  const { measure, beat, note } = cursor.value
  if (
    scoreData.value.measures[measure].beats[beat].notes[note].subnotes.length - 1 >
    cursor.value.subnote
  ) {
    cursor.value.subnote += 1
    return
  }

  cursor.value.subnote = 0

  if (cursor.value.beat !== 3) {
    cursor.value.beat += 1
    return
  }

  if (cursor.value.measure === scoreData.value.measures.length - 1) {
    scoreData.value.measures.push(getDefaultMeasure())
  }

  cursor.value.measure += 1
  cursor.value.beat = 0
})

onKeyStroke('ArrowLeft', () => {
  const { measure, beat, note } = cursor.value

  if (cursor.value.subnote > 0) {
    cursor.value.subnote -= 1
    return
  }

  if (cursor.value.measure === 0 && cursor.value.beat === 0) return

  if (cursor.value.beat > 0) {
    cursor.value.beat -= 1
    cursor.value.subnote =
      scoreData.value.measures[measure].beats[beat - 1].notes[note].subnotes.length - 1
    return
  }

  cursor.value.measure -= 1
  cursor.value.beat = scoreData.value.measures[cursor.value.measure].beats.length - 1
  cursor.value.subnote = Math.max(
    0,
    scoreData.value.measures[measure].beats[cursor.value.beat].notes[note].subnotes.length - 1,
  )

  if (
    isMeasureEmpty(scoreData.value.measures[cursor.value.measure + 1]) &&
    cursor.value.measure + 1 === scoreData.value.measures.length - 1
  ) {
    scoreData.value.measures.pop()
  }
})

onKeyStroke('ArrowUp', () => {
  if (cursor.value.note === 0) return

  cursor.value.note -= 1
})

onKeyStroke('ArrowDown', () => {
  if (cursor.value.note === 3) return

  cursor.value.note += 1
})

onKeyStroke([...Array(10).keys()].map(String), (e) => {
  const { measure, beat, note, subnote } = cursor.value

  const n = pitchToNote(e.key, TUNE[note])
  synth.triggerAttackRelease(n, 0.1)
  scoreData.value.measures[measure].beats[beat].notes[note].subnotes[subnote].note = n
  scoreData.value.measures[measure].beats[beat].notes[note].subnotes[subnote].fret = e.key
})

onKeyStroke('Backspace', () => {
  const { measure, beat, note, subnote } = cursor.value

  scoreData.value.measures[measure].beats[beat].notes[note].subnotes[subnote].note = null
  scoreData.value.measures[measure].beats[beat].notes[note].subnotes[subnote].fret = null
})

async function playScore() {
  await Tone.start()
  resetPlayback()

  isPlaying.value = true

  Tone.getTransport().stop()
  Tone.getTransport().cancel()

  Tone.getTransport().bpm.value = scoreData.value.tempo

  const part = new Tone.Part((time, chord) => {
    const validNotes = chord.filter((note: Array<Note>) => note !== null)
    if (validNotes.length > 0) {
      synth.triggerAttackRelease(validNotes, '4n', time - 0.5)
    }
  }, [])

  let currentTime = 0
  const beatDuration = Tone.Time('4n').toSeconds()

  scoreData.value.measures.forEach((measure) => {
    measure.beats.forEach((beat) => {
      const notes = beat.notes.map((note: Note) => note.subnotes[0].note)
      part.add(currentTime, notes)
      currentTime += beatDuration
      setTimeout(() => incrementPlaybackCursor(), currentTime * 1000)
    })
  })

  part.start(0)
  Tone.getTransport().start()

  const totalDuration = currentTime
  Tone.getTransport().schedule(() => {
    part.stop()
    Tone.getTransport().stop()
    resetPlayback()
  }, `+${totalDuration}`)
}

const incrementPlaybackCursor = (): void => {
  if (playbackCursor.value.beat === 3) {
    playbackCursor.value.beat = 0
    playbackCursor.value.measure += 1
    return
  }

  playbackCursor.value.beat += 1
}

const resetPlayback = () => {
  playbackCursor.value.measure = 0
  playbackCursor.value.beat = 0
  isPlaying.value = false
}

onKeyStroke(' ', playScore)

const pitchToNote = (pitch: number, openStringNote: string): string => {
  const freq = new Tone.Frequency(openStringNote)
  const transposed = freq.transpose(pitch)

  return transposed.toNote()
}

const isMeasureEmpty = (measure: Measure): boolean =>
  measure.beats.every((beat) => {
    return beat.notes.every((note) => note.subnotes[0].note === null)
  })
</script>

<style scoped lang="scss">
.inner {
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 3rem;
}

.score {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  row-gap: 3rem;
}

.bar {
  position: relative;
  border: 1px solid black;
  border-collapse: collapse;
  width: 400px;
}

.row {
  border: 1px solid black;
  border-collapse: collapse;
  height: 2rem;
}

.grid {
  position: absolute;
  justify-content: space-between;
  padding: 0 4rem;
  width: 100%;
  top: -1rem;
  display: grid;
  grid-template-columns: repeat(4, auto);
  grid-template-rows: repeat(4, auto);
  grid-auto-flow: column;
}

:nth-child(1 of .playing) {
  &::before {
    display: block;
    position: absolute;
    content: '';
    height: 100%;
    width: 1.4rem;
    background-color: #3333ff66;
    border-radius: 1rem;
  }
}

.tempo {
  display: flex;
  justify-content: space-between;
  width: 30%;
}

.noteContainer {
  display: flex;
  gap: 0.4rem;
}
</style>
