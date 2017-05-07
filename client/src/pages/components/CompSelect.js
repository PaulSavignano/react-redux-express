import React, {Component} from 'react';
import { connect } from 'react-redux'
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import ContentFilter from 'material-ui/svg-icons/content/filter-list';
import FileFileDownload from 'material-ui/svg-icons/file/file-download';
import RaisedButton from 'material-ui/RaisedButton';

import AdminHero from './AdminHero'
import AdminCard from './AdminCard'

/**
 * Three controlled examples, the first allowing a single selection, the second multiple selections,
 * the third using internal state.
 */
class CompSelect extends Component {
  state = {
    openMenu: false,
    value: ''
  };
  handleChangeSingle = (event, value) => {
    this.setState({
      value,
    });
  };
  handleOpenMenu = () => {
    this.setState({
      openMenu: true,
    });
  }
  handleOnRequestChange = (value) => {
    this.setState({
      openMenu: value
    });
  }
  render() {
    const { page } = this.props
    console.log(page)
    return (
      <div>

        <IconMenu
          iconButtonElement={
            <RaisedButton onTouchTap={this.handleOpenMenu} label="Add Component" fullWidth={true} />
          }
          onChange={this.handleChangeSingle}
          open={this.state.openMenu}
          onRequestChange={this.handleOnRequestChange}
        >
          <MenuItem value="1" primaryText="Hero" />
          <MenuItem value="2" primaryText="Card" />
          <MenuItem value="3" primaryText="Carousel" />
        </IconMenu>
        { this.state.value === '1' ? <AdminHero page={page} /> : null }
        { this.state.value === '2' ? <AdminCard page={page} /> : null }
      </div>
    );
  }
}


const mapStateToProps = (state, ownProps) => {
  const isFetching = state.pages.isFetching || state.cards.isFetching ? true : false
  const page = isFetching ? {} : state.pages.items.find(item => item.slug === ownProps.params.slug)
  return {
    isFetching,
    page
  }
}

export default connect()(CompSelect)
