import RetailRail from './RetailRailClass';


// AJAX

function FetchACFRetailRail(props) {

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
  
        if(xhr.readyState === 4) {
            if(xhr.status === 200) {
                var content = JSON.parse(xhr.responseText);
                
                    new RetailRail({
                      parentContainer: content[0].parentContainer,
                      title: content[0].title,
                      bodyText: content[0].bodyText,
                      ctaText: content[0].ctaText,
                      ctaHref: content[0].ctaHref,
                      extraClasses: content[0].extraClasses
                  });
                
            } else {
                alert(xhr.statusText);
            }
        }
    }
    xhr.open('GET', props.endPoint);
    xhr.send();
    }
  
  
export var railajax = FetchACFRetailRail({
     endPoint: 'ajax.json'
});