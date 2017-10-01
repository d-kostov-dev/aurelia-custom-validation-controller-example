import { inject } from 'aurelia-framework';
import { ValidationController, Validator, PropertyAccessorParser } from 'aurelia-validation';

@inject(Validator, PropertyAccessorParser)
export class CustomValidationController extends ValidationController {
  isCurrentlyValid: boolean = false;

  constructor(private injectedValidator: Validator, private injectedPropertyParser: PropertyAccessorParser) {
    super(injectedValidator, injectedPropertyParser);
    this.subscribe(x => this.validateAll(x.instruction.object));
  }

  public validateAll(object) {
    this.injectedValidator.validateObject(object)
      .then(results => {
        this.isCurrentlyValid = results.every(result => result.valid)
      });
  }
}
