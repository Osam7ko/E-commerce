import { TestBed } from '@angular/core/testing';

import { OEcommerceFrom } from './oecommerce-from';

describe('OEcommerceFrom', () => {
  let service: OEcommerceFrom;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OEcommerceFrom);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
