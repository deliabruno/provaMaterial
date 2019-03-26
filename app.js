import {MDCCheckbox} from '@material/checkbox';
import {MDCChipSet} from '@material/chips';
import {MDCDialog} from '@material/dialog';
import {MDCDrawer} from '@material/drawer';
import {MDCFormField} from '@material/form-field';
import {MDCIconButtonToggle} from '@material/icon-button';
import {MDCLinearProgress} from '@material/linear-progress';
import {MDCList} from '@material/list';
import {MDCMenu} from '@material/menu';
import {MDCRadio} from '@material/radio';
import {MDCRipple} from '@material/ripple/index';
import {MDCSelect} from '@material/select';
import {MDCSlider} from '@material/slider';
import {MDCSnackbar} from '@material/snackbar';
import {MDCSwitch} from '@material/switch';
import {MDCTabBar} from '@material/tab-bar';
import {MDCTextField} from '@material/textfield';
import {MDCTextFieldHelperText} from '@material/textfield/helper-text';
import {MDCTopAppBar} from '@material/top-app-bar';

//
// Instantiate all components in the main content
//

const mainEl = document.querySelector('.main-content');

// Button
const buttonEls = Array.from(mainEl.querySelectorAll('.mdc-button'));
buttonEls.forEach((el) => new MDCRipple(el));

// Icon button
const iconButtonEls = Array.from(mainEl.querySelectorAll('.mdc-icon-button:not(#icon-toggle-button'));
iconButtonEls.forEach((el) => new MDCRipple(el));

// Icon button toggle
const iconToggleEl = mainEl.querySelector('#icon-toggle-button');
const iconToggle = new MDCIconButtonToggle(iconToggleEl);
iconToggle.unbounded = true;

// Card
const cardPrimaryActionEls = Array.from(mainEl.querySelectorAll('.mdc-card__primary-action'));
cardPrimaryActionEls.forEach((el) => new MDCRipple(el));

// Chips
const chipSetEls = Array.from(mainEl.querySelectorAll('.mdc-chip-set'));
chipSetEls.forEach((el) => new MDCChipSet(el));

// Text field
const textFieldEls = Array.from(mainEl.querySelectorAll('.mdc-text-field'));
textFieldEls.forEach((el) => {
  let textField = new MDCTextField(el);
  if (el.classList.contains('text-field-with-input')) {
    textField.value = 'Input text';
  }
});
const helperTextEls = Array.from(mainEl.querySelectorAll('.mdc-text-field-helper-text'));
helperTextEls.forEach((el) => new MDCTextFieldHelperText(el));

// Linear progress
const linearProgressEl = mainEl.querySelector('.mdc-linear-progress');
const linearProgress = new MDCLinearProgress(linearProgressEl);
linearProgress.progress = 0.5;

// FAB
const fabEls = Array.from(mainEl.querySelectorAll('.mdc-fab'));
fabEls.forEach((el) => new MDCRipple(el));

// Checkbox
const checkboxEls = Array.from(mainEl.querySelectorAll('.mdc-checkbox'));
checkboxEls.forEach((el) => {
  let checkbox = new MDCCheckbox(el);
  if (el.classList.contains('indeterminate-checkbox')) {
    checkbox.indeterminate = true;
  }
});

// Radio
const radioEls = Array.from(mainEl.querySelectorAll('.mdc-radio'));
radioEls.forEach((el) => new MDCRadio(el));

// Switch
const switchEls = Array.from(mainEl.querySelectorAll('.mdc-switch'));
switchEls.forEach((el) => new MDCSwitch(el));

// Top app bar
const topAppBarEls = Array.from(mainEl.querySelectorAll('.mdc-top-app-bar'));
topAppBarEls.forEach((el) => new MDCTopAppBar(el));

// List
const listEls = Array.from(mainEl.querySelectorAll('.mdc-list'));
listEls.forEach((el) => {
  let list = new MDCList(el);
  list.listElements.map((listItemEl) => new MDCRipple(listItemEl));
  list.singleSelection = true;
});

// Select
const selectEls = Array.from(mainEl.querySelectorAll('.mdc-select'));
selectEls.forEach((el) => new MDCSelect(el));

// Snackbar
const snackbarEl = mainEl.querySelector('.mdc-snackbar');
new MDCSnackbar(snackbarEl);

// Dialog
const dialogEl = mainEl.querySelector('.mdc-dialog');
new MDCDialog(dialogEl);

// Slider
const sliderEl = mainEl.querySelector('.mdc-slider');
const slider = new MDCSlider(sliderEl);
slider.value = 5;

// Menu
const menuEl = mainEl.querySelector('.mdc-menu');
const menu = new MDCMenu(menuEl);
menu.open = true;
// Override MDCMenuSurfaceFoundation so the menu never closes
menu.menuSurface_.foundation_.close = () => {};

// Tabs
const tabBarEl = mainEl.querySelector('.mdc-tab-bar');
new MDCTabBar(tabBarEl);

//
// Theme Builder drawer
//

const themeBuilderDrawerEl = document.querySelector('.theme-builder-drawer');

new MDCTabBar(themeBuilderDrawerEl.querySelector('.mdc-tab-bar'));
themeBuilderDrawerEl.querySelector('.drawer-tab--instructions').addEventListener('MDCTab:interacted', () => {
  themeBuilderDrawerEl.querySelector('.drawer-content--instructions').style.display = 'block';
  themeBuilderDrawerEl.querySelector('.drawer-content--theme-summary').style.display = 'none';
});
themeBuilderDrawerEl.querySelector('.drawer-tab--theme-summary').addEventListener('MDCTab:interacted', () => {
  themeBuilderDrawerEl.querySelector('.drawer-content--instructions').style.display = 'none';
  themeBuilderDrawerEl.querySelector('.drawer-content--theme-summary').style.display = 'block';
});

const formField = new MDCFormField(themeBuilderDrawerEl.querySelector('.mdc-form-field'));
const rtlSwitch = new MDCSwitch(themeBuilderDrawerEl.querySelector('.rtl-switch'));
formField.input = rtlSwitch;

const rtlInput = themeBuilderDrawerEl.querySelector('#rtl-input');
rtlInput.addEventListener('change', function() {
  [].forEach.call(mainEl.querySelectorAll('.column'), function(columnEl) {
    if (rtlInput.checked) {
      columnEl.setAttribute('dir', 'rtl');
      linearProgressEl.classList.add('mdc-linear-progress--reversed');
    } else {
      columnEl.removeAttribute('dir');
      linearProgressEl.classList.remove('mdc-linear-progress--reversed');
    }
    slider.layout();
  });
});

//
// Theme Builder app bar
//

const themeBuilderAppBar = new MDCTopAppBar(document.querySelector('.theme-builder-app-bar'));
const initModalDrawer = () => {
  themeBuilderDrawerEl.classList.add("mdc-drawer--modal");
  const themeBuilderDrawer = new MDCDrawer(themeBuilderDrawerEl);
  themeBuilderDrawer.open = false;
  themeBuilderAppBar.setScrollTarget(mainEl);
  themeBuilderAppBar.listen('MDCTopAppBar:nav', () => {
    themeBuilderDrawer.open = !themeBuilderDrawer.open;
  });
}

// Toggle between permanent drawer and modal drawer at 900px
const setDrawerVariant = () => {
  if (window.matchMedia("(max-width: 900px)").matches) {
    initModalDrawer();
  } else {
    themeBuilderDrawerEl.classList.remove("mdc-drawer--modal");
  }
}
window.addEventListener('resize', setDrawerVariant);
setDrawerVariant();