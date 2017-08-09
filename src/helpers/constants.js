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

