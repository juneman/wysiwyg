import Actions from '../helpers/actionConstants';

export function updateZoneHtml(id, html) {
  return {
    type: Actions.ZONES_UPDATE_HTML,
    id,
    html
  };
}
