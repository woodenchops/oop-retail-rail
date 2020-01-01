## OOPJS Retail Rail

This JS Class provides an easy and flexible way to integrate a Retail Rail into any web page.

**link to project:** https://codepen.io/Woodenchops/pen/MWYgyaN

# example init 

With this approach, you can hard code the values into the retail rail, or you could store the values from the ACF custom fields into a custom data attr, and store that on an element. Then use JS to pull those values and store them in a variable

**Custom data attributes:**

Markup for the el that you'd attach the custom data attr to:

```php

$retailRailTitle = get_field('rail-title');

<div id="myEl" data-rail-title="<?php echo $retailRailTitle; ?>">

</div>

```

Using JS, grab the value of the custom data attr, and store it in the ```retailRailTitle``` variable - then use that value in the ```RetailRail``` init. 

```js

    var retailRailTitle = document.getElementById('myEl').getAttribute('data-rail-title');

    var rail = new RetailRail({
        parentContainer: '.wrapper-one', // el you wish to attach rail to
        title: retailRailTitle, // rail title text
        bodyText: 'We have a great offer - blah, blah, blah, blah, blah, blah, blah', // rail body text
        ctaText: 'BOOK NOW',  // CTA text
        ctaHref: 'https://www.google.com/', // Href for CTA
        extraClasses: ['MyTestClas', 'dark-orange'], // addition CSS classes [optional]
        positionFixed: false // position rail fixed to the bottom of the window [optional]
    });

```

**hard coded:**

```js


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

```css

.retail-rail.dark-orange {
  background: #d01524;
}

.retail-rail.your-custom-color {
  background: red;
}

```

You can also use the ```Fetch API``` to pull data from the ACF JSON - the below example pulls from Conrad Algarve site - a polyfill is required for IE 11 :( - other than that, you're good to go. Just provide an endpoint, and values for the different fields by using object dot notation to find the custom fields you're looking for. 

```js

// HELPER FUNCTION - parse response data into JSON
  
  function FetchRail(url) {
    return fetch(url)
    .then(function(res){ return res.json() })
    .catch(function(err) {return console.log('Something went wrong...', err)})
  }

// create new instance of the retail rail

  var algarveRail = FetchRail('https://www.conradalgarve.com/wp-json/acf/v3/pages/5')
  .then(function(res) {
    return new RetailRail({
      parentContainer: res.parentContainer,
      title: res.acf.new_split_panels[0].sh_title,
      bodyText: res.acf.new_split_panels[0].sh_usp[0].description,
      extraClasses: ['light-green'],
      positionFixed: true
    })
  })

```

**async/await method:**

```js

// ASYNC / AWAIT 

async function AsyncFetchRail(url) {
    //  await until fetch has completed to assign the 'response' variable
      const response = await fetch(url)
    // await until response has been parsed into json before assigning tge 'data' variable
      const data = await response.json();
    // return response data
      return data;
    }
    
    
  var asyncRail = AsyncFetchRail('data.json');
    asyncRail.then(function(res) {
    return new RetailRail({
        parentContainer: res[0].parentContainer,
        title: 'This rail was pulled from data.json, using async/await',
        bodyText: res[0].bodyText,
        ctaText: res[0].ctaText,
        ctaHref: res[0].ctaHref,
        extraClasses: ['pink']
      })
    });

```

You can also use the ```Publisher``` class to automatically publish and un-publish the rail. You simply provide the rail instance and use the ```getID()``` method, which will return the id attr that you provide on the rail instance ```id: 'hard-coded-rail'``` - you then set the publish and unpublish dates ```YYYYMMDD```


```js

var railTwo = new RetailRail({
    parentContainer: '.wrapper-one',
    id: 'hard-coded-rail',
    title: 'Hard coded title',
    bodyText: 'We have a great offer',
    ctaText: '',
    ctaHref: 'https://www.google.com/',
    extraClasses: ['MyTestClass', 'dark-orange'],
    aria_label_open: 'Retail Rail is open',
    aria_label_closed: 'Retail Rail is closed',
    positionFixed: true // position rail fixed to the bottom of the window
  });



var railTimer = new Publisher({
    rail: railTwo.getID(),
    publish_offer: '20191223',
    unpublish_offer:'20191227'
});

```