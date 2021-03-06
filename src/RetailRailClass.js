
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

  // setter: set the unique id on rail

  this.setID = function(id) {
    this._rail.id = id;
  }

  // getter: get rail id
  this.getID = function() {
    return '#' + this._rail.id;
  }

  // setter: set css classes to rail 
      this.setExtraClasses = function(val) {
        val.forEach(function(newClasses) {
            this._rail.classList.add(newClasses);
        }.bind(this));
      }
  // getter: get the list of css classes from rail  
      this.getClasses = function() {
        return this._rail.classList;
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
    
    if(props.title !== null) { 
      this.title(props.title || 'title');
    }
    this.setID(props.id);
    if(props.bodyText !== null) {
      this.bodyText(props.bodyText || 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati, earum dolores! Molestiae earum dolores! Molestiae');
    }
    if(props.ctaText !== null) {
      this.ctaText(props.ctaText || 'LEARN MORE');
    } else if(props.ctaText === null) {
      this._rail.querySelector('.retail-rail__cta').style.display = 'none';
    }
    
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

  }

  export default RetailRail;