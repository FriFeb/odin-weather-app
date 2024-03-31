import { getTempMode } from '../backend/temp_mode';
import { pickTempModeEnvironmentColor } from './main_section_elements/hour_info/hour_info_chart_utils';

const root = document.querySelector(':root');

function getColors(targetHour) {
  switch (getTempMode()) {
    case '0':
      return {
        color: pickTempModeEnvironmentColor(targetHour.temp.temp_C, 1),
        transparentColor: pickTempModeEnvironmentColor(
          targetHour.temp.temp_C,
          0.5
        ),
      };

    case '1':
    default:
      return {
        color: pickTempModeEnvironmentColor(targetHour.temp.temp_F, 1),
        transparentColor: pickTempModeEnvironmentColor(
          targetHour.temp.temp_F,
          0.5
        ),
      };
  }
}

function setColors({ color, transparentColor }) {
  root.style.setProperty('--environment-color', color);

  root.style.setProperty('--environment-transparent-color', transparentColor);
}

export default function setEnvironmentColors(targetHour) {
  const colors = getColors(targetHour);

  setColors(colors);
}
