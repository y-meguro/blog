import { DateTime } from 'luxon'

export const formatDate = (dateStr: string) => {
  return DateTime.fromISO(dateStr)
    .setZone('Asia/Tokyo')
    .setLocale('ja')
    .toLocaleString(DateTime.DATE_SHORT)
}

export const dateToYear = (dateStr: string) => {
  return DateTime.fromISO(dateStr).setZone('Asia/Tokyo').setLocale('ja').year
}
