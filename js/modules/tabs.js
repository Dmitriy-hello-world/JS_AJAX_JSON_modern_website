function tabs() {

    const tabs = document.querySelectorAll(".tabheader__item"),
    tabsContent = document.querySelectorAll(".tabcontent"),
    tabsParents = document.querySelector(".tabheader__items");

  function hide() {
      tabsContent.forEach( item => {
          item.classList.add("hide", "fade");
          item.classList.remove("wision");
      });

      tabs.forEach( item => {
          item.classList.remove("tabheader__item_active");
      });
  }

  function wision(i = 0) {
      tabsContent[i].classList.add("wision");
      tabsContent[i].classList.remove("hide");

      tabs[i].classList.add("tabheader__item_active");
  }

  function mainTabs() {
      tabsParents.addEventListener("click", event => {
          const target = event.target;

          if (target && target.classList.contains("tabheader__item")) {
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

module.exports = tabs;