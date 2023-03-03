const descriptions = {
    ""              : "Prism allows you to view the web through the eyes of the color-blind. <br>This is an example of normal, unaltered vision.",
    "Protanopia"    : "A loss of sensitivity to red light. This is characterized by a tendency to confuse reds and greens.",
    "Protanomaly"   : "Characterized by the retina's diminished response to red light.",
    "Deuteranopia"  : "A loss of sensitivity to green light. This is characterized by a tendency to confuse blues and greens, and greens and reds.",
    "Deuteranomaly" : "Characterized by the retina's diminished response to green light.",
    "Tritanopia"    : "A loss of sensitivity to blue and yellow light. Overall, sensitivity to blue light is diminished.",
    "Tritanomaly"   : "Characterized by the retina's diminished response to blue light.",
    "Achromatopsia" : "Total color blindness, often associated with reduced visual acuity.",
    "Achromatomaly" : "Diminished sensitivity to overall visible light."
  };
  
  const clearFilterOut = (image, IDfilter) => {
    setFilter(image, "");
    deactive(IDfilter);
    /*removes existing filters to the image */
  };
  
  const setActive = IDfilter => {
    if (IDfilter) {
      document.getElementById(IDfilter).className = "active";
    }
    /* It will highlight an HTML element on the page by applying a certain visual style to it, to indicate that it is currently selected or active */
  };
  
  const deactive = IDfilter => {
    if (IDfilter) {
      document.getElementById(IDfilter).className = "";
    }
    /* It is used to deactivate a filter by removing the "active" class from its corresponding filter element in the HTML. */
  };
  
  const setFilter = (image, filter) => {
    setActive(filter);
  
    let filterDes = document.getElementById('filter-description');
    filterDes.innerHTML = descriptions[filter];
  
    let filterURL = `url('#${filter.toLowerCase()}')`;
  
    image.style.filter = filterURL;

    chrome.storage.sync.set({'filter':filter}, () => {
    }); /* save filter to storage */
  
    /* send message to content.js */
    chrome.tabs.getSelected(function(tab){
      chrome.tabs.sendMessage(tab.id, {
        action: 'render',
        type: filter
      });
    });
  };
  
  const toggleOnOff = () => {
    let off = document.getElementsByClassName("off")[0];
    let on  = document.getElementsByClassName("on")[0];
  
    if (on.className === "on") {
      console.log(on);
      off.className = "off";
      off.style.backgroundColor = "white";
      on.className += " active";
      on.style.backgroundColor = "green";
    } else if (off.className === "off") {
      on.className = "on";
      on.style.backgroundColor = "white";
      off.className += " active";
      off.style.backgroundColor = "red";
    }
    /* removable? */
  }
  
  document.addEventListener('ContentLoad', () => {
    let CVDlist = document.getElementsByTagName('li'); /*assigns all elements 'li' with CVDlist variable */
    let image = document.getElementsByTagName('body')[0];/*selects 'body' and associates to image variable */
    let presentFilter = "Protanopia";/* initiates with this setting */
  
    CVDlist = Array.prototype.slice.call(CVDlist);
    injectCfilter();
  
    chrome.storage.sync.get(["filter"], (savedFilter) => {
      filter = savedFilter.filter;
      if (filter !== "") {
        toggleOnOff();
        presentFilter = filter;
      }
      setFilter(image, filter);
    }); /* This part retrieves the saved filter value from the browser's storage, depending on toggle it will change the element body */
  
    document.getElementById('about').addEventListener("click", e => {
      e.preventDefault();
      let newURL = "https://imahungrypanda.github.io/Prism/";
      chrome.tabs.create({ url: newURL });
      /*Link where it takes user to the "get tested page" */
    });
  
    CVDlist.forEach(li => {
      li.addEventListener('click', e => {
        if (document.getElementsByClassName("off")[0].className !== "off") {
          toggleOnOff();
        }
        deactive(presentFilter);
        presentFilter = e.target.textContent;
        setFilter(image, presentFilter);
      });
    }); /* checks whether the toggle is switched on or off, if not turns off and desactivates previous active filters and applies on the clicked CVD type */
  
    document.getElementsByClassName("on")[0].addEventListener("click", () => {
      toggleOnOff();
      if (!presentFilter) {
        presentFilter = "Protanopia";
      }
      setFilter(image, presentFilter);
    }); /* it automatically sets the first option filter, if no other "presentfilter" is saved on selected */
  
    document.getElementsByClassName("off")[0].addEventListener("click", () => {
      toggleOnOff();
      clearFilterOut(image, presentFilter);
    });/* it clears out any filter when toggle is switched off */
  });