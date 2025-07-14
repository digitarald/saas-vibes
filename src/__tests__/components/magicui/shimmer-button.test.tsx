import { ShimmerButton } from '@/components/magicui/shimmer-button'
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

describe('ShimmerButton Component', () => {
  it('should render button with default props', () => {
    render(<ShimmerButton>Click me</ShimmerButton>)
    
    const button = screen.getByRole('button', { name: /click me/i })
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('group', 'relative', 'z-0', 'flex', 'cursor-pointer')
  })

  it('should apply custom className', () => {
    render(<ShimmerButton className="custom-class">Test</ShimmerButton>)
    
    const button = screen.getByRole('button')
    expect(button).toHaveClass('custom-class')
    expect(button).toHaveClass('group') // Should still have default classes
  })

  it('should handle click events', () => {
    const handleClick = vi.fn()
    render(<ShimmerButton onClick={handleClick}>Click me</ShimmerButton>)
    
    const button = screen.getByRole('button')
    fireEvent.click(button)
    
    expect(handleClick).toHaveBeenCalledOnce()
  })

  it('should be disabled when disabled prop is true', () => {
    render(<ShimmerButton disabled>Disabled</ShimmerButton>)
    
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
  })

  it('should forward ref correctly', () => {
    const ref = vi.fn()
    render(<ShimmerButton ref={ref}>Test</ShimmerButton>)
    
    expect(ref).toHaveBeenCalled()
  })

  it('should apply custom CSS properties', () => {
    render(
      <ShimmerButton
        shimmerColor="#ff0000"
        shimmerSize="0.1em"
        borderRadius="50px"
        shimmerDuration="5s"
        background="rgba(255, 0, 0, 1)"
      >
        Custom Button
      </ShimmerButton>
    )
    
    const button = screen.getByRole('button')
    
    // Check if custom CSS properties are applied
    expect(button.style.getPropertyValue('--shimmer-color')).toBe('#ff0000')
    expect(button.style.getPropertyValue('--cut')).toBe('0.1em')
    expect(button.style.getPropertyValue('--radius')).toBe('50px')
    expect(button.style.getPropertyValue('--speed')).toBe('5s')
    expect(button.style.getPropertyValue('--bg')).toBe('rgba(255, 0, 0, 1)')
  })

  it('should render shimmer animation elements', () => {
    render(<ShimmerButton>Shimmer</ShimmerButton>)
    
    const button = screen.getByRole('button')
    
    // Check for shimmer container
    const shimmerContainer = button.querySelector('.blur-\\[2px\\]')
    expect(shimmerContainer).toBeInTheDocument()
    
    // Check for shimmer animation
    const shimmerAnimation = button.querySelector('.animate-shimmer-slide')
    expect(shimmerAnimation).toBeInTheDocument()
    
    // Check for spin animation
    const spinAnimation = button.querySelector('.animate-spin-around')
    expect(spinAnimation).toBeInTheDocument()
  })

  it('should render highlight overlay', () => {
    render(<ShimmerButton>Highlight</ShimmerButton>)
    
    const button = screen.getByRole('button')
    
    // Check for highlight element
    const highlight = button.querySelector('.group-hover\\:shadow-\\[inset_0_-6px_10px_\\#ffffff3f\\]')
    expect(highlight).toBeInTheDocument()
  })

  it('should render backdrop element', () => {
    render(<ShimmerButton>Backdrop</ShimmerButton>)
    
    const button = screen.getByRole('button')
    
    // Check for backdrop element
    const backdrop = button.querySelector('.-z-20')
    expect(backdrop).toBeInTheDocument()
  })

  it('should handle all button props correctly', () => {
    render(
      <ShimmerButton
        type="submit"
        name="test-button"
        value="test-value"
        data-testid="shimmer-test"
      >
        Props Test
      </ShimmerButton>
    )
    
    const button = screen.getByTestId('shimmer-test')
    expect(button).toHaveAttribute('type', 'submit')
    expect(button).toHaveAttribute('name', 'test-button')
    expect(button).toHaveAttribute('value', 'test-value')
  })

  it('should render complex children correctly', () => {
    render(
      <ShimmerButton>
        <span>Icon</span>
        <span>Text</span>
      </ShimmerButton>
    )
    
    expect(screen.getByText('Icon')).toBeInTheDocument()
    expect(screen.getByText('Text')).toBeInTheDocument()
  })
})
