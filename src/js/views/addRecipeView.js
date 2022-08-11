
import View from './View';
import icons from 'url:../../img/icons.svg';

class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnClose = document.querySelector('.btn--close-modal');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');

  addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', ()=> {
      this._window.classList.toggle('hidden');
      this._overlay.classList.toggle('hidden');
    })
  }

  _generateMarkup() {
    
  }
}

export default new AddRecipeView();
