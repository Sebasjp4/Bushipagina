export interface Plan {
  title: string
  price: string
  period: string
  featured: boolean
  features: string[]
  ctaLabel: string
}

export const PLANS: Plan[] = [
  {
    title: 'Mensual',
    price: '120.000',
    period: 'por mes · COP',
    featured: false,
    features: [
      '3 clases por semana',
      'Acceso a todos los horarios de tu nivel',
      'Sistema de exámenes de cinturón',
      'Sin matrícula el primer mes',
    ],
    ctaLabel: 'Empezar',
  },
  {
    title: 'Trimestral',
    price: '320.000',
    period: '3 meses · ahorra 11%',
    featured: true,
    features: [
      'Clases ilimitadas en tu programa',
      '1 examen de grado incluido',
      'Uniforme (gi) de regalo',
      'Acceso a clínicas y seminarios',
    ],
    ctaLabel: 'Inscribirme',
  },
  {
    title: 'Familiar',
    price: '200.000',
    period: 'por mes · 2+ integrantes',
    featured: false,
    features: [
      '2 o más miembros de la familia',
      'Horarios flexibles',
      'Descuento por hermano adicional',
      'Eventos familiares del dojo',
    ],
    ctaLabel: 'Consultar',
  },
]
