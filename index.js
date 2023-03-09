/* Your Code Here */
const createEmployeeRecord = function([firstName, familyName, title, payRate]){
    let obj = {
        firstName: firstName,
        familyName: familyName,
        title: title,
        payPerHour: payRate,
        timeInEvents: [],
        timeOutEvents:[],
    };
    return obj;
};

const createEmployeeRecords = function(arrayOfArrays){
    let newArr = arrayOfArrays.map(createEmployeeRecord);
    return newArr;
};

const createTimeInEvent = function(stamp){
    let timeInEventsContents = {
        type: "TimeIn",
        hour: parseInt(stamp.slice(11, 15)),
        date: stamp.slice(0, 10)
    };
    this.timeInEvents.push(timeInEventsContents);

    return this;
};

const createTimeOutEvent = function (stamp){
    let timeOutEventsContents = {
        type: "TimeOut",
        hour: parseInt(stamp.slice(11, 15)),
        date: stamp.slice(0, 10)
    };

    this.timeOutEvents.push(timeOutEventsContents);

    return this;
};

const hoursWorkedOnDate = function(date){
    const timeIn = this.timeInEvents.filter(obj => obj.date === date);
    const timeOut = this.timeOutEvents.filter(obj => obj.date === date);

    let hoursWroked = (parseInt(timeOut[0].hour) - parseInt(timeIn[0].hour)) / 100;

    return hoursWroked;
};

const wagesEarnedOnDate = function(date){
    let hours = hoursWorkedOnDate.call(this, date);
    let rate = this.payPerHour;

    let totalPay = parseInt(hours * rate);
    return totalPay;
};

const findEmployeeByFirstName = function(srcArray, firstName){
    for(let obj of srcArray){
        if(obj.firstName === firstName){
            return obj
        };
    };
};

const calculatePayroll = function(array){
    let money = [];
    for(let element of array){
        for(let item of element.timeInEvents){
            money.push(wagesEarnedOnDate.call(element, item.date))
        };
    };
    let total = money.reduce(function (acc, element){
        return element + acc
    });

    return total;
};

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

