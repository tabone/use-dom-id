'use strict'

import { renderHook } from '@testing-library/react-hooks'
import useDOMID from './index'

describe('useDOMID tests', () => {
  beforeEach(() => jest.spyOn(Math, 'random'))

  afterEach(() => Math.random.mockRestore())

  it('should return a unique ID for DOM elements having the same namespace', () => {
    Math.random
      .mockReturnValueOnce(1)
      .mockReturnValueOnce(1)
      .mockReturnValueOnce(2)

    const { result: resultOne } = renderHook(() => useDOMID('namespace-one'))
    const { result: resultTwo } = renderHook(() => useDOMID('namespace-one'))

    expect(Math.random).toHaveBeenCalledTimes(3)
    expect(resultOne.current).toBe('namespace-one-1000000')
    expect(resultTwo.current).toBe('namespace-one-2000000')
  })

  it('should return a unique ID for DOM elements having a different namespace', () => {
    Math.random
      .mockReturnValueOnce(1)
      .mockReturnValueOnce(1)

    const { result: resultOne } = renderHook(() => useDOMID('namespace-one'))
    const { result: resultTwo } = renderHook(() => useDOMID('namespace-two'))

    expect(Math.random).toHaveBeenCalledTimes(2)
    expect(resultOne.current).toBe('namespace-one-1000000')
    expect(resultTwo.current).toBe('namespace-two-1000000')
  })

  it('should free up an ID when it is no longer being used', () => {
    Math.random
      .mockReturnValueOnce(1)
      .mockReturnValueOnce(1)

      const {
        unmount,
        result: resultOne
      } = renderHook(() => useDOMID('namespace-one'))

      expect(resultOne.current).toBe('namespace-one-1000000')

      unmount()

      const { result: resultTwo } = renderHook(() => useDOMID('namespace-one'))

      expect(resultTwo.current).toBe('namespace-one-1000000')
  })

  it('should default namespace to `app`', () => {
    Math.random.mockReturnValueOnce(1)

    const { result } = renderHook(() => useDOMID())

    expect(Math.random).toHaveBeenCalledTimes(1)
    expect(result.current).toBe('app-1000000')
  })
})
