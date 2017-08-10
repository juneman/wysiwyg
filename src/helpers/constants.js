export const DRAGABLE_ITEMS = {
  ROW: 'row',
  ZONE: 'zone'
};

export const GALLERY_TYPES = {
  HERO: 'gallery',
  EMOJI: 'emoji'
};

export const categories = [
  {
    name: 'Text',
    content: 'textElements',
    willExpand: false
  },
  {
    name: 'Media',
    content: 'mediaElements',
    willExpand: true
  },
  {
    name: 'Forms',
    content: 'formElements',
    willExpand: true
  },
  {
    name: 'Advanced',
    content: 'advancedElements',
    willExpand: true
  },
]

export const textEditors = ['RichText']
export const formEditors = ['TextInput', 'TextAreaInput', 'SelectionField', 'Rating'];
export const mediaEditors = ['Image', 'Hero', 'Video'];
export const advancedEditors = ['Button', 'HTML'];

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
    label: 'Do nothing',
    value: ''
  },
  {
    label: 'Go to URL',
    value: BUTTON_ACTION_TYPES.URL
  },
  {
    label: 'Go to Next Page',
    value: BUTTON_ACTION_TYPES.NEXT_PAGE
  },
  {
    label: 'Go to Previous Page',
    value: BUTTON_ACTION_TYPES.PREVIOUS_PAGE
  },
  {
    label: 'Go to Custom Page',
    value: BUTTON_ACTION_TYPES.CUSTOM_PAGE
  },
  {
    label: 'Dismiss Entire Flow',
    value: BUTTON_ACTION_TYPES.END_FLOW
  },
  {
    label: 'Skip to Next Step Group',
    value: BUTTON_ACTION_TYPES.NEXT_GROUP
  }
];
