import { type Document } from 'mongoose'

export interface DatabaseUser extends Document {
  email: string
  name: string
  passwordHash: string
  nextEvents: unknown[] // TODO
  reviews: unknown[] // TODO
  ownEvents: unknown[] // TODO
  rating: number
  image: string
  birthdate: string
  googleId: string
  interests: Category[]
}

export interface IUser {
  email: string
  name: string
  password: string
  birthdate: string
  image: string
  nextEvents?: unknown[] // TODO
  reviews?: unknown[] // TODO
  ownEvents?: unknown[] // TODO
  rating?: number
  googleId?: string
  _id: string
  interests: Category[]
}

export interface IReview {
  score: number
  text: string
  eventId?: string
  organizerId?: string
}

export enum Category {
  Gastronómicos = 'Gastronómicos',
  Culturales = 'Culturales',
  Deportivos = 'Deportivos',
  Educativos = 'Educativos',
  Sociales = 'Sociales y de entretenimiento',
  Beneficios = 'Beneficios y causas benéficas',
  Familiares = 'Familiares y niños',
  Moda = 'Moda y belleza',
  Conferencias = 'Conferencias y convenciones',
}

export enum EventType {
  Interior = 'Interior',
  Exterior = 'Exterior',
  Virtual = 'Virtual',
}

export interface IEvent {
  imgUrls: string[]
  description: string
  title: string
  place: string
  reviews?: IReview[]
  people?: IUser[]
  schedule: number
  duration: number
  category: Category
  price: number
  link: string
  minAge: number
  type: EventType
  creator: string
  days: string[]
  faqs: Array<{
    question: string
    answer: string
  }>
}

export enum Barrio {
  Palermo = 'Palermo',
  Belgrano = 'Belgrano',
  Recoleta = 'Recoleta',
  SanTelmo = 'San Telmo',
  LaBoca = 'La Boca',
  SanCristobal = 'San Cristóbal',
  Almagro = 'Almagro',
  Caballito = 'Caballito',
  Flores = 'Flores',
  VillaCrespo = 'Villa Crespo',
  Boedo = 'Boedo',
  VillaUrquiza = 'Villa Urquiza',
  VillaDevoto = 'Villa Devoto',
  Saavedra = 'Saavedra',
  Mataderos = 'Mataderos',
  Nunez = 'Nuñez',
  Barracas = 'Barracas',
  ParquePatricios = 'Parque Patricios',
  VillaDelParque = 'Villa del Parque',
  VillaLugano = 'Villa Lugano',
  VillaRiachuelo = 'Villa Riachuelo',
  VillaSoldati = 'Villa Soldati',
  Pompeya = 'Pompeya',
  Colegiales = 'Colegiales',
  Agronomia = 'Agronomía',
  VillaOrtuzar = 'Villa Ortúzar',
  ParqueChacabuco = 'Parque Chacabuco',
  ParqueAvellaneda = 'Parque Avellaneda',
  MonteCastro = 'Monte Castro',
  ParqueChas = 'Parque Chas',
  NuevaPompeya = 'Nueva Pompeya',
  VillaSantaRita = 'Villa Santa Rita',
  VillaGeneralMitre = 'Villa General Mitre',
  Coghlan = 'Coghlan',
  VillaPueyrredon = 'Villa Pueyrredón'
}
