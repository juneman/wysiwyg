import Actions from '../helpers/actionConstants';

export function updateZoneHtml(id, html) {
  return {
    type: Actions.ZONES_UPDATE_HTML,
    id,
    html
  };
}

export function removeZone(id) {
  return {
    type: Actions.ZONES_REMOVE_ONE,
    id
  };
}