import React from 'react';
import { mount } from 'enzyme';

import Generator from '../components/Generator';
import Table from '../components/Table';

describe('Basic Generator Functionality', () => {
  describe('default table size', () => {
    it('should generate table with default props', () => {
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

  describe('On "+" buttons click', () => {
    const initialHeight = 4;
    const initialWidth = 4;
    let generatorWrapper;

    beforeEach(() => {
      generatorWrapper = mount(
        <Generator initialWidth={initialWidth} initialHeight={initialHeight} />
      );
    });

    it('should add one row', () => {
      const addRowButton = generatorWrapper.find('.add-button').first();
      addRowButton.simulate('click');
      const trsWrapper = generatorWrapper.find(Table).find('tr');
      expect(trsWrapper).toHaveLength(initialHeight + 1);
    });

    it('should add one column', () => {
      const addColumnButton = generatorWrapper.find('.add-button').last();
      addColumnButton.simulate('click');
      const trsWrapper = generatorWrapper.find(Table).find('tr');
      trsWrapper.forEach((node) => expect(node.find('td')).toHaveLength(initialWidth + 1));  
    });

  });

  describe('On "-" buttons click (when width/height gt 1)', () => {
    const initialHeight = 4;
    const initialWidth = 4;
    let generatorWrapper;

    beforeEach(() => {
      generatorWrapper = mount(
        <Generator initialWidth={initialWidth} initialHeight={initialHeight} />
      );
    });

    it('should remove one column', () => {
      const removeColumnButton = generatorWrapper.find('.remove-button').first();
      removeColumnButton.simulate('click');
      const trsWrapper = generatorWrapper.find(Table).find('tr');
      trsWrapper.forEach((node) => expect(node.find('td')).toHaveLength(initialWidth - 1));  
    });

    it('should remove one row', () => {
      const removeRowButton = generatorWrapper.find('.remove-button').last();
      removeRowButton.simulate('click');
      const trsWrapper = generatorWrapper.find(Table).find('tr');
      expect(trsWrapper).toHaveLength(initialHeight - 1);
    });

  });

  describe('On "-" buttons click (when width / height equal 1)', () => {
    let generatorWrapper;

    beforeEach(() => {
      generatorWrapper = mount(
        <Generator initialWidth={1} initialHeight={1} />
      );
    });

    it('should remove one column', () => {
      const removeColumnButton = generatorWrapper.find('.remove-button').first();
      removeColumnButton.simulate('click');
      const trsWrapper = generatorWrapper.find(Table).find('tr');
      trsWrapper.forEach((node) => expect(node.find('td')).toHaveLength(1));  
    });

    it('should remove one row', () => {
      const removeRowButton = generatorWrapper.find('.remove-button').last();
      removeRowButton.simulate('click');
      const trsWrapper = generatorWrapper.find(Table).find('tr');
      expect(trsWrapper).toHaveLength(1);
    });

  });


});