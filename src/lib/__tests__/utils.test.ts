import { getBaseUrl, unique } from '../utils'

describe('utils', () => {
  describe('getBaseUrl', () => {
    const env = process.env

    beforeEach(() => {
      jest.resetModules()
      process.env = { ...env }
    })

    afterEach(() => {
      process.env = env
    })

    it('should return production url when environment is not development', () => {
      // @ts-ignore
      process.env.NODE_ENV = 'production'

      expect(getBaseUrl()).toBe('https://tsnext-tw.vercel.app')
    })

    it('should return localhost when environment is development', () => {
      // @ts-ignore
      process.env.NODE_ENV = 'development'

      expect(getBaseUrl()).toBe('http://localhost:3000')
    })
  })

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
})
