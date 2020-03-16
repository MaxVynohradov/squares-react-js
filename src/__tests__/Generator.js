import React from 'react';
import { shallow, mount, render } from 'enzyme';

import Generator from '../components/Generator';
import Table from '../components/Table';

describe('Basic Generator Functionality', () => {
  it('should generate default table', () => {
    const trsWrapper = mount(<Generator />).find(Table).find('tr');
    expect(trsWrapper).toHaveLength(4);
    trsWrapper.forEach((node) => {
      expect(node.find('td')).toHaveLength(4);
    })
  })
});