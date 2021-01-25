//カレンダーの定数宣言
const weeks = ['日', '月', '火', '水', '木', '金', '土']
const date = new Date()
//日付の変数宣言
let year = date.getFullYear()
let month = date.getMonth() + 1
//表示枚数
const config = {
    show: 12,
}
//カレンダー処理
function showCalendar(year, month) {
    //表示枚数繰り返し
    for ( i = 0; i < config.show; i++) {
        //カレンダー生成
        const calendarHtml = createCalendar(year, month)
        const sec = document.createElement('section')
        sec.innerHTML = calendarHtml
        document.querySelector('#calendar').appendChild(sec)

        month++
        if (month > 12) {
            year++
            month = 1
        }
    }
}

function createCalendar(year, month,textdata) {
    //定数宣言　先生の例のやつ
    const startDate = new Date(year, month - 1, 1) // 月の最初の日を取得
    const endDate = new Date(year, month,  0) // 月の最後の日を取得
    const endDayCount = endDate.getDate() // 月の末日
    const lastMonthEndDate = new Date(year, month - 2, 0) // 前月の最後の日の情報
    const lastMonthendDayCount = lastMonthEndDate.getDate() // 前月の末日
    const startDay = startDate.getDay() // 月の最初の日の曜日を取得

    //変数宣言
    let dayCount = 1 // 日にちのカウント
    let calendarHtml = '' // HTMLを組み立てる変数
    //日付のヘッダー部分
    calendarHtml += '<h1>' + year  + '/' + month + '</h1>'
    //複数テーブル作成
    calendarHtml += '<table>'
    //なんもない場合。空白はあかんやった。。。
    if(textdata === undefined){
      console.log(textdata);
      // 行作成
      for (let i = 0; i < weeks.length; i++) {
          console.log(textdata);
          calendarHtml += '<td>' + weeks[i] + '</td>'
          //どんなんか確認
          console.dir(calendarHtml);
      }
      //ええやつほぼまるパクリ
      for (let w = 0; w < 6; w++) {
          calendarHtml += '<tr>'

          for (let d = 0; d < 7; d++) {
              if (w == 0 && d < startDay) {
                  // 1行目で1日の曜日の前
                  let num = lastMonthendDayCount - startDay + d + 1
                  calendarHtml += `<td id=${dayCount} class="is-disabled">` + num + `</td>`
              } else if (dayCount > endDayCount) {
                  // 末尾の日数を超えた
                  let num = dayCount - endDayCount
                  calendarHtml += `<td id=${dayCount} class="is-disabled">` + num + `</td>`
                  dayCount++
              } else {
                  calendarHtml += `<td id=${dayCount} class="calendar_td" data-date="${year}/${month}/${dayCount}">${dayCount}</td>`
                  dayCount++
              }
          }
          calendarHtml += '</tr>'
      }
      calendarHtml += '</table>'
    }else {
      // 曜日の行を作成
      for (let i = 0; i < weeks.length; i++) {
          calendarHtml += '<td>'  + weeks[i] + '</td>'
      }

      for (let w = 0; w < 6; w++) {
          calendarHtml += '<tr>'

          for (let d = 0; d < 7; d++) {
              if (w == 0 && d < startDay) {
                  // 1行目で1日の曜日の前
                  let num = lastMonthendDayCount - startDay + d + 1
                  calendarHtml += `<td id=${dayCount} id=${dayCount} class="is-disabled">` + num + `</td>`
              } else if (dayCount > endDayCount) {
                  // 末尾の日数を超えた
                  let num = dayCount - endDayCount
                  calendarHtml += `<td id=${dayCount} class="is-disabled">` + num + `</td>`
                  dayCount++
              } else {
                  calendarHtml += `<td id=${dayCount} class="calendar_td" data-date="${year}/${month}/${dayCount}">${dayCount}</td>`
                  dayCount++
              }
          }
          calendarHtml += '</tr>'
      }
      calendarHtml += '</table>'
    }
    return calendarHtml
}

function moveCalendar(e) {
    document.querySelector('#calendar').innerHTML = ''

    if (e.target.id === 'prev') {
        month--

        if (month < 1) {
            year--
            month = 12
        }
    }

    if (e.target.id === 'next') {
        month++

        if (month > 12) {
            year++
            month = 1
        }
    }

    showCalendar(year, month)
}

document.querySelector('#prev').addEventListener('click', moveCalendar)
document.querySelector('#next').addEventListener('click', moveCalendar)

document.addEventListener("click", function(e) {
    let cnt = 0;
    if(e.target.classList.contains("calendar_td")) {
      let array = [];
      alert('クリックした日付は' + e.target.dataset.date + 'です')
      textdata = window.prompt('予定を入力してください');
      array.push(textdata);
      cnt += 1;
      let test = $("#datetext").append("<li>" + e.target.dataset.date + "の予定:" + textdata +"</li>");
    }
});

//クリック処理
$(function() {
    $('table').on('click', 'td', function() {
        $('#calendar_td').text($(this).text());
        $(this).css('background', 'lightgray').text('予約');
    });
});


//表示処理

showCalendar(year, month)