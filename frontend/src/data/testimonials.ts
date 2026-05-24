export interface Testimonial {
  quote: string
  name: string
  role: string
  initial: string
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'Mi hijo llegó tímido y hoy es disciplinado, seguro y respetuoso. El cambio que vimos en un año fue increíble.',
    name: 'Marcela Díaz',
    role: 'Mamá de alumno infantil',
    initial: 'M',
  },
  {
    quote:
      'Entrené karate de niño y volví a los 34. El ambiente es serio pero familiar. La mejor decisión para mi salud física y mental.',
    name: 'Julián Barros',
    role: 'Alumno adultos',
    initial: 'J',
  },
  {
    quote:
      'El equipo de competición me preparó para los Juegos Nacionales. Aquí no solo me hicieron mejor atleta, me hicieron mejor persona.',
    name: 'Valeria Rúa',
    role: 'Selección Atlántico',
    initial: 'V',
  },
]
