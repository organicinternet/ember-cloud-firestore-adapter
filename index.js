'use strict';

const Funnel = require('broccoli-funnel');
const MergeTrees = require('broccoli-merge-trees');
const fastbootTransform = require('fastboot-transform');

module.exports = {
  name: 'ember-cloud-firestore-adapter',

  treeForVendor(defaultTree) {
    const browserVendorLib = new Funnel('node_modules', {
      destDir: 'fastboot-shims',
      files: ['firebase/firebase-firestore.js'],
    });

    return new MergeTrees([defaultTree, fastbootTransform(browserVendorLib)]);
  },

  included(app) {
    this._super.included.apply(this, arguments);

    app.import('vendor/fastboot-shims/firebase/firebase-firestore.js');
    app.import('vendor/fastboot/firebase-firestore.js');
  },
};
