## OOPJS Retail Rail

This JS Class provides an easy and flexible way to integrate a Retail Rail into any web page.

**link to project:** https://codepen.io/Woodenchops/pen/MWYgyaN

# example init 

```JS

    var rail = new RetailRail({
        parentContainer: '.wrapper-one', // el you wish to attach rail to
        title: 'New rail 1', // rail title text
        bodyText: 'We have a great offer - blah, blah, blah, blah, blah, blah, blah', // rail body text
        ctaText: 'BOOK NOW',  // CTA text
        ctaHref: 'https://www.google.com/', // Href for CTA
        extraClasses: ['MyTestClas', 'dark-orange'], // addition CSS classes [optional]
        positionFixed: false // position rail fixed to the bottom of the window [optional]
    });

```

if you want to change the colour of the retail rail - target this class and add your own colour.
Then in the JS, simply add your CSS class to the ```extraClasses``` array  

```CSS

.retail-rail.dark-orange {
  background: #d01524;
}

.retail-rail.your-custom-color {
  background: red;
}

```