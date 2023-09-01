function convertSecondsToTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  seconds %= 3600;

  const minutes = Math.floor(seconds / 60);

  return `${hours} hours ${minutes} minutes`;
}

function customSortData(array) {
  // Extract the numeric part from views strings and convert to numbers
  console.log(array);
  const x = array.map((a) => a.others.views);

  const numericViews = x
    .map((view) => {
      const numericPart = parseFloat(view);
      return isNaN(numericPart) ? null : numericPart;
    })
    .filter((num) => num !== null);

  // Sort the numeric values in ascending order
  numericViews.sort((a, b) => b - a);

  console.log(numericViews);

  return array;
}




// function sorting(dataArr,isSorted){
//     // Sorting the content
//     let sortedArr;
//     if (isSorted) {
//        sortedArr = dataArr.sort((view1, view2) => {
//      return parseInt(view2.others.views) - parseInt(view1.others.views);
//    });
//  }

//  console.log('from utilitty: ' + sortedArr)

//  return sortedArr

// }