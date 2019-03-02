import _ from 'lodash';

export const validate = (values, rules, type) => dispatch => {
  let data = {};
  _.map(rules, (rule, key) => {
    if (key != 'remark' && values[key] && values[key].length > 30) {
      console.log('key', key);
      data = Object.assign(data, { [key]: [`${attribute(key)} length can't be more than 30.`] });
    }
    if (rule.includes('checkbox')) {
      if (values[key].length <= 0) {
        data = Object.assign(data, {
          [key]: [`Alteast select one from checkbox.`],
        });
      }
    }
    if (rule.includes('required')) {
      if (!values[key]) {
        data = Object.assign(data, { [key]: [`${attribute(key)} field is required.`] });
      }
    }
    if (rule.includes('phone')) {
      if (rule.includes('nullable') && !values[key]) {
        return;
      }
      if (values[key] && values[key].toString().length !== 10) {
        data = Object.assign(data, {
          [key]: [`${attribute(key)} should not be more than 10 numbers.`],
        });
      }
    }
    if (rule.includes('letters')) {
      if (rule.includes('nullable') && !values[key]) {
        return;
      }
      if (/^[a-zA-Z\s]*$/.test(values[key])) {
        data = Object.assign(data, { [key]: [`${attribute(key)} should be letters only.`] });
      }
    }
    if (rule.includes('qty')) {
      if (parseInt(values[key]) > 1000) {
        data = Object.assign(data, { [key]: [`${attribute(key)} should not be more than 1000.`] });
      }
    }
    if (rule.includes('amount')) {
      if (parseInt(values[key]) > 1000000) {
        data = Object.assign(data, {
          [key]: [`${attribute(key)} should not be more than 1000000.`],
        });
      }
    }
  });
  if (data && Object.keys(data).length > 0) {
    dispatch({
      type,
      payload: { data, errorMessage: '' },
    });
    return Promise.reject(data);
  }
  return Promise.resolve();
};

function attribute(value) {
  return _.upperFirst(value.replace(/_/g, ' '));
}
