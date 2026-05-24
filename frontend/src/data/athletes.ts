export interface Athlete {
  name: string
  badge: string
  belt: string
  kanji: string
  photo?: string
  achievements: string[]
}

export const ATHLETES: Athlete[] = [
  {
    name: 'Carlos A. Movilla',
    badge: 'Sensei · 5° Dan',
    belt: 'Director Técnico · Cinturón Negro 5° Dan',
    kanji: '師',
    achievements: [
      'Instructor certificado FECOLKAR',
      'Ex-seleccionado nacional de Karate',
      '+25 años en las artes marciales',
    ],
  },
  {
    name: 'Valeria Rúa',
    badge: 'Selección Atlántico',
    belt: 'Kumite -55 kg · Cinturón Negro 1° Dan',
    kanji: '闘',
    achievements: [
      'Oro Juegos Nacionales 2023',
      'Bronce Panamericano Juvenil',
      'Capitana del equipo femenino',
    ],
  },
  {
    name: 'Andrés Polo',
    badge: 'Promesa',
    belt: 'Kata · Cinturón Marrón',
    kanji: '勝',
    achievements: [
      'Campeón departamental sub-16',
      '3 medallas regionales 2024',
      'Beca deportiva del dojo',
    ],
  },
]
