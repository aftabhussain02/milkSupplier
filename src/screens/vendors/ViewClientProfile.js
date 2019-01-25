import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ViewList, ViewItem } from '../../component';

class ViewClientProfile extends Component {
  render() {
    const { name, area, phone, email } = this.props.selectedClient;

    return (
      <ViewList>
        <ViewItem label="Name" value={name} />
        <ViewItem label="Area" value={area} />
        <ViewItem label="Phone" value={phone || '-'} />
        <ViewItem label="Email" value={email || '-'} />
      </ViewList>
    );
  }
}

const mapStateToProps = state => {
  const { selectedClient } = state.listCustomer;

  return { selectedClient };
};

export default connect(mapStateToProps)(ViewClientProfile);
