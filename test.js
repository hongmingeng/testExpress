function getCountDays(setMonth) {
            var curDate = new Date();
            curDate.setMonth(setMonth +1,0);
            var year = curDate.getFullYear();
            var month = curDate.getMonth();
            var days = curDate.getDate();
            var list = []
            for (let i = 1; i <= days; i++) {
                list.push(i)
            }
            var firstDay = new Date(year,month,1).getDay()

            var monthDays = {
                year,
                month,
                days,
                list,
                firstDay
            }
            monthDays.monthList = []

            if (monthDays.firstDay) {
                let paddingLeft = [0, 0].concat(new Array(monthDays.firstDay))
                Array.prototype.splice.apply(monthDays.list, paddingLeft)
            }
            
            if (monthDays.list.length % 7) {
                let paddingRight = new Array(7 - monthDays.list.length % 7)
                monthDays.list = monthDays.list.concat(paddingRight)
            }
            for (let i = 0; i < monthDays.list.length; i += 7) {
                monthDays.monthList.push(monthDays.list.slice(i, i + 7))
            }
            return monthDays
    }

    /* 获取当前月份 */
    var curDate = new Date();
    var curMonth = curDate.getMonth();
    console.log(curMonth)
    var monthDays=getCountDays(curMonth+1);
//     monthDays.monthList = []

// if (monthDays.firstDay) {
//     let paddingLeft = [0, 0].concat(new Array(monthDays.firstDay))
//     Array.prototype.splice.apply(monthDays.list, paddingLeft)
// }

// if (monthDays.list.length % 7) {
//     let paddingRight = new Array(7 - monthDays.list.length % 7)
//     monthDays.list = monthDays.list.concat(paddingRight)
// }
// for (let i = 0; i < monthDays.list.length; i += 7) {
//     monthDays.monthList.push(monthDays.list.slice(i, i + 7))
// }
console.log(monthDays)