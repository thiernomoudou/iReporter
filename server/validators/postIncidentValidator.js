
/**
 * Validate the data for storing a new incident
 */
export default class PostincidentValidator {
  /**
   * Initialize the data to be validated
   * @param {object}  the incident to be validated
   */
  constructor(incident) {
    this.incident = incident;
    this.error = [];
  }


  /**
   * Validate the incident
   * @returns {boolean} true or false
   */
  
  isValid() {
    if (this.incident) {
      this.validateType();
      this.validateLocation();
    } else {
      this.error.push('No incident was provided');
    }

    if (this.error.length > 0) {
      return false;
    }

    return true;
  }

  /**
   * Validate the type field of the request
   * It must be found in request, and it must not be an empty string
   * @returns {null} no return value
   */
  validateType() {
    if (this.incident.type) {
      if (!(this.incident.type === 'Red-flag' || this.incident.type === 'Intervention')) {
        this.error.push('An incident must be a Red-flag or an Intervention');
      }
    } else {
      this.error.push('The type is required');
    }
  }

  /**
   * Validate the location field of the request
   * It must be found in request, and it must
   * @returns {null} no return value
   */
  validateLocation() {
    if (this.incident.location) {
      if (this.incident.location.length < 5) {
        this.error.push('The location must be longer than 5 characters.');
      }
    } else {
      this.error.push('The location is required');
    }
  }
}
