
let buildings;
let sortedBuildings;

d3.csv('buildings.csv', d3.autoType)
    .then(data => {
        buildings  = data;
        sortedBuildings = buildings.sort((b1, b2) => {
            return (b1.height_m < b2.height_m ? 1 : b1.height_m > b2.height_m ? -1 : 0)
        })
        console.log(sortedBuildings);
        createBarChart();
    })

function createBarChart() {
    // create svg
    const width = 500;
    const height = 500;
    const svg = d3.select('.building-bar-chart')
		.append('svg')
        .attr('width', width)
        .attr('height', height)
    
    let barHeight = 40;
    let barPadding = 1;
    let barHeightOffset = 190;
    // use d3 to create rect elements
    svg.selectAll('.bar')
        .data(sortedBuildings)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        // add an event listener
        .on('click', (event, building) => {
            // update the table (height, city, country, floors, completed)
            console.log(event);
            console.log(building);

            // update the picture
            d3.select('.image')
                .attr('src', `img/${building.image}`)
            
            // .building-name
            d3.select('.building-name')
                .text(building.building);
            // .height
            d3.select('.height')
                .text(building.height_ft);
            // .city
            d3.select('.city')
                .text(building.city);
            // .country
            d3.select('.country')
                .text(building.country);
            // .floors
            d3.select('.floors')
                .text(building.floors);
            // .completed
            d3.select('.completed')
                .text(building.completed)
        })
        .attr('width', building => building.height_px)
        .attr('height', barHeight)
        .attr('x', barHeightOffset)
        .attr('y', (building, i) => {
            return ((barHeight + barPadding) * i);
        })
        .attr('fill', 'orange')
    // label buildings
    svg.selectAll('.building-name-label')
        .data(sortedBuildings)
        .enter()
        .append('text')
        .text(buildings => buildings.building)
        .attr('font-family', 'sans-serif')
        .attr('font-size', '12px')
        .attr('x', 1)
        .attr('y', (building, i) => {
            return ((barHeight + barPadding) * (i+1));
        })
        .attr('dy', -15)
    // label building height
    svg.selectAll('.building-height-label')
        .data(sortedBuildings)
        .enter()
        .append('text')
        .text(buildings => buildings.height_ft + " ft")
        .attr('font-family', 'sans-serif')
        .attr('font-size', '11px')
        .attr('text-anchor', 'end')
        .attr('x', building => building.height_px + barHeightOffset - 5)
        .attr('y', (building, i) => {
            return ((barHeight + barPadding) * (i+1));
        })
        .attr('dy', -17)
        .attr('fill', 'white')
        
}
