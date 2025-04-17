import { render, screen } from '@testing-library/react'
import App from './App'

test('renders counter', () => {
  render(<App />)
  expect(screen.getByText(/count is 0/i)).toBeInTheDocument()
})
