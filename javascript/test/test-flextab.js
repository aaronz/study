var container = FlexTab.init('#container');
container.setOptions({
  heads: ['a', 'b', 'c'],
  viewRenders: [rendera, renderb, renderc]
});

function rendera(element) {
  $(element).html('hello FlexTab A');
}

function renderb(element) {
  $(element).html('hello FlexTab B');
}

function renderc(element) {
  $(element).html('hello FlexTab C');
}