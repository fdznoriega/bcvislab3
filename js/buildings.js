
let buildings;

d3.csv('buildings.csv', d3.autoType)
    .then(data => {
        console.log('buildings', data)
        buildings  = data;
    })

