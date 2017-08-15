export const DRAGABLE_ITEMS = {
  ROW: 'row',
  ZONE: 'zone'
};

export const GALLERY_TYPES = {
  HERO: 'gallery',
  EMOJI: 'emoji'
};

export const BUTTON_ACTION_TYPES = {
  URL: 'url',
  NEXT_PAGE: 'next',
  PREVIOUS_PAGE: 'prev',
  CUSTOM_PAGE: 'custom',
  END_FLOW: 'skip',
  NEXT_GROUP: 'end'
};

export const BUTTON_ACTIONS_WITH_DATA_STEP_ATTRS = [
  BUTTON_ACTION_TYPES.NEXT_PAGE,
  BUTTON_ACTION_TYPES.PREVIOUS_PAGE,
  BUTTON_ACTION_TYPES.END_FLOW,
  BUTTON_ACTION_TYPES.NEXT_GROUP
];

export const BUTTON_ACTION_TYPES_LIST = [
  {
    label: 'Go to URL',
    value: BUTTON_ACTION_TYPES.URL
  },
  {
    label: 'Go to Next Step',
    value: BUTTON_ACTION_TYPES.NEXT_PAGE
  },
  {
    label: 'Go to Previous Step',
    value: BUTTON_ACTION_TYPES.PREVIOUS_PAGE
  },
  {
    label: 'Go to Custom Step',
    value: BUTTON_ACTION_TYPES.CUSTOM_PAGE
  },
  {
    label: 'Dismiss Entire Flow',
    value: BUTTON_ACTION_TYPES.END_FLOW
  },
  {
    label: 'Skip to Next Group',
    value: BUTTON_ACTION_TYPES.NEXT_GROUP
  }
];