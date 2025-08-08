
import DOMPurify from 'dompurify';
import { z } from 'zod';

// Sanitize text input to prevent XSS
export const sanitizeText = (input: string): string => {
  return DOMPurify.sanitize(input, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] });
};

// Sanitize HTML content with allowed tags
export const sanitizeHTML = (html: string): string => {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li'],
    ALLOWED_ATTR: []
  });
};

// Common validation schemas
export const emailSchema = z.string().email('Invalid email address');

export const passwordSchema = z.string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number');

export const nameSchema = z.string()
  .min(1, 'Name is required')
  .max(100, 'Name must be less than 100 characters')
  .transform(sanitizeText);

export const phoneSchema = z.string()
  .regex(/^[\+]?[1-9][\d]{0,15}$/, 'Invalid phone number format')
  .transform(sanitizeText);

export const textAreaSchema = z.string()
  .max(1000, 'Text must be less than 1000 characters')
  .transform(sanitizeText);

// Validate and sanitize form data
export const validateFormData = <T>(schema: z.ZodSchema<T>, data: unknown): { success: boolean; data?: T; error?: string } => {
  try {
    const validatedData = schema.parse(data);
    return { success: true, data: validatedData };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors[0]?.message || 'Validation failed' };
    }
    return { success: false, error: 'Validation failed' };
  }
};
