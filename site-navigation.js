(function() {
  /**
   * @param {string} title
   * @param {string} href
   * @returns {string[]} array with title at array index 0 and href at index 1
   */
  function linkData (title, href) {
    return [title, href];
  }
  
  /**
   * @param {string} className
   * @returns {HTMLAnchorElement}
   */
  function getAnchorWithClassname (className) {
    const anchorElement = window.document.createElement('a');
    anchorElement.classList.add(className);
    return anchorElement;
  }
  
  /**
   * @param {string[]} linkTitleAndHref
   * @returns {function(HTMLAnchorElement, string, number): HTMLAnchorElement}
   */
  function createAnchorReducer (linkTitleAndHref) {
    return function anchorReducer (anchorElement, anchorAttribute, attributeIndex) {
      anchorElement[anchorAttribute] = linkTitleAndHref[attributeIndex];
      return anchorElement;
    };
  }

  /**
   * @param {string[]} linkAttributes
   * @param {HTMLAnchorElement} baseAnchorElement
   * @returns {function(*=): (Node)}
   */
  function pageLinkElementFactory (linkAttributes, baseAnchorElement) {
    return function reduceLinkTitleAndHref(linkTitleAndHref) {
      return linkAttributes.reduce(createAnchorReducer(linkTitleAndHref), baseAnchorElement.cloneNode());
    };
  }
  
  /**
   * @function siteNavigation
   * @param {{containerElement:HTMLElement, linkData:string[][], pageLinkElementFactory:function}} o
   */
  (function siteNavigation ({ containerElement, linkData, pageLinkElementFactory }) {
    const mainNavLinks = linkData.map(pageLinkElementFactory);
    
    mainNavLinks.forEach(anchorElement => {
      // hightlight current page in main links
      if (window.location.pathname.indexOf(anchorElement.pathname) !== -1) {
        anchorElement.classList.add('currentPage');
      } 
      containerElement.appendChild(anchorElement)
    });
  })({
    'containerElement': window.document.getElementById('site-navigation-container'),
    
    'linkData': [
      linkData('Home', 'index.html'), 
      linkData('Functional JS', 'functional.html'), 
      linkData('Python', 'python-utils.html'),
      linkData('Tips for writing code comments', 'tips-for-writing-comments.html'),
      linkData('Physics', 'physics.html'),
      linkData('How to use Stack Edit', 'stack-edit.html'),
      linkData('Code-snippets', 'https://github.com/bahmutov/code-snippets'),
      linkData('Pragmatic FP', 'http://blog.cleancoder.com/uncle-bob/2017/07/11/PragmaticFunctionalProgramming.html'),
      linkData('Algorithmic Cheatsheet', 'https://sinon.org/algorithms/'),
    ],
    
    'pageLinkElementFactory': pageLinkElementFactory([
        'textContent', 
        'href'
      ], getAnchorWithClassname('nav-main-anchors'))
  });
})();