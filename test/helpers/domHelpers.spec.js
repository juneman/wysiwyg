import { Map } from 'immutable';
import { expect } from 'chai';

import { convertBoundingBox, flattenHTML } from '../../src/helpers/domHelpers';

describe('domHelpers', () => {

  describe('convertBoundingBox', () => {

    it('should return an empty Immutable.Map if nothing is passed in', () => {

      const converted = convertBoundingBox();
      expect(converted).to.be.instanceof(Map);
      expect(converted.isEmpty()).to.equal(true);

    });

    it('should return an Immutable.Map of the bounding box passed in', () => {

      const converted = convertBoundingBox({
        height: 1,
        width: 2
      });

      expect(converted).to.be.instanceof(Map);
      expect(converted.get('height')).to.equal(1);

    });

  });

  describe('flattenHTML', () => {

    it('should return the input if the input is falsy', () => {

      const strippedHTML = flattenHTML(null);
      expect(strippedHTML).to.equal(null);

    });

    it('should strip out whitespace from HTML tags', () => {

      const strippedHTML = flattenHTML(`
        <div class="row">
          Testing
        </div>
      `);

      expect(strippedHTML).to.equal('<div class="row">Testing</div>');

    });

  });

});