type Millisecond = number

export const setAccessAge = (num: Millisecond) => {
  // 현재 UTC 시간을 얻기
  var currentUTC = new Date().getTime() // 밀리초로 얻습니다.

  // 정수값(초)를 추가하기
  var secondsToAdd = 3600 // 1시간(3600초)을 추가하겠습니다.
  var newUTC = currentUTC + secondsToAdd * num // 밀리초로 계산합니다.

  // 밀리초를 Date 객체로 변환
  var newUTCDate = new Date(newUTC)

  console.log('현재 UTC 시간: ' + currentUTC)
  console.log(secondsToAdd + '초를 추가한 UTC 시간: ' + newUTC)
  console.log('새로운 UTC 시간 (Date 객체): ' + newUTCDate.toUTCString())

  return newUTCDate.toUTCString()
}

export const compareToCurrent = (targetTime: Date) => {
  // 현재 시간 얻기
  var currentTime = new Date()

  // 목표 시간과 현재 시간의 차이 계산 (밀리초 단위)
  var timeDifference = targetTime.getTime() - currentTime.getTime()

  // 차이를 분 단위로 변환
  var minutesDifference = timeDifference / (1000 * 60)

  // 5분 이내로 남았을 때 true 반환
  return minutesDifference <= 5
}
