import renderSelectField from '../../components/fields/renderSelectField'
import renderTextField from '../fields/renderTextField'
import renderWysiwgyField from '../fields/renderWysiwgyField'

import { fetchUpdate as articleSectionUpdate, fetchDelete as articleSectionDelete } from '../../actions/articles'
import { fetchUpdate as cardUpdate, fetchDelete as cardDelete } from '../../actions/cards'
import { fetchUpdate as cardSectionUpdate, fetchDelete as cardSectionDelete } from '../../actions/cardSections'
import { fetchUpdate as heroUpdate, fetchDelete as heroDelete } from '../../actions/heros'
import { fetchUpdate as heroSectionUpdate, fetchDelete as heroSectionDelete } from '../../actions/heroSections'
import { fetchUpdate as productUpdate, fetchDelete as productDelete } from '../../actions/products'
import { fetchUpdate as productSectionUpdate, fetchDelete as productSectionDelete } from '../../actions/productSections'
import { fetchUpdate as swipeableSectionUpdate, fetchDelete as swipeableSectionDelete } from '../../actions/swipeableSections'
import { fetchUpdate as swipeableViewUpdate, fetchDelete as swipeableViewDelete } from '../../actions/swipeableViews'

const adminItemForms = [{
  name: 'ARTICLE_SECTION',
  update: articleSectionUpdate,
  delete: articleSectionDelete,
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
    { name: 'mediaAlign', type: 'select', options: [ 'right', 'left' ] },
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
  name: 'CARD_SECTION',
  update: cardSectionUpdate,
  delete: cardSectionDelete,
  fields: [
    { name: 'backgroundColor', type: 'text' },
    { name: 'pageLink', type: 'text', }
  ]
}, {
  name: 'HERO',
  update: heroUpdate,
  delete: heroDelete,
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
  name: 'HERO_SECTION',
  update: heroSectionUpdate,
  delete: heroSectionDelete,
  fields: [
    { name: 'backgroundColor', type: 'text' },
    { name: 'pageLink', type: 'text', }
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
  name: 'PRODUCT_SECTION',
  update: productSectionUpdate,
  delete: productSectionDelete,
  fields: [
    { name: 'backgroundColor', type: 'text' },
    { name: 'pageLink', type: 'text', }
  ]
}, {
  name: 'SWIPEABLE_SECTION',
  update: swipeableSectionUpdate,
  delete: swipeableSectionDelete,
  fields: [
    { name: 'backgroundColor', type: 'text' },
    { name: 'pageLink', type: 'text', }
  ]
}, {
  name: 'SWIPEABLE_VIEW',
  update: swipeableViewUpdate,
  delete: swipeableViewDelete,
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
    { name: 'pText', type: 'wysiwgy' },
  ]
}]

export default adminItemForms
