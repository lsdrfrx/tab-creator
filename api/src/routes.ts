import Elysia, { t } from 'elysia'
import { Score } from './db'

const scoreRouter = new Elysia({ prefix: '/score' })

scoreRouter.get('/', async () => await Score.find())

scoreRouter.get('/:id', async ({ params: { id } }) => await Score.findById(id))

scoreRouter.post('/new', async () => {
  const score = new Score({
    measures: [
      {
        beats: [
          {
            notes: [
              { subnotes: [{ note: null, fret: null, isRest: false }], isRest: false },
              { subnotes: [{ note: null, fret: null, isRest: false }], isRest: false },
              { subnotes: [{ note: null, fret: null, isRest: false }], isRest: false },
              { subnotes: [{ note: null, fret: null, isRest: false }], isRest: false },
            ],
          },
          {
            notes: [
              { subnotes: [{ note: null, fret: null, isRest: false }], isRest: false },
              { subnotes: [{ note: null, fret: null, isRest: false }], isRest: false },
              { subnotes: [{ note: null, fret: null, isRest: false }], isRest: false },
              { subnotes: [{ note: null, fret: null, isRest: false }], isRest: false },
            ],
          },
          {
            notes: [
              { subnotes: [{ note: null, fret: null, isRest: false }], isRest: false },
              { subnotes: [{ note: null, fret: null, isRest: false }], isRest: false },
              { subnotes: [{ note: null, fret: null, isRest: false }], isRest: false },
              { subnotes: [{ note: null, fret: null, isRest: false }], isRest: false },
            ],
          },
          {
            notes: [
              { subnotes: [{ note: null, fret: null, isRest: false }], isRest: false },
              { subnotes: [{ note: null, fret: null, isRest: false }], isRest: false },
              { subnotes: [{ note: null, fret: null, isRest: false }], isRest: false },
              { subnotes: [{ note: null, fret: null, isRest: false }], isRest: false },
            ],
          },
        ],
      },
    ],
  })

  return await score.save()
})

scoreRouter.delete('/:id', async ({ params: { id } }) => await Score.findByIdAndDelete(id))

scoreRouter.patch('/:id', async ({ body, params: { id } }) => {
  console.log(body)
  return await Score.findByIdAndUpdate(id, body)
})

export { scoreRouter }
