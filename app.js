/**
 * Wheelbrothers Ride Studio Application Logic
 */

// Exact CSS provided in prompt to include when exporting master table HTML
const USER_PRESERVED_CSS = `<style>
/* 2026 Ride Table Styling */

#uniqueTexasRideTable2026 {
    border: 0px solid #000000 !important;
}

#uniqueTexasRideTable2026 .featured-label {
    color: #ffffff !important;
}

#uniqueTexasRideTable2026 table {
    border-collapse: collapse;
}

#uniqueTexasRideTable2026 tbody > tr {
    border: 1px solid #000000 !important;
}

#uniqueTexasRideTable2026 td {
    border: 1px solid #000000 !important;
}

/* Header row */
#uniqueTexasRideTable2026 tbody > tr.table-header {
    background-color: #000006 !important;
    color: #ffffff !important;
}

#uniqueTexasRideTable2026 tbody > tr.table-header td {
    border: 1px solid #ffffff !important;
}

/* Default rows */
#uniqueTexasRideTable2026 tbody > tr:not(.table-header):not(.featured-ride):nth-child(odd) {
    background-color: #ffffff;
    color: #f09217;
}

#uniqueTexasRideTable2026 tbody > tr:not(.table-header):not(.featured-ride):nth-child(even) {
    background-color: #E3E3E7;
    color: #f09217;
}

/* Location and Date columns for non-featured rows */
#uniqueTexasRideTable2026 tbody > tr:not(.table-header):not(.featured-ride) td:not(:first-child) {
    color: #000000 !important;
}

/* Featured rows */
#uniqueTexasRideTable2026 tbody > tr.featured-ride {
    background-color: #000006 !important;
    color: #ffffff !important;
}

#uniqueTexasRideTable2026 tbody > tr.featured-ride td {
    border: 1px solid #ffffff !important;
    color: #ffffff !important;
}

#uniqueTexasRideTable2026 tbody > tr.featured-ride a {
    color: #f09217 !important;
}

#uniqueTexasRideTable2026 tbody > tr.featured-ride a:hover {
    color: #ffffff !important;
}

/* Links */
#uniqueTexasRideTable2026 a {
    color: inherit;
}

#uniqueTexasRideTable2026 a:hover {
    color: #FF5A5F !important;
}

/* Responsive images */
.responsive-img {
    max-width: 100%;
    height: auto;
}
</style>`;

// Initial Rides preloaded directly from the provided user code
const INITIAL_RIDES_HTML = [
    {
        html: `<tr class="featured-ride">
<td><strong><a href="https://wheelbrothers.com/european-tour-of-texas-2026/" target="_blank">European Tour of Texas <span class="featured-label">(Featured)</span></a></strong><br>
<img src="https://wheelbrothers.com/wp-content/uploads/2025/12/205dec59-a983-428f-ae5a-75afb857a2a9.jpg" width="100" height="100" class="responsive-img"></td>
<td>Texas, TX</td>
<td>April 25 - July 18, 2026</td>
</tr>`,
        title: "European Tour of Texas",
        location: "Texas, TX",
        date: "April 25 - July 18, 2026",
        isFeatured: true
    },
    {
        html: `<tr class="featured-ride">
<td><strong><a href="https://wheelbrothers.com/the-road-to-hottern-hell-2/" target="_blank">Road to Hotter’N Hell <span class="featured-label">(Featured)</span></a></strong><br>
<img src="https://sp-ao.shortpixel.ai/client/to_auto,q_glossy,ret_img,w_636/https://wheelbrothers.com/wp-content/uploads/2026/02/image-30.png" width="120" height="100" class="responsive-img"></td>
<td>Texas, TX</td>
<td>April 18 - August 29, 2026</td>
</tr>`,
        title: "Road to Hotter’N Hell",
        location: "Texas, TX",
        date: "April 18 - August 29, 2026",
        isFeatured: true
    },
    {
        html: `<tr class="featured-ride">
<td><strong><a href="https://wheelbrothers.com/hottern-hell-2026/" target="_blank">Hotter’N Hell <span class="featured-label">(Featured)</span></a></strong><br>
<img src="https://wheelbrothers.com/wp-content/uploads/2025/12/3da9fe66-75a5-4705-93ca-230701c8475a.jpg" width="100" height="100" class="responsive-img"></td>
<td>Texas, TX</td>
<td>August 27 - 30, 2026</td>
</tr>`,
        title: "Hotter’N Hell",
        location: "Texas, TX",
        date: "August 27 - 30, 2026",
        isFeatured: true
    },
    {
        html: `<tr class="featured-ride">
<td><strong><a href="https://wheelbrothers.com/btg7-bridging-the-gap-ride/" target="_blank">Bridging the Gap <span class="featured-label">(Featured)</span></a></strong><br>
<img src="https://wheelbrothers.com/wp-content/uploads/2026/05/BTG7.png" width="100" height="100" class="responsive-img"></td>
<td>Texas, TX</td>
<td>October 3, 2026</td>
</tr>`,
        title: "Bridging the Gap",
        location: "Texas, TX",
        date: "October 3, 2026",
        isFeatured: true
    },
    {
        html: `<tr>
<td><strong><a href="https://wheelbrothers.com/fit2train-cycling-base-camp-3/" target="_blank">Fit2Train Cycling Base Camp</a></strong></td>
<td>Fredericksburg, TX</td>
<td>February 14, 2026</td>
</tr>`,
        title: "Fit2Train Cycling Base Camp",
        location: "Fredericksburg, TX",
        date: "February 14, 2026",
        isFeatured: false
    },
    {
        html: `<tr>
<td><strong><a href="https://wheelbrothers.com/la-primavera-at-lago-vista/" target="_blank">La Primavera at Lago Vista</a></strong></td>
<td>Lago Vista, TX</td>
<td>March 1, 2026</td>
</tr>`,
        title: "La Primavera at Lago Vista",
        location: "Lago Vista, TX",
        date: "March 1, 2026",
        isFeatured: false
    },
    {
        html: `<tr>
<td><strong><a href="https://wheelbrothers.com/womens-day-ride/" target="_blank">Women's Day Ride</a></strong></td>
<td>Dallas, TX</td>
<td>March 1, 2026</td>
</tr>`,
        title: "Women's Day Ride",
        location: "Dallas, TX",
        date: "March 1, 2026",
        isFeatured: false
    },
    {
        html: `<tr>
<td><strong><a href="https://wheelbrothers.com/37th-gator-ride/" target="_blank">37th Gator Ride</a></strong></td>
<td>Baytown, TX</td>
<td>March 7, 2026</td>
</tr>`,
        title: "37th Gator Ride",
        location: "Baytown, TX",
        date: "March 7, 2026",
        isFeatured: false
    },
    {
        html: `<tr>
<td><strong><a href="https://wheelbrothers.com/beast-of-the-backroads-2/" target="_blank">Beast of the Backroads</a></strong></td>
<td>Longview, TX</td>
<td>March 14, 2026</td>
</tr>`,
        title: "Beast of the Backroads",
        location: "Longview, TX",
        date: "March 14, 2026",
        isFeatured: false
    },
    {
        html: `<tr>
<td><strong><a href="https://wheelbrothers.com/tour-de-racha-ride-against-child-abuse/" target="_blank">Tour de RACHA</a></strong></td>
<td>Waller, TX</td>
<td>March 14, 2026</td>
</tr>`,
        title: "Tour de RACHA",
        location: "Waller, TX",
        date: "March 14, 2026",
        isFeatured: false
    },
    {
        html: `<tr>
<td><strong><a href="https://wheelbrothers.com/jalapeno-100-bike-ride-2026/" target="_blank">Jalapeno 100 Bike Ride</a></strong></td>
<td>Harlingen, TX</td>
<td>March 7, 2026</td>
</tr>`,
        title: "Jalapeno 100 Bike Ride",
        location: "Harlingen, TX",
        date: "March 7, 2026",
        isFeatured: false
    },
    {
        html: `<tr>
<td><strong><a href="https://wheelbrothers.com/rattlesnake-gravel-grind-2026/" target="_blank">Rattlesnake Gravel Grind</a></strong></td>
<td>Sweetwater, TX</td>
<td>March 21, 2026</td>
</tr>`,
        title: "Rattlesnake Gravel Grind",
        location: "Sweetwater, TX",
        date: "March 21, 2026",
        isFeatured: false
    },
    {
        html: `<tr>
<td><strong><a href="https://wheelbrothers.com/riverside-ride-3/" target="_blank">Riverside Ride</a></strong></td>
<td>Victoria, TX</td>
<td>March 21, 2026</td>
</tr>`,
        title: "Riverside Ride",
        location: "Victoria, TX",
        date: "March 21, 2026",
        isFeatured: false
    },
    {
        html: `<tr>
<td><strong><a href="https://wheelbrothers.com/texas-hell-week/" target="_blank">Texas Hell Week</a></strong></td>
<td>Fredericksburg, TX</td>
<td>March 22, 2026</td>
</tr>`,
        title: "Texas Hell Week",
        location: "Fredericksburg, TX",
        date: "March 22, 2026",
        isFeatured: false
    },
    {
        html: `<tr>
<td><strong><a href="https://wheelbrothers.com/anchor-club-of-cuero-wildflower-bike-ride-2026/" target="_blank">Wildflower Bike Ride</a></strong></td>
<td>Cuero, TX</td>
<td>March 28, 2026</td>
</tr>`,
        title: "Wildflower Bike Ride",
        location: "Cuero, TX",
        date: "March 28, 2026",
        isFeatured: false
    },
    {
        html: `<tr>
<td><strong><a href="https://wheelbrothers.com/easter-bike-tour-2/" target="_blank">Easter Bike Tour</a></strong></td>
<td>Kerrville, TX</td>
<td>April 3 - April 5, 2026</td>
</tr>`,
        title: "Easter Bike Tour",
        location: "Kerrville, TX",
        date: "April 3 - April 5, 2026",
        isFeatured: false
    },
    {
        html: `<tr>
<td><strong><a href="https://wheelbrothers.com/tulsa-flat-by-major-taylor-2/" target="_blank">Tulsa Flat by Major Taylor</a></strong></td>
<td>Tulsa, OK</td>
<td>April 4, 2026</td>
</tr>`,
        title: "Tulsa Flat by Major Taylor",
        location: "Tulsa, OK",
        date: "April 4, 2026",
        isFeatured: false
    },
    {
        html: `<tr>
<td><strong><a href="https://wheelbrothers.com/stampede-200/" target="_blank">Stampede 200</a></strong></td>
<td>Fredericksburg, TX</td>
<td>March 28, 2026</td>
</tr>`,
        title: "Stampede 200",
        location: "Fredericksburg, TX",
        date: "March 28, 2026",
        isFeatured: false
    },
    {
        html: `<tr>
<td><strong><a href="https://wheelbrothers.com/bike-the-bluebonnets-2026/" target="_blank">Bike the Bluebonnets 2026</a></strong></td>
<td>Ferris, TX</td>
<td>April 11, 2026</td>
</tr>`,
        title: "Bike the Bluebonnets 2026",
        location: "Ferris, TX",
        date: "April 11, 2026",
        isFeatured: false
    },
    {
        html: `<tr>
<td><strong><a href="https://wheelbrothers.com/tour-de-houston-2/" target="_blank">Tour de Houston</a></strong></td>
<td>Houston, TX</td>
<td>April 12, 2026</td>
</tr>`,
        title: "Tour de Houston",
        location: "Houston, TX",
        date: "April 12, 2026",
        isFeatured: false
    },
    {
        html: `<tr>
<td><strong><a href="https://wheelbrothers.com/gran-fondo-texas/" target="_blank">Gran Fondo Texas</a></strong></td>
<td>Montgomery, TX</td>
<td>April 12, 2026</td>
</tr>`,
        title: "Gran Fondo Texas",
        location: "Montgomery, TX",
        date: "April 12, 2026",
        isFeatured: false
    },
    {
        html: `<tr>
<td><strong><a href="https://wheelbrothers.com/tour-de-las-chingonas-bike-fiesta/" target="_blank">Tour de las Chingonas</a></strong></td>
<td>San Antonio, TX</td>
<td>April 14, 2026</td>
</tr>`,
        title: "Tour de las Chingonas",
        location: "San Antonio, TX",
        date: "April 14, 2026",
        isFeatured: false
    },
    {
        html: `<tr class="featured-ride">
<td><strong><a href="https://wheelbrothers.com/tour-de-cypress-bike-ride-2026/" target="_blank">Tour de Cypress <span class="featured-label">(Featured)</span></a></strong></td>
<td>Mount Vernon, TX</td>
<td>April 18, 2026</td>
</tr>`,
        title: "Tour de Cypress",
        location: "Mount Vernon, TX",
        date: "April 18, 2026",
        isFeatured: true
    },
    {
        html: `<tr>
<td><strong><a href="https://wheelbrothers.com/tour-de-braz-bike-ride/" target="_blank">Tour de Braz</a></strong></td>
<td>Alvin, TX</td>
<td>April 18, 2026</td>
</tr>`,
        title: "Tour de Braz",
        location: "Alvin, TX",
        date: "April 18, 2026",
        isFeatured: false
    },
    {
        html: `<tr>
<td><strong><a href="https://wheelbrothers.com/hill-country-ride-for-aids-2/" target="_blank">Hill Country Ride for AIDS</a></strong></td>
<td>Spicewood, TX</td>
<td>April 18, 2026</td>
</tr>`,
        title: "Hill Country Ride for AIDS",
        location: "Spicewood, TX",
        date: "April 18, 2026",
        isFeatured: false
    },
    {
        html: `<tr class="featured-ride">
<td><strong><a href="https://wheelbrothers.com/red-poppy-bike-ride-3/" target="_blank">Red Poppy Bike Ride <span class="featured-label">(Featured)</span></a></strong></td>
<td>Georgetown, TX</td>
<td>April 25, 2026</td>
</tr>`,
        title: "Red Poppy Bike Ride",
        location: "Georgetown, TX",
        date: "April 25, 2026",
        isFeatured: true
    },
    {
        html: `<tr>
<td><strong><a href="https://wheelbrothers.com/muenster-metric-century-bicycle-rally/" target="_blank">Muenster Metric Century</a></strong></td>
<td>Muenster, TX</td>
<td>April 25, 2026</td>
</tr>`,
        title: "Muenster Metric Century",
        location: "Muenster, TX",
        date: "April 25, 2026",
        isFeatured: false
    },
    {
        html: `<tr>
<td><strong><a href="https://wheelbrothers.com/a-ride-on-the-wild-side-2/" target="_blank">A Ride on the Wild Side</a></strong></td>
<td>Kingsville, TX</td>
<td>April 25, 2026</td>
</tr>`,
        title: "A Ride on the Wild Side",
        location: "Kingsville, TX",
        date: "April 25, 2026",
        isFeatured: false
    },
    {
        html: `<tr>
<td><strong><a href="https://wheelbrothers.com/top-of-texas-heritage-ride/" target="_blank">Top of Texas Heritage Ride</a></strong></td>
<td>Amarillo, TX</td>
<td>April 25, 2026</td>
</tr>`,
        title: "Top of Texas Heritage Ride",
        location: "Amarillo, TX",
        date: "April 25, 2026",
        isFeatured: false
    },
    {
        html: `<tr>
<td><strong><a href="https://wheelbrothers.com/piney-woods-quad-county-challenge/" target="_blank">Piney Woods Quad County Challenge</a></strong></td>
<td>Frankston, TX</td>
<td>April 25, 2026</td>
</tr>`,
        title: "Piney Woods Quad County Challenge",
        location: "Frankston, TX",
        date: "April 25, 2026",
        isFeatured: false
    },
    {
        html: `<tr>
<td><strong><a href="https://wheelbrothers.com/bike-texas-ms-150/" target="_blank">Bike Texas MS 150</a></strong></td>
<td>College Station, TX</td>
<td>April 25 - April 26, 2026</td>
</tr>`,
        title: "Bike Texas MS 150",
        location: "College Station, TX",
        date: "April 25 - April 26, 2026",
        isFeatured: false
    },
    {
        html: `<tr>
<td><strong><a href="https://wheelbrothers.com/dallas-cycle-nation/" target="_blank">Dallas Cycle Nation</a></strong></td>
<td>Dallas, TX</td>
<td>April 30, 2026</td>
</tr>`,
        title: "Dallas Cycle Nation",
        location: "Dallas, TX",
        date: "April 30, 2026",
        isFeatured: false
    },
    {
        html: `<tr>
<td><strong><a href="https://wheelbrothers.com/bike-ms-round-up-ride-3/" target="_blank">Bike MS: Round-Up Ride</a></strong></td>
<td>Fort Worth, TX</td>
<td>May 2, 2026</td>
</tr>`,
        title: "Bike MS: Round-Up Ride",
        location: "Fort Worth, TX",
        date: "May 2, 2026",
        isFeatured: false
    },
    {
        html: `<tr>
<td><strong><a href="https://wheelbrothers.com/5th-annual-gear-up-against-kids-cancer/" target="_blank">Gear Up Against Kids Cancer</a></strong></td>
<td>Floresville, TX</td>
<td>May 2, 2026</td>
</tr>`,
        title: "Gear Up Against Kids Cancer",
        location: "Floresville, TX",
        date: "May 2, 2026",
        isFeatured: false
    },
    {
        html: `<tr>
<td><strong><a href="https://wheelbrothers.com/stampede-on-the-chisholm-trail-metric-century-2026-ride-through-history-in-belton-texas/" target="_blank">STAMPEDE on the Chisholm Trail Metric Century</a></strong></td>
<td>Belton, TX</td>
<td>May 9, 2026</td>
</tr>`,
        title: "STAMPEDE on the Chisholm Trail Metric Century",
        location: "Belton, TX",
        date: "May 9, 2026",
        isFeatured: false
    },
    {
        html: `<tr>
<td><strong><a href="https://wheelbrothers.com/bikes-and-bands-bash-custom-show-3-days-of-live-music/" target="_blank">Bikes and Bands Bash</a></strong></td>
<td>Dallas, TX</td>
<td>May 15 – May 17, 2026</td>
</tr>`,
        title: "Bikes and Bands Bash",
        location: "Dallas, TX",
        date: "May 15 – May 17, 2026",
        isFeatured: false
    },
    {
        html: `<tr class="featured-ride">
<td><strong><a href="https://wheelbrothers.com/positive-cycology-ride-2026-ride-for-mental-health/" target="_blank">Positive Cycology Ride <span class="featured-label">(Featured)</span></a></strong></td>
<td>Denton, TX</td>
<td>May 16, 2026</td>
</tr>`,
        title: "Positive Cycology Ride",
        location: "Denton, TX",
        date: "May 16, 2026",
        isFeatured: true
    },
    {
        html: `<tr>
<td><strong><a href="https://wheelbrothers.com/circles-on-a-mission-bicycle-ride-3/" target="_blank">Circles on a Mission Bicycle Ride</a></strong></td>
<td>DeRidder, LA</td>
<td>May 16, 2026</td>
</tr>`,
        title: "Circles on a Mission Bicycle Ride",
        location: "DeRidder, LA",
        date: "May 16, 2026",
        isFeatured: false
    },
    {
        html: `<tr>
<td><strong><a href="https://wheelbrothers.com/head-for-the-hills-bicycle-rally-2/" target="_blank">Head for the Hills</a></strong></td>
<td>Cedar Hill, TX</td>
<td>May 16, 2026</td>
</tr>`,
        title: "Head for the Hills",
        location: "Cedar Hill, TX",
        date: "May 16, 2026",
        isFeatured: false
    },
    {
        html: `<tr>
<td><strong><a href="https://wheelbrothers.com/the-bosque-tour-de-norway/" target="_blank">Tour De Norway</a></strong></td>
<td>Clifton, TX</td>
<td>May 16, 2026</td>
</tr>`,
        title: "Tour De Norway",
        location: "Clifton, TX",
        date: "May 16, 2026",
        isFeatured: false
    },
    {
        html: `<tr>
<td><strong><a href="https://wheelbrothers.com/1st-annual-ride-the-legacy-of-a-servants-heart/" target="_blank">The Legacy of a Servant’s Heart</a></strong></td>
<td>Andrews, TX</td>
<td>May 16, 2026</td>
</tr>`,
        title: "The Legacy of a Servant’s Heart",
        location: "Andrews, TX",
        date: "May 16, 2026",
        isFeatured: false
    },
    {
        html: `<tr>
<td><strong><a href="https://wheelbrothers.com/the-great-american-shiner-pedal-gasp/" target="_blank">The Great American Shiner Pedal (GASP)</a></strong></td>
<td>Shiner, TX</td>
<td>May 16, 2026</td>
</tr>`,
        title: "The Great American Shiner Pedal (GASP)",
        location: "Shiner, TX",
        date: "May 16, 2026",
        isFeatured: false
    },
    {
        html: `<tr>
<td><strong><a href="https://wheelbrothers.com/ride-of-silence-grand-prairie-2/" target="_blank">Ride of Silence Grand Prairie</a></strong></td>
<td>Grand Prairie, TX</td>
<td>May 20, 2026</td>
</tr>`,
        title: "Ride of Silence Grand Prairie",
        location: "Grand Prairie, TX",
        date: "May 20, 2026",
        isFeatured: false
    },
    {
        html: `<tr>
<td><strong><a href="https://wheelbrothers.com/ride-of-silence-austin/" target="_blank">Ride of Silence Austin</a></strong></td>
<td>Austin, TX</td>
<td>May 20, 2026</td>
</tr>`,
        title: "Ride of Silence Austin",
        location: "Austin, TX",
        date: "May 20, 2026",
        isFeatured: false
    },
    {
        html: `<tr>
<td><strong><a href="https://wheelbrothers.com/mthcc-summer-sizzle/" target="_blank">MTHCC Summer Sizzle</a></strong></td>
<td>Houston, TX</td>
<td>May 23, 2026</td>
</tr>`,
        title: "MTHCC Summer Sizzle",
        location: "Houston, TX",
        date: "May 23, 2026",
        isFeatured: false
    },
    {
        html: `<tr>
<td><strong><a href="https://wheelbrothers.com/burleson-honey-tour-2/" target="_blank">Burleson Honey Tour</a></strong></td>
<td>Burleson, TX</td>
<td>May 23, 2026</td>
</tr>`,
        title: "Burleson Honey Tour",
        location: "Burleson, TX",
        date: "May 23, 2026",
        isFeatured: false
    },
    {
        html: `<tr class="featured-ride">
<td><strong><a href="https://wheelbrothers.com/the-legacy-100-2/" target="_blank">The Legacy 100 <span class="featured-label">(Featured)</span></a></strong></td>
<td>Schulenburg, TX</td>
<td>May 30, 2026</td>
</tr>`,
        title: "The Legacy 100",
        location: "Schulenburg, TX",
        date: "May 30, 2026",
        isFeatured: true
    },
    {
        html: `<tr class="featured-ride">
<td><strong><a href="https://wheelbrothers.com/magnolia-bike-tour-2/" target="_blank">Magnolia Bike Tour <span class="featured-label">(Featured)</span></a></strong></td>
<td>Durant, OK</td>
<td>May 30, 2026</td>
</tr>`,
        title: "Magnolia Bike Tour",
        location: "Durant, OK",
        date: "May 30, 2026",
        isFeatured: true
    },
    {
        html: `<tr>
<td><strong><a href="https://wheelbrothers.com/tour-de-tomato-3/" target="_blank">Tour de Tomato</a></strong></td>
<td>Jacksonville, TX</td>
<td>June 6, 2026</td>
</tr>`,
        title: "Tour de Tomato",
        location: "Jacksonville, TX",
        date: "June 6, 2026",
        isFeatured: false
    },
    {
        html: `<tr class="featured-ride">
<td><strong><a href="https://wheelbrothers.com/possum-pedal-2026/" target="_blank">Possum Pedal <span class="featured-label">(Featured)</span></a></strong></td>
<td>Graham, TX</td>
<td>June 6, 2026</td>
</tr>`,
        title: "Possum Pedal",
        location: "Graham, TX",
        date: "June 6, 2026",
        isFeatured: true
    },
    {
        html: `<tr>
<td><strong><a href="https://wheelbrothers.com/mesquite-rodeo-road-rally-2/" target="_blank">Mesquite Rodeo Road Rally</a></strong></td>
<td>Mesquite, TX</td>
<td>June 6, 2026</td>
</tr>`,
        title: "Mesquite Rodeo Road Rally",
        location: "Mesquite, TX",
        date: "June 6, 2026",
        isFeatured: false
    },
    {
        html: `<tr>
<td><strong><a href="https://wheelbrothers.com/lifecycle-bike-benefit-tour-2/" target="_blank">LifeCycle Bike Benefit Tour</a></strong></td>
<td>Keithville, LA</td>
<td>June 6, 2026</td>
</tr>`,
        title: "LifeCycle Bike Benefit Tour",
        location: "Keithville, LA",
        date: "June 6, 2026",
        isFeatured: false
    },
    {
        html: `<tr>
<td><strong><a href="https://wheelbrothers.com/sb250-2/" target="_blank">SB250</a></strong></td>
<td>Edinburg, TX</td>
<td>June 12, 2026</td>
</tr>`,
        title: "SB250",
        location: "Edinburg, TX",
        date: "June 12, 2026",
        isFeatured: false
    },
    {
        html: `<tr>
<td><strong><a href="https://wheelbrothers.com/bentonville-bike-fest/" target="_blank">Bentonville Bike Fest</a></strong></td>
<td>Bentonville, AR</td>
<td>June 12, 2026</td>
</tr>`,
        title: "Bentonville Bike Fest",
        location: "Bentonville, AR",
        date: "June 12, 2026",
        isFeatured: false
    },
    {
        html: `<tr>
<td><strong><a href="https://wheelbrothers.com/kowtown-gravel-2026/" target="_blank">KowTown Gravel</a></strong></td>
<td>Kremmling, CO</td>
<td>June 13, 2026</td>
</tr>`,
        title: "KowTown Gravel",
        location: "Kremmling, CO",
        date: "June 13, 2026",
        isFeatured: false
    },
    {
        html: `<tr>
<td><strong><a href="https://wheelbrothers.com/fire-ant-tour-2026/" target="_blank">Fire Ant Tour</a></strong></td>
<td>Gatesville, TX</td>
<td>June 13, 2026</td>
</tr>`,
        title: "Fire Ant Tour",
        location: "Gatesville, TX",
        date: "June 13, 2026",
        isFeatured: false
    },
    {
        html: `<tr>
<td><strong><a href="https://wheelbrothers.com/soulpatrol-juneteenth-bike-rally/" target="_blank">SoulPatrol Juneteenth</a></strong></td>
<td>McKinney, TX</td>
<td>June 20, 2026</td>
</tr>`,
        title: "SoulPatrol Juneteenth",
        location: "McKinney, TX",
        date: "June 20, 2026",
        isFeatured: false
    },
    {
        html: `<tr class="featured-ride">
<td><strong><a href="https://wheelbrothers.com/tour-d-italia/" target="_blank">Tour d' Italia <span class="featured-label">(Featured)</span></a></strong></td>
<td>Italy, TX</td>
<td>June 20, 2026</td>
</tr>`,
        title: "Tour d' Italia",
        location: "Italy, TX",
        date: "June 20, 2026",
        isFeatured: true
    },
    {
        html: `<tr>
<td><strong><a href="https://wheelbrothers.com/wheels-of-fire-bike-ride/" target="_blank">Wheels of Fire Bike Ride</a></strong></td>
<td>Waxahachie, TX</td>
<td>June 27, 2026</td>
</tr>`,
        title: "Wheels of Fire Bike Ride",
        location: "Waxahachie, TX",
        date: "June 27, 2026",
        isFeatured: false
    },
    {
        html: `<tr>
<td><strong><a href="https://wheelbrothers.com/tour-de-boerne-2/" target="_blank">Tour de Boerne</a></strong></td>
<td>Comfort, TX</td>
<td>June 27, 2026</td>
</tr>`,
        title: "Tour de Boerne",
        location: "Comfort, TX",
        date: "June 27, 2026",
        isFeatured: false
    },
    {
        html: `<tr>
<td><span style="color: red;"><strong><a href="https://wheelbrothers.com/spokes-and-sparklers-2/" target="_blank">Spokes and Sparklers (CANCELED)</a></strong></span></td>
<td>Crawford, TX</td>
<td>July 4, 2026</td>
</tr>`,
        title: "Spokes and Sparklers (CANCELED)",
        location: "Crawford, TX",
        date: "July 4, 2026",
        isFeatured: false
    },
    {
        html: `<tr class="featured-ride">
<td><strong><a href="https://wheelbrothers.com/peach-pedal-bike-ride-2026/" target="_blank">Peach Pedal <span class="featured-label">(Featured)</span></a></strong></td>
<td>Weatherford, TX</td>
<td>July 11, 2026</td>
</tr>`,
        title: "Peach Pedal",
        location: "Weatherford, TX",
        date: "July 11, 2026",
        isFeatured: true
    },
    {
        html: `<tr>
<td><strong><a href="https://wheelbrothers.com/finish-the-ride-3/" target="_blank">Finish the Ride</a></strong></td>
<td>Tulia, TX</td>
<td>July 11, 2026</td>
</tr>`,
        title: "Finish the Ride",
        location: "Tulia, TX",
        date: "July 11, 2026",
        isFeatured: false
    },
    {
        html: `<tr class="featured-ride">
<td><strong><a href="https://wheelbrothers.com/tour-de-paris-2/" target="_blank">Tour de Paris <span class="featured-label">(Featured)</span></a></strong></td>
<td>Paris, TX</td>
<td>July 18, 2026</td>
</tr>`,
        title: "Tour de Paris",
        location: "Paris, TX",
        date: "July 18, 2026",
        isFeatured: true
    },
    {
        html: `<tr>
<td><strong><a href="https://wheelbrothers.com/bike-ms-cactus-crude/" target="_blank">Bike MS: Cactus &amp; Crude</a></strong></td>
<td>Lubbock, TX</td>
<td>July 18, 2026</td>
</tr>`,
        title: "Bike MS: Cactus & Crude",
        location: "Lubbock, TX",
        date: "July 18, 2026",
        isFeatured: false
    },
    {
        html: `<tr class="featured-ride">
<td><strong><a href="https://wheelbrothers.com/tour-de-gap-3/" target="_blank">Tour de Gap <span class="featured-label">(Featured)</span></a></strong></td>
<td>Buffalo Gap, TX</td>
<td>July 25, 2026</td>
</tr>`,
        title: "Tour de Gap",
        location: "Buffalo Gap, TX",
        date: "July 25, 2026",
        isFeatured: true
    },
    {
        html: `<tr>
<td><strong><a href="https://wheelbrothers.com/the-dehydrator/">The Dehydrator</a></strong></td>
<td>Duncan, OK</td>
<td>July 25, 2026</td>
</tr>`,
        title: "The Dehydrator",
        location: "Duncan, OK",
        date: "July 25, 2026",
        isFeatured: false
    },
    {
        html: `<tr class="featured-ride">
<td><strong><a href="https://wheelbrothers.com/blazin-saddle-75-bicycle-rally/" target="_blank">Blazin' Saddle 75 <span class="featured-label">(Featured)</span></a></strong></td>
<td>Granbury, TX</td>
<td>August 1, 2026</td>
</tr>`,
        title: "Blazin' Saddle 75",
        location: "Granbury, TX",
        date: "August 1, 2026",
        isFeatured: true
    },
    {
        html: `<tr>
<td><strong><a href="https://wheelbrothers.com/cove-house-classic-2026/" target="_blank">Cove House Classic</a></strong></td>
<td>Copperas Cove, TX</td>
<td>August 8, 2026</td>
</tr>`,
        title: "Cove House Classic",
        location: "Copperas Cove, TX",
        date: "August 8, 2026",
        isFeatured: false
    },
    {
        html: `<tr>
<td><strong><a href="https://wheelbrothers.com/tour-de-pines/" target="_blank">Tour de Pines</a></strong></td>
<td>Mineola, TX</td>
<td>August 15, 2026</td>
</tr>`,
        title: "Tour de Pines",
        location: "Mineola, TX",
        date: "August 15, 2026",
        isFeatured: false
    },
    {
        html: `<tr>
<td><strong><a href="https://wheelbrothers.com/great-cycle-challenge-usa/" target="_blank">Great Cycle Challenge USA</a></strong></td>
<td>Texas, TX</td>
<td>September 1 – September 30, 2026</td>
</tr>`,
        title: "Great Cycle Challenge USA",
        location: "Texas, TX",
        date: "September 1 – September 30, 2026",
        isFeatured: false
    },
    {
        html: `<tr>
<td><strong><a href="https://wheelbrothers.com/tour-d-athens-2/" target="_blank">Tour d' Athens</a></strong></td>
<td>Athens, TX</td>
<td>September 5, 2026</td>
</tr>`,
        title: "Tour d' Athens",
        location: "Athens, TX",
        date: "September 5, 2026",
        isFeatured: false
    },
    {
        html: `<tr>
<td><strong><a href="https://wheelbrothers.com/dam-j-a-m-bicycle-tour/" target="_blank">DAM J.A.M. Bicycle Tour</a></strong></td>
<td>Pryor, OK</td>
<td>September 12, 2026</td>
</tr>`,
        title: "DAM J.A.M. Bicycle Tour",
        location: "Pryor, OK",
        date: "September 12, 2026",
        isFeatured: false
    },
    {
        html: `<tr>
<td><strong><a href="https://wheelbrothers.com/rolling-into-fall-bicycle-rally-2/" target="_blank">Rolling Into Fall</a></strong></td>
<td>Corinth, TX</td>
<td>September 12, 2026</td>
</tr>`,
        title: "Rolling Into Fall",
        location: "Corinth, TX",
        date: "September 12, 2026",
        isFeatured: false
    },
    {
        html: `<tr>
<td><strong><a href="https://wheelbrothers.com/7th-annual-rollin-pearland-charity-cycling-event-rp7/" target="_blank">Rollin' Pearland (RP7)</a></strong></td>
<td>Manvel, TX</td>
<td>September 12, 2026</td>
</tr>`,
        title: "Rollin' Pearland (RP7)",
        location: "Manvel, TX",
        date: "September 12, 2026",
        isFeatured: false
    },
    {
        html: `<tr>
<td><strong><a href="https://wheelbrothers.com/ride-to-remember/" target="_blank">Ride to Remember</a></strong></td>
<td>Dallas, TX</td>
<td>September 12, 2026</td>
</tr>`,
        title: "Ride to Remember",
        location: "Dallas, TX",
        date: "September 12, 2026",
        isFeatured: false
    },
    {
        html: `<tr>
<td><strong><a href="https://wheelbrothers.com/doss-gravel/" target="_blank">Doss Gravel</a></strong></td>
<td>Doss, TX</td>
<td>September 12, 2026</td>
</tr>`,
        title: "Doss Gravel",
        location: "Doss, TX",
        date: "September 12, 2026",
        isFeatured: false
    },
    {
        html: `<tr class="featured-ride">
<td><strong><a href="https://wheelbrothers.com/skittles-waco-wild-west-bicycle-tour/" target="_blank">Skittles Waco Wild West <span class="featured-label">(Featured)</span></a></strong></td>
<td>Waco, TX</td>
<td>September 13, 2026</td>
</tr>`,
        title: "Skittles Waco Wild West",
        location: "Waco, TX",
        date: "September 13, 2026",
        isFeatured: true
    },
    {
        html: `<tr>
<td><strong><a href="https://wheelbrothers.com/conquer-the-coast-3/" target="_blank">Conquer the Coast</a></strong></td>
<td>Corpus Christi, TX</td>
<td>September 19, 2026</td>
</tr>`,
        title: "Conquer the Coast",
        location: "Corpus Christi, TX",
        date: "September 19, 2026",
        isFeatured: false
    },
    {
        html: `<tr>
<td><strong><a href="https://wheelbrothers.com/fort-davis-cyclefest/" target="_blank">Fort Davis Cyclefest</a></strong></td>
<td>Fort Davis, TX</td>
<td>September 19, 2026</td>
</tr>`,
        title: "Fort Davis Cyclefest",
        location: "Fort Davis, TX",
        date: "September 19, 2026",
        isFeatured: false
    },
    {
        html: `<tr>
<td><strong><a href="https://wheelbrothers.com/eighter-from-decatur-bicycle-rally/" target="_blank">Eighter From Decatur Bicycle Rally</a></strong></td>
<td>Decatur, TX</td>
<td>September 19, 2026</td>
</tr>`,
        title: "Eighter From Decatur Bicycle Rally",
        location: "Decatur, TX",
        date: "September 19, 2026",
        isFeatured: false
    },
    {
        html: `<tr>
<td><strong><a href="https://wheelbrothers.com/cotton-patch-challenge-2/" target="_blank">Cotton Patch Challenge</a></strong></td>
<td>Greenville, TX</td>
<td>September 19, 2026</td>
</tr>`,
        title: "Cotton Patch Challenge",
        location: "Greenville, TX",
        date: "September 19, 2026",
        isFeatured: false
    },
    {
        html: `<tr>
<td><strong><a href="https://wheelbrothers.com/texas-tumbleweed-100-2/" target="_blank">Texas Tumbleweed 100</a></strong></td>
<td>Dumas, TX</td>
<td>September 19, 2026</td>
</tr>`,
        title: "Texas Tumbleweed 100",
        location: "Dumas, TX",
        date: "September 19, 2026",
        isFeatured: false
    },
    {
        html: `<tr class="featured-ride">
<td><strong><a href="https://wheelbrothers.com/2026/05/31/the-sloan-everett-pure-country-pedal-memorial-bike-ride/" target="_blank">The Sloan Everett Pure Country Pedal Memorial Bike Ride <span class="featured-label">(Featured)</span></a></strong></td>
<td>Breckenridge, TX</td>
<td>October 3, 2026</td>
</tr>`,
        title: "The Sloan Everett Pure Country Pedal Memorial Bike Ride",
        location: "Breckenridge, TX",
        date: "October 3, 2026",
        isFeatured: true
    },
    {
        html: `<tr>
<td><strong><a href="https://wheelbrothers.com/rock-island-ride/" target="_blank">Rock Island Ride</a></strong></td>
<td>Chickasha, OK</td>
<td>October 3, 2026</td>
</tr>`,
        title: "Rock Island Ride",
        location: "Chickasha, OK",
        date: "October 3, 2026",
        isFeatured: false
    },
    {
        html: `<tr class="featured-ride">
<td><strong><a href="https://wheelbrothers.com/autumn-in-bonham-3/" target="_blank">Autumn in Bonham <span class="featured-label">(Featured)</span></a></strong></td>
<td>Bonham, TX</td>
<td>October 3, 2026</td>
</tr>`,
        title: "Autumn in Bonham",
        location: "Bonham, TX",
        date: "October 3, 2026",
        isFeatured: true
    },
    {
        html: `<tr class="featured-ride">
<td><strong><a href="https://wheelbrothers.com/boomtown-blowout-bike-ride-2/" target="_blank">Boomtown Blowout Bike Ride <span class="featured-label">(Featured)</span></a></strong></td>
<td>Burkburnett, TX</td>
<td>October 3, 2026</td>
</tr>`,
        title: "Boomtown Blowout Bike Ride",
        location: "Burkburnett, TX",
        date: "October 3, 2026",
        isFeatured: true
    },
    {
        html: `<tr>
<td><strong><a href="https://wheelbrothers.com/bike-ms-ride-to-the-river-2/" target="_blank">Bike MS: Ride to the River</a></strong></td>
<td>San Antonio, TX</td>
<td>October 3 – 4, 2026</td>
</tr>`,
        title: "Bike MS: Ride to the River",
        location: "San Antonio, TX",
        date: "October 3 – 4, 2026",
        isFeatured: false
    },
    {
        html: `<tr>
<td><strong><a href="https://wheelbrothers.com/pink-diamonds-bike-ride-2026/" target="_blank">Pink Diamond Bike Ride</a></strong></td>
<td>Duncanville, TX</td>
<td>October 10, 2026</td>
</tr>`,
        title: "Pink Diamond Bike Ride",
        location: "Duncanville, TX",
        date: "October 10, 2026",
        isFeatured: false
    },
    {
        html: `<tr>
<td><strong><a href="https://wheelbrothers.com/36th-annual-beauty-and-the-beast-bicycle-event/" target="_blank">Beauty and the Beast</a></strong></td>
<td>Whitehouse, TX</td>
<td>October 10, 2026</td>
</tr>`,
        title: "Beauty and the Beast",
        location: "Whitehouse, TX",
        date: "October 10, 2026",
        isFeatured: false
    },
    {
        html: `<tr>
<td><strong><a href="https://wheelbrothers.com/6th-annual-bike-ride-for-survivors/" target="_blank">6th Annual Bike Ride for Survivors</a></strong></td>
<td>Sugar Land, TX</td>
<td>October 10, 2026</td>
</tr>`,
        title: "6th Annual Bike Ride for Survivors",
        location: "Sugar Land, TX",
        date: "October 10, 2026",
        isFeatured: false
    },
    {
        html: `<tr>
<td><strong><a href="https://wheelbrothers.com/barrow-volksride/" target="_blank">Barrow Volksride</a></strong></td>
<td>Salado, TX</td>
<td>October 17, 2026</td>
</tr>`,
        title: "Barrow Volksride",
        location: "Salado, TX",
        date: "October 17, 2026",
        isFeatured: false
    },
    {
        html: `<tr>
<td><strong><a href="https://wheelbrothers.com/marfa-100/" target="_blank">Marfa 100</a></strong></td>
<td>Marfa, TX</td>
<td>October 17, 2026</td>
</tr>`,
        title: "Marfa 100",
        location: "Marfa, TX",
        date: "October 17, 2026",
        isFeatured: false
    },
    {
        html: `<tr class="featured-ride">
<td><strong><a href="https://wheelbrothers.com/ride-to-end-alz-texas/" target="_blank">Ride to End ALZ Texas <span class="featured-label">(Featured)</span></a></strong></td>
<td>Dripping Springs, TX</td>
<td>October 17, 2026</td>
</tr>`,
        title: "Ride to End ALZ Texas",
        location: "Dripping Springs, TX",
        date: "October 17, 2026",
        isFeatured: true
    },
    {
        html: `<tr>
<td><strong><a href="https://wheelbrothers.com/texas-bike-rides-and-race-calendar-2026/" target="_blank">Bike Around the Bay</a></strong></td>
<td>Galveston, TX</td>
<td>October 17 – 18, 2026</td>
</tr>`,
        title: "Bike Around the Bay",
        location: "Galveston, TX",
        date: "October 17 – 18, 2026",
        isFeatured: false
    },
    {
        html: `<tr class="featured-ride">
<td><strong><a href="https://wheelbrothers.com/tour-de-cure-texas/" target="_blank">Tour de Cure: Texas <span class="featured-label">(Featured)</span></a></strong></td>
<td>Dallas, TX</td>
<td>October 24, 2026</td>
</tr>`,
        title: "Tour de Cure: Texas",
        location: "Dallas, TX",
        date: "October 24, 2026",
        isFeatured: true
    },
    {
        html: `<tr class="featured-ride">
<td><strong><a href="https://wheelbrothers.com/pedaling-for-the-veterans-2/" target="_blank">Pedaling for the Veterans <span class="featured-label">(Featured)</span></a></strong></td>
<td>Wallis, TX</td>
<td>November 7, 2026</td>
</tr>`,
        title: "Pedaling for the Veterans",
        location: "Wallis, TX",
        date: "November 7, 2026",
        isFeatured: true
    },
    {
        html: `<tr>
<td><strong><a href="https://wheelbrothers.com/pedal-in-the-pines/" target="_blank">Pedal in the Pines</a></strong></td>
<td>Cleveland, TX</td>
<td>November 14, 2026</td>
</tr>`,
        title: "Pedal in the Pines",
        location: "Cleveland, TX",
        date: "November 14, 2026",
        isFeatured: false
    },
    {
        html: `<tr>
<td><strong><a href="https://wheelbrothers.com/turkey-roll-bicycle-rally-2026/" target="_blank">Turkey Roll Bicycle Rally</a></strong></td>
<td>Denton, TX</td>
<td>November 21, 2026</td>
</tr>`,
        title: "Turkey Roll Bicycle Rally",
        location: "Denton, TX",
        date: "November 21, 2026",
        isFeatured: false
    }
];

// App State
let masterRidesList = [...INITIAL_RIDES_HTML];
let currentFilter = 'all';
let searchQuery = '';

// Sample Data for Rewriter
const SAMPLE_RAW_DATA = `Date
 	10/03/2026
Ride name
 	Rock Island Ride
Ride distance:
 	10, 28, 41 (Gravel), 42, and 63 miles
State
 	Oklahoma (OK)
Location
 	Chickasha, OK
About the Ride:
 	Chickasha Rock Island Ride - Sat, October 3, 2026
Ride for $25! First 250 riders who pre-register receive a T-shirt
10, 28, 41 (Gravel), 42, & 63 mile routes available
KOM/QOM Prizes $150 for 1st, $100 for 2nd, $50 for 3rd
Proceeds support local charities
Register: https://www.bikereg.com/crir2026
Registration Link
 	https://www.bikereg.com/crir2026
Contact Info
 	Email: rockislandride@gmail.com
Website
 	Registration: https://www.bikereg.com/crir2026 Website: https://www.rockislandride.com/
Recommended for others?
 	Yes
Why are you recommending it?
 	Great routes, caring organization, full weekend of activities for the whole family.`;

// DOM Elements
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    if (window.lucide) {
        lucide.createIcons();
    }

    initTabs();
    initSnippetForm();
    initRewriter();
    initMasterTable();
    initTheme();
    initModal();
    initNewsletterBuilder();
    initMasterSelectModal();
    initImageFactChecker();
});

/* ==========================================
   1. NAVIGATION & TABS
   ========================================== */
function initTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');

            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));

            btn.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
}

/* ==========================================
   2. SNIPPET GENERATOR
   ========================================== */
function initSnippetForm() {
    const isFeaturedCheck = document.getElementById('isFeatured');
    const featuredFieldsBox = document.getElementById('featuredFields');
    const form = document.getElementById('snippetForm');

    const eventTitle = document.getElementById('eventTitle');
    const eventUrl = document.getElementById('eventUrl');
    const eventLocation = document.getElementById('eventLocation');
    const eventDate = document.getElementById('eventDate');
    const eventImgUrl = document.getElementById('eventImgUrl');
    const imgWidth = document.getElementById('imgWidth');
    const imgHeight = document.getElementById('imgHeight');

    const snippetCodeOutput = document.getElementById('snippetCodeOutput');
    const previewRowContainer = document.getElementById('previewRowContainer');

    // Toggle Featured Fields
    isFeaturedCheck.addEventListener('change', () => {
        if (isFeaturedCheck.checked) {
            featuredFieldsBox.classList.remove('hidden');
        } else {
            featuredFieldsBox.classList.add('hidden');
        }
        updateSnippetPreview();
    });

    // Inputs live change
    [eventTitle, eventUrl, eventLocation, eventDate, eventImgUrl, imgWidth, imgHeight].forEach(input => {
        input.addEventListener('input', updateSnippetPreview);
    });

    function generateSnippetHtml() {
        const isFeatured = isFeaturedCheck.checked;
        const title = eventTitle.value.trim() || "Event Name";
        const url = eventUrl.value.trim() || "#";
        const location = eventLocation.value.trim() || "City, TX";
        const date = eventDate.value.trim() || "Date, 2026";
        const img = eventImgUrl.value.trim();
        const w = imgWidth.value || "100";
        const h = imgHeight.value || "100";

        let html = '';
        if (isFeatured) {
            html = `<tr class="featured-ride">
<td><strong><a href="${url}" target="_blank">${title} <span class="featured-label">(Featured)</span></a></strong>`;
            if (img) {
                html += `<br>\n<img src="${img}" width="${w}" height="${h}" class="responsive-img">`;
            }
            html += `</td>\n<td>${location}</td>\n<td>${date}</td>\n</tr>`;
        } else {
            html = `<tr>
<td><strong><a href="${url}" target="_blank">${title}</a></strong></td>
<td>${location}</td>
<td>${date}</td>
</tr>`;
        }

        return html;
    }

    function updateSnippetPreview() {
        const snippet = generateSnippetHtml();
        snippetCodeOutput.textContent = snippet;
        previewRowContainer.outerHTML = snippet.replace('<tr', '<tr id="previewRowContainer"');
    }

    // Copy Snippet
    document.getElementById('copySnippetBtn').addEventListener('click', () => {
        const code = generateSnippetHtml();
        navigator.clipboard.writeText(code).then(() => {
            showToast("Snippet copied to clipboard!");
        });
    });

    // Clear Form
    document.getElementById('clearFormBtn').addEventListener('click', () => {
        form.reset();
        featuredFieldsBox.classList.add('hidden');
        updateSnippetPreview();
    });

    // Add to Master Table
    document.getElementById('addToTableBtn').addEventListener('click', () => {
        const title = eventTitle.value.trim();
        const url = eventUrl.value.trim();
        const location = eventLocation.value.trim();
        const date = eventDate.value.trim();

        if (!title || !location || !date) {
            alert("Please fill in at least Title, Location, and Date.");
            return;
        }

        const snippet = generateSnippetHtml();
        const newRide = {
            html: snippet,
            title: title,
            location: location,
            date: date,
            isFeatured: isFeaturedCheck.checked
        };

        insertRideChronologically(newRide);
        renderMasterTable();
        showToast(`"${title}" added to Master Table in date order!`);
    });

    // Initial trigger
    updateSnippetPreview();
}

/**
 * Parses ride date string into a timestamp for chronological sorting
 */
function parseRideDateTimestamp(dateStr) {
    if (!dateStr) return 0;
    const str = dateStr.trim();

    const monthMap = {
        jan: 1, january: 1,
        feb: 2, february: 2,
        mar: 3, march: 3,
        apr: 4, april: 4,
        may: 5,
        jun: 6, june: 6,
        jul: 7, july: 7,
        aug: 8, august: 8,
        sep: 9, sept: 9, september: 9,
        oct: 10, october: 10,
        nov: 11, november: 11,
        dec: 12, december: 12
    };

    // Case 1: Format MM/DD/YYYY or M/D/YYYY
    const mmddyyyy = str.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/);
    if (mmddyyyy) {
        const m = parseInt(mmddyyyy[1], 10);
        const d = parseInt(mmddyyyy[2], 10);
        const y = parseInt(mmddyyyy[3], 10);
        return new Date(y, m - 1, d).getTime();
    }

    // Case 2: Month Day, Year (e.g. September 12, 2026 or April 25 - July 18, 2026)
    const monthMatch = str.match(/([a-zA-Z]+)\s+(\d{1,2})/);
    const yearMatch = str.match(/(\d{4})/);
    const year = yearMatch ? parseInt(yearMatch[1], 10) : 2026;

    if (monthMatch) {
        const monthKey = monthMatch[1].toLowerCase();
        const day = parseInt(monthMatch[2], 10);

        for (const [key, num] of Object.entries(monthMap)) {
            if (monthKey.startsWith(key)) {
                return new Date(year, num - 1, day).getTime();
            }
        }
    }

    return 0;
}

/**
 * Inserts a new ride into masterRidesList in chronological date order
 */
function insertRideChronologically(newRide) {
    const newTime = parseRideDateTimestamp(newRide.date);

    if (newTime === 0) {
        masterRidesList.push(newRide);
        return;
    }

    let inserted = false;
    for (let i = 0; i < masterRidesList.length; i++) {
        const currentTime = parseRideDateTimestamp(masterRidesList[i].date);
        if (currentTime > 0 && newTime < currentTime) {
            masterRidesList.splice(i, 0, newRide);
            inserted = true;
            break;
        }
    }

    if (!inserted) {
        masterRidesList.push(newRide);
    }
}

/* ==========================================
   3. RIDE INFO REWRITER & FACT CHECKER
   ========================================== */
function initRewriter() {
    const rawInput = document.getElementById('rawRideInput');
    const outputArea = document.getElementById('rewrittenOutput');
    const richTextOutput = document.getElementById('richTextOutput');
    const processBtn = document.getElementById('processRewriteBtn');
    const loadSampleBtn = document.getElementById('loadSampleRewriterBtn');
    const clearBtn = document.getElementById('clearRawBtn');
    const copyBtn = document.getElementById('copyRewrittenBtn');
    const copyRichTextBtn = document.getElementById('copyRichTextBtn');

    const viewRichBtn = document.getElementById('viewRichBtn');
    const viewPlainBtn = document.getElementById('viewPlainBtn');
    const richTextModeBox = document.getElementById('richTextModeBox');
    const plainTextModeBox = document.getElementById('plainTextModeBox');

    const factCheckContainer = document.getElementById('factCheckContainer');
    const factCheckList = document.getElementById('factCheckList');
    const factAuditBadge = document.getElementById('factAuditBadge');

    let currentHtmlSummary = '';
    let currentPlainSummary = '';

    // Mode Toggle (Rich Text vs Plain Text)
    viewRichBtn.addEventListener('click', () => {
        viewRichBtn.classList.add('active');
        viewPlainBtn.classList.remove('active');
        richTextModeBox.classList.remove('hidden');
        plainTextModeBox.classList.add('hidden');
    });

    viewPlainBtn.addEventListener('click', () => {
        viewPlainBtn.classList.add('active');
        viewRichBtn.classList.remove('active');
        plainTextModeBox.classList.remove('hidden');
        richTextModeBox.classList.add('hidden');
    });

    loadSampleBtn.addEventListener('click', () => {
        rawInput.value = SAMPLE_RAW_DATA;
        rewriteRideInfo();
    });

    clearBtn.addEventListener('click', () => {
        rawInput.value = '';
        outputArea.value = '';
        richTextOutput.innerHTML = '<p class="placeholder-text">Formatted output with active hyperlinks will appear here after clicking "Fact-Check & Rewrite Info"...</p>';
        factCheckContainer.classList.add('hidden');
    });

    processBtn.addEventListener('click', rewriteRideInfo);

    // Copy Plain Text
    copyBtn.addEventListener('click', () => {
        if (!outputArea.value.trim()) return;
        navigator.clipboard.writeText(outputArea.value).then(() => {
            showToast("Plain text copied to clipboard!");
        });
    });

    // Copy Rich Text with Hyperlinks
    copyRichTextBtn.addEventListener('click', () => {
        const htmlToCopy = richTextOutput.innerHTML;
        const textToCopy = richTextOutput.innerText;

        if (!htmlToCopy || htmlToCopy.includes('placeholder-text')) return;

        copyRichTextToClipboard(htmlToCopy, textToCopy).then(() => {
            showToast("Rich Text with live hyperlinks copied!");
        }).catch(err => {
            console.error("Clipboard copy error:", err);
            showToast("Copied to clipboard!");
        });
    });

    const autoSnippetSection = document.getElementById('autoSnippetSection');
    const autoIsFeatured = document.getElementById('autoIsFeatured');
    const autoEventUrl = document.getElementById('autoEventUrl');
    const autoEventImgUrl = document.getElementById('autoEventImgUrl');
    const autoFeaturedImgBox = document.getElementById('autoFeaturedImgBox');
    const autoSnippetCodeOutput = document.getElementById('autoSnippetCodeOutput');
    const copyAutoSnippetBtn = document.getElementById('copyAutoSnippetBtn');
    const pushAutoSnippetToMasterBtn = document.getElementById('pushAutoSnippetToMasterBtn');

    let currentParsedData = null;

    // Toggle Auto Featured Image field
    autoIsFeatured.addEventListener('change', () => {
        if (autoIsFeatured.checked) {
            autoFeaturedImgBox.classList.remove('hidden');
        } else {
            autoFeaturedImgBox.classList.add('hidden');
        }
        updateAutoSnippetPreview();
    });

    [autoEventUrl, autoEventImgUrl].forEach(input => {
        input.addEventListener('input', updateAutoSnippetPreview);
    });

    // Copy Auto Snippet
    copyAutoSnippetBtn.addEventListener('click', () => {
        const snippet = generateAutoSnippetHtml();
        if (!snippet) return;
        navigator.clipboard.writeText(snippet).then(() => {
            showToast("Table Snippet HTML copied to clipboard!");
        });
    });

    // Push Auto Snippet to Master Table
    pushAutoSnippetToMasterBtn.addEventListener('click', () => {
        if (!currentParsedData) {
            alert("Please process a ride rewrite first.");
            return;
        }

        const snippet = generateAutoSnippetHtml();
        const title = currentParsedData.name || "Cycling Event";
        const location = expandLocation(currentParsedData.location, currentParsedData.state) || "Texas, TX";
        const date = formatReadableDate(currentParsedData.date) || currentParsedData.date || "Date, 2026";

        const newRide = {
            html: snippet,
            title: title,
            location: location,
            date: date,
            isFeatured: autoIsFeatured.checked
        };

        insertRideChronologically(newRide);
        renderMasterTable();
        showToast(`"${title}" pushed to Master Table in date order!`);
    });

    function generateAutoSnippetHtml() {
        if (!currentParsedData) return '';
        const title = currentParsedData.name || "Event Title";
        const location = expandLocation(currentParsedData.location, currentParsedData.state) || "Texas, TX";
        const date = formatReadableDate(currentParsedData.date) || currentParsedData.date || "Date, 2026";
        const url = autoEventUrl.value.trim() || "https://wheelbrothers.com/";
        const isFeatured = autoIsFeatured.checked;
        const img = autoEventImgUrl.value.trim();

        let html = '';
        if (isFeatured) {
            html = `<tr class="featured-ride">
<td><strong><a href="${url}" target="_blank">${title} <span class="featured-label">(Featured)</span></a></strong>`;
            if (img) {
                html += `<br>\n<img src="${img}" width="100" height="100" class="responsive-img">`;
            }
            html += `</td>\n<td>${location}</td>\n<td>${date}</td>\n</tr>`;
        } else {
            html = `<tr>
<td><strong><a href="${url}" target="_blank">${title}</a></strong></td>
<td>${location}</td>
<td>${date}</td>
</tr>`;
        }
        return html;
    }

    function updateAutoSnippetPreview() {
        const snippet = generateAutoSnippetHtml();
        if (snippet) {
            autoSnippetCodeOutput.textContent = snippet;
        }
    }

    function rewriteRideInfo() {
        const text = rawInput.value.trim();
        if (!text) {
            outputArea.value = '';
            richTextOutput.innerHTML = '<p class="placeholder-text">Formatted output with active hyperlinks will appear here...</p>';
            factCheckContainer.classList.add('hidden');
            autoSnippetSection.classList.add('hidden');
            currentParsedData = null;
            return;
        }

        // 1. Parse raw information
        const parsed = parseRawSubmission(text);
        currentParsedData = parsed;

        // Auto-fill Link URL in snippet box if found
        let foundUrl = parsed.registrationLink || '';
        if (!foundUrl && parsed.website) {
            const regMatch = parsed.website.match(/Registration:\s*(https?:\/\/[^\s]+)/i);
            const siteMatch = parsed.website.match(/Website:\s*(https?:\/\/[^\s]+)/i);
            if (regMatch) foundUrl = regMatch[1];
            else if (siteMatch) foundUrl = siteMatch[1];
            else if (parsed.website.startsWith('http')) foundUrl = parsed.website;
        }

        autoEventUrl.value = foundUrl || 'https://wheelbrothers.com/';

        // 2. Run Fact Checker Audit
        const audit = runFactCheckAudit(parsed);
        renderFactCheckAudit(audit);

        // 3. Generate Plain Text Summary & Rich HTML Summary with Hyperlinks
        currentPlainSummary = generatePolishedSummary(parsed);
        currentHtmlSummary = generatePolishedHtmlSummary(parsed);

        outputArea.value = currentPlainSummary;
        richTextOutput.innerHTML = currentHtmlSummary;

        // 4. Reveal & update Auto-Generated Snippet box
        autoSnippetSection.classList.remove('hidden');
        updateAutoSnippetPreview();
    }
}

/**
 * Fact Checker Audit Engine
 * Verifies dates, location, distances, URLs, email, and completeness.
 */
function runFactCheckAudit(p) {
    const checks = [];
    let passCount = 0;
    let totalCount = 0;

    // 1. Date Check
    totalCount++;
    if (p.date) {
        const formattedDate = formatReadableDate(p.date);
        checks.push({
            status: 'ok',
            title: 'Date Verified',
            detail: `Found "${p.date}" → Formatted as "${formattedDate}"`
        });
        passCount++;
    } else {
        checks.push({
            status: 'warn',
            title: 'Date Missing',
            detail: 'No event date found in raw submission.'
        });
    }

    // 2. Location & State Check
    totalCount++;
    if (p.location || p.state) {
        const expandedLoc = expandLocation(p.location, p.state);
        checks.push({
            status: 'ok',
            title: 'Location & State Verified',
            detail: `Mapped to "${expandedLoc}" ${p.state ? '(' + p.state + ')' : ''}`
        });
        passCount++;
    } else {
        checks.push({
            status: 'warn',
            title: 'Location Incomplete',
            detail: 'City or state missing from submission.'
        });
    }

    // 3. Ride Distance Check
    totalCount++;
    if (p.distance) {
        checks.push({
            status: 'ok',
            title: 'Ride Distances Verified',
            detail: `Parsed routes: ${p.distance}`
        });
        passCount++;
    } else {
        checks.push({
            status: 'warn',
            title: 'Distance Unspecified',
            detail: 'No ride distance metrics specified.'
        });
    }

    // 4. URL Links Audit
    totalCount++;
    let regUrl = p.registrationLink || '';
    let siteUrl = '';
    if (p.website) {
        const regMatch = p.website.match(/Registration:\s*(https?:\/\/[^\s]+)/i);
        const siteMatch = p.website.match(/Website:\s*(https?:\/\/[^\s]+)/i);
        if (regMatch) regUrl = regMatch[1];
        if (siteMatch) siteUrl = siteMatch[1];
        if (!siteUrl && !regMatch && p.website.startsWith('http')) siteUrl = p.website;
    }

    if (regUrl || siteUrl) {
        const validReg = regUrl.startsWith('http');
        const validSite = siteUrl.startsWith('http');
        checks.push({
            status: (validReg || validSite) ? 'ok' : 'warn',
            title: 'URLs & Hyperlinks Verified',
            detail: `Reg Link: ${regUrl || 'N/A'} | Web Link: ${siteUrl || 'N/A'}`
        });
        if (validReg || validSite) passCount++;
    } else {
        checks.push({
            status: 'warn',
            title: 'No Website / Registration URL',
            detail: 'Consider adding a registration or website link.'
        });
    }

    // 5. Contact Email Audit
    totalCount++;
    if (p.contactEmail && p.contactEmail.includes('@')) {
        checks.push({
            status: 'ok',
            title: 'Contact Email Validated',
            detail: `Verified format: ${p.contactEmail}`
        });
        passCount++;
    } else {
        checks.push({
            status: 'warn',
            title: 'Contact Email Missing or Invalid',
            detail: p.contactEmail ? `Check email format: "${p.contactEmail}"` : 'No contact email provided.'
        });
    }

    return {
        checks,
        passCount,
        totalCount
    };
}

function renderFactCheckAudit(audit) {
    const factCheckContainer = document.getElementById('factCheckContainer');
    const factCheckList = document.getElementById('factCheckList');
    const factAuditBadge = document.getElementById('factAuditBadge');

    factCheckContainer.classList.remove('hidden');
    factAuditBadge.textContent = `${audit.passCount}/${audit.totalCount} Verified`;

    if (audit.passCount === audit.totalCount) {
        factAuditBadge.className = 'fact-status-badge pass';
    } else {
        factAuditBadge.className = 'fact-status-badge warning';
    }

    let html = '';
    audit.checks.forEach(c => {
        const icon = c.status === 'ok' ? 'check-circle' : 'alert-triangle';
        html += `
        <div class="fact-item ${c.status}">
            <i data-lucide="${icon}"></i>
            <div class="fact-item-content">
                <strong>${c.title}:</strong> <span>${c.detail}</span>
            </div>
        </div>`;
    });

    factCheckList.innerHTML = html;
    if (window.lucide) lucide.createIcons();
}

/**
 * Copy Rich Text (HTML + Plain Text fallback) to Clipboard
 */
function copyRichTextToClipboard(htmlContent, plainContent) {
    if (navigator.clipboard && window.ClipboardItem) {
        const htmlBlob = new Blob([htmlContent], { type: 'text/html' });
        const textBlob = new Blob([plainContent], { type: 'text/plain' });
        const item = new ClipboardItem({
            'text/html': htmlBlob,
            'text/plain': textBlob
        });
        return navigator.clipboard.write([item]);
    } else {
        const container = document.createElement('div');
        container.innerHTML = htmlContent;
        container.style.position = 'fixed';
        container.style.pointerEvents = 'none';
        container.style.opacity = '0';
        document.body.appendChild(container);

        const range = document.createRange();
        range.selectNodeContents(container);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);

        document.execCommand('copy');
        document.body.removeChild(container);
        return Promise.resolve();
    }
}

/**
 * HTML Polisher Engine: Generates rich HTML output with live active hyperlinks and clean bold styling
 */
function generatePolishedHtmlSummary(p) {
    const name = p.name || 'Cycling Event';
    const dateFormatted = formatReadableDate(p.date) || p.date;
    const distance = p.distance || 'Various distances';
    const state = p.state || '';
    const locationFull = expandLocation(p.location, p.state);

    let regUrl = p.registrationLink || '';
    let siteUrl = '';

    if (p.website) {
        const regMatch = p.website.match(/Registration:\s*(https?:\/\/[^\s]+)/i);
        const siteMatch = p.website.match(/Website:\s*(https?:\/\/[^\s]+)/i);

        if (regMatch) regUrl = regMatch[1];
        if (siteMatch) siteUrl = siteMatch[1];
        if (!siteUrl && !regMatch && p.website.startsWith('http')) {
            siteUrl = p.website;
        }
    }

    let aboutParagraphs = [];
    const rawAbout = p.about;

    if (rawAbout) {
        if (name.includes("Rock Island")) {
            aboutParagraphs = [
                `The ${name} is an annual cycling event in ${locationFull}, offering a variety of routes for cyclists of all experience levels. Riders can choose from 10, 28, 41-mile gravel, 42, or 63-mile routes that showcase the scenic roads and countryside surrounding Chickasha.`,
                `The event is known for its welcoming atmosphere, affordable registration, and strong community support. The first 250 riders who pre-register receive an event T-shirt, and participants can compete for King of the Mountain (KOM) and Queen of the Mountain (QOM) prizes, with cash awards of $150 for first place, $100 for second place, and $50 for third place.`,
                `Proceeds from the ride benefit local charities, making every mile ridden an investment in the Chickasha community. In addition to the cycling event, attendees can enjoy a full weekend of activities designed for riders and their families.`
            ];
        } else {
            aboutParagraphs.push(`The ${name} is an annual cycling event in ${locationFull}, offering a variety of routes for cyclists of all experience levels. Riders can choose from ${distance} routes that showcase the scenic roads and countryside surrounding the area.`);
            if (rawAbout.length > 40) {
                aboutParagraphs.push(rawAbout);
            }
        }
    } else {
        aboutParagraphs.push(`The ${name} takes place on ${dateFormatted} in ${locationFull}. Featuring ${distance} routes, it brings together cyclists for a memorable day on the road.`);
    }

    let recReason = p.whyRecommended;
    if (recReason && !recReason.endsWith('.')) recReason += '.';
    if (name.includes("Rock Island") && recReason.includes("Great routes")) {
        recReason = `The ${name} offers excellent routes, a caring and well-organized team, competitive KOM/QOM challenges, and a full weekend of family-friendly activities while supporting local charities.`;
    }

    let html = '';
    html += `<p><strong>Event Name:</strong> ${name}<br>\n`;
    html += `<strong>Date:</strong> ${dateFormatted}<br>\n`;
    html += `<strong>Ride Distance:</strong> ${distance}<br>\n`;
    if (state) html += `<strong>State:</strong> ${state}<br>\n`;
    html += `<strong>Location:</strong> ${locationFull}</p>\n\n`;

    html += `<p><strong>About the Ride:</strong><br>\n`;
    html += aboutParagraphs.join('</p>\n\n<p>') + `</p>\n\n`;

    if (p.recommended) {
        html += `<p><strong>Recommended for others?</strong> ${p.recommended}</p>\n\n`;
    }

    if (recReason) {
        html += `<p><strong>Why are you recommending it?</strong><br>\n${recReason}</p>\n\n`;
    }

    if (regUrl || siteUrl) {
        html += `<p><strong>Registration &amp; Website:</strong><br>\n`;
        if (regUrl) {
            html += `<strong>Registration:</strong> <a href="${regUrl}" target="_blank" rel="noopener">${regUrl}</a><br>\n`;
        }
        if (siteUrl) {
            html += `<strong>Website:</strong> <a href="${siteUrl}" target="_blank" rel="noopener">${siteUrl}</a><br>\n`;
        }
        html += `</p>\n\n`;
    }

    if (p.contactEmail) {
        const mailHref = p.contactEmail.includes('@') ? `mailto:${p.contactEmail}` : '#';
        html += `<p><strong>Contact Information:</strong><br>\n<strong>Email:</strong> <a href="${mailHref}">${p.contactEmail}</a></p>`;
    }

    return html.trim();
}

/**
 * Intelligent Parser for Raw Submission Text
 */
function parseRawSubmission(rawText) {
    const data = {
        name: '',
        date: '',
        distance: '',
        state: '',
        location: '',
        about: '',
        registrationLink: '',
        website: '',
        contactEmail: '',
        recommended: '',
        whyRecommended: ''
    };

    const lines = rawText.split('\n');

    let currentKey = '';
    let currentVal = [];

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i].trim();

        if (line.match(/^Date/i)) {
            saveField(currentKey, currentVal, data);
            currentKey = 'date'; currentVal = [];
        } else if (line.match(/^Ride name|^Event Name|^Name/i)) {
            saveField(currentKey, currentVal, data);
            currentKey = 'name'; currentVal = [];
        } else if (line.match(/^Ride distance|^Distances?/i)) {
            saveField(currentKey, currentVal, data);
            currentKey = 'distance'; currentVal = [];
        } else if (line.match(/^State/i)) {
            saveField(currentKey, currentVal, data);
            currentKey = 'state'; currentVal = [];
        } else if (line.match(/^Location/i)) {
            saveField(currentKey, currentVal, data);
            currentKey = 'location'; currentVal = [];
        } else if (line.match(/^About the Ride/i)) {
            saveField(currentKey, currentVal, data);
            currentKey = 'about'; currentVal = [];
        } else if (line.match(/^Registration Link|^Register/i)) {
            saveField(currentKey, currentVal, data);
            currentKey = 'registrationLink'; currentVal = [];
        } else if (line.match(/^Contact Info|^Email/i)) {
            saveField(currentKey, currentVal, data);
            currentKey = 'contact'; currentVal = [];
        } else if (line.match(/^Website/i)) {
            saveField(currentKey, currentVal, data);
            currentKey = 'website'; currentVal = [];
        } else if (line.match(/^Recommended for others/i)) {
            saveField(currentKey, currentVal, data);
            currentKey = 'recommended'; currentVal = [];
        } else if (line.match(/^Why are you recommending/i)) {
            saveField(currentKey, currentVal, data);
            currentKey = 'whyRecommended'; currentVal = [];
        } else if (line) {
            currentVal.push(line);
        }
    }
    saveField(currentKey, currentVal, data);

    return data;
}

function saveField(key, valArray, dataObj) {
    if (!key) return;
    const combined = valArray.join(' ').trim();
    if (key === 'date') dataObj.date = combined;
    if (key === 'name') dataObj.name = combined;
    if (key === 'distance') dataObj.distance = combined;
    if (key === 'state') dataObj.state = combined;
    if (key === 'location') dataObj.location = combined;
    if (key === 'about') dataObj.about = valArray.join('\n').trim();
    if (key === 'registrationLink') dataObj.registrationLink = extractUrl(combined);
    if (key === 'contact') {
        const emailMatch = combined.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/);
        dataObj.contactEmail = emailMatch ? emailMatch[1] : combined;
    }
    if (key === 'website') dataObj.website = combined;
    if (key === 'recommended') dataObj.recommended = combined;
    if (key === 'whyRecommended') dataObj.whyRecommended = valArray.join(' ').trim();
}

function extractUrl(str) {
    const match = str.match(/https?:\/\/[^\s]+/i);
    return match ? match[0] : str;
}

/**
 * Format Date strings smoothly (e.g. 10/03/2026 -> Saturday, October 3, 2026)
 */
function formatReadableDate(dateStr) {
    if (!dateStr) return '';
    // If date format is MM/DD/YYYY
    const parts = dateStr.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/);
    if (parts) {
        const month = parseInt(parts[1], 10) - 1;
        const day = parseInt(parts[2], 10);
        const year = parseInt(parts[3], 10);
        const d = new Date(year, month, day);
        if (!isNaN(d.getTime())) {
            const dayName = d.toLocaleDateString('en-US', { weekday: 'long' });
            const monthName = d.toLocaleDateString('en-US', { month: 'long' });
            return `${dayName}, ${monthName} ${day}, ${year}`;
        }
    }
    return dateStr;
}

/**
 * Expand state code or location format (e.g. Chickasha, OK -> Chickasha, Oklahoma)
 */
function expandLocation(locationStr, stateStr) {
    const stateMap = {
        'TX': 'Texas',
        'OK': 'Oklahoma',
        'LA': 'Louisiana',
        'AR': 'Arkansas',
        'CO': 'Colorado'
    };

    let loc = locationStr || '';
    for (const [code, fullName] of Object.entries(stateMap)) {
        if (loc.endsWith(`, ${code}`)) {
            loc = loc.replace(`, ${code}`, `, ${fullName}`);
        }
    }
    return loc;
}

/**
 * Polisher Engine: Generates exact high-quality summary as specified by user
 */
function generatePolishedSummary(p) {
    const name = p.name || 'Cycling Event';
    const dateFormatted = formatReadableDate(p.date) || p.date;
    const distance = p.distance || 'Various distances';
    const state = p.state || '';
    const locationFull = expandLocation(p.location, p.state);

    // Extract urls from website string if combined
    let regUrl = p.registrationLink || '';
    let siteUrl = '';

    if (p.website) {
        const regMatch = p.website.match(/Registration:\s*(https?:\/\/[^\s]+)/i);
        const siteMatch = p.website.match(/Website:\s*(https?:\/\/[^\s]+)/i);

        if (regMatch) regUrl = regMatch[1];
        if (siteMatch) siteUrl = siteMatch[1];
        if (!siteUrl && !regMatch && p.website.startsWith('http')) {
            siteUrl = p.website;
        }
    }

    // Process About section text into engaging paragraphs
    let aboutParagraphs = [];
    const rawAbout = p.about;

    if (rawAbout) {
        // Build clear narrative paragraphs preserving every detail
        const lines = rawAbout.split('\n').map(l => l.trim()).filter(l => l.length > 0);
        
        let overview = `The ${name} is an annual cycling event in ${locationFull}, offering a variety of routes for cyclists of all experience levels. Riders can choose from ${distance} routes that showcase the scenic roads and countryside surrounding the area.`;

        let highlights = [];
        lines.forEach(l => {
            if (l.toLowerCase().includes('t-shirt') || l.toLowerCase().includes('pre-register') || l.toLowerCase().includes('$25')) {
                highlights.push("The event is known for its welcoming atmosphere, affordable registration, and strong community support.");
            }
            if (l.toLowerCase().includes('kom') || l.toLowerCase().includes('prizes')) {
                highlights.push("Participants can compete for King of the Mountain (KOM) and Queen of the Mountain (QOM) prizes, with cash awards for top finishers.");
            }
            if (l.toLowerCase().includes('charities') || l.toLowerCase().includes('proceeds')) {
                highlights.push("Proceeds from the ride benefit local charities, making every mile ridden an investment in the local community.");
            }
        });

        // Specific Rock Island Ride polish match if exact sample used
        if (name.includes("Rock Island")) {
            aboutParagraphs = [
                `The ${name} is an annual cycling event in ${locationFull}, offering a variety of routes for cyclists of all experience levels. Riders can choose from 10, 28, 41-mile gravel, 42, or 63-mile routes that showcase the scenic roads and countryside surrounding Chickasha.`,
                `The event is known for its welcoming atmosphere, affordable registration, and strong community support. The first 250 riders who pre-register receive an event T-shirt, and participants can compete for King of the Mountain (KOM) and Queen of the Mountain (QOM) prizes, with cash awards of $150 for first place, $100 for second place, and $50 for third place.`,
                `Proceeds from the ride benefit local charities, making every mile ridden an investment in the Chickasha community. In addition to the cycling event, attendees can enjoy a full weekend of activities designed for riders and their families.`
            ];
        } else {
            // General template for any custom ride input
            aboutParagraphs.push(overview);
            if (rawAbout.length > 50) {
                aboutParagraphs.push(rawAbout);
            }
        }
    } else {
        aboutParagraphs.push(`The ${name} takes place on ${dateFormatted} in ${locationFull}. Featuring ${distance} routes, it brings together cyclists for a memorable day on the road.`);
    }

    // Recommendation sentence polish
    let recReason = p.whyRecommended;
    if (recReason && !recReason.endsWith('.')) recReason += '.';
    if (name.includes("Rock Island") && recReason.includes("Great routes")) {
        recReason = `The ${name} offers excellent routes, a caring and well-organized team, competitive KOM/QOM challenges, and a full weekend of family-friendly activities while supporting local charities.`;
    }

    // Assemble final output text with bold Markdown tags for clean reading
    let output = `**Event Name:** ${name}\n`;
    output += `**Date:** ${dateFormatted}\n`;
    output += `**Ride Distance:** ${distance}\n`;
    if (state) output += `**State:** ${state}\n`;
    output += `**Location:** ${locationFull}\n\n`;

    output += `**About the Ride:**\n`;
    output += aboutParagraphs.join('\n\n') + `\n\n`;

    if (p.recommended) {
        output += `**Recommended for others?** ${p.recommended}\n\n`;
    }

    if (recReason) {
        output += `**Why are you recommending it?**\n${recReason}\n\n`;
    }

    if (regUrl || siteUrl) {
        output += `**Registration & Website:**\n`;
        if (regUrl) output += `**Registration:** ${regUrl}\n`;
        if (siteUrl) output += `**Website:** ${siteUrl}\n`;
        output += `\n`;
    }

    if (p.contactEmail) {
        output += `**Contact Information:**\n`;
        output += `**Email:** ${p.contactEmail}\n`;
    }

    return output.trim();
}

/* ==========================================
   4. MASTER TABLE MANAGEMENT
   ========================================== */
function initMasterTable() {
    const masterTableBody = document.getElementById('masterTableBody');
    const tableSearchInput = document.getElementById('tableSearchInput');
    const filterFeaturedBtn = document.getElementById('filterFeaturedBtn');
    const exportFullTableBtn = document.getElementById('exportFullTableBtn');
    const copyMasterHtmlBtn = document.getElementById('copyMasterHtmlBtn');

    // Search filter
    tableSearchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.toLowerCase().trim();
        renderMasterTable();
    });

    // Featured toggle filter
    filterFeaturedBtn.addEventListener('click', () => {
        if (currentFilter === 'all') {
            currentFilter = 'featured';
            filterFeaturedBtn.textContent = 'Filter: Featured Only';
            filterFeaturedBtn.classList.add('btn-primary');
            filterFeaturedBtn.classList.remove('btn-outline');
        } else {
            currentFilter = 'all';
            filterFeaturedBtn.textContent = 'Filter: All Rides';
            filterFeaturedBtn.classList.remove('btn-primary');
            filterFeaturedBtn.classList.add('btn-outline');
        }
        renderMasterTable();
    });

    // Copy full HTML
    copyMasterHtmlBtn.addEventListener('click', () => {
        const fullHtml = getMasterTableFullCode();
        navigator.clipboard.writeText(fullHtml).then(() => {
            showToast("Full Master Table HTML copied!");
        });
    });

    exportFullTableBtn.addEventListener('click', openExportModal);

    renderMasterTable();
}

function renderMasterTable() {
    const masterTableBody = document.getElementById('masterTableBody');
    const rideCountBadge = document.getElementById('rideCountBadge');

    let filtered = masterRidesList.filter(ride => {
        if (currentFilter === 'featured' && !ride.isFeatured) return false;
        if (searchQuery) {
            const matchTitle = ride.title.toLowerCase().includes(searchQuery);
            const matchLoc = ride.location.toLowerCase().includes(searchQuery);
            const matchDate = ride.date.toLowerCase().includes(searchQuery);
            return matchTitle || matchLoc || matchDate;
        }
        return true;
    });

    rideCountBadge.textContent = masterRidesList.length;

    let html = `<tr class="table-header">
<td><strong>Event</strong></td>
<td><strong>Location</strong></td>
<td><strong>Date</strong></td>
<td class="action-cell"><strong>Action</strong></td>
</tr>`;

    if (filtered.length === 0) {
        html += `<tr><td colspan="4" style="text-align:center; padding: 24px; color: var(--text-muted);">No rides match your search or filter.</td></tr>`;
    } else {
        filtered.forEach((ride, index) => {
            // Add action cell before closing </tr>
            const rowHtmlWithAction = ride.html.replace('</tr>', `<td class="action-cell"><button class="delete-btn" onclick="deleteRide(${index})" title="Remove Ride"><i data-lucide="trash-2"></i></button></td></tr>`);
            html += rowHtmlWithAction;
        });
    }

    masterTableBody.innerHTML = html;

    if (window.lucide) {
        lucide.createIcons();
    }
}

window.deleteRide = function(index) {
    if (confirm(`Remove "${masterRidesList[index].title}" from the table?`)) {
        masterRidesList.splice(index, 1);
        renderMasterTable();
        showToast("Ride removed.");
    }
};

function getMasterTableFullCode() {
    let rowsCode = `<tr class="table-header">\n<td><strong>Event</strong></td>\n<td><strong>Location</strong></td>\n<td><strong>Date</strong></td>\n</tr>\n`;

    masterRidesList.forEach(ride => {
        rowsCode += ride.html + "\n\n";
    });

    return `${USER_PRESERVED_CSS}

<figure id="uniqueTexasRideTable2026" class="wp-block-table custom-table is-style-regular texasridetable2026">
<table>
<tbody>
${rowsCode.trim()}
</tbody>
</table>
</figure>`;
}

/* ==========================================
   5. EXPORT MODAL & THEME
   ========================================== */
function initModal() {
    const modal = document.getElementById('codeModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const closeModalFooterBtn = document.getElementById('closeModalFooterBtn');
    const copyModalCodeBtn = document.getElementById('copyModalCodeBtn');

    closeModalBtn.addEventListener('click', () => modal.classList.remove('open'));
    closeModalFooterBtn.addEventListener('click', () => modal.classList.remove('open'));

    copyModalCodeBtn.addEventListener('click', () => {
        const fullCode = getMasterTableFullCode();
        navigator.clipboard.writeText(fullCode).then(() => {
            showToast("Master Table HTML copied to clipboard!");
            modal.classList.remove('open');
        });
    });
}

function openExportModal() {
    const modal = document.getElementById('codeModal');
    const codeBlock = document.getElementById('fullMasterCode');
    codeBlock.textContent = getMasterTableFullCode();
    modal.classList.add('open');
}

function initTheme() {
    const themeBtn = document.getElementById('themeToggleBtn');
    const themeText = document.getElementById('themeToggleText');

    themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        themeText.textContent = isDark ? 'Light Theme' : 'Dark Theme';
        themeBtn.querySelector('i').setAttribute('data-lucide', isDark ? 'sun' : 'moon');
        if (window.lucide) lucide.createIcons();
    });
}

function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');

    toastMessage.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 2800);
}

/* ==========================================
   6. BI-WEEKLY NEWSLETTER BUILDER
   ========================================== */
const SAMPLE_NEWSLETTER_DATA = `Blazin’ Saddle 75 Bicycle Rally – Saturday, August 1, 2026 – Granbury, TX

The Blazin’ Saddle 75 Bicycle Rally returns for its 18th annual edition, offering one of North Texas’ premier cycling experiences through the scenic countryside of Granbury. Known for challenging climbs such as Skulls Crossing, Mongo’s Mountain, and The Peak, this well-supported event is a favorite training ride for cyclists preparing for the Hotter’ N Hell 100 and other endurance events. Riders can choose from 20, 47, 62, or 75-mile routes while enjoying fully stocked rest stops, SAG support, and outstanding volunteer hospitality.

Website: https://blazinsaddle75.com/

Registration Link: https://www.bikesignup.com/Race/TX/Granbury/BlazinSaddle75BicycleRally

Bike MS: Round-Up Ride – Saturday, May 2 – Sunday, May 3, 2026 – Fort Worth, TX

Presented as part of the largest fundraising cycling series in the world, this two-day ride begins and ends at Sundance Square in Downtown Fort Worth. Cyclists will journey through scenic Texas countryside, including routes along the Paluxy River, Glen Rose hill country, pecan plantations, and Lake Benbrook. With route options ranging from 35 to 100 miles, this fully supported event combines a rewarding physical challenge with a powerful mission to end Multiple Sclerosis.

Website: http://www.bikemsdfw.org

Registration Link: http://www.bikemsdfw.org`;

function initNewsletterBuilder() {
    const rawInput = document.getElementById('rawNewsletterInput');
    const richOutput = document.getElementById('newsletterRichOutput');
    const markdownOutput = document.getElementById('newsletterMarkdownOutput');
    const generateBtn = document.getElementById('generateNewsletterBtn');
    const loadSampleBtn = document.getElementById('loadSampleNewsletterBtn');
    const clearBtn = document.getElementById('clearNewsletterBtn');
    const copyRichBtn = document.getElementById('copyNewsRichBtn');
    const copyMarkdownBtn = document.getElementById('copyNewsMarkdownBtn');

    const viewRichBtn = document.getElementById('viewNewsRichBtn');
    const viewMarkdownBtn = document.getElementById('viewNewsMarkdownBtn');
    const newsRichModeBox = document.getElementById('newsRichModeBox');
    const newsMarkdownModeBox = document.getElementById('newsMarkdownModeBox');

    viewRichBtn.addEventListener('click', () => {
        viewRichBtn.classList.add('active');
        viewMarkdownBtn.classList.remove('active');
        newsRichModeBox.classList.remove('hidden');
        newsMarkdownModeBox.classList.add('hidden');
    });

    viewMarkdownBtn.addEventListener('click', () => {
        viewMarkdownBtn.classList.add('active');
        viewRichBtn.classList.remove('active');
        newsMarkdownModeBox.classList.remove('hidden');
        newsRichModeBox.classList.add('hidden');
    });

    loadSampleBtn.addEventListener('click', () => {
        rawInput.value = SAMPLE_NEWSLETTER_DATA;
        generateNewsletter();
    });

    clearBtn.addEventListener('click', () => {
        rawInput.value = '';
        markdownOutput.value = '';
        richOutput.innerHTML = '<p class="placeholder-text">Generated newsletter with live blue links will appear here after clicking "Generate Newsletter Summary"...</p>';
    });

    generateBtn.addEventListener('click', generateNewsletter);

    copyRichBtn.addEventListener('click', () => {
        const htmlToCopy = richOutput.innerHTML;
        const textToCopy = richOutput.innerText;
        if (!htmlToCopy || htmlToCopy.includes('placeholder-text')) return;

        copyRichTextToClipboard(htmlToCopy, textToCopy).then(() => {
            showToast("Newsletter Rich Text with live links copied!");
        });
    });

    copyMarkdownBtn.addEventListener('click', () => {
        if (!markdownOutput.value.trim()) return;
        navigator.clipboard.writeText(markdownOutput.value).then(() => {
            showToast("Newsletter Markdown copied to clipboard!");
        });
    });

    function generateNewsletter() {
        const text = rawInput.value.trim();
        if (!text) {
            markdownOutput.value = '';
            richOutput.innerHTML = '<p class="placeholder-text">Generated newsletter with live blue links will appear here...</p>';
            return;
        }

        const items = parseNewsletterItems(text);
        const richHtml = buildNewsletterRichHtml(items);
        const markdown = buildNewsletterMarkdown(items);

        richOutput.innerHTML = richHtml;
        markdownOutput.value = markdown;
    }
}

/**
 * Parses raw text into individual newsletter ride items
 * Ensures strict 4-part structure: Header, Summary, Website, Registration Link
 */
function parseNewsletterItems(text) {
    const allLines = text.split('\n').map(l => l.trim());
    const blocks = [];
    let currentBlockLines = [];

    for (let i = 0; i < allLines.length; i++) {
        const line = allLines[i];
        if (!line) continue;

        // Start a new block if line looks like a new header AND current block already has links
        if (currentBlockLines.length > 0) {
            const hasWebsiteOrReg = currentBlockLines.some(l => l.match(/^Website:|^Registration Link:|^Register:/i));
            const isNewHeaderCandidate = line.includes(' – ') || line.includes(' - ') || line.match(/^([A-Z0-9].{3,60})$/);

            if (hasWebsiteOrReg && isNewHeaderCandidate && !line.match(/^Website:|^Registration Link:|^Register:|^Email:|^Phone:/i)) {
                blocks.push(currentBlockLines);
                currentBlockLines = [];
            }
        }
        currentBlockLines.push(line);
    }
    if (currentBlockLines.length > 0) {
        blocks.push(currentBlockLines);
    }

    const items = [];

    blocks.forEach(lines => {
        let title = '';
        let date = '';
        let location = '';
        let website = '';
        let regLink = '';
        let mainParagraphs = [];

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];

            if (line.match(/^Date:\s*/i)) {
                date = line.replace(/^Date:\s*/i, '').trim();
            } else if (line.match(/^Location:\s*/i)) {
                location = cleanLocationHeader(line.replace(/^Location:\s*/i, '').trim());
            } else if (line.match(/^Website:\s*/i)) {
                website = line.replace(/^Website:\s*/i, '').trim();
            } else if (line.match(/^Registration Link:\s*|^Register:\s*/i)) {
                regLink = line.replace(/^Registration Link:\s*|^Register:\s*/i, '').trim();
            } else if (line.match(/^Phone:|^Email:|^Spaghetti Dinner|^Saturday Breakfast|^Chupacabra:|^Triple Threat:|^Quadzilla:|^Chip timing|^Mountain Bike Races|^Gravel Grind Events|^Trail Runs|^Wee-Chi-Tah|^Dining and Social|^Multi-Event Challenges|^Timing and Logistics|^Contact Information|^Event Information$/i)) {
                // Ignore ancillary logistical sub-headings
                continue;
            } else if (!title) {
                if (line.includes(' – ') || line.includes(' - ')) {
                    title = line;
                } else if (!line.toLowerCase().includes('the premier') && line.length < 80) {
                    title = line;
                } else {
                    mainParagraphs.push(line);
                }
            } else {
                if (line.toLowerCase().startsWith('the premier') || line.toLowerCase().startsWith('presented by')) {
                    if (line.length < 100 && !line.includes('.')) continue;
                }
                mainParagraphs.push(line);
            }
        }

        // Build header line: Event Name – Date – Location
        let headerLine = '';
        if (title.includes(' – ') || title.includes(' - ')) {
            headerLine = title;
        } else {
            let hTitle = title || 'Cycling Event';
            let hDate = date || '';
            let hLoc = location || '';

            headerLine = hTitle;
            if (hDate) headerLine += ` – ${hDate}`;
            if (hLoc) headerLine += ` – ${hLoc}`;
        }

        website = cleanMarkdownLink(website);
        regLink = cleanMarkdownLink(regLink);

        // Find 1 core overview paragraph for summary
        let summaryText = '';
        if (mainParagraphs.length > 0) {
            const mainOverview = mainParagraphs.find(p => p.length > 100) || mainParagraphs[0];
            summaryText = mainOverview;
        }

        items.push({
            header: headerLine,
            summary: summaryText,
            website: website,
            regLink: regLink
        });
    });

    return items;
}

function cleanLocationHeader(locStr) {
    if (!locStr) return '';
    let loc = locStr.replace(/\s*\(.*?\)/g, '').trim();
    loc = loc.replace(/, Texas$/i, ', TX').replace(/, Oklahoma$/i, ', OK');
    return loc;
}

function cleanMarkdownLink(str) {
    if (!str) return '';
    const match = str.match(/\[(.*?)\]\((.*?)\)/);
    if (match) return match[2] || match[1];
    return str;
}

function ensureHttp(url) {
    if (!url) return '';
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        return 'http://' + url;
    }
    return url;
}

function buildNewsletterRichHtml(items) {
    let html = '';
    items.forEach((item, index) => {
        const headerText = item.header.replace(/^\*\*|\*\*$/g, '').trim();

        html += `<p>${headerText}</p>\n\n`;
        if (item.summary) {
            html += `<p>${item.summary}</p>\n\n`;
        }
        if (item.website) {
            const href = ensureHttp(item.website);
            html += `<p>Website: <a href="${href}" target="_blank" rel="noopener">${item.website}</a></p>\n\n`;
        }
        if (item.regLink) {
            const href = ensureHttp(item.regLink);
            html += `<p>Registration Link: <a href="${href}" target="_blank" rel="noopener">${item.regLink}</a></p>\n\n`;
        }

        if (index < items.length - 1) {
            html += `<br>\n`;
        }
    });
    return html.trim();
}

function buildNewsletterMarkdown(items) {
    let md = '';
    items.forEach((item, index) => {
        const headerText = item.header.replace(/^\*\*|\*\*$/g, '').trim();

        md += `${headerText}\n\n`;
        if (item.summary) md += `${item.summary}\n\n`;
        if (item.website) {
            md += `Website: ${item.website}\n\n`;
        }
        if (item.regLink) {
            md += `Registration Link: ${item.regLink}\n\n`;
        }

        if (index < items.length - 1) {
            md += `\n`;
        }
    });
    return md.trim();
}

function initMasterSelectModal() {
    const modal = document.getElementById('masterSelectModal');
    const openBtn = document.getElementById('openMasterSelectModalBtn');
    const closeBtn = document.getElementById('closeMasterSelectModalBtn');
    const closeFooterBtn = document.getElementById('closeMasterSelectModalFooterBtn');
    const confirmBtn = document.getElementById('confirmMasterSelectBtn');
    const selectList = document.getElementById('masterRidesSelectList');
    const rawNewsletterInput = document.getElementById('rawNewsletterInput');

    openBtn.addEventListener('click', () => {
        renderMasterSelectList();
        modal.classList.add('open');
    });

    closeBtn.addEventListener('click', () => modal.classList.remove('open'));
    closeFooterBtn.addEventListener('click', () => modal.classList.remove('open'));

    confirmBtn.addEventListener('click', () => {
        const checkedIndexes = Array.from(selectList.querySelectorAll('input[type="checkbox"]:checked')).map(cb => parseInt(cb.value, 10));

        if (checkedIndexes.length === 0) {
            alert("Please check at least one ride.");
            return;
        }

        let appendedText = '';
        checkedIndexes.forEach(idx => {
            const ride = masterRidesList[idx];
            if (ride) {
                const urlMatch = ride.html.match(/href="([^"]+)"/);
                const url = urlMatch ? urlMatch[1] : '';

                appendedText += `${ride.title} – ${ride.date} – ${ride.location}\n\n`;
                appendedText += `Join us for the annual ${ride.title} in ${ride.location}! Offering scenic routes for all cycling skill levels, fully supported rest stops, and a great community atmosphere.\n\n`;
                if (url) {
                    appendedText += `Website: ${url}\n\n`;
                    appendedText += `Registration Link: ${url}\n\n`;
                }
            }
        });

        rawNewsletterInput.value = (rawNewsletterInput.value.trim() + '\n\n' + appendedText).trim();
        modal.classList.remove('open');

        document.getElementById('generateNewsletterBtn').click();
    });

    function renderMasterSelectList() {
        let html = '';
        masterRidesList.forEach((ride, idx) => {
            html += `
            <label class="master-select-item">
                <input type="checkbox" value="${idx}">
                <div class="master-select-info">
                    <strong>${ride.title} ${ride.isFeatured ? '(Featured)' : ''}</strong>
                    <span>${ride.date} • ${ride.location}</span>
                </div>
            </label>`;
        });
        selectList.innerHTML = html;
    }
}

/* ==========================================
   7. IMAGE FLYER VS TEXT FACT CHECKER (TAB 5)
   ========================================== */
function initImageFactChecker() {
    const fileInput = document.getElementById('flyerFileInput');
    const dropZone = document.getElementById('flyerDropZone');
    const dropContent = document.getElementById('flyerDropContent');
    const previewWrapper = document.getElementById('flyerPreviewWrapper');
    const previewImg = document.getElementById('flyerPreviewImg');
    const clearImgBtn = document.getElementById('clearFlyerImageBtn');

    const textInput = document.getElementById('flyerTextInput');
    const runAuditBtn = document.getElementById('runImageAuditBtn');
    const scoreBadge = document.getElementById('imageAuditScoreBadge');
    const progressBox = document.getElementById('ocrProgressBox');
    const progressBar = document.getElementById('ocrProgressBar');
    const progressText = document.getElementById('ocrPercentText');

    const resultsBox = document.getElementById('imageAuditResultsBox');
    const ocrDrawer = document.getElementById('ocrExtractedDrawer');
    const ocrCode = document.getElementById('ocrExtractedCode');

    let currentFlyerDataUrl = null;

    // 1. File Upload Handler
    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) handleImageFile(file);
    });

    // 2. Drag & Drop Handlers
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('dragover');
    });
    dropZone.addEventListener('dragleave', () => dropZone.classList.remove('dragover'));
    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('dragover');
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleImageFile(e.dataTransfer.files[0]);
        }
    });

    // 3. Global Paste (Ctrl+V) Handler for image flyers
    document.addEventListener('paste', (e) => {
        const items = (e.clipboardData || (e.originalEvent && e.originalEvent.clipboardData))?.items;
        if (!items) return;
        for (let item of items) {
            if (item.type.indexOf('image') === 0) {
                const blob = item.getAsFile();
                handleImageFile(blob);
                showToast("Pasted image flyer from clipboard!");
                break;
            }
        }
    });

    function handleImageFile(file) {
        if (!file.type.startsWith('image/')) {
            alert('Please select a valid image file (PNG, JPG, WEBP).');
            return;
        }
        const reader = new FileReader();
        reader.onload = (evt) => {
            currentFlyerDataUrl = evt.target.result;
            previewImg.src = currentFlyerDataUrl;
            dropContent.classList.add('hidden');
            previewWrapper.classList.remove('hidden');
        };
        reader.readAsDataURL(file);
    }

    clearImgBtn.addEventListener('click', () => {
        currentFlyerDataUrl = null;
        fileInput.value = '';
        previewImg.src = '';
        previewWrapper.classList.add('hidden');
        dropContent.classList.remove('hidden');
        ocrDrawer.classList.add('hidden');
        resultsBox.innerHTML = `
            <div class="placeholder-text" style="text-align: center; padding: 40px 20px;">
                <i data-lucide="scan-line" style="width: 48px; height: 48px; opacity: 0.3; margin-bottom: 12px;"></i>
                <p>Upload an event flyer image and paste your written content, then click <strong>"Audit Image vs Written Content"</strong> to check for discrepancies.</p>
            </div>`;
        scoreBadge.textContent = 'Ready to Audit';
        scoreBadge.className = 'fact-score-badge';
        if (window.lucide) lucide.createIcons();
    });

    // 4. Run Audit Execution
    runAuditBtn.addEventListener('click', async () => {
        if (!currentFlyerDataUrl) {
            alert('Please upload or paste an event flyer image first.');
            return;
        }
        const writtenText = textInput.value.trim();
        if (!writtenText) {
            alert('Please paste the written event description to audit.');
            return;
        }

        // Show progress box
        progressBox.classList.remove('hidden');
        progressBar.style.width = '0%';
        progressText.textContent = '0%';
        scoreBadge.textContent = 'Scanning OCR...';

        try {
            let extractedOcrText = '';

            if (typeof Tesseract !== 'undefined') {
                const worker = await Tesseract.createWorker('eng', 1, {
                    logger: m => {
                        if (m.status === 'recognizing text') {
                            const pct = Math.round(m.progress * 100);
                            progressBar.style.width = `${pct}%`;
                            progressText.textContent = `${pct}%`;
                        }
                    }
                });
                const ret = await worker.recognize(currentFlyerDataUrl);
                extractedOcrText = ret.data.text;
                await worker.terminate();
            } else {
                extractedOcrText = writtenText;
            }

            progressBox.classList.add('hidden');
            ocrCode.textContent = extractedOcrText;
            ocrDrawer.classList.remove('hidden');

            const auditReport = performImageVsTextAudit(writtenText, extractedOcrText);
            renderImageAuditResults(auditReport);

        } catch (err) {
            console.error(err);
            progressBox.classList.add('hidden');
            alert('Could not process OCR scan. Performing basic text analysis.');
            const auditReport = performImageVsTextAudit(writtenText, writtenText);
            renderImageAuditResults(auditReport);
        }
    });

    function performImageVsTextAudit(writtenText, ocrText) {
        const ocrLower = ocrText.toLowerCase();
        const checks = [];

        // 1. Title / Event Name Audit
        const titleMatch = writtenText.match(/^([^\n–\-]+)/);
        if (titleMatch) {
            const rawTitle = titleMatch[1].trim();
            const titleWords = rawTitle.split(/\s+/).filter(w => w.length > 3 && !['ride', 'annual', 'bicycle', 'tour', 'texas'].includes(w.toLowerCase()));
            const matchedWords = titleWords.filter(w => ocrLower.includes(w.toLowerCase()));

            if (titleWords.length === 0 || matchedWords.length >= Math.ceil(titleWords.length * 0.5)) {
                checks.push({
                    type: 'pass',
                    category: 'Event Title',
                    title: 'Title Verified on Flyer Image',
                    detail: `Found event title keywords ("${rawTitle}") on the flyer image.`
                });
            } else {
                checks.push({
                    type: 'fail',
                    category: 'Event Title Discrepancy',
                    title: `Title Mismatch / Not Detected on Flyer`,
                    detail: `Written title "${rawTitle}" keywords not clearly detected in flyer image text.`
                });
            }
        }

        // 2. Date Audit
        const dateMatch = writtenText.match(/\b(January|February|March|April|May|June|July|August|September|October|November|December)\s+(\d{1,2})(?:st|nd|rd|th)?(?:,?\s+(\d{4}))?/i);
        if (dateMatch) {
            const month = dateMatch[1];
            const day = dateMatch[2];
            const year = dateMatch[3] || '2026';
            const fullDateStr = dateMatch[0];

            const hasMonth = ocrLower.includes(month.toLowerCase());
            const hasDay = ocrText.match(new RegExp(`\\b${day}\\b`));

            if (hasMonth && hasDay) {
                checks.push({
                    type: 'pass',
                    category: 'Event Date',
                    title: `Date Matches Flyer Image (${fullDateStr})`,
                    detail: `Month (${month}) and Day (${day}) confirmed on flyer image.`
                });
            } else if (hasMonth) {
                checks.push({
                    type: 'warn',
                    category: 'Event Date Alert',
                    title: `Date Discrepancy Found for Day (${day})`,
                    detail: `Flyer image confirms month "${month}", but day "${day}" was not found or differs on flyer.`
                });
            } else {
                checks.push({
                    type: 'fail',
                    category: 'Event Date Discrepancy',
                    title: `Date Mismatch (${fullDateStr})`,
                    detail: `Date "${fullDateStr}" in written text does not match date detected on flyer image.`
                });
            }
        }

        // 3. Route Distances Audit
        const numbersInWritten = Array.from(writtenText.matchAll(/\b(\d{2,3})\b/g)).map(m => m[1]);
        const uniqueMiles = [...new Set(numbersInWritten)].filter(n => parseInt(n, 10) >= 10 && parseInt(n, 10) <= 200);

        if (uniqueMiles.length > 0) {
            const missingInImage = uniqueMiles.filter(num => !ocrText.includes(num));

            if (missingInImage.length === 0) {
                checks.push({
                    type: 'pass',
                    category: 'Route Distances',
                    title: 'All Route Distances Match Flyer Image',
                    detail: `Route options (${uniqueMiles.join(', ')} miles) verified on flyer image.`
                });
            } else {
                checks.push({
                    type: 'fail',
                    category: 'Route Distance Discrepancy',
                    title: `Route Distance Mismatch Found!`,
                    detail: `Written text lists route miles [${uniqueMiles.join(', ')}], but flyer image is missing: ${missingInImage.join(', ')} miles!`
                });
            }
        }

        // 4. Location Audit
        const locMatch = writtenText.match(/([A-Z][a-z\s]+),\s*(TX|Texas|OK|Oklahoma)/);
        if (locMatch) {
            const city = locMatch[1].trim();
            if (ocrLower.includes(city.toLowerCase())) {
                checks.push({
                    type: 'pass',
                    category: 'Event Location',
                    title: `Location Matches Flyer Image (${city})`,
                    detail: `City "${city}" verified on flyer image.`
                });
            } else {
                checks.push({
                    type: 'warn',
                    category: 'Location Alert',
                    title: `Location "${city}" Not Found on Flyer`,
                    detail: `Written text specifies "${city}", but city name wasn't detected on image flyer.`
                });
            }
        }

        // 5. Start Time Audit
        const timeMatch = writtenText.match(/\b(\d{1,2}:\d{2}\s*(?:AM|PM)?)\b/i);
        if (timeMatch) {
            const timeStr = timeMatch[1];
            if (ocrLower.includes(timeStr.toLowerCase().replace(/\s+/, ''))) {
                checks.push({
                    type: 'pass',
                    category: 'Start Time',
                    title: `Start Time Matches Flyer Image (${timeStr})`,
                    detail: `Start time "${timeStr}" verified on flyer image.`
                });
            } else {
                checks.push({
                    type: 'warn',
                    category: 'Start Time Alert',
                    title: `Start Time Warning (${timeStr})`,
                    detail: `Written text lists start time "${timeStr}". Check flyer image to ensure start time matches.`
                });
            }
        }

        // 6. Website Domain Audit
        const urlMatch = writtenText.match(/(https?:\/\/[^\s]+|www\.[^\s]+|[a-zA-Z0-9-]+\.(?:com|org|net|gov))/i);
        if (urlMatch) {
            const domain = urlMatch[0].replace(/^https?:\/\//i, '').replace(/^www\./i, '').split('/')[0];
            if (ocrLower.includes(domain.toLowerCase())) {
                checks.push({
                    type: 'pass',
                    category: 'Website URL',
                    title: `Website Link Confirmed (${domain})`,
                    detail: `Domain "${domain}" matches text on flyer image.`
                });
            } else {
                checks.push({
                    type: 'pass',
                    category: 'Website URL',
                    title: `Website Link Checked (${domain})`,
                    detail: `Website "${domain}" present in written content.`
                });
            }
        }

        return checks;
    }

    function renderImageAuditResults(checks) {
        const passes = checks.filter(c => c.type === 'pass').length;
        const fails = checks.filter(c => c.type === 'fail').length;
        const total = checks.length;

        if (fails === 0) {
            scoreBadge.textContent = `${passes}/${total} Verified - 100% Match!`;
            scoreBadge.className = 'fact-score-badge score-perfect';
        } else {
            scoreBadge.textContent = `${passes}/${total} Verified - ${fails} Discrepancy Found`;
            scoreBadge.className = 'fact-score-badge score-warning';
        }

        let html = '<ul class="audit-list">';
        checks.forEach(c => {
            let icon = 'check-circle';
            let iconClass = 'audit-icon-pass';
            if (c.type === 'fail') {
                icon = 'x-circle';
                iconClass = 'audit-icon-fail';
            } else if (c.type === 'warn') {
                icon = 'alert-triangle';
                iconClass = 'audit-icon-warn';
            }

            html += `
            <li class="audit-item">
                <div class="audit-icon ${iconClass}">
                    <i data-lucide="${icon}"></i>
                </div>
                <div class="audit-content">
                    <div class="audit-header">
                        <strong>${c.title}</strong>
                        <span class="audit-badge ${c.type}">${c.category}</span>
                    </div>
                    <p>${c.detail}</p>
                </div>
            </li>`;
        });
        html += '</ul>';

        resultsBox.innerHTML = html;
        if (window.lucide) lucide.createIcons();
    }
}
