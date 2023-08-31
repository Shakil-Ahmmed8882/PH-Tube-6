const getData = async () => {
  // getting data from network request
  const res = await fetch("https://openapi.programming-hero.com/api/videos/category/1000");
  const data = await res.json();
  console.log(data);
};

getData();
