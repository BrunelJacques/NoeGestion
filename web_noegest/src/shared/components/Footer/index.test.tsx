import Footer from './index'
import { render, screen, fireEvent } from '@testing-library/react'
import { ThemeProvider } from '../../../context/ThemeProvider'
import { describe, it, expect } from 'vitest'


/* Conseil chatGPT non mis en oeuvre: 'Suppression des async
Tu n’utilises pas await, donc asyncinutiles'
it('...', () => {}) */

describe('Footer', () => {
  it('Should render without crashing', async () => {
    render(
      <ThemeProvider>
        <Footer />
      </ThemeProvider>
    )
  })

  it('Should change theme', async () => {
    render(
      <ThemeProvider>
        <Footer />
      </ThemeProvider>
    )
    const nightModeButton = screen.getByRole('button')
    expect(nightModeButton.textContent).toBe('Changer de mode : ☀️')
    fireEvent.click(nightModeButton)
    expect(nightModeButton.textContent).toBe('Changer de mode : 🌙')
  })
})
