export function getDayfromDate(dateString) {
    let dateParts = dateString.split('/');
    let month = parseInt(dateParts[0], 10) - 1;
    let day = parseInt(dateParts[1], 10);
  
    // Creating a Date object
    let dateObject = new Date();
    dateObject.setFullYear(new Date().getFullYear()); // Use the current year
    dateObject.setMonth(month);
    dateObject.setDate(day);

    let dayOfWeek = dateObject.getDay();
  
    let daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
    let dayName = daysOfWeek[dayOfWeek];
  
    return dayName;
  }