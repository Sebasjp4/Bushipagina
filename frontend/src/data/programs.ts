export interface Program {
  kanji: string
  title: string
  age: string
  description: string
}

export const PROGRAMS: Program[] = [
  {
    kanji: '児',
    title: 'Karate Infantil',
    age: '4 a 11 años',
    description:
      'Coordinación, valores y autocontrol a través del juego. Sistema de cinturones que premia el esfuerzo y construye autoestima desde pequeños.',
  },
  {
    kanji: '青',
    title: 'Juvenil & Adultos',
    age: '12 años en adelante',
    description:
      'Técnica tradicional, acondicionamiento físico y kumite. Ideal para quienes buscan disciplina, estado físico y defensa personal real.',
  },
  {
    kanji: '闘',
    title: 'Equipo de Competición',
    age: 'Por selección',
    description:
      'Entrenamiento de alto rendimiento para atletas que representan al dojo en torneos departamentales, nacionales y panamericanos.',
  },
  {
    kanji: '守',
    title: 'Defensa Personal',
    age: 'Adultos · grupos cerrados',
    description:
      'Programa práctico enfocado en situaciones reales, manejo de la distancia y reacción bajo presión. Disponible para empresas.',
  },
  {
    kanji: '健',
    title: 'Karate Fit',
    age: 'Todo nivel',
    description:
      'Acondicionamiento de alta intensidad inspirado en el entrenamiento marcial. Quema calorías mientras aprendes a golpear con técnica.',
  },
  {
    kanji: '女',
    title: 'Solo Mujeres',
    age: 'Adolescentes y adultas',
    description:
      'Espacio seguro de empoderamiento, técnica y defensa personal con instructoras del dojo. Horario diurno y nocturno.',
  },
]
