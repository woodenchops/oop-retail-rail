import RetailRail from './RetailRailClass';

// HELPER FUNCTION - parse response data into JSON

export function FetchRail(url) {
    return fetch(url)
    .then(function(res){ return res.json() })
    .catch(function(err) {return console.log('Something went wrong...', err)})
  }
  
  
  // create new rail from data.json
  
 export var dataJsonRail = FetchRail('./data.json')
  .then(function(res) {
    return new RetailRail({
      parentContainer: res[0].parentContainer,
      title: res[0].testTitle[0].sh_title,
      bodyText: res[0].bodyText,
      ctaText: res[0].ctaText,
      ctaHref: res[0].ctaHref,
    })
  })


  // // create new rail from algarve acf 

export var algarveRail = FetchRail('https://www.conradalgarve.com/wp-json/acf/v3/pages/5')
.then(function(res) {
  return new RetailRail({
    parentContainer: res.parentContainer,
    title: res.acf.new_split_panels[0].sh_title + ' - from algarve',
    bodyText: res.acf.new_split_panels[0].sh_usp[0].description + ' - blah, blah, blah, blah, blah',
    extraClasses: ['light-green']
  })
})
