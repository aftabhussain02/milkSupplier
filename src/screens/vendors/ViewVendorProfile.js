import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ViewList, ViewItem } from '../../component';

class ViewVendorProfile extends Component {
  render() {
    const { name, area, phone, email, vendor_product_name, vendor_product_type_name } = this.props.selectedVendor;

    return (
      <ViewList>
        <ViewItem label="Name" value={name} />
        <ViewItem label="Product" value={vendor_product_name || '-'} />
        <ViewItem label="Product Type" value={vendor_product_type_name || '-'} />
        <ViewItem label="Phone" value={phone || '-'} />
        <ViewItem label="Email" value={email || '-'} />
      </ViewList>
    );
  }
}

const mapStateToProps = state => {
  const { selectedVendor } = state.listVendor;

  return { selectedVendor };
};

export default connect(mapStateToProps)(ViewVendorProfile);
