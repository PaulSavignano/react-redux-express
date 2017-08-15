import React from 'react'
import { push } from 'react-router-redux'
import { ListItem } from 'material-ui/List'

const HeaderDrawerPageLink = ({ dispatch, page, sections, handleTouchTap }) => {
  const pageSections = page.sections.map(section => sections.find(item => item._id === section.sectionId))
  const pageSectionLinks = pageSections ? pageSections.filter(item => item.values.pageLink) : []
  if (pageSectionLinks.length) {
    return (
      <ListItem
        onTouchTap={() => handleTouchTap(`/${page.slug}`)}
        primaryText={page.name}
        initiallyOpen={false}
        primaryTogglesNestedList={true}
        nestedItems={pageSectionLinks.map(link => {
          console.log(link)
          return (
            <ListItem
              key={link._id}
              primaryText={link.values.pageLink}
              onTouchTap={() => handleTouchTap(`/${page.slug}#${link.values.pageLink}`)}
            />
          )
        }
        )}
      />
    )
  } else {
    return (
      <ListItem
        onTouchTap={() => handleTouchTap(`/${page.slug}`)}
        primaryText={page.name}
      />
    )
  }
}

export default HeaderDrawerPageLink
