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

export function showLoading() {
  hideErrorSection();
  hideMainSection();
  showLoadingSection();
}

export function showMain() {
  hideLoadingSection();
  showMainSection();
}

export function showError(message) {
  hideLoadingSection();
  showErrorSection();
  showErrorMessage(message);
}
