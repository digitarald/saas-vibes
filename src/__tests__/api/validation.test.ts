import { NextRequest } from 'next/server'
import { describe, expect, it } from 'vitest'
import { z } from 'zod'

// Mock the validation schema
const CreateProjectSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().optional(),
})

// Mock request body validation
function validateRequestBody<T>(schema: z.ZodSchema<T>, body: unknown): T {
  return schema.parse(body)
}

describe('API Input Validation', () => {
  describe('CreateProjectSchema', () => {
    it('should validate correct project data', () => {
      const validData = {
        name: 'Test Project',
        description: 'A test project description',
      }

      expect(() => validateRequestBody(CreateProjectSchema, validData)).not.toThrow()
      const result = validateRequestBody(CreateProjectSchema, validData)
      expect(result).toEqual(validData)
    })

    it('should reject empty name', () => {
      const invalidData = {
        name: '',
        description: 'A test project description',
      }

      expect(() => validateRequestBody(CreateProjectSchema, invalidData)).toThrow()
    })

    it('should reject name that is too long', () => {
      const invalidData = {
        name: 'a'.repeat(101),
        description: 'A test project description',
      }

      expect(() => validateRequestBody(CreateProjectSchema, invalidData)).toThrow()
    })

    it('should allow optional description', () => {
      const validData = {
        name: 'Test Project',
      }

      expect(() => validateRequestBody(CreateProjectSchema, validData)).not.toThrow()
      const result = validateRequestBody(CreateProjectSchema, validData)
      expect(result).toEqual(validData)
    })

    it('should reject missing name', () => {
      const invalidData = {
        description: 'A test project description',
      }

      expect(() => validateRequestBody(CreateProjectSchema, invalidData)).toThrow()
    })

    it('should reject non-string name', () => {
      const invalidData = {
        name: 123,
        description: 'A test project description',
      }

      expect(() => validateRequestBody(CreateProjectSchema, invalidData)).toThrow()
    })
  })
})

describe('API Error Handling', () => {
  it('should format validation errors correctly', () => {
    const invalidData = {
      name: '',
      description: 'A test project description',
    }

    try {
      validateRequestBody(CreateProjectSchema, invalidData)
    } catch (error) {
      expect(error).toBeInstanceOf(z.ZodError)
      if (error instanceof z.ZodError) {
        expect(error.issues).toHaveLength(1)
        const firstIssue = error.issues[0]
        expect(firstIssue?.path).toEqual(['name'])
        expect(firstIssue?.code).toBe('too_small')
      }
    }
  })

  it('should format multiple validation errors', () => {
    const invalidData = {
      name: 'a'.repeat(101),
      description: 123, // Invalid type
    }

    const SchemaWithRequiredDescription = CreateProjectSchema.extend({
      description: z.string(),
    })

    try {
      validateRequestBody(SchemaWithRequiredDescription, invalidData)
    } catch (error) {
      expect(error).toBeInstanceOf(z.ZodError)
      if (error instanceof z.ZodError) {
        expect(error.issues.length).toBeGreaterThan(0)
      }
    }
  })
})

describe('Request URL Parsing', () => {
  it('should parse request URL correctly', () => {
    const request = new NextRequest('http://localhost:3000/api/projects/123?filter=active')
    
    expect(request.url).toBe('http://localhost:3000/api/projects/123?filter=active')
    expect(request.nextUrl.pathname).toBe('/api/projects/123')
    expect(request.nextUrl.searchParams.get('filter')).toBe('active')
  })

  it('should handle missing search params', () => {
    const request = new NextRequest('http://localhost:3000/api/projects/123')
    
    expect(request.nextUrl.searchParams.get('filter')).toBeNull()
  })
})
