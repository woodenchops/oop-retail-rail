// // Uses JS date object to publish or un-publish offers based off the dates provided in the custom data attributes. 

export function Publisher(props) {

  this._rail = document.querySelector(props.rail);
  this._rail_data_publish_offer = props.publish_offer;
  this._rail_data_unpublish_offer = props.unpublish_offer;

  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1; //January is 0!
  var yyyy = today.getFullYear();

  if (dd < 10) {
    dd = '0' + dd;
  }

  if (mm < 10) {
    mm = '0' + mm;
  }

  today = yyyy + "" + mm + "" + dd; // e.g. 20191218

  var todaysDate = parseInt(today);

  if(todaysDate >= this._rail_data_publish_offer && todaysDate <= this._rail_data_unpublish_offer) {
    this._rail.classList.add('publish');
  } else {
    this._rail.classList.add('unpublish');
  }
    
}