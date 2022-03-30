// Your code here
function createEmployeeRecord(array) {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []

    }
}

function createEmployeeRecords(arrOfArr) {
    let employeeRecords = []

    for (let i = 0; i < arrOfArr.length; i++) {
        employeeRecords.push(createEmployeeRecord(arrOfArr[i]))
    }
    return employeeRecords
}

function createTimeInEvent(recordObject, dateStamp) {
    let employeeTimeIn = {
        type: 'TimeIn',
        hour: parseInt(dateStamp.slice(-4)),
        date: dateStamp.slice(0, 10)
    }

    recordObject.timeInEvents.push(employeeTimeIn)

    return recordObject
}

function createTimeOutEvent(recordObject, dateStamp) {
    let employeeTimeOut = {
        type: 'TimeOut',
        hour: parseInt(dateStamp.slice(-4)),
        date: dateStamp.slice(0, 10)
    }

    recordObject.timeOutEvents.push(employeeTimeOut)

    return recordObject
}

function hoursWorkedOnDate(recordObject, date) {

    let hoursWorked;

    for (let i = 0; i < recordObject.timeInEvents.length; i++) {
        if (recordObject.timeInEvents[i].date === date) {

            if (recordObject.timeOutEvents[i].date === date) {

                hoursWorked = recordObject.timeOutEvents[i].hour -
                    recordObject.timeInEvents[i].hour


            }
        }
    }
    return hoursWorked / 100

}

function wagesEarnedOnDate(payRecordObject, date) {
    return (hoursWorkedOnDate(payRecordObject, date)) * payRecordObject.payPerHour
}

function allWagesFor(recordObject) {
    let payAll = []
    let allDate = []

    for (let i = 0; i < recordObject.timeInEvents.length; i++) {
        allDate.push(recordObject.timeInEvents[i].date)
    }

    allDate.forEach(date => {
        payAll.push(wagesEarnedOnDate(recordObject, date))

    });

    return payAll.reduce((previousValue, currentValue) => previousValue + currentValue)

}

function calculatePayroll(arrOfemployeeRecords) {
    let payroll = []
    arrOfemployeeRecords.forEach(employee => {
        payroll.push(allWagesFor(employee))
    })
    return payroll.reduce((previousValue, currentValue) => previousValue + currentValue)
}

