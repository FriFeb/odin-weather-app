import { hideMainSection, showMainSection } from './sections/main_section';
import {
  hideLoadingSection,
  showLoadingSection,
} from './sections/loading_section';
import {
  hideErrorSection,
  showErrorMessage,
  showErrorSection,
} from './sections/error_section';
import { changeMargin } from './sections/form';

export function showLoading() {
  hideErrorSection();
  hideMainSection();
  showLoadingSection();
}

export function showMain() {
  changeMargin({ top: '0rem' });
  hideLoadingSection();
  showMainSection();
}

export function showError(message) {
  changeMargin({ top: '1rem' });
  hideLoadingSection();
  showErrorSection();
  showErrorMessage(message);
}
