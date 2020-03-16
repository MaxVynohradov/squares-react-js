import React from 'react';
import { shallow, mount, render } from 'enzyme';

import Generator from '../components/Generator';
import Table from '../components/Table';

describe('Basic Generator Functionality', () => {
  it('should generate default table', () => {
    const trsWrapper = mount(<Generator />).find(Table).find('tr');
    expect(trsWrapper).toHaveLength(4);
    trsWrapper.forEach((node) => expect(node.find('td')).toHaveLength(4));
  })

  it.each([
    [2, 2], [2, 3], [3, 5], [9, 1], [1, 4]
  ])(
    'should generate table with props: width - %s, height = %s', 
    (height, width) => {
      const trsWrapper = mount(
        <Generator initialWidth={width} initialHeight={height} />
      ).find(Table).find('tr');
      expect(trsWrapper).toHaveLength(height);
      trsWrapper.forEach((node) => expect(node.find('td')).toHaveLength(width));  
    }
  );

});