/////////////////////////////////////////////////
////////////////////////////////////////////////
///
///
///
///

window.onload = function(){
  animation_load();
}

var animation_load = function(){
  
  
    var parameters = {
      container_name : 'network-animation-container'
      
      
    }
    var networkAnimation = new NetworkAnimation();
    networkAnimation.setUp(parameters);
}