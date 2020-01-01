import RetailRail from './RetailRailClass';


// create a new instance of the retail rail with hard coded values
  
export var railTwo = new RetailRail({
    parentContainer: '.wrapper-one',
    id: 'hard-coded-rail',
    title: 'Hard coded title',
    bodyText: 'We have a great offer - this rail came from the RetailRail init function in the main JS file - blah, blah, blah',
    ctaText: '',
    ctaHref: 'https://www.google.com/',
    extraClasses: ['MyTestClass', 'dark-orange'],
    aria_label_open: 'Retail Rail is open',
    aria_label_closed: 'Retail Rail is closed',
    positionFixed: true // position rail fixed to the bottom of the window
  });

