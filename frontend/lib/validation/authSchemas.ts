import { z } from 'zod';

export const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters long').regex(/^[a-zA-Z\s]+$/, 'Name must contain only alphabets'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters long')
    .regex(/[A-Z]/, 'Password requires at least one uppercase letter')
    .regex(/[a-z]/, 'Password requires at least one lowercase letter')
    .regex(/\d/, 'Password requires at least one number')
    .regex(/[!@#$%^&*(),.?":{}|<>]/, 'Password requires at least one special character'),
  confirmPassword: z.string(),
  date_of_birth: z.string().refine((dateString) => {
    const dob = new Date(dateString);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    return age >= 13;
  }, {
    message: 'You must be at least 13 years old',
  })
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export type SignupFormData = z.infer<typeof signupSchema>;

export const signinSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'), // Basic validation for sign in
});

export type SigninFormData = z.infer<typeof signinSchema>;
