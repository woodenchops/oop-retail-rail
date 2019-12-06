// class RetailRail {

//     constructor(props) {
//         this._parentContainer = document.querySelector(props.parentContainer);
//         this._rail = document.createElement('div');
//         this._rail.classList.add('retail-rail');
//         this._rail.innerHTML = `<div class="content-wrap">
//                                 <div class="text-container retail-rail__child">
//                                     <h3 class="retail-rail__title"></h3>
//                                     <p class="retail-rail__body-text"></p>
//                                 </div>
//                                     <a href="#" role="button" tabindex="0" aria-label="find out more link" class="retail-rail__child retail-rail__cta"></a>
//                                     <img src="close_white.svg" alt="" class="retail-rail__close icon-close" tabindex="0" aria-label="close">
//                                 </div>`;

//         this._close = this._rail.querySelector('.retail-rail__close');
//         this.title = props.title || "boaby";
//         this.bodyText = props.bodyText || "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati, earum dolores! Molestiae earum dolores! Molestiae";
//         this.ctaText = props.ctaText || "LEARN MORE";
//         this.ctaHref = props.ctaHref || "#";
//         this.extraClasses = props.extraClasses || null;

//         if(this.extraClasses) {
//             this.extraClasses.forEach(classname => {
//                 this._rail.classList.add(classname);
//             });
//         }

//         this._close.addEventListener('click', () => {
//             this.closeRail();
//         });



//         this.appendRail();
//     }


//     appendRail() {
//         this._parentContainer.appendChild(this._rail);
//     }

//     removeRail() {
//         this._parentContainer.removeChild(this._rail);
//     }

//     set title(val){
//         this._rail.querySelector('.retail-rail__title').innerHTML = val;
//     }

//     get title(){
//         return this._rail.querySelector('.retail-rail__title').innerHTML;
//     }

//     set bodyText(val) {
//         this._rail.querySelector('.retail-rail__body-text').innerHTML = val;
//     }

//     get bodyText() {
//         return this._rail.querySelector('.retail-rail__body-text').innerHTML;
//     }
    
//     set ctaText(val) {
//         this._rail.querySelector('.retail-rail__cta').innerHTML = val;
//     }

//     get ctaText() {
//         return this._rail.querySelector('.retail-rail__cta').innerHTML;
//     } 

//     set ctaHref(val) {
//         this._rail.querySelector('.retail-rail__cta').href = val;
//     }

//     get ctaHref() {
//        return this._rail.querySelector('.retail-rail__cta').href;
//     }

//     closeRail() {
//         this._rail.classList.add('hide-rail');
//     }

//     displayRail() {
//         this._rail.classList.remove('hide-rail');
//     }

// }

// var rail = new RetailRail({
//     parentContainer: '.wrapper',
//     title: 'New rail',
//     bodyText: 'We have a great offer - blah, blah, blah, blah, blah, blah, blah, blah, blah, blah, blah, blah, blah, blah, blah',
//     ctaText: 'BOOK NOW',
//     ctaHref: 'https://www.google.com/',
//     extraClasses: ['test', 'dark-orange']
// });

// console.log(rail);

// es5 syntax

function RetailRail(props) {
      var self = this;
      // grab props object
      this._props = props;
      // label
      this._aria_label = '';
      // set open state of rail
      this._openState = true;
    //  this._parentContainer - is where you want to append the retail rail to
      this._parentContainer = document.querySelector(props.parentContainer || 'body');
    //   create the base element for the retail rail
      this._rail = document.createElement('div');
      // add aria-live
      this._rail.setAttribute('aria-live', 'assertive');
    //   add class to retail rail
      this._rail.classList.add('retail-rail');
    //   build the inner HTML of the retail rail
      this._rail.innerHTML = '<div class="content-wrap">' +
                              '<div class="text-container retail-rail__child">' +
                                 '<h3 class="retail-rail__title"></h3>' +
                                  '<p class="retail-rail__body-text"></p>' +
                               '</div>' +
                               '<a href="" tabindex="0" aria-label="find out more link" class="retail-rail__child retail-rail__cta"></a>' +
                               '<button class="retail-rail__close icon-close"></button>' +
                               '</div>';
      
     /*
      create an 'overlay' div - the retail rail will live inside this (for closing the retail rail)
      
      NOTE:
      
      The overlay div that contains the ratail will get a class of 'hide-rail' - which will collapse the height of the div to 0
     */
      this._overlay = document.createElement('div');
      this._overlay.classList.add('retail-rail-overlay');
      this._overlay.appendChild(this._rail);
      
    //   method: append retail rail to parent el
      this.appendRail = function() {
         this._parentContainer.appendChild(this._overlay);
         this.setAriaLabel();
      }
      
    //   method: remove retail rail from parent el
      this.removeRail = function() {
            this._parentContainer.removeChild(this._overlay);
        }
      
    // setter: set the title value for the retail rail  
      this.title = function(val){
            this._rail.querySelector('.retail-rail__title').innerHTML = val;
        }
      
    //   setter: set the body text value for the retail rail 
      this.bodyText = function(val) {
            this._rail.querySelector('.retail-rail__body-text').innerHTML = val;
        }
      
    // setter: set the cta text value for the retail rail 
      this.ctaText = function(val) {
            this._rail.querySelector('.retail-rail__cta').innerHTML = val;
        }
      
    // setter: set the cta href value for the retail rail 
      this.ctaHref = function(val) {
            this._rail.querySelector('.retail-rail__cta').href = val;
        }

    // method: set state of rail

    this.toggleState = function() {
      // change the open state to true or false
      this._openState = !this._openState;
    }
      
          
    //   method: close retail rail
      this.closeRail = function() {

        if(this._openState === true) {
            this._rail.parentNode.classList.add('hide-rail');
            this.toggleState();
            this.setAriaLabel();
        }
        }

        
    //   method: display retail rail
      this.displayRail = function() {
        
        if(this._openState === false) { 
            this._rail.parentNode.classList.remove('hide-rail');
            this.toggleState();
            this.setAriaLabel();
       }
        }

    // set aria label
    this.setAriaLabel = function() {
      // check if the retail rail is open or closed
      if(!this._openState) {
        // if closed - set this._aria_label to the closed string
        this._aria_label = props.aria_label_closed || 'Retail rail has been closed';
      } else {
         // if closed - set this._aria_label to the open string
        this._aria_label = props.aria_label_open || 'You are on a retail rail - retail rail open';
      }
      // set the aria-label att to the result of this._aria_label
      this._rail.setAttribute('aria-label', this._aria_label);
    }
     
      
    //  grab a reference to the close button icon on the rail 
      this._close = this._rail.querySelector('.retail-rail__close');
      
      /*
        directly below is where we call the setters e.g. this.title(props.title || 'title');
        
        NOTE:
        
        the '||' is used to check if a value has been given - if not, then use the string value 'title'
      */
      
      this.title(props.title || 'title');
      this.bodyText(props.bodyText || 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati, earum dolores! Molestiae earum dolores! Molestiae');
      this.ctaText(props.ctaText || 'LEARN MORE');
      this.ctaHref(props.ctaHref || '#');
      this.extraClasses = props.extraClasses;
      this.positionFixed = props.positionFixed

      if(typeof this.positionFixed == 'boolean' &&  this.positionFixed === true) {
        this._overlay.classList.add('position-fixed');
      }

    //   check if any additional CSS classes have been added to the retail rail - if so, add them.
      
      if(this.extraClasses) {
        this.extraClasses.forEach(function(classname) {
          this._rail.classList.add(classname);
        }.bind(this));
      }
      
    /*
    create event listener to close retail rail
    
    NOTE: in the event listener - the 'bind' method is used to bind the context of 'this' to to the class constructor
    */
      
      this._close.addEventListener('click', function() {
    //     call the close method we created earlier
        this.closeRail();
      }.bind(this));
      
    //   call appendRail method on page load
      
      this.appendRail();

      console.log(this._openState);
      console.log(this._aria_label);
    }



  function FetchRetailRail(props) {

    var xhr = new XMLHttpRequest();
    
// acf json example
// title: rail.acf.profiler.profiler_title,
// bodyText: rail.acf.room_builder.intro,
//https://www.conradalgarve.com/wp-json/acf/v3/pages
    xhr.onreadystatechange = function() {
        if(xhr.readyState === 4) {
            if(xhr.status === 200) {
                var content = JSON.parse(xhr.responseText);

                if( typeof content == 'object') {
                  var contentObject = Object.entries(content);
                  console.log(contentObject);
                  contentObject.forEach(function(x) {
                 
                    new RetailRail({
                      parentContainer: x[1][props.parent] || props.parent,
                      title: x[1][props.title] || props.title,
                      bodyText: x[1][props.bodyText] || props.bodyText,
                      ctaText: x[1][props.ctaText] || props.ctaText,
                      ctaHref: x[1][props.ctaHref] || props.ctaHref,
                      aria_label_open: x[1][props.aria_label_open] || props.aria_label_open,
                      aria_label_closed: x[1][props.aria_label_closed] || props.aria_label_closed,
                      positionFixed: x[1][props.positionFixed] || props.positionFixed,
                      extraClasses: x[1][props.extraClasses] || props.extraClasses
                  });


                  });
                } else {

                content.forEach(function(rail) {
    
                  new RetailRail({
                    parentContainer: rail[props.parent] || props.parent,
                    title: rail[props.title] || props.title,
                    bodyText: rail[props.bodyText] || props.bodyText,
                    ctaText: rail[props.ctaText] || props.ctaText,
                    ctaHref: rail[props.ctaHref] || props.ctaHref,
                    aria_label_open: rail[props.aria_label_open] || props.aria_label_open,
                    aria_label_closed: rail[props.aria_label_closed] || props.aria_label_closed,
                    positionFixed: rail[props.positionFixed] || props.positionFixed,
                    extraClasses: rail[props.extraClasses] || props.extraClasses
                });
    
                });
                console.log(props.positionFixed);
              }
                
            } else {
                alert(xhr.statusText);
            }
        }
    }
    xhr.open('GET', props.endPoint);
    xhr.send();
    
    }
    
    var rail = FetchRetailRail({
      endPoint: 'https://www.conradalgarve.com/wp-json/acf/v3/pages/5',
      parent: 'body',
      title: 'more_button_text',
      bodyText: 'meta_description',
      positionFixed: true,
      extraClasses: ['test-class']
    });
    
    // create a new instance of the retail rail 
    
    var railThree = new RetailRail({
        parentContainer: '.wrapper-one',
        title: 'New rail 1',
        bodyText: 'We have a great offer - this rail came from the RetailRail init function in the main JS file - blah, blah, blah',
        ctaText: 'BOOK NOW',
        ctaHref: 'https://www.google.com/',
        extraClasses: ['MyTestClas', 'light-green'],
        aria_label_open: 'Retail Rail is open',
        aria_label_closed: 'Retail Rail is closed',
        positionFixed: false // position rail fixed to the bottom of the window
    });
    