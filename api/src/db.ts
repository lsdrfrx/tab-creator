import mongoose from 'mongoose'

const scoreSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    default: 'Untitled',
  },
  tempo: {
    type: Number,
    required: true,
    default: 80,
  },
  measures: [
    {
      beats: [
        {
          duration: {
            type: Number,
            default: 1,
          },
          notes: [
            {
              subnotes: [
                {
                  note: {
                    type: String,
                    default: null,
                  },
                  fret: {
                    type: Number,
                    default: null,
                  },
                  isRest: {
                    type: Boolean,
                    default: false,
                  },
                },
              ],
              isRest: {
                type: Boolean,
                default: false,
              },
            },
          ],
        },
      ],
    },
  ],
})

export type Score = mongoose.InferSchemaType<typeof scoreSchema>
export const Score = mongoose.model('Score', scoreSchema)
