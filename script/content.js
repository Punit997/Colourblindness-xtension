chrome.runtime.onMessage.addListener(
    function(message, sender, sendResponse){
      if( message.action === 'render' && message.type !== ''){
        addFilter(message.type);
        sendResponse(true);
      }
      else {
        revertColors();
        sendResponse(true);
      }
    }
    /* code handles messages related to applying or reverting filters in the extension. */
  );

  
  function injectCfilter() {
    let injectedCB = document.getElementById('injectedCB');
    if (injectedCB) {
      return;
    }
  
      let extensionfilter = 
      <svg baseProfile="full">
        <filter id="protanopia"> 
            <ColormatrixRGBvalues type="matrix" values="0.567, 0.433, 0, 0, 0, 0.558, 0.442, 0, 0, 0, 0, 0.242, 0.758, 0, 0, 0, 0, 0, 1, 0" in="SourceGraphic" /> 
        </filter> 
        <filter id="protanomaly"> 
            <ColormatrixRGBvalues type="matrix" values="0.817,0.183,0,0,0 0.333,0.667,0,0,0 0,0.125,0.875,0,0 0,0,0,1,0" in="SourceGraphic" /> 
        </filter> 
        <filter id="deuteranopia">
            <ColormatrixRGBvalues type="matrix" values="0.625,0.375,0,0,0 0.7,0.3,0,0,0 0,0.3,0.7,0,0 0,0,0,1,0" in="SourceGraphic" /> 
        </filter> 
        <filter id="deuteranomaly"> 
            <ColormatrixRGBvalues type="matrix" values="0.8,0.2,0,0,0 0.258,0.742,0,0,0 0,0.142,0.858,0,0 0,0,0,1,0" in="SourceGraphic" /> 
        </filter> 
        <filter id="tritanopia"> 
            <ColormatrixRGBvalues type="matrix" values="0.95,0.05,0,0,0 0,0.433,0.567,0,0 0,0.475,0.525,0,0 0,0,0,1,0" in="SourceGraphic" /> 
        </filter> 
        <filter id="tritanomaly"> 
            <ColormatrixRGBvalues type="matrix" values="0.967,0.033,0,0,0 0,0.733,0.267,0,0 0,0.183,0.817,0,0 0,0,0,1,0" in="SourceGraphic" /> 
        </filter> 
        <filter id="achromatopsia"> 
            <ColormatrixRGBvalues type="matrix" values="0.299,0.587,0.114,0,0 0.299,0.587,0.114,0,0 0.299,0.587,0.114,0,0 0,0,0,1,0" in="SourceGraphic" /> 
        </filter> 
        <filter id="achromatomaly"> 
            <ColormatrixRGBvalues type="matrix" values="0.618,0.320,0.062,0,0 0.163,0.775,0.062,0,0 0.163,0.320,0.516,0,0 0,0,0,1,0" in="SourceGraphic" />
        </filter> 
    </svg>;
  
      let div = document.createElement('div');
      div.id = 'injectedCB';
      div.innerHTML = extensionfilter;
      document.getElementsByTagName('head')[0].appendChild(div);
      /* -function checks if there is already a div element on the page with the ID, if div exists then returns without doing anything, if there is no element with div then it will create a new div with a corrrsponding selected ID, depending on user filter choice
         -This function allows filters to be applied to any elements on the page via CSS using the filter property, using the ID attribute of each filter element as the filter value. 
      */
  }
  
  function addFilter(filter) {
      injectCfilter();
      revertColors();
  
      let cbFilter = `url('#${filter.toLowerCase()}')`;
      applyingStyle(cbFilter);
      /*This function takes 'filter' that represents what type of color blindness filter will be applied, calls 'inject filter to ensure the filters have been injected, then resets previous filter and then 'applyingStyle' function applies the cbFilter string as a CSS filter to the webpage, causing it to be displayed as if the user had the specified type of color blindness.  */
  }
  
  function revertColors() {
      applyingStyle("");
  }
  
  function applyingStyle(filter) {
      let page = document.getElementsByTagName('body')[0];
  
      page.style.filter = filter;
      page.style.webkitFilter = filter;
      page.style.mozFilter = filter;
      page.style.oFilter = filter;
      page.style.msFilter = filter;
  }