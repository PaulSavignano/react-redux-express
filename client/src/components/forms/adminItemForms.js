import { fetchUpdate as articleUpdate, fetchDelete as articleDelete } from '../../actions/articles'
import { fetchUpdate as cardUpdate, fetchDelete as cardDelete } from '../../actions/cards'
import { fetchUpdate as contactFormUpdate, fetchDelete as contactFormDelete } from '../../actions/contactForms'
import { fetchUpdate as heroUpdate, fetchDelete as heroDelete } from '../../actions/heros'
import { fetchUpdate as pageUpdate, fetchDelete as pageDelete } from '../../actions/pages'
import { fetchUpdate as productUpdate, fetchDelete as productDelete } from '../../actions/products'
import { fetchUpdate as sectionUpdate, fetchDelete as sectionDelete } from '../../actions/sections'

const adminItemForms = [{
  name: 'ARTICLE',
  update: articleUpdate,
  delete: articleDelete,
  fields: [
    { name: 'articleFlex', type: 'text' },
    { name: 'button1Text', type: 'text' },
    { name: 'button1Link', type: 'text' },
    { name: 'button2Text', type: 'text' },
    { name: 'button2Link', type: 'text' },
    { name: 'flexFlow', type: 'select', options: ['row wrap', 'row wrap-reverse' ] },
    { name: 'h1Text', type: 'text' },
    { name: 'h2Text', type: 'text' },
    { name: 'h3Text', type: 'text' },
    { name: 'iframe', type: 'text' },
    { name: 'mediaAlign',
      type: 'select',
      options: [
        'aboveText',
        'belowText',
        'leftOfText',
        'leftOfParagraph',
        'rightOfText',
        'rightOfParagraph'
      ]
    },
    { name: 'mediaBorder', type: 'text' },
    { name: 'mediaBorderRadius', type: 'text' },
    { name: 'mediaElevation',
      type: 'select',
      options: [
        'articleStyle',
        '0','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24'
      ]
    },
    { name: 'mediaFlex', type: 'text' },
    { name: 'textFlex', type: 'text' },
    { name: 'pText', type: 'wysiwgy' },
  ]
}, {
  name: 'CARD',
  update: cardUpdate,
  delete: cardDelete,
  fields: [
    { name: 'button1Text', type: 'text' },
    { name: 'button1Link', type: 'text' },
    { name: 'button2Text', type: 'text' },
    { name: 'button2Link', type: 'text' },
    { name: 'flex', type: 'text' },
    { name: 'h1Text', type: 'text', },
    { name: 'h2Text', type: 'text', },
    { name: 'h3Text', type: 'text', },
    { name: 'iframe', type: 'text', },
    { name: 'link', type: 'text', },
    { name: 'pText', type: 'wysiwgy' },
  ]
}, {
  name: 'CONTACT_FORM',
  update: contactFormUpdate,
  delete: contactFormDelete,
  fields: [
    { name: 'button1Text', type: 'text' },
    { name: 'h2Text', type: 'text' },
    { name: 'h3Text', type: 'text' },
    { name: 'pText', type: 'wysiwgy' },
  ]
}, {
  name: 'HERO',
  update: heroUpdate,
  delete: heroDelete,
  fields: [
    { name: 'backgroundColor', type: 'text' },
    { name: 'backgroundPosition', type: 'text' },
    { name: 'button1Text', type: 'text' },
    { name: 'button1Link', type: 'text' },
    { name: 'button2Text', type: 'text' },
    { name: 'button2Link', type: 'text' },
    { name: 'h1Text', type: 'text', },
    { name: 'h2Text', type: 'text', },
    { name: 'h3Text', type: 'text', },
    { name: 'iframe', type: 'text', },
    { name: 'mediaFlex', type: 'text' },
    { name: 'mediaBorder', type: 'text' },
    { name: 'mediaBorderRadius', type: 'text' },
    { name: 'mediaElevation',
      type: 'select',
      options: [
        '0','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24'
      ]
    },
    { name: 'pText', type: 'wysiwgy' }
  ]
}, {
  name: 'PAGE',
  update: pageUpdate,
  delete: pageDelete,
  fields: [
    { name: 'backgroundColor', type: 'text' },
    { name: 'backgroundPosition', type: 'text' },
  ]
}, {
  name: 'PRODUCT',
  update: productUpdate,
  delete: productDelete,
  fields: [
    { name: 'description', type: 'text' },
    { name: 'detail', type: 'text' },
    { name: 'name', type: 'text' },
    { name: 'price', type: 'number' },
  ]
}, {
  name: 'SECTION',
  update: sectionUpdate,
  delete: sectionDelete,
  fields: [
    { name: 'alignItems', type: 'text' },
    { name: 'backgroundPosition', type: 'text' },
    { name: 'containerBackgroundColor', type: 'text' },
    { name: 'kind', type: 'select', options: [ 'Flex', 'SlideShow', 'Swipeable' ] },
    { name: 'flexFlow', type: 'select', options: ['row wrap', 'row wrap-reverse', 'row nowrap', 'column' ] },
    { name: 'justifyContent', type: 'select', options: ['flex-start', 'flex-end', 'center', 'space-around', 'space-between'] },
    { name: 'margin', type: 'text' },
    { name: 'maxWidth', type: 'text' },
    { name: 'minHeight', type: 'text' },
    { name: 'padding', type: 'text' },
    { name: 'pageLink', type: 'text' },
  ]
}]


export default adminItemForms
