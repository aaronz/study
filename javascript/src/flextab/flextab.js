var $ = require('jquery');

var FlexTab = (function () {
  var TabClass = {};

  TabClass.init = function (dom) {
    var tab = {};

    var TAB_HEADERS_CLASS = ".sf-tabHeaders";
    var TAB_HEADER_CLASS = ".sf-tabHeader";
    var TAB_VIEWS_CLASS = ".sf-tabViews";
    var TAB_VIEW_CLASS = ".sf-tabView";
    var CURRENT_TAB_CLASS = ".cur";

    tab.options = {
      heads: [],
      viewRenders: []
    };

    function render(opts) {
      var headHtml = '';
      var viewHtml = '';
      for (var i = 0; i < tab.options.heads.length; i++) {
        headHtml += '<li class="' + TAB_HEADER_CLASS.substr(1) + '">' + tab.options.heads[i] + '</li>';
        viewHtml += '<div class="' + TAB_VIEW_CLASS.substr(1) + '"></div>';
      }

      var html = '<div><ul class="' + TAB_HEADERS_CLASS.substr(1) + '">' + headHtml + '</ul></div>';
      html += '<div class="' + TAB_VIEWS_CLASS.substr(1) + '">' + viewHtml + '</div>';

      $(dom).html(html);
    }

    function bindTabEvents() {
      $(dom).find(TAB_HEADER_CLASS).each(function (index) {
        $(this).click(function () {
          $(dom).find(TAB_HEADER_CLASS).removeClass(CURRENT_TAB_CLASS);
          $(this).addClass(CURRENT_TAB_CLASS);
          tab.switchView(index);
        });
      });
    }

    tab.setOptions = function (opts) {
      $.extend(this.options, opts);
      render(this.options);
      bindTabEvents();
      this.switchView(0);
    };

    tab.switchView = function (index) {
      $(TAB_VIEW_CLASS).hide();
      $($(TAB_VIEW_CLASS)[index]).show();
      this.options.viewRenders[index]($(TAB_VIEW_CLASS)[index]);
    };

    return tab;
  };

  return TabClass;
} ());

module.exports = FlexTab;