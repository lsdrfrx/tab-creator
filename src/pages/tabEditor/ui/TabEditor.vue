<template>
  <div class="container">
    <div class="inner">
      <div v-for="(measure, i) in scoreData.measures" :key="`measure-${i}`" class="bar">
        <div class="table">
          <div class="row"></div>
          <div class="row"></div>
          <div class="row"></div>
        </div>
        <div class="grid">
          <template v-for="(beat, j) in measure.beats">
            <template v-for="(note, k) in beat.notes">
              <VNote
                v-if="note"
                ref="notes"
                :key="`measure-${i}_bar-${j}_note-${k}`"
                :class="{
                  active:
                    JSON.stringify(cursor) === JSON.stringify({ measure: i, beat: j, note: k }),
                  playing: playbackCursor.measure === i && playbackCursor.beat === j && isPlaying,
                }"
                :fret="note.fret"
                :duration="note.duration"
              />
            </template>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Ref } from 'vue'
import type { Score, Cursor, Measure } from '../model'

import { ref } from 'vue'
import { onKeyStroke } from '@vueuse/core'
import * as Tone from 'tone'
import { getDefaultMeasure } from './data'
import VNote from './VNote.vue'

const TUNE = ['E1', 'A1', 'D2', 'G2'].reverse()

const cursor: Ref<Cursor> = ref({ measure: 0, beat: 0, note: 0 })
const playbackCursor: Ref<{ measure: number; beat: number }> = ref({ measure: 0, beat: 0 })
const isPlaying: Ref<boolean> = ref(true)
const synth = new Tone.PolySynth().toDestination()

const scoreData: Ref<Score> = ref({
  tempo: 127,
  measures: [getDefaultMeasure()],
})

onKeyStroke('ArrowRight', () => {
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
  if (cursor.value.measure === 0 && cursor.value.beat === 0) return

  if (cursor.value.beat > 0) {
    cursor.value.beat -= 1
    return
  }

  cursor.value.measure -= 1
  cursor.value.beat = scoreData.value.measures[cursor.value.measure].beats.length - 1

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
  const { measure, beat, note } = cursor.value

  const n = pitchToNote(e.key, TUNE[note])
  synth.triggerAttackRelease(n, 0.1)
  scoreData.value.measures[measure].beats[beat].notes[note].note = n
  scoreData.value.measures[measure].beats[beat].notes[note].fret = e.key
})

onKeyStroke('Backspace', () => {
  const { measure, beat, note } = cursor.value

  scoreData.value.measures[measure].beats[beat].notes[note].note = null
  scoreData.value.measures[measure].beats[beat].notes[note].fret = null
})

async function playScore() {
  await Tone.start()
  resetPlayback()

  isPlaying.value = true

  Tone.getTransport().stop()
  Tone.getTransport().cancel()

  Tone.getTransport().bpm.value = scoreData.value.tempo

  const part = new Tone.Part((time, chord) => {
    const validNotes = chord.filter((note: Nullable<string>) => note !== null)
    if (validNotes.length > 0) {
      synth.triggerAttackRelease(validNotes, '4n', time - 0.5)
    }
  }, [])

  let currentTime = 0
  const beatDuration = Tone.Time('4n').toSeconds()

  scoreData.value.measures.forEach((measure) => {
    measure.beats.forEach((beat) => {
      const notes = beat.notes.map((note) => note.note)
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
    return beat.notes.every((note) => note.note === null)
  })
</script>

<style scoped lang="scss">
.inner {
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
</style>
