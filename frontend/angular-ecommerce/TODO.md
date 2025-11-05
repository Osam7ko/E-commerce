# TODO: Add Form Validation to Checkout Component

## Step 1: Update checkout.ts - Add Validators to Form Controls

- Add Validators.required to all required fields in customer, shippingAddress, billingAddress, creditCard groups.
- Add pattern validators for email, zipCode, cardNumber, securityCode.
- Add minLength/maxLength where appropriate.

## Step 2: Update checkout.ts - Add Getters for Form Controls

- Add getters for all form controls to access them in template (e.g., get firstName(), lastName(), email(), etc.).
- Include getters for nested groups like shippingAddressStreet, billingAddressCity, etc.

## Step 3: Update checkout.ts - Enhance onSubmit Method

- Modify onSubmit() to check if form is valid before proceeding.
- If invalid, mark all fields as touched to show errors.
- Add console log or alert for invalid form.

## Step 4: Update checkout.html - Add Error Messages

- Add error divs for all fields with proper \*ngIf conditions.
- Display specific error messages (required, pattern, etc.).
- Fix existing firstName error display (remove incomplete div).

## Step 5: Test Validation

- Run the app and test form submission with invalid data.
- Verify error messages appear correctly.
- Test with valid data to ensure submission works.
