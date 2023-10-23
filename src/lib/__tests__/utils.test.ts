import { cn, unique } from '../utils'

describe('utils', () => {
  describe('unique', () => {
    it('should return unique array values', () => {
      const values = ['1', '1', '2', '2', '3']
      expect(unique(values)).toEqual(['1', '2', '3'])
    })

    it('should return unique array values with propery', () => {
      const values = [
        { id: 1, value: '1' },
        { id: 1, value: '2' },
      ]
      expect(unique(values, 'id')).toEqual([{ id: 1, value: '1' }])
    })
  })

  describe('cn', () => {
    it('should return merged tailwind classes', () => {
      const classes = 'bg-primary-500 bg-primary-600'

      expect(cn(classes)).toBe('bg-primary-600')
    })
  })
})
