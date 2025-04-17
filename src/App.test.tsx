import { render, screen } from '@testing-library/react'
import App from './App'

test('renders Game component', () => {
  render(<App />)
  expect(screen.getByTestId('game')).toBeInTheDocument()
})
