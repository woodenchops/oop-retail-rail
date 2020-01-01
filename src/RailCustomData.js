import RetailRail from './RetailRailClass';
// create a new instance of the retail rail with custom data attr values

var body = document.querySelector('body');
var title = body.getAttribute('data-title'),
    text = body.getAttribute('data-text')
  
var railThree = new RetailRail({
  title: title,
  bodyText: text,
  extraClasses: ['dark-gray'],
  positionFixed: false // position rail fixed to the bottom of the window
});