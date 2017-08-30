import buildLocalizeFn from '../../../_lib/buildLocalizeFn/index.js'
import buildLocalizeArrayFn from '../../../_lib/buildLocalizeArrayFn/index.js'

// Vietnammese locale reference: http://www.localeplanet.com/icu/vi-VN/index.html
// Capitalization reference: http://hcmup.edu.vn/index.php?option=com_content&view=article&id=4106%3Avit-hoa-trong-vn-bn-hanh-chinh&catid=2345%3Atham-kho&Itemid=4103&lang=vi&site=134
var weekdayValues = {
  narrow: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
  short: ['CN', 'thứ 2', 'thứ 3', 'thứ 4', 'thứ 5', 'thứ 6', 'thứ 7'],
  long: ['Chủ Nhật', 'thứ Hai', 'thứ Ba', 'thứ Tư', 'thứ Năm', 'thứ Sáu', 'thứ Bảy']
}

var monthValues = {
  short: ['thg 1', 'thg 2', 'thg 3', 'thg 4', 'thg 5', 'thg 6', 'thg 7', 'thg 8', 'thg 9', 'thg 10', 'thg 11', 'thg 12'],
  long: ['tháng Một', 'tháng Hai', 'tháng Ba', 'tháng Tư', 'tháng Năm', 'tháng Sáu', 'tháng Bảy', 'tháng Tám', 'tháng Chín', 'tháng Mười', 'tháng Mười Một', 'tháng Mười Hai']
}

// `timeOfDay` is used to designate which part of the day it is, when used with 12-hour clock.
// Vietnamese are used to AM/PM borrowing from English/French, hence `uppercase` and `lowercase`
// are just like English but the `long` format being localized with full word describing time of day
var timeOfDayValues = {
  uppercase: ['AM', 'PM'],
  lowercase: ['am', 'pm'],
  // below: 'morning', 'noon', 'afternoon', 'evening', 'night'
  long: ['sáng', 'trưa', 'chiều', 'tối', 'đêm']
}

function timeOfDay (dirtyHours, dirtyOptions) {
  var hours = Number(dirtyHours)
  var options = dirtyOptions || {}
  var type = options.type ? String(options.type) : 'long'

  if (type === 'uppercase') {
    return (hours / 12) >= 1 ? timeOfDayValues.uppercase[1] : timeOfDayValues.uppercase[0]
  } else if (type === 'lowercase') {
    return (hours / 12) >= 1 ? timeOfDayValues.lowercase[1] : timeOfDayValues.lowercase[0]
  }

  // long
  if (hours < 1) {
    return timeOfDayValues.long[4] // 12h đêm
  } else if (hours < 11) {
    return timeOfDayValues.long[0] // sáng
  } else if (hours < 14) {
    return timeOfDayValues.long[1] // trưa
  } else if (hours < 19) {
    return timeOfDayValues.long[2] // chiều
  } else if (hours < 22) {
    return timeOfDayValues.long[3] // tối
  }

  return timeOfDayValues.long[4] // đêm
}

// If ordinal numbers depend on context, for example,
// if they are different for different grammatical genders,
// use `options.unit`:
//
//   var options = dirtyOptions || {}
//   var unit = String(options.unit)
//
// where `unit` can be 'month', 'quarter', 'week', 'isoWeek', 'dayOfYear',
// 'dayOfMonth' or 'dayOfWeek'
function ordinalNumber (dirtyNumber, dirtyOptions) {
  var options = dirtyOptions || {}
  var unit = String(options.unit)
  var number = parseInt(dirtyNumber, 10)

  if (unit === 'quarter') {
    switch (number) {
      case 1: return 'một'
      case 2: return 'hai'
      case 3: return 'ba'
      case 4: return 'bốn'
    }
  } else if (unit === 'dayOfWeek') {
    // day of week in Vietnamese has ordinal number meaning, so we should use them
    switch (number) {
      case 0: return 'CN'
      case 1: return '2'
      case 2: return '3'
      case 3: return '4'
      case 4: return '5'
      case 5: return '6'
      case 6: return '7'
    }
  } else if (unit === 'week' || unit === 'isoWeek') {
    if (number === 1) {
      return 'thứ nhất'
    } else {
      return 'thứ ' + number
    }
  } else if (unit === 'dayOfYear') {
    if (number === 1) {
      return 'đầu tiên'
    } else {
      return 'thứ ' + number
    }
  }

  // there are no different forms of ordinal numbers in Vietnamese
  return number
}

var localize = {
  ordinalNumber: ordinalNumber,
  weekday: buildLocalizeFn(weekdayValues, 'long'),
  weekdays: buildLocalizeArrayFn(weekdayValues, 'long'),
  month: buildLocalizeFn(monthValues, 'long'),
  months: buildLocalizeArrayFn(monthValues, 'long'),
  timeOfDay: timeOfDay,
  timesOfDay: buildLocalizeArrayFn(timeOfDayValues, 'long')
}

export default localize
