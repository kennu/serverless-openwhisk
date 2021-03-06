'use strict';

const BbPromise = require('bluebird');

module.exports = {
  deployRule(rule) {
    return this.provider.client().then(ow =>
      ow.rules.create(rule).catch(err => {
        throw new this.serverless.classes.Error(
          `Failed to deploy rule (${rule.ruleName}) due to error: ${err.message}`
        );
      })
    );
  },

  deployRules() {
    const rules = this.getRules();
    if (rules.length) {
      this.serverless.cli.log('Deploying Rules...');
    }
    return BbPromise.all(rules.map(r => this.deployRule(r)));
  },

  getRules() {
    const rules = this.serverless.service.rules;
    return Object.keys(this.serverless.service.rules).map(r => rules[r]);
  }
};
