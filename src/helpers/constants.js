import FormButton from '../icons/FormButton';
import MediaButton from '../icons/MediaButton';
import AdvancedCategoryButton from '../icons/AdvancedCategoryButton';

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
    content: 'textElements'
  },
  {
    name: 'Media',
    content: 'mediaElements',
    icon: MediaButton
  },
  {
    name: 'Forms',
    content: 'formElements',
    icon: FormButton
  },
  {
    name: 'Advanced',
    content: 'advancedElements',
    icon: AdvancedCategoryButton
  },
];

export const textEditors = ['RichText'];
export const mediaEditors = ['Image', 'Hero', 'Video'];
export const formEditors = ['TextInput', 'TextAreaInput', 'SelectionField', 'Rating'];
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
