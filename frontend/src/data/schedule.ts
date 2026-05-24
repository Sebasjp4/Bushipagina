export interface ScheduleRow {
  day: string
  infantil?: string
  adultos?: string
  competicion?: string
}

export const SCHEDULE: ScheduleRow[] = [
  { day: 'Lunes',     infantil: '4:00 – 5:00 pm', adultos: '6:00 – 7:30 pm' },
  { day: 'Martes',                                 adultos: '6:00 – 7:30 pm', competicion: '7:30 – 9:00 pm' },
  { day: 'Miércoles', infantil: '4:00 – 5:00 pm', adultos: '6:00 – 7:30 pm' },
  { day: 'Jueves',                                 adultos: '6:00 – 7:30 pm', competicion: '7:30 – 9:00 pm' },
  { day: 'Viernes',   infantil: '4:00 – 5:00 pm', adultos: '6:00 – 7:30 pm' },
  { day: 'Sábado',    infantil: '9:00 – 10:00 am', adultos: '10:00 – 11:30 am', competicion: '11:30 – 1:00 pm' },
]
