// const arrayOfObjects = [
//       {
//         id: 1,
//         title: "Object 1",
//         nestedObject: {
//           views: '100k'
//         }
//       },
//       {
//         id: 2,
//         title: "Object 2",
//         nestedObject: {
//           views: '200k'
//         }
//       },
//       {
//         id: 3,
//         title: "Object 3",
//         nestedObject: {
//           views: '500k'
//         }
//       }
//     ];

//     const sortedArray = arrayOfObjects.sort((obj1, obj2) => {
//       const views1 = parseInt(obj1.nestedObject.views);
//       const views2 = parseInt(obj2.nestedObject.views);
//       console.log(views2)
//       return views2 - views1;
//     });



// Define the default ID
const defaultId = 1200;

// Define an object to store the parameters
let loadDataParams = {
  id: defaultId,
  sortFlag: false,
};

// Function to load data with dynamic ID
function loadDynamicData(id) {
  loadDataParams.id = id;
  loadData(loadDataParams);
}

// Define the default ID
const defaultId = 1000;

// Define an object to pass parameters to loadData
let loadDataParams = {
  id: defaultId,
  sortFlag: false, // Initialize sortFlag with a default value
};
