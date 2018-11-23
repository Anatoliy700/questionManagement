let questionManagement = {
  settings: {
    questionBtnClass: 'question',
    showQuestionBtnClass: 'green',
    keyNameLocalStorage: 'questKeyCode',
    clickByParent: true,
    debug: true,
    keyCode: {
      showQuestion: 81,
      hideQuestion: 87,
    }
  },

  init() {
    this.addHandler();
  },

  getBtn() {
    return document.getElementsByClassName(
      this.settings.questionBtnClass
    )[0];
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

  addHandler() {
    document.addEventListener('keyup', (event) => {
      this.evenKeyupHandler(event);
    });
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
        if (this.settings.debug) {
          console.log('KeyCode: ' + event.keyCode);
        }
    }
  },

  show() {
    let btn = this.getBtn();
    if (!this.checkClassAtBtn(btn, this.settings.showQuestionBtnClass)) {
      this.clickBtn(btn);
      if (this.settings.debug) {
        console.log('show: ', btn);
      }
    }
  },

  hide() {
    let btn = this.getBtn();
    if (this.checkClassAtBtn(btn, this.settings.showQuestionBtnClass)) {
      this.clickBtn(btn);
      if (this.settings.debug) {
        console.log('hide: ', btn);
      }
    }
  },

  checkClassAtBtn(btn, className) {
    let classes = btn.className.split(/\s+/);
    return classes.includes(className);
  },


};


questionManagement.init();


