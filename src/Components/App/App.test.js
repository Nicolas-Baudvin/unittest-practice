import React from 'react';
import { render } from '@testing-library/react';
import App from './index';
import { shallow } from 'enzyme';

import Header from '../Header';
import Body from '../Home';
import WorkSpace from '../WorkSpace';

describe('App Component', () => {
  it("should not crash", () => {
    const wrapper = shallow(<App />);

    expect(wrapper.contains(<Header />)).toEqual(true);
    expect(wrapper.contains(<Body />)).toEqual(true);
    expect(wrapper.contains(<WorkSpace />)).toEqual(true);
  })
});
