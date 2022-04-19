// grab progress bar
const pageProgressBar = document.getElementById("progress-bar")

// grab and return scroll container. height that scrollbar should be bound to
const scrollContainer = () => {
  return document.getElementById("progress-container")
}

// set the scrollbar width when loaded in
document.addEventListener("DOMContentLoaded", () =>{
    progressWidth()

    // change scrollbar width when scrolling. using throttle to limit function calls
    document.addEventListener('scroll', throttle( progressWidth, 15 ) )

    // change scrollbar width when resizing
    window.addEventListener('resize', function(event) {
        progressWidth()
    })

})

// function to change scrollbar width accordingly
const progressWidth= () => {
    //console.log("Scroll Height: ", scrollContainer().scrollHeight)
    //console.log("Client Height: ", scrollContainer().clientHeight)
    //console.log("function throttle check")

    // calcualte scroll percentage relative to the container
    const scrolledPercentage =
      (scrollContainer().scrollTop /
        (scrollContainer().scrollHeight - scrollContainer().clientHeight)) *
      100
  
    // plus 1 enables a range of 1% to 101%. Stylistic choice
    pageProgressBar.style.width = `${scrolledPercentage+ 1}%`
}


// throttle scroll limiter
// wait is in milliseconds
function throttle( fn, wait ){
    let lastCall = 0;
      return function(){
      if( Date.now() - lastCall > wait  ){
        lastCall = Date.now()
        fn()
      }
    }
  }

  
// Extra unused throttle methods. can be ignored

/*
  const throttle2 = (func, limit) => {
    let lastFunc;
    let lastRan;
    return function() {
      const context = this;
      const args = arguments;
      if (!lastRan) {
        func.apply(context, args)
        lastRan = Date.now();
      } else {
        clearTimeout(lastFunc);
        lastFunc = setTimeout(function() {
            if ((Date.now() - lastRan) >= limit) {
              func.apply(context, args);
              lastRan = Date.now();
            }
         }, limit - (Date.now() - lastRan));
      }
    }
  }

  // Pass in the callback that we want to throttle and the delay between throttled events
const throttle3 = (callback, delay) => {
    // Create a closure around these variables.
    // They will be shared among all events handled by the throttle.
    let throttleTimeout = null;
    let storedEvent = null;
  
    // This is the function that will handle events and throttle callbacks when the throttle is active.
    const throttledEventHandler = (event) => {
      // Update the stored event every iteration
      storedEvent = event;
  
      // We execute the callback with our event if our throttle is not active
      const shouldHandleEvent = !throttleTimeout;
  
      // If there isn't a throttle active, we execute the callback and create a new throttle.
      if (shouldHandleEvent) {
        // Handle our event
        callback(storedEvent);
  
        // Since we have used our stored event, we null it out.
        storedEvent = null;
  
        // Create a new throttle by setting a timeout to prevent handling events during the delay.
        // Once the timeout finishes, we execute our throttle if we have a stored event.
        throttleTimeout = setTimeout(() => {
          // We immediately null out the throttleTimeout since the throttle time has expired.
          throttleTimeout = null;
  
          // If we have a stored event, recursively call this function.
          // The recursion is what allows us to run continusously while events are present.
          // If events stop coming in, our throttle will end.
          // It will then execute immediately if a new event ever comes.
          if (storedEvent) {
            // Since our timeout finishes:
            // 1. This recursive call will execute `callback` immediately since throttleTimeout is now null
            // 2. It will restart the throttle timer, allowing us to repeat the throttle process
            throttledEventHandler(storedEvent);
          }
        }, delay);
      }
    };
  
    // Return our throttled event handler as a closure
    return throttledEventHandler;
  };*/