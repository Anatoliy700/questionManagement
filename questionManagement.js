"use strict";

let questionManagement = {
  settings: {
    questionBtnClass: 'question', // класс кнопки по которой нужно кликать для вывода и скрытия вопроса
    showQuestionBtnClass: 'green', // класс, наличие которого говорит что вопрос активирован
    keyNameLocalStorage: 'questKeyCode', // имя ключа для сохранения в localStorage
    clickByParent: true, // если true то клик происходит по родителю целевой кнопки иначе по самой кнопке
    debug: true, // вывод отладочной информации
    keyCode: {
      showQuestion: 33, // код кнопки при нажатии на которую активируется вопрос
      hideQuestion: 34, // код кнопки при нажатии на которую скрывается вопрос
    },
    panelClass: 'gclient__toolbar',
    indicatorClass: 'questionManagementIndicate',
    indicatorActiveClass: 'active',
    cssHref: 'https://anatoliy700.github.io/questionManagement/questionManagementStyle.css'
  },

  btn: null,
  indicator: null,

  init() {
    this.addStyleCss();
    this.addStatusToPanel();
    this.addHandler();
  },

  getBtn() {
    if (this.btn === null) {
      this.btn = this.getElement(this.settings.questionBtnClass);
    }
    return this.btn;
  },

  getIndicator() {
    if (this.indicator === null) {
      this.indicator = this.getElement(this.settings.indicatorClass);
    }
    return this.indicator;
  },

  getElement(className) {
    return document.getElementsByClassName(className)[0];
  },

  clickBtn(btn) {
    if (this.settings.clickByParent) {
      btn.parentNode.click();
    } else {
      btn.click();
    }
  },

  setKeyCode() {
    if (this.settings.keyCode.hideQuestion === null
      && this.settings.keyCode.showQuestion === null) {

    }
  },

  addLocalStorage() {
    if (this.settings.keyCode.hideQuestion !== null
      && this.settings.keyCode.showQuestion !== null) {
      localStorage.setItem(
        this.settings.keyNameLocalStorage,
        JSON.stringify(this.settings.keyCode)
      )
    }
  },

  getLocalStorage() {
    let keyCode = localStorage.getItem(this.settings.keyNameLocalStorage);
    if (keyCode !== null) {
      this.settings.keyCode = JSON.parse(keyCode);
      return true;
    }
    return false;
  },

  getKeyCodeFromUser() {

  },

  /**
   * Перехватчик события
   * @param event
   */
  handleEvent(event) {
    this.evenKeyupHandler(event)
  },

  addHandler() {
    if (!this.checkActiveEventListener()) {
      document.addEventListener('keyup', this);
      this.addClass(this.getIndicator(), this.settings.indicatorActiveClass);
    }
  },

  removeHandler(event) {
    event.preventDefault();
    if (this.checkActiveEventListener()) {
      document.removeEventListener('keyup', this);
      this.removeClass(this.getIndicator(), this.settings.indicatorActiveClass);
    }
  },

  evenKeyupHandler(event) {
    switch (event.keyCode) {
      case this.settings.keyCode.showQuestion:
        this.show();
        break;
      case this.settings.keyCode.hideQuestion:
        this.hide();
        break;
      default:
        console.log('KeyCode: ' + event.keyCode);
    }
  },

  show() {
    if (!this.checkActiveQuestionBtn()) {
      this.clickBtn(this.getBtn());
      this.debugPrint('show: ' + this.getBtn().outerHTML);
    }
  },

  hide() {
    if (this.checkActiveQuestionBtn()) {
      this.clickBtn(this.getBtn());
      this.debugPrint('hide: ' + this.getBtn().outerHTML);
    }
  },

  checkActiveEventListener() {
    return this.checkClassAtElem(this.getIndicator(), this.settings.indicatorActiveClass);
  },

  checkActiveQuestionBtn() {
    return this.checkClassAtElem(this.getBtn(), this.settings.showQuestionBtnClass);
  },

  checkClassAtElem(elem, className) {
    let classes = elem.className.split(/\s+/);
    return classes.includes(className);
  },

  addStatusToPanel() {
    let panel = document.getElementsByClassName(this.settings.panelClass)[0].firstElementChild;
    let elem = document.createElement('span');
    elem.className = this.settings.indicatorClass;
    panel.appendChild(elem);
    elem.addEventListener('click', () => {
      this.addHandler()
    });
    elem.addEventListener('contextmenu', (event) => {
      this.removeHandler(event)
    }, {capture: true})
  },

  addClass(elem, className) {
    if (!this.checkClassAtElem(elem, className)) {
      let classes = elem.className.split(/\s+/);
      classes.push(className);
      elem.className = classes.join(' ');
    }
  },

  removeClass(elem, className) {
    if (this.checkClassAtElem(elem, className)) {
      let classes = elem.className.split(/\s+/);
      if (classes.length > 1) {
        let newClasses = classes.filter(name => {
          return name !== className
        });
        elem.className = newClasses.join(' ');
      } else {
        elem.className = '';
      }
    }
  },

  addStyleCss() {
    let elem = document.createElement('link');
    elem.href = this.settings.cssHref;
    elem.rel = 'stylesheet';
    document.getElementsByTagName('head')[0].appendChild(elem);
  },

  debugPrint(message) {
    if (this.settings.debug) {
      console.log(message);
    }
  },
};


questionManagement.init();


