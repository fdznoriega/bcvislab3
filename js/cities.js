
let cities;
let europeanCities;

// grab cities from csv
d3.csv('cities.csv', d3.autoType)
    .then(data => {
        cities = data;
        europeanCities = cities.filter(onlyEuropeanCities);
        createScatterplot();
    })

// include only European cities
function onlyEuropeanCities(city) {
    if(city.eu) {
        return city;
    }
}

function createScatterplot() {
    // Print out data
    // console.log('Cities', cities);
    // console.log('EU cities', europeanCities);

    // write out cities
    d3.select(".city-count").text("Number of Cities: " + europeanCities.length);
    // grab largest population for scaling
    const width = 700;
    const height = 550;
    const svg = d3.select('.population-plot')
		.append('svg')
        .attr('width', width)
        .attr('height', height)
    
    // bind data to SVG
    svg.selectAll(".city-circle")
        .data(europeanCities)
        .enter()
        .append("circle")
        .attr("class", "city-circle")
        .attr("cx", city => {
            return city.x;
        })
        .attr("cy", city => {
            return city.y
        })
        .attr("r", city => {
            if(city.population < 1000000) {
                return 4;
            }
            else {
                return 8;
            }
        })
        .attr("fill", "teal");

    // add labels by MAKING NEW ELEMENTS not children
    svg.selectAll(".city-labels")
     .data(europeanCities)
     .enter()
     .append("text")
     .text(city => {
         if(city.population >= 1000000) {
             return city.country;
         }
         else {
             return "";
         }
     })
     .attr("font-family", "sans-serif")
     .attr("font-size", "11px")
     .attr("text-anchor", "middle")
     .attr("x", city => {
        return city.x;
     })
     .attr("y", city => {
         return city.y;
     })
     .attr("dx", city => {
         if(city.country === "Hungary") {
             return 10;
         }
         else {
             return 0;
         }
     })
     .attr("dy", -13)   


}




