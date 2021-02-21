function tabs({allTabs,content,allParent,activeClass,hideClass,wisionClass,animateClass}) {

    const tabs = document.querySelectorAll(allTabs),
          tabsContent = document.querySelectorAll(content),
          tabsParents = document.querySelector(allParent);

  function hide() {
      tabsContent.forEach( item => {
          item.classList.add(hideClass, animateClass);
          item.classList.remove(wisionClass);
      });

      tabs.forEach( item => {
          item.classList.remove(activeClass);
      });
  }

  function wision(i = 0) {
      tabsContent[i].classList.add(wisionClass);
      tabsContent[i].classList.remove(hideClass);

      tabs[i].classList.add(activeClass);
  }

  function mainTabs() {
      tabsParents.addEventListener("click", event => {
          const target = event.target;

          if (target && target.classList.contains(allTabs.slice(1))) {
              tabs.forEach( (item, i) => {
                  if ( item == target) {
                      hide();
                      wision(i);
                  }
              });
          }
      });            
  }

  hide();
  wision();
  mainTabs();

}

export default tabs;