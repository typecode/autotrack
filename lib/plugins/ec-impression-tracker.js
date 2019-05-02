/* global ga */
import provide from '../provide';
import ImpressionTracker from './impression-tracker';
import {
  assign, createFieldsObj,
  getAttributeFields,
} from '../utilities';


/**
 * Class for the `ecImpressionTracker` analytics.js plugin.
 * @implements {EcImpressionTrackerPublicInterface}
 */
class EcImpressionTracker extends ImpressionTracker {
  /**
   * Sends a hit to Google Analytics with the impression data.
   * @param {{id: (string)}} param1
   */
  handleImpression({id}) {
    this.queue.pushTask(() => {
      const element = document.getElementById(id);

      /** @type {FieldsObj} */
      const userFields = assign(
        {}, this.opts.fieldsObj,
        getAttributeFields(element, this.opts.attributePrefix)
      );

      ga('ec:addImpression', createFieldsObj(
        {}, userFields, this.tracker, this.opts.hitFilter, element));
    });
  }
}

provide('ecImpressionTracker', EcImpressionTracker);
