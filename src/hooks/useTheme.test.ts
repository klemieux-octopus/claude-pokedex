import { act, renderHook } from '@testing-library/react'
import { useTheme } from './useTheme'

const root = document.documentElement

beforeEach(() => {
  window.localStorage.clear()
  delete root.dataset.theme
})

describe('useTheme', () => {
  it('par défaut suit l’OS : préférence « system » et aucun attribut data-theme', () => {
    const { result } = renderHook(() => useTheme())
    expect(result.current.pref).toBe('system')
    expect(root.dataset.theme).toBeUndefined()
  })

  it('relit une préférence persistée au montage et l’applique sur <html>', () => {
    window.localStorage.setItem('pokedex-theme', 'dark')
    const { result } = renderHook(() => useTheme())
    expect(result.current.pref).toBe('dark')
    expect(root.dataset.theme).toBe('dark')
  })

  it('setPref persiste le choix et le reflète sur <html>', () => {
    const { result } = renderHook(() => useTheme())
    act(() => result.current.setPref('light'))
    expect(result.current.pref).toBe('light')
    expect(root.dataset.theme).toBe('light')
    expect(window.localStorage.getItem('pokedex-theme')).toBe('light')
  })

  it('revenir à « system » retire l’attribut et le stockage', () => {
    window.localStorage.setItem('pokedex-theme', 'dark')
    const { result } = renderHook(() => useTheme())
    act(() => result.current.setPref('system'))
    expect(root.dataset.theme).toBeUndefined()
    expect(window.localStorage.getItem('pokedex-theme')).toBeNull()
  })

  it('cycle enchaîne system → light → dark → system', () => {
    const { result } = renderHook(() => useTheme())
    expect(result.current.pref).toBe('system')
    act(() => result.current.cycle())
    expect(result.current.pref).toBe('light')
    act(() => result.current.cycle())
    expect(result.current.pref).toBe('dark')
    act(() => result.current.cycle())
    expect(result.current.pref).toBe('system')
  })
})
